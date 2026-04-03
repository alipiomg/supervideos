import { NextRequest, NextResponse } from "next/server";

interface WebhookRenderRequest {
  compositionId: string;
  props?: Record<string, unknown>;
  codec?: string;
  crf?: number;
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
  outputFormat?: "mp4" | "webm" | "gif";
  webhook_url?: string;
}

const VALID_CODECS = ["h264", "h265", "vp8", "vp9", "prores", "gif"];

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const expectedToken = process.env.WEBHOOK_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Invalid or missing Bearer token" },
        { status: 401 }
      );
    }

    const body = (await req.json()) as WebhookRenderRequest;

    if (!body.compositionId) {
      return NextResponse.json(
        { error: "Bad Request", message: "compositionId is required" },
        { status: 400 }
      );
    }

    const codec = body.codec || "h264";
    if (!VALID_CODECS.includes(codec)) {
      return NextResponse.json(
        {
          error: "Bad Request",
          message: `Invalid codec. Valid: ${VALID_CODECS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const crf = body.crf ?? 18;
    const ext = codec === "vp8" || codec === "vp9" ? "webm" : codec === "gif" ? "gif" : "mp4";
    const outputPath = `out/webhook/${body.compositionId}-${Date.now()}.${ext}`;

    const commandParts = [
      "npx remotion render",
      "src/remotion/index.ts",
      body.compositionId,
      outputPath,
      `--codec ${codec}`,
      `--crf ${crf}`,
    ];

    if (body.width && body.height) {
      commandParts.push(`--width ${body.width}`, `--height ${body.height}`);
    }

    if (body.props) {
      commandParts.push(`--props='${JSON.stringify(body.props)}'`);
    }

    const command = commandParts.join(" ");

    const job = {
      id: crypto.randomUUID(),
      status: "queued" as const,
      compositionId: body.compositionId,
      command,
      outputPath,
      codec,
      crf,
      props: body.props || null,
      createdAt: new Date().toISOString(),
      message:
        "Job queued. Execute the command on your server to render. For automated execution, integrate with a job queue (Bull, BullMQ, etc).",
    };

    return NextResponse.json(job, { status: 202 });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "SuperVideos Webhook API",
    version: "1.0.0",
    endpoints: {
      "POST /api/webhook": {
        description: "Queue a video render job",
        body: {
          compositionId: "string (required) - ID from Root.tsx",
          props: "object (optional) - Composition props",
          codec: "string (optional) - h264|h265|vp8|vp9|prores|gif (default: h264)",
          crf: "number (optional) - 0-51, lower=better (default: 18)",
          width: "number (optional) - Override width",
          height: "number (optional) - Override height",
        },
        auth: "Bearer token via WEBHOOK_SECRET env var (optional)",
        example: {
          compositionId: "SocialReel",
          props: { titulo: "Mi Video", color: "#667eea" },
          codec: "h264",
          crf: 18,
        },
      },
    },
  });
}
