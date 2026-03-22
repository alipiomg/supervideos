export type PlatformPreset = {
  id: string;
  name: string;
  platform: string;
  width: number;
  height: number;
  ratio: string;
  fps: number;
};

export const platformPresets: PlatformPreset[] = [
  { id: "youtube", name: "YouTube", platform: "YouTube", width: 1920, height: 1080, ratio: "16:9", fps: 30 },
  { id: "youtube-shorts", name: "YouTube Shorts", platform: "YouTube", width: 1080, height: 1920, ratio: "9:16", fps: 30 },
  { id: "tiktok", name: "TikTok", platform: "TikTok", width: 1080, height: 1920, ratio: "9:16", fps: 30 },
  { id: "instagram-reel", name: "Instagram Reel", platform: "Instagram", width: 1080, height: 1920, ratio: "9:16", fps: 30 },
  { id: "instagram-post", name: "Instagram Post", platform: "Instagram", width: 1080, height: 1080, ratio: "1:1", fps: 30 },
  { id: "instagram-story", name: "Instagram Story", platform: "Instagram", width: 1080, height: 1920, ratio: "9:16", fps: 30 },
  { id: "twitter", name: "Twitter / X", platform: "Twitter", width: 1280, height: 720, ratio: "16:9", fps: 30 },
  { id: "linkedin", name: "LinkedIn", platform: "LinkedIn", width: 1920, height: 1080, ratio: "16:9", fps: 30 },
  { id: "facebook", name: "Facebook", platform: "Facebook", width: 1920, height: 1080, ratio: "16:9", fps: 30 },
  { id: "custom", name: "Custom", platform: "Custom", width: 1920, height: 1080, ratio: "16:9", fps: 30 },
];
