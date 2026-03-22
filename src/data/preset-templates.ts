export type PresetTemplate = {
  id: string;
  name: string;
  description: string;
  platform: string;
  width: number;
  height: number;
  fps: number;
  durationSeconds: number;
  tags: string[];
  promptTemplate: string;
};

export const presetTemplates: PresetTemplate[] = [
  {
    id: "social-reel",
    name: "Reel para Redes Sociales",
    description: "Video vertical dinamico de 15 segundos con 3 escenas y transiciones rapidas",
    platform: "TikTok / Instagram Reels",
    width: 1080,
    height: 1920,
    fps: 30,
    durationSeconds: 15,
    tags: ["vertical", "social", "rapido"],
    promptTemplate: `Crea un video vertical (1080x1920, 30fps, 15 segundos) tipo reel para redes sociales.

Estructura de escenas:
- Escena 1 (0-5s): Hook visual impactante con texto grande animado con spring (damping: 8, efecto rebote). Fondo degradado vibrante.
- Escena 2 (5-10s): Contenido principal con 3 puntos clave que aparecen secuencialmente con fade-in. Iconos o emojis animados.
- Escena 3 (10-15s): Call-to-action con texto pulsante y flecha animada.

Transiciones: slide desde abajo entre escenas (springTiming, 15 frames).
Tipografia: Montserrat Bold para titulos, Inter para cuerpo.
Colores: [PERSONALIZAR paleta].
Usa <TransitionSeries> para las escenas y spring() para todas las animaciones.`
  },
  {
    id: "product-demo",
    name: "Demo de Producto",
    description: "Video horizontal de 30 segundos mostrando features de un producto",
    platform: "YouTube / LinkedIn",
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 30,
    tags: ["horizontal", "producto", "profesional"],
    promptTemplate: `Crea un video horizontal (1920x1080, 30fps, 30 segundos) de demo de producto.

Estructura de escenas:
- Escena 1 (0-5s): Logo del producto aparece con spring animation (damping: 200) sobre fondo limpio.
- Escena 2 (5-12s): Feature 1 - Imagen/screenshot a la izquierda, texto descriptivo a la derecha con fade-in escalonado.
- Escena 3 (12-19s): Feature 2 - Layout invertido (texto izquierda, visual derecha).
- Escena 4 (19-25s): Feature 3 - Estadisticas animadas con numeros que cuentan de 0 al valor final.
- Escena 5 (25-30s): CTA con URL, logo y tagline.

Transiciones: crossfade de 20 frames entre escenas.
Estilo: Corporativo limpio, mucho espacio en blanco.
Tipografia: Inter para todo el texto.
Colores: [PERSONALIZAR].`
  },
  {
    id: "explainer",
    name: "Video Explicativo",
    description: "Video educativo de 60 segundos con animaciones de texto y graficos",
    platform: "YouTube",
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 60,
    tags: ["horizontal", "educativo", "largo"],
    promptTemplate: `Crea un video explicativo (1920x1080, 30fps, 60 segundos).

Estructura:
- Intro (0-8s): Pregunta grande que aparece palabra por palabra (typewriter). Fondo oscuro, texto claro.
- Seccion 1 (8-22s): Explicacion del problema. Texto con highlight animado en palabras clave. Iconos simples.
- Seccion 2 (22-40s): La solucion. Lista de 4 puntos que entran con slide desde la derecha, escalonados 1.5s.
- Seccion 3 (40-52s): Datos de soporte. Grafico de barras animado con 4 barras usando spring.
- Outro (52-60s): Resumen en 1 frase + CTA.

Transiciones: wipe horizontal entre secciones.
Estilo: Educativo, claro, con iconografia lineal.
Tipografia: Poppins Bold para titulos, Inter para cuerpo.
Paleta: Azul oscuro (#1a1a2e), blanco (#ffffff), acento (#e94560).`
  },
  {
    id: "data-viz",
    name: "Visualizacion de Datos",
    description: "Video de 20 segundos con graficos animados y numeros",
    platform: "LinkedIn / Twitter",
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 20,
    tags: ["horizontal", "datos", "graficos"],
    promptTemplate: `Crea un video de visualizacion de datos (1920x1080, 30fps, 20 segundos).

Estructura:
- Titulo (0-3s): Headline con el dato principal que aparece con scale spring.
- Grafico 1 (3-10s): Grafico de barras con 5 barras que crecen secuencialmente con spring (stagger 0.3s).
- Grafico 2 (10-17s): Numero grande que cuenta de 0 a N con interpolate lineal. Subtexto explicativo.
- Cierre (17-20s): Fuente del dato + logo.

Usar SVG para los graficos. Animar todo con useCurrentFrame() e interpolate/spring.
Estilo: Dashboard moderno, fondo oscuro (#0f0f0f), datos en colores vivos.
Tipografia: Space Grotesk Bold para numeros, Inter para texto.`
  },
  {
    id: "logo-reveal",
    name: "Logo Reveal",
    description: "Animacion corta de 5 segundos revelando un logo",
    platform: "Universal",
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 5,
    tags: ["horizontal", "branding", "corto"],
    promptTemplate: `Crea una animacion de logo reveal (1920x1080, 30fps, 5 segundos).

Estructura:
- Fase 1 (0-1.5s): Particulas o formas geometricas convergen al centro con spring (damping: 15).
- Fase 2 (1.5-3s): El logo aparece con scale de 0 a 1 usando spring (damping: 12, un poco de rebote).
- Fase 3 (3-4s): Tagline aparece debajo con fade-in suave (interpolate lineal, 0.8s).
- Fase 4 (4-5s): Todo se mantiene estatico.

Fondo: Degradado radial oscuro.
Logo: Usar texto estilizado o SVG placeholder.
Efectos: Sutil resplandor (box-shadow) alrededor del logo.
Tipografia: Montserrat Bold para el logo text, Inter Light para tagline.`
  },
  {
    id: "ad-commercial",
    name: "Anuncio / Comercial",
    description: "Video publicitario de 15-30 segundos con CTA fuerte",
    platform: "YouTube Ads / Meta Ads",
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 20,
    tags: ["horizontal", "publicidad", "conversion"],
    promptTemplate: `Crea un anuncio de video (1920x1080, 30fps, 20 segundos).

Estructura:
- Hook (0-3s): Pregunta provocadora en texto grande que aparece con efecto glitch o shake. DEBE captar atencion inmediata.
- Problema (3-8s): Descripcion del pain point con iconos animados y texto con highlight.
- Solucion (8-15s): El producto/servicio como solucion. Imagen centrada con beneficios que aparecen en lista animada.
- CTA (15-20s): Boton animado (scale spring con rebote), URL, oferta especial si aplica.

Transiciones: Cortes rapidos (sin transicion suave) para mantener energia.
Estilo: Bold, contrastes fuertes, texto grande y legible.
Tipografia: Montserrat Black para headlines, Inter Semi Bold para cuerpo.
Colores: Alto contraste. [PERSONALIZAR].`
  },
  {
    id: "youtube-intro",
    name: "Intro de YouTube",
    description: "Intro animada de 5-8 segundos para canal de YouTube",
    platform: "YouTube",
    width: 1920,
    height: 1080,
    fps: 30,
    durationSeconds: 7,
    tags: ["horizontal", "branding", "corto"],
    promptTemplate: `Crea una intro animada para YouTube (1920x1080, 30fps, 7 segundos).

Estructura:
- Fase 1 (0-2s): Formas geometricas animadas (circulos, lineas) que se mueven con spring y construyen un patron.
- Fase 2 (2-4s): El nombre del canal aparece con typewriter effect, letra por letra.
- Fase 3 (4-5.5s): Subtitulo o tagline aparece con fade-in desde abajo (interpolate + Easing.out(Easing.cubic)).
- Fase 4 (5.5-7s): Todo hace un sutil scale-out a 0.95 y fade-out.

Fondo: Color solido o degradado sutil.
Anillo o borde decorativo alrededor del texto.
Tipografia: Fuente bold moderna para el canal, light para tagline.
Colores: [PERSONALIZAR con colores del canal].`
  },
  {
    id: "podcast-audiogram",
    name: "Audiograma de Podcast",
    description: "Video con visualizacion de audio y captions para clips de podcast",
    platform: "Instagram / Twitter / TikTok",
    width: 1080,
    height: 1080,
    fps: 30,
    durationSeconds: 60,
    tags: ["cuadrado", "podcast", "audio"],
    promptTemplate: `Crea un audiograma de podcast (1080x1080, 30fps, 60 segundos).

Estructura:
- Layout fijo durante todo el video:
  - Parte superior (30%): Titulo del episodio + nombre del podcast.
  - Centro (40%): Visualizacion de audio (barras de espectro animadas reactivas al audio).
  - Parte inferior (30%): Subtitulos animados sincronizados con el audio.

Especificaciones:
- Las barras de espectro deben usar useAudioData y visualizeAudio de @remotion/media.
- Los subtitulos deben usar el formato Caption con resaltado de palabra activa.
- Foto del host en circulo en la esquina superior izquierda.

Estilo: Limpio, profesional, fondo oscuro.
Tipografia: Inter para todo el texto. Bold para el titulo, regular para captions.
Colores: Fondo #111111, barras de audio #4ecdc4, texto #ffffff, acento #ff6b6b.`
  },
];
