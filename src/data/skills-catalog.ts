export type SkillEntry = {
  id: string;
  name: string;
  file: string;
  description: string;
  tags: string[];
  summary: string;
  exampleSnippet: string;
};

export const skillsCatalog: SkillEntry[] = [
  {
    id: "animations",
    name: "Animaciones",
    file: "rules/animations.md",
    description: "Animaciones fundamentales en Remotion",
    tags: ["animacion", "core"],
    summary: "Todas las animaciones DEBEN usar useCurrentFrame(). Nunca CSS transitions ni clases animate-* de Tailwind.",
    exampleSnippet: `const frame = useCurrentFrame();
const { fps } = useVideoConfig();
const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: "clamp",
});`
  },
  {
    id: "compositions",
    name: "Composiciones",
    file: "rules/compositions.md",
    description: "Definir composiciones, stills, folders y props",
    tags: ["core", "estructura"],
    summary: "Usar <Composition> con component, width, height, fps, durationInFrames. Usar type en vez de interface para props.",
    exampleSnippet: `<Composition
  id="MyVideo"
  component={MyComponent}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={300}
  defaultProps={{ title: "Hello" }}
/>`
  },
  {
    id: "transitions",
    name: "Transiciones",
    file: "rules/transitions.md",
    description: "Transiciones entre escenas con TransitionSeries",
    tags: ["animacion", "escenas"],
    summary: "Usar <TransitionSeries> con <Transition> para crossfade, slide, wipe, flip entre escenas.",
    exampleSnippet: `<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={90}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={slide({ direction: "from-left" })}
    timing={springTiming({ durationInFrames: 30 })}
  />
  <TransitionSeries.Sequence durationInFrames={90}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>`
  },
  {
    id: "timing",
    name: "Timing y Easing",
    file: "rules/timing.md",
    description: "Interpolacion, springs y curvas de easing",
    tags: ["animacion", "core"],
    summary: "interpolate() para lineal, spring() para movimiento natural. Configs: damping:200 (suave), damping:8 (rebote).",
    exampleSnippet: `const scale = spring({
  frame,
  fps,
  config: { damping: 200 }, // suave, sin rebote
});`
  },
  {
    id: "sequencing",
    name: "Secuenciacion",
    file: "rules/sequencing.md",
    description: "Delay, recorte y duracion de elementos con Sequence y Series",
    tags: ["core", "estructura"],
    summary: "Usar <Sequence from={30}> para delay. <Series> para secuencia automatica. premountFor para pre-carga.",
    exampleSnippet: `<Series>
  <Series.Sequence durationInFrames={60}>
    <Intro />
  </Series.Sequence>
  <Series.Sequence durationInFrames={90}>
    <MainContent />
  </Series.Sequence>
</Series>`
  },
  {
    id: "text-animations",
    name: "Animaciones de Texto",
    file: "rules/text-animations.md",
    description: "Typewriter, highlights y efectos tipograficos",
    tags: ["animacion", "texto"],
    summary: "Efecto typewriter con string slicing. Nunca opacidad por caracter individual.",
    exampleSnippet: `const frame = useCurrentFrame();
const text = "Hello World";
const charsShown = Math.floor(interpolate(frame, [0, 60], [0, text.length], { extrapolateRight: "clamp" }));
return <h1>{text.slice(0, charsShown)}</h1>;`
  },
  {
    id: "videos",
    name: "Videos",
    file: "rules/videos.md",
    description: "Incrustar videos con trimming, volumen, velocidad y loop",
    tags: ["media"],
    summary: "Usar <Video> de @remotion/media. Props: trimBefore, trimAfter (en segundos), playbackRate, loop.",
    exampleSnippet: `import { Video } from "@remotion/media";
<Video
  src={staticFile("clip.mp4")}
  trimBefore={2}
  trimAfter={10}
  playbackRate={1.5}
/>`
  },
  {
    id: "audio",
    name: "Audio",
    file: "rules/audio.md",
    description: "Audio: importar, recortar, volumen, velocidad y pitch",
    tags: ["media", "audio"],
    summary: "Usar <Audio> con trimBefore/trimAfter (en frames). Volumen estatico o callback dinamico.",
    exampleSnippet: `<Audio
  src={staticFile("music.mp3")}
  volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" })}
/>`
  },
  {
    id: "subtitles",
    name: "Subtitulos",
    file: "rules/subtitles.md",
    description: "Captions con formato Caption: text, startMs, endMs",
    tags: ["texto", "media"],
    summary: "Formato Caption con text, startMs, endMs. Importar desde JSON o SRT con @remotion/captions.",
    exampleSnippet: `import { Caption } from "@remotion/captions";
// Captions en JSON: [{ text: "Hola", startMs: 0, endMs: 1500 }]`
  },
  {
    id: "voiceover",
    name: "Voiceover",
    file: "rules/voiceover.md",
    description: "Voz en off con ElevenLabs TTS",
    tags: ["audio", "ia"],
    summary: "Generar MP3 con TTS API (ElevenLabs). Usar calculateMetadata() para ajustar duracion dinamicamente.",
    exampleSnippet: `// Script Node.js para generar voiceover
const audio = await elevenLabs.textToSpeech("scene-1", { text: "Bienvenidos..." });
fs.writeFileSync("public/voiceover-1.mp3", audio);`
  },
  {
    id: "charts",
    name: "Graficos y Datos",
    file: "rules/charts.md",
    description: "Barras, pie, lineas y visualizacion de datos animados",
    tags: ["data", "animacion"],
    summary: "Usar React + SVG + D3.js. Animar con useCurrentFrame(), nunca librerias de animacion externas.",
    exampleSnippet: `// Barra animada con spring
const height = spring({ frame, fps, config: { damping: 200 } }) * targetHeight;
<rect x={x} y={chartHeight - height} width={barWidth} height={height} />`
  },
  {
    id: "fonts",
    name: "Fuentes",
    file: "rules/fonts.md",
    description: "Google Fonts y fuentes locales",
    tags: ["estilo"],
    summary: "Usar @remotion/google-fonts para Google Fonts. Fuentes locales con @remotion/fonts desde public/.",
    exampleSnippet: `import { loadFont } from "@remotion/google-fonts/Inter";
const { fontFamily } = loadFont();
<div style={{ fontFamily }}>Texto</div>`
  },
  {
    id: "tailwind",
    name: "TailwindCSS",
    file: "rules/tailwind.md",
    description: "Usar TailwindCSS en Remotion",
    tags: ["estilo"],
    summary: "TailwindCSS para estilos. NUNCA usar transition-* o animate-*. Solo useCurrentFrame() para animaciones.",
    exampleSnippet: `// Correcto: Tailwind para layout, useCurrentFrame para animacion
<div className="flex items-center justify-center bg-blue-500"
  style={{ opacity }}> {/* opacity from useCurrentFrame */}`
  },
  {
    id: "parameters",
    name: "Parametros",
    file: "rules/parameters.md",
    description: "Videos parametrizables con Zod schemas",
    tags: ["core", "configuracion"],
    summary: "Definir schema Zod junto al componente. Usar z.infer para tipos. zColor() para color picker.",
    exampleSnippet: `const MySchema = z.object({
  title: z.string(),
  color: zColor(),
  showLogo: z.boolean(),
});`
  },
  {
    id: "3d",
    name: "3D con Three.js",
    file: "rules/3d.md",
    description: "Contenido 3D con Three.js y React Three Fiber",
    tags: ["3d", "avanzado"],
    summary: "Usar <ThreeCanvas>. NUNCA useFrame() de R3F, solo useCurrentFrame() de Remotion.",
    exampleSnippet: `import { ThreeCanvas } from "@remotion/three";
<ThreeCanvas width={1920} height={1080}>
  <ambientLight intensity={0.5} />
  <mesh rotation={[0, rotation, 0]}>
    <boxGeometry args={[1, 1, 1]} />
  </mesh>
</ThreeCanvas>`
  },
  {
    id: "images",
    name: "Imagenes",
    file: "rules/images.md",
    description: "Incrustar imagenes con el componente Img",
    tags: ["media"],
    summary: "SIEMPRE usar <Img> de remotion, nunca <img> HTML ni <Image> de Next.js. Garantiza carga completa.",
    exampleSnippet: `import { Img, staticFile } from "remotion";
<Img src={staticFile("logo.png")} style={{ width: 200 }} />`
  },
  {
    id: "assets",
    name: "Assets",
    file: "rules/assets.md",
    description: "Importar imagenes, videos, audio y fuentes",
    tags: ["media", "core"],
    summary: "Todos los assets en public/. Usar staticFile() para referenciarlos. URLs remotas directamente.",
    exampleSnippet: `import { staticFile } from "remotion";
const videoUrl = staticFile("background.mp4");
const imageUrl = staticFile("logo.png");`
  },
  {
    id: "trimming",
    name: "Recorte",
    file: "rules/trimming.md",
    description: "Recortar inicio y final de animaciones",
    tags: ["core", "edicion"],
    summary: "Recortar inicio: from negativo en <Sequence>. Recortar final: durationInFrames.",
    exampleSnippet: `// Recortar 0.5s del inicio
<Sequence from={-0.5 * fps}>
  <MyAnimation />
</Sequence>`
  },
  {
    id: "light-leaks",
    name: "Light Leaks",
    file: "rules/light-leaks.md",
    description: "Efectos de fuga de luz para transiciones",
    tags: ["efectos", "transiciones"],
    summary: "Usar <LightLeak> de @remotion/light-leaks. Props: seed, hueShift (0-360). Ideal en TransitionSeries.Overlay.",
    exampleSnippet: `import { LightLeak } from "@remotion/light-leaks";
<TransitionSeries.Overlay>
  <LightLeak durationInFrames={60} seed={42} hueShift={120} />
</TransitionSeries.Overlay>`
  },
  {
    id: "lottie",
    name: "Lottie",
    file: "rules/lottie.md",
    description: "Animaciones Lottie en Remotion",
    tags: ["animacion", "avanzado"],
    summary: "Usar @remotion/lottie con delayRender/continueRender para carga asincrona.",
    exampleSnippet: `import { Lottie } from "@remotion/lottie";
<Lottie animationData={animationData} style={{ width: 200 }} />`
  },
  {
    id: "gifs",
    name: "GIFs",
    file: "rules/gifs.md",
    description: "GIFs sincronizados con la timeline",
    tags: ["media"],
    summary: "Usar <Gif> de @remotion/gif para sincronizar GIFs con el timeline de Remotion.",
    exampleSnippet: `import { Gif } from "@remotion/gif";
<Gif src={staticFile("animation.gif")} width={300} />`
  },
  {
    id: "maps",
    name: "Mapas",
    file: "rules/maps.md",
    description: "Mapas animados con Mapbox",
    tags: ["data", "avanzado"],
    summary: "Integrar Mapbox GL para mapas animados. Animar coordenadas y zoom con useCurrentFrame().",
    exampleSnippet: `// Animar posicion del mapa
const lng = interpolate(frame, [0, duration], [-73.98, -118.24]);
const lat = interpolate(frame, [0, duration], [40.76, 34.05]);`
  },
  {
    id: "calculate-metadata",
    name: "Metadata Dinamica",
    file: "rules/calculate-metadata.md",
    description: "Duracion y dimensiones dinamicas basadas en datos",
    tags: ["core", "avanzado"],
    summary: "calculateMetadata() para establecer duracion, dimensiones y props en funcion de datos externos.",
    exampleSnippet: `calculateMetadata={async ({ props }) => {
  const duration = await getAudioDuration(props.audioFile);
  return { durationInFrames: Math.ceil(duration * 30) };
}}`
  },
  {
    id: "can-decode",
    name: "Can Decode",
    file: "rules/can-decode.md",
    description: "Verificar si un video puede ser decodificado",
    tags: ["media", "utilidad"],
    summary: "Verificar compatibilidad de codec del navegador antes de reproducir con Mediabunny.",
    exampleSnippet: `// Verificar soporte de codec
const canPlay = await canDecode("video.webm");`
  },
  {
    id: "extract-frames",
    name: "Extraer Frames",
    file: "rules/extract-frames.md",
    description: "Extraer frames de videos en timestamps especificos",
    tags: ["media", "utilidad"],
    summary: "Extraer frames individuales de videos con Mediabunny en timestamps especificos.",
    exampleSnippet: `// Extraer frame en el segundo 5
const frame = await extractFrame("video.mp4", 5);`
  },
  {
    id: "get-audio-duration",
    name: "Duracion de Audio",
    file: "rules/get-audio-duration.md",
    description: "Obtener duracion de un archivo de audio",
    tags: ["audio", "utilidad"],
    summary: "getAudioDuration() devuelve la duracion en segundos con Mediabunny.",
    exampleSnippet: `const duration = await getAudioDuration(staticFile("narration.mp3"));
const frames = Math.ceil(duration * fps);`
  },
  {
    id: "get-video-dimensions",
    name: "Dimensiones de Video",
    file: "rules/get-video-dimensions.md",
    description: "Obtener ancho y alto de un video",
    tags: ["media", "utilidad"],
    summary: "getVideoDimensions() devuelve width y height del video con Mediabunny.",
    exampleSnippet: `const { width, height } = await getVideoDimensions("video.mp4");`
  },
  {
    id: "get-video-duration",
    name: "Duracion de Video",
    file: "rules/get-video-duration.md",
    description: "Obtener duracion de un video en segundos",
    tags: ["media", "utilidad"],
    summary: "getVideoDuration() devuelve la duracion en segundos con Mediabunny.",
    exampleSnippet: `const duration = await getVideoDuration(staticFile("clip.mp4"));`
  },
  {
    id: "audio-visualization",
    name: "Visualizacion de Audio",
    file: "rules/audio-visualization.md",
    description: "Espectros, waveforms y efectos reactivos al audio",
    tags: ["audio", "animacion", "avanzado"],
    summary: "Barras de espectro, waveforms y efectos reactivos al bajo usando datos de frecuencia.",
    exampleSnippet: `// Visualizacion de espectro con barras
const audioData = useAudioData(src);
const visualization = visualizeAudio({ audioData, frame, fps });`
  },
  {
    id: "sfx",
    name: "Efectos de Sonido",
    file: "rules/sfx.md",
    description: "Efectos de sonido en Remotion",
    tags: ["audio"],
    summary: "Anadir efectos de sonido sincronizados con la timeline usando <Audio> dentro de <Sequence>.",
    exampleSnippet: `<Sequence from={30}>
  <Audio src={staticFile("whoosh.mp3")} volume={0.5} />
</Sequence>`
  },
  {
    id: "measuring-dom-nodes",
    name: "Medir Nodos DOM",
    file: "rules/measuring-dom-nodes.md",
    description: "Medir dimensiones de elementos DOM en Remotion",
    tags: ["utilidad", "avanzado"],
    summary: "Medir elementos DOM para layouts dinamicos usando refs y delayRender.",
    exampleSnippet: `const ref = useRef<HTMLDivElement>(null);
const { width, height } = useMeasure(ref);`
  },
  {
    id: "measuring-text",
    name: "Medir Texto",
    file: "rules/measuring-text.md",
    description: "Medir dimensiones de texto y ajustar a contenedores",
    tags: ["texto", "utilidad"],
    summary: "Medir ancho/alto de texto para ajustar fuentes a contenedores y detectar overflow.",
    exampleSnippet: `const { width } = measureText({ text: "Hello", fontFamily: "Inter", fontSize: 48 });`
  },
  {
    id: "display-captions",
    name: "Mostrar Captions",
    file: "rules/display-captions.md",
    description: "Renderizar subtitulos animados en pantalla",
    tags: ["texto", "media"],
    summary: "Renderizar captions con estilo y animacion sincronizados al timeline del video.",
    exampleSnippet: `// Mostrar caption activo basado en el frame actual
const currentCaption = captions.find(c =>
  frame >= c.startMs * fps / 1000 && frame < c.endMs * fps / 1000
);`
  },
  {
    id: "import-srt-captions",
    name: "Importar SRT",
    file: "rules/import-srt-captions.md",
    description: "Importar subtitulos desde archivos SRT",
    tags: ["texto", "utilidad"],
    summary: "Parsear archivos SRT a formato Caption de Remotion con @remotion/captions.",
    exampleSnippet: `import { parseSrt } from "@remotion/captions";
const captions = parseSrt(srtContent);`
  },
  {
    id: "transcribe-captions",
    name: "Transcribir Captions",
    file: "rules/transcribe-captions.md",
    description: "Generar captions desde audio/video con IA",
    tags: ["audio", "ia", "texto"],
    summary: "Transcribir audio a captions usando servicios de IA para subtitulos automaticos.",
    exampleSnippet: `// Transcribir audio a captions
const captions = await transcribe(staticFile("narration.mp3"));`
  },
  {
    id: "transparent-videos",
    name: "Videos Transparentes",
    file: "rules/transparent-videos.md",
    description: "Renderizar videos con canal alpha",
    tags: ["media", "avanzado"],
    summary: "Exportar videos con fondo transparente usando codec VP9 WebM o ProRes 4444.",
    exampleSnippet: `npx remotion render MyComp out/transparent.webm --codec vp9 --pixel-format yuva420p`
  },
];
