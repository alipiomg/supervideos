export type CodecOption = {
  value: string;
  label: string;
  extension: string;
  description: string;
};

export const renderCodecs: CodecOption[] = [
  { value: "h264", label: "H.264 (MP4)", extension: "mp4", description: "Formato universal. Ideal para YouTube, redes sociales y web." },
  { value: "h265", label: "H.265 (MP4)", extension: "mp4", description: "Mayor compresion que H.264. Ideal para archivos mas pequenos." },
  { value: "vp8", label: "VP8 (WebM)", extension: "webm", description: "Formato abierto de Google. Bueno para web." },
  { value: "vp9", label: "VP9 (WebM)", extension: "webm", description: "Sucesor de VP8. Mejor calidad y compresion." },
  { value: "prores", label: "ProRes (MOV)", extension: "mov", description: "Calidad profesional. Ideal para edicion posterior en Premiere/DaVinci." },
  { value: "gif", label: "GIF", extension: "gif", description: "Imagen animada. Ideal para previews y demos cortos." },
];
