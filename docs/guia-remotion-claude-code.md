# SuperVideos Academy: Curso Completo de Creacion de Videos con IA

> Curso completo en espanol para dominar la creacion de videos programaticos con Remotion, Claude Code, Agent Skills y el SuperConstructor Dashboard.
> Desde cero absoluto hasta produccion profesional, con ejercicios practicos y prompts listos para copiar y pegar.

---

## Estructura del Curso

### MODULO 1: Fundamentos
1. [Introduccion](#1-introduccion)
2. [Requisitos Previos](#2-requisitos-previos)
3. [Instalacion del Proyecto](#3-instalacion-del-proyecto)

### MODULO 2: Conocimiento de las Skills
4. [Catalogo Completo de las 40 Skills](#4-catalogo-completo-de-las-40-skills)

### MODULO 3: Creacion de Videos
5. [Flujo para Crear Videos desde Cero con Prompts](#5-flujo-para-crear-videos-desde-cero-con-prompts)
6. [Flujo para Editar Video Existente](#6-flujo-para-editar-video-existente)

### MODULO 4: Tecnicas Avanzadas de Prompting
7. [Mejores Practicas de Prompting para Resultados PRO](#7-mejores-practicas-de-prompting-para-resultados-pro)

### MODULO 5: Produccion y Exportacion
8. [Renderizado y Exportacion](#8-renderizado-y-exportacion)

### MODULO 6: Resolucion de Problemas
9. [Troubleshooting y Tips Avanzados](#9-troubleshooting-y-tips-avanzados)

### MODULO 7: Referencia Tecnica
10. [Referencia Rapida](#10-referencia-rapida)

### MODULO 8: SuperConstructor Dashboard
11. [El SuperConstructor: Tu Centro de Control](#11-el-superconstructor-tu-centro-de-control)
12. [Roadmap: Flujo Completo de Generacion de Video](#12-roadmap-flujo-completo-de-generacion)
13. [Guia de Cada Modulo del Dashboard](#13-guia-de-cada-modulo-del-dashboard)
14. [Ejercicios Practicos con el SuperConstructor](#14-ejercicios-practicos-con-el-superconstructor)

---

## 1. Introduccion

### Que es Remotion

Remotion es un framework de video basado en React. La idea fundamental es que los videos son funciones del tiempo: cada frame es un render de React. En lugar de usar una timeline visual como en editores tradicionales, escribes componentes React que reciben el frame actual y devuelven JSX. Esto significa que todo lo que sabes de React (componentes, props, estado, composicion) se aplica directamente a la creacion de videos.

Conceptos clave:
- **Frame como unidad de tiempo**: A 30fps, el frame 90 equivale al segundo 3. Todo se calcula a partir del frame actual.
- **interpolate()**: Funcion que mapea un rango de frames a un rango de valores (opacidad, posicion, escala, etc.).
- **spring()**: Funcion que genera animaciones con fisica realista (rebote, amortiguacion).
- **Composition**: Unidad de video registrada con resolucion, fps y duracion. Es como un "proyecto" dentro de tu proyecto.
- **Sequence**: Contenedor que posiciona elementos en el tiempo (desde que frame aparecen y cuanto duran).

### Que es Claude Code

Claude Code es un agente de IA que se ejecuta directamente en tu terminal. No es un chatbot: es un agente que puede leer tu proyecto completo, entender la estructura del codigo, generar archivos nuevos, modificar archivos existentes y ejecutar comandos de terminal. Cuando lo abres en la carpeta de un proyecto Remotion, Claude:

- Lee automaticamente todos los archivos del proyecto
- Entiende la estructura de componentes, composiciones y configuracion
- Genera codigo Remotion idiomatico y correcto
- Puede ejecutar `npm run dev` o comandos de render por ti
- Recuerda el contexto de toda la conversacion para iterar

### Que son las Agent Skills

Las Agent Skills son archivos Markdown (.md) que le dan conocimiento especifico de dominio a Claude. La skill de Remotion (`remotion-dev/skills`) contiene un archivo principal SKILL.md y 40 reglas individuales en la carpeta `rules/`. Cada regla cubre un aspecto especifico de Remotion:

- Animaciones (spring, interpolate, easing)
- Composiciones y estructura
- Transiciones entre escenas
- Audio y efectos de sonido
- Graficos y visualizacion de datos
- Subtitulos y captions
- Video 3D con Three.js
- Y muchas mas...

Cuando Claude Code detecta estas skills en tu proyecto, las lee automaticamente y aplica todo ese conocimiento al generar codigo. No necesitas explicarle como funciona Remotion: ya lo sabe.

### El Poder de la Combinacion

El flujo completo es:

1. **Describes** un video en lenguaje natural (espanol o ingles)
2. **Claude genera** codigo Remotion correcto siguiendo las 40 reglas
3. **Previsualizas** el resultado en Remotion Studio (localhost:3000)
4. **Iteras** con mas prompts ("cambia el color", "hazlo mas rapido", "anade una escena")
5. **Renderizas** el video final en MP4, GIF, ProRes o el formato que necesites

### Casos de Uso

- **Reels e historias**: Videos verticales 1080x1920 para Instagram, TikTok, YouTube Shorts
- **Anuncios**: Spots de producto con animaciones profesionales
- **Explainers**: Videos educativos con graficos animados y texto
- **Data Viz**: Infografias animadas con graficos de barras, lineas, pie charts
- **Product demos**: Showcases de producto con features animadas
- **Intros de YouTube**: Bumpers animados de 5-10 segundos
- **Audiogramas**: Visualizaciones de podcasts con espectro de audio y subtitulos
- **Presentaciones**: Slides animadas como alternativa a PowerPoint
- **Contenido en lote**: Generar variantes del mismo video (idiomas, datos, colores)

---

## 2. Requisitos Previos

### Software Necesario

| Software | Version | Instalacion | Verificar |
|---|---|---|---|
| Node.js | v20+ LTS | [nodejs.org](https://nodejs.org) | `node --version` |
| npm | v10+ (incluido con Node) | Viene con Node.js | `npm --version` |
| Claude Code | Ultima version | `npm install -g @anthropic-ai/claude-code` | `claude --version` |
| Editor de codigo | Cualquiera | VS Code, Cursor, Windsurf, etc. | - |
| Git | Recomendado | [git-scm.com](https://git-scm.com) | `git --version` |

### Cuenta de Anthropic

Claude Code requiere una suscripcion activa a Anthropic. Asegurate de tener tu API key configurada o tu suscripcion a Claude Pro/Team activa antes de comenzar.

### Requisitos del Sistema

- **RAM**: Minimo 8GB, recomendado 16GB (el renderizado consume memoria)
- **Espacio en disco**: Al menos 2GB libres para node_modules y archivos de salida
- **CPU**: Multi-core recomendado para renderizado paralelo
- **GPU**: No requerida (Remotion renderiza por CPU), pero ayuda para previews 3D

### Verificacion Rapida

Abre tu terminal y ejecuta estos comandos para verificar que todo esta listo:

```bash
node --version    # Debe mostrar v20.x.x o superior
npm --version     # Debe mostrar v10.x.x o superior
claude --version  # Debe mostrar la version instalada
git --version     # Opcional pero recomendado
```

Si algun comando falla, instala el software correspondiente antes de continuar.

---

## 3. Instalacion del Proyecto

### Chuleta Rapida (4 pasos)

Para los impacientes, aqui van los 4 comandos que necesitas:

```bash
# 1. Crear proyecto
npx create-video@latest mi-proyecto

# 2. Instalar y arrancar
cd mi-proyecto && npm install && npm run dev

# 3. Instalar Agent Skills (en otra terminal)
npx skills add remotion-dev/skills

# 4. Abrir Claude Code (en otra terminal)
claude
```

A continuacion el detalle paso a paso.

---

### PASO 1: Crear el Proyecto con npx create-video@latest

Abre tu terminal y ejecuta:

```bash
npx create-video@latest mi-proyecto
```

Esto lanza un asistente interactivo que te pregunta:

1. **Nombre del proyecto**: Escribe el nombre de tu carpeta (ej: `mi-proyecto`, `supervideos`, `reels-ia`)
2. **Template**: Selecciona **Blank** para empezar desde cero. Los otros templates traen codigo de ejemplo que puede confundir.
3. **Package manager**: Selecciona **npm** (es el mas comun y compatible)

#### Alternativa sin asistente

Si quieres saltarte las preguntas interactivas:

```bash
npx create-video@latest mi-proyecto --blank
```

Esto crea el proyecto directamente con el template en blanco.

#### Estructura del proyecto creado

Despues de ejecutar el comando, tendras esta estructura:

```
mi-proyecto/
  src/
    Root.tsx              # Registro de composiciones
    MyComp/
      Main.tsx            # Componente principal del video
  public/                 # Assets estaticos (imagenes, videos, audio)
  package.json            # Dependencias y scripts
  remotion.config.ts      # Configuracion de Remotion
  tsconfig.json           # Configuracion de TypeScript
```

#### Error tipico: package.json no encontrado

Si al ejecutar `npx create-video@latest` ves un error sobre `package.json` no encontrado, es porque estas intentando crear el proyecto dentro de una carpeta que ya tiene un proyecto Node. Soluciones:

- Navega a una carpeta limpia: `cd ~/Documentos` y ejecuta alli
- Especifica un nombre de carpeta nuevo que no exista

---

### PASO 2: Instalar Dependencias y Arrancar

Entra a la carpeta del proyecto e instala las dependencias:

```bash
cd mi-proyecto
npm install
```

Esto puede tardar 1-3 minutos dependiendo de tu conexion. Se instalan todas las dependencias de Remotion.

Luego arranca Remotion Studio:

```bash
npm run dev
```

Abre tu navegador en **http://localhost:3000**. Deberias ver Remotion Studio con tu composicion en blanco lista para previsualizar.

#### Problema: Puerto 3000 ocupado

Si el puerto 3000 esta ocupado (por ejemplo, por otro proyecto Next.js o React), Remotion te avisara. Soluciones:

```bash
# Opcion 1: Usar otro puerto
npx remotion studio --port 3001

# Opcion 2: Matar el proceso que usa el puerto 3000
# En Windows:
netstat -ano | findstr :3000
taskkill /PID <numero_pid> /F

# En Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

---

### PASO 3: Instalar Agent Skills de Remotion

En una **nueva terminal** (deja Remotion Studio corriendo en la otra), navega a tu proyecto y ejecuta:

```bash
cd mi-proyecto
npx skills add remotion-dev/skills
```

Este comando descarga e instala las Agent Skills de Remotion en tu proyecto. Se crea la siguiente estructura:

```
mi-proyecto/
  .agents/
    skills/
      remotion-best-practices/
        SKILL.md              # Archivo principal de la skill
        rules/
          animations.md       # Regla de animaciones
          compositions.md     # Regla de composiciones
          transitions.md      # Regla de transiciones
          ... (40 archivos .md en total)
```

Cada archivo en `rules/` contiene instrucciones detalladas que Claude Code leera automaticamente.

#### Problema en Windows: PowerShell bloquea scripts

Si usas PowerShell y ves un error como "la ejecucion de scripts esta deshabilitada en este sistema", tienes dos opciones:

**Opcion 1: Usar CMD en lugar de PowerShell**
Abre el Command Prompt (CMD) clasico y ejecuta el comando alli.

**Opcion 2: Cambiar la politica de ejecucion**
Abre PowerShell como administrador y ejecuta:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Luego intenta de nuevo el comando `npx skills add remotion-dev/skills`.

**Opcion 3: Usar Git Bash**
Si tienes Git instalado, Git Bash funciona sin restricciones de politica de ejecucion.

---

### PASO 4: Abrir Claude Code

En una **nueva terminal** (ya tienes Remotion Studio en una, las skills instaladas), navega a tu proyecto y abre Claude:

```bash
cd mi-proyecto
claude
```

Claude Code se abre en modo interactivo. Automaticamente:

1. Detecta que es un proyecto Remotion (por el `package.json` y `remotion.config.ts`)
2. Lee las Agent Skills de `.agents/skills/remotion-best-practices/`
3. Carga las 40 reglas en su contexto
4. Esta listo para recibir tus instrucciones

#### Verificar que las Skills estan cargadas

Escribe este prompt de prueba:

```
Que skills de Remotion tienes cargadas? Lista las reglas disponibles.
```

Claude deberia responder con una lista de las 40 reglas que tiene disponibles. Si no las lista, verifica que la carpeta `.agents/skills/` existe y tiene contenido.

#### Prompt de prueba rapida

Para verificar que todo funciona end-to-end:

```
Crea un componente simple que muestre "Hola Remotion" con un fade-in de 1 segundo.
Registralo como composicion en Root.tsx con 150 frames a 30fps en 1280x720.
```

Si Claude genera el codigo y lo ves en Remotion Studio, tu setup esta completo.

---

## 4. Catalogo Completo de las 40 Skills

Las Agent Skills de Remotion cubren todos los aspectos de la creacion de videos. Aqui esta el catalogo completo:

| # | Skill | Archivo | Descripcion | Tags |
|---|---|---|---|---|
| 1 | Animations | `animations.md` | Uso de interpolate(), spring(), Easing. Reglas para animar opacidad, posicion, escala, rotacion. Nunca usar CSS transitions. | animacion, interpolate, spring, easing |
| 2 | Compositions | `compositions.md` | Registro de composiciones en Root.tsx con Composition, Still. Definir id, width, height, fps, durationInFrames. | composicion, registro, root |
| 3 | Transitions | `transitions.md` | TransitionSeries para transiciones entre escenas. Tipos: slide, fade, wipe, flip, clockWipe. Uso de springTiming y linearTiming. | transicion, slide, fade, wipe |
| 4 | Timing | `timing.md` | Calculo de frames a partir de segundos. Uso de useCurrentFrame() y useVideoConfig(). Formulas de conversion fps*segundos. | timing, frames, fps, duracion |
| 5 | Sequencing | `sequencing.md` | Uso de Sequence para posicionar elementos en el tiempo. Series y Series.Sequence para secuencias lineales. | secuencia, sequence, series |
| 6 | Text Animations | `text-animations.md` | Animaciones de texto: typewriter, fade por palabra, slide por letra, scale-in. Tecnicas con split y map. | texto, typewriter, fade |
| 7 | Videos | `videos.md` | Uso de OffthreadVideo y Video para incluir video. Propiedades src, startFrom, endAt. Nunca usar HTML video directo. | video, offthread, clip |
| 8 | Audio | `audio.md` | Componente Audio de Remotion. Propiedades src, volume, startFrom, endAt. Audio dinamico con funciones de volumen. | audio, sonido, musica |
| 9 | Subtitles | `subtitles.md` | Generacion y visualizacion de subtitulos sincronizados. Formato Caption. Estilos de subtitulos animados. | subtitulos, captions, srt |
| 10 | Voiceover | `voiceover.md` | Integracion de voiceover con TTS (ElevenLabs, etc.). Sincronizacion de audio con calculateMetadata. | voiceover, tts, narracion |
| 11 | Charts | `charts.md` | Graficos animados con SVG. Barras, lineas, pie charts. Animar con useCurrentFrame + interpolate. Nunca librerias externas de graficos con animacion propia. | graficos, charts, svg, datos |
| 12 | Fonts | `fonts.md` | Carga de fuentes con @remotion/google-fonts y @remotion/fonts. loadFont() y getFontFamily(). Nunca @import CSS. | fuentes, tipografia, google-fonts |
| 13 | Tailwind | `tailwind.md` | Uso seguro de Tailwind CSS en Remotion. Solo clases estaticas de estilo. Nunca animate-* ni transition-*. | tailwind, css, estilos |
| 14 | Parameters | `parameters.md` | Input props con schema Zod. defaultProps. Parametrizacion de videos para generar variantes. | parametros, props, zod, input |
| 15 | 3D | `3d.md` | Uso de @remotion/three con ThreeCanvas. Escenas 3D dentro de Remotion. Usar useCurrentFrame() NUNCA useFrame() de R3F. | 3d, three, threejs, webgl |
| 16 | Images | `images.md` | Componente Img de Remotion para imagenes. staticFile() para assets locales. Nunca HTML img ni Next Image. | imagenes, img, fotos |
| 17 | Assets | `assets.md` | Gestion de assets estaticos en public/. Uso de staticFile(). Formatos soportados para video, audio e imagen. | assets, archivos, public |
| 18 | Trimming | `trimming.md` | Recorte de video y audio. startFrom, endAt para clips. Calcular durationInFrames correcto tras recorte. | recorte, trim, clip |
| 19 | Light Leaks | `light-leaks.md` | Efectos de light leak con @remotion/light-leaks. Transiciones cinematicas con destellos de luz. | light-leak, efecto, cine |
| 20 | Lottie | `lottie.md` | Integracion de animaciones Lottie en Remotion con @remotion/lottie. Componente Lottie con animationData. | lottie, json, animacion |
| 21 | GIFs | `gifs.md` | Componente Gif de @remotion/gif para mostrar GIFs animados sincronizados con el timeline de Remotion. | gif, animacion |
| 22 | Maps | `maps.md` | Mapas animados en Remotion. Integracion con librerias de mapas, renderizado SVG de mapas. | mapas, geografia, svg |
| 23 | Calculate Metadata | `calculate-metadata.md` | calculateMetadata para resolver datos async antes del render. Fetch de APIs, calculo de duracion dinamica. | metadata, async, fetch |
| 24 | Can Decode | `can-decode.md` | canDecodeVideo y canDecodeAudio para verificar compatibilidad de codecs antes de usar un archivo. | codec, compatibilidad, decode |
| 25 | Extract Frames | `extract-frames.md` | Extraer frames individuales de un video como imagenes. Util para thumbnails y previews. | frames, extraccion, thumbnail |
| 26 | Get Audio Duration | `get-audio-duration.md` | getAudioDurationInSeconds() para obtener la duracion de un archivo de audio. Util para calculateMetadata. | audio, duracion, metadata |
| 27 | Get Video Dimensions | `get-video-dimensions.md` | getVideoMetadata() para obtener las dimensiones (width, height) de un archivo de video. | video, dimensiones, metadata |
| 28 | Get Video Duration | `get-video-duration.md` | getVideoDurationInSeconds() para obtener la duracion de un archivo de video. Sincronizar duracion de composicion con video. | video, duracion, metadata |
| 29 | Audio Visualization | `audio-visualization.md` | visualizeAudio() para obtener datos de frecuencia del audio. Crear espectros, barras, waveforms sincronizadas. | audio, visualizacion, espectro |
| 30 | SFX | `sfx.md` | Efectos de sonido. Uso del componente Audio para SFX puntuales. Timing de efectos con Sequence. | sfx, efectos, sonido |
| 31 | Measuring DOM Nodes | `measuring-dom-nodes.md` | Medir dimensiones de elementos DOM para layouts dinamicos. Uso de refs y useCallback para obtener tamanios. | dom, medidas, layout |
| 32 | Measuring Text | `measuring-text.md` | Medir el ancho y alto de texto renderizado para posicionamiento preciso. measureText() de Remotion. | texto, medidas, fuente |
| 33 | Display Captions | `display-captions.md` | Mostrar captions/subtitulos con estilos avanzados. Highlighting de palabra activa, estilos karaoke. | captions, display, karaoke |
| 34 | Import SRT Captions | `import-srt-captions.md` | Importar archivos .srt para generar subtitulos sincronizados. Parsear formato SRT a estructura Caption. | srt, importar, subtitulos |
| 35 | Transcribe Captions | `transcribe-captions.md` | Transcribir audio a captions usando servicios de IA. Generar subtitulos automaticos sincronizados. | transcripcion, ia, whisper |
| 36 | Transparent Videos | `transparent-videos.md` | Videos con fondo transparente usando codec VP9/WebM. Overlays de video sin fondo. | transparencia, alpha, webm |
| 37 | Stagger | `stagger.md` | Efecto stagger para animar elementos secuencialmente con delay entre cada uno. Listas, cards, items. | stagger, delay, secuencial |
| 38 | Easing Functions | `easing-functions.md` | Funciones de easing: Easing.in, Easing.out, Easing.inOut. Bezier curves. Easing.bounce, Easing.elastic. | easing, curvas, bezier |
| 39 | Loop | `loop.md` | Componente Loop para repetir animaciones. durationInFrames del loop, cantidad de repeticiones. | loop, repetir, ciclo |
| 40 | Freeze | `freeze.md` | Componente Freeze para pausar una animacion en un frame especifico. Mantener un estado visual fijo. | freeze, pausa, estatico |

### Como Claude Usa las Skills

Cuando le pides a Claude que cree un video, automaticamente:

1. Identifica que skills son relevantes para tu request
2. Aplica las reglas de esas skills al generar codigo
3. Evita los anti-patrones documentados (CSS transitions, useFrame de R3F, etc.)
4. Usa las APIs correctas de Remotion segun cada skill

No necesitas referenciar skills especificas en tus prompts. Claude las aplica automaticamente.

---

## 5. Flujo para Crear Videos desde Cero con Prompts

### 5.1 El Workflow

El flujo completo para crear un video desde cero es:

**Paso 1: Abre Claude Code en la carpeta del proyecto**
```bash
cd mi-proyecto
claude
```

**Paso 2: Describe el video que quieres**
Escribe un prompt detallado describiendo el video (ver ejemplos abajo). Cuanto mas especifico seas, mejor sera el resultado.

**Paso 3: Claude genera los componentes**
Claude crea los archivos de componentes React y los registra como composiciones en `Root.tsx`. Normalmente crea:
- Un componente principal (ej: `src/MyVideo/Main.tsx`)
- Subcomponentes para cada escena si son complejas
- El registro en `Root.tsx` con id, width, height, fps y durationInFrames

**Paso 4: Previsualiza en Remotion Studio**
Si Remotion Studio esta corriendo (`npm run dev`), recarga el navegador. Tu nueva composicion aparecera en el panel izquierdo. Seleccionala y reproduce.

Si no esta corriendo:
```bash
npm run dev
# o
npx remotion studio
```

**Paso 5: Itera con mas prompts**
Mira el preview y pide cambios:
- "Haz la transicion mas lenta"
- "Cambia el color de fondo a azul oscuro"
- "Anade un efecto de rebote al texto"
- "La escena 2 necesita mas tiempo, dale 7 segundos en vez de 5"

**Paso 6: Renderiza el video final**
Cuando estes satisfecho:
```bash
npx remotion render <CompositionId> out/video.mp4
```

### 5.2 Estructura de un Prompt Efectivo

Un buen prompt para Remotion tiene 4 componentes:

#### 1. Especificaciones Tecnicas
Siempre empieza con los datos duros:
- **Resolucion**: 1920x1080 (horizontal), 1080x1920 (vertical), 1080x1080 (cuadrado)
- **FPS**: 30 (estandar), 60 (smooth)
- **Duracion**: En segundos exactos

Ejemplo: "Crea una composicion de 15 segundos, 1080x1920, 30fps"

#### 2. Estructura de Escenas
Define cada escena con su timing exacto:
- Que se muestra en cada periodo de tiempo
- Cuando empieza y termina cada elemento
- Transiciones entre escenas

Ejemplo: "Escena 1 (0-5s): titulo. Escena 2 (5-10s): contenido. Escena 3 (10-15s): CTA."

#### 3. Estilo Visual
Se especifico con valores exactos:
- Colores en hexadecimal: `#ff6b6b` no "rojo"
- Fuentes con nombre y peso: `Inter Bold 48px` no "texto grande"
- Espaciado en pixeles: `padding: 40px` no "con margen"

Ejemplo: "Fondo #0f0f0f, texto #ffffff en Montserrat Bold 64px"

#### 4. Detalles de Animacion
Especifica el tipo de animacion y sus parametros:
- Tipo: spring, interpolate lineal, easing
- Duracion: en segundos o frames
- Parametros: damping, stiffness, mass para spring

Ejemplo: "El titulo aparece con spring (damping: 12, stiffness: 100) durante 1.5 segundos"

### 5.3 Ejemplos de Prompts (Listos para Copiar y Pegar)

#### Ejemplo 1: Hola Mundo Animado

```
Crea una composicion Remotion de 10 segundos (1280x720, 30fps).
Fondo: degradado radial de #1a1a2e a #16213e.
Texto "Hola Mundo" centrado en Montserrat Bold 72px blanco.
Animacion: el texto aparece con spring (damping: 12) escalando de 0 a 1 en los primeros 2 segundos.
A los 7 segundos, fade-out con interpolate lineal durante 2 segundos.
Registra la composicion en Root.tsx como "HolaMundo".
```

Este es el "Hello World" de Remotion. Cubre los fundamentos:
- Registro de composicion
- Fondo con degradado CSS
- Texto centrado con AbsoluteFill y flexbox
- Animacion de entrada con spring()
- Animacion de salida con interpolate()

#### Ejemplo 2: Reel de 3 Escenas

```
Crea un video vertical (1080x1920, 30fps, 15 segundos) para Instagram Reels.

Escena 1 (0-5s): Fondo amarillo (#ffd700). Texto "3 Tips de Productividad" en negro,
Poppins Bold 64px, que aparece con typewriter effect.

Escena 2 (5-10s): Fondo azul oscuro (#1a1a2e). Lista de 3 tips que aparecen
secuencialmente con slide desde la derecha (0.5s de delay entre cada uno):
- "1. Planifica la noche anterior"
- "2. Usa bloques de 90 minutos"
- "3. Elimina distracciones"

Escena 3 (10-15s): Fondo rojo (#e94560). CTA "Sigueme para mas!" con escala
pulsante (spring, damping: 8).

Transiciones: slide desde abajo, 15 frames, springTiming.
Usa <TransitionSeries> para organizar las escenas.
```

Este ejemplo cubre:
- Formato vertical para redes sociales
- TransitionSeries con springTiming
- Efecto typewriter en texto
- Stagger animation para listas
- Animacion pulsante con spring de bajo damping
- Multiples escenas con fondos distintos

#### Ejemplo 3: Demo de Producto con Datos

```
Crea un video horizontal (1920x1080, 30fps, 30 segundos) de demo de producto.

Usa Inter como fuente principal y Space Grotesk Bold para numeros.
Paleta: fondo #0f0f0f, texto #ffffff, acento #00d4aa.

Escena 1 (0-5s): Logo centrado (texto "MiApp" en Space Grotesk Bold 80px color
#00d4aa) con spring scale-in (damping: 200, suave, sin rebote).

Escena 2 (5-15s): 3 features en cards que entran con stagger de 1.5s cada una.
Cada card tiene:
- Icono (emoji): velocimetro, escudo, grafico
- Titulo en Inter Bold 28px blanco
- Descripcion en Inter Regular 18px gris (#999999)
Las cards tienen fondo #1a1a1a, border-radius 12px, padding 24px.

Escena 3 (15-25s): Grafico de barras SVG con 4 barras que crecen con spring.
Labels: "Q1", "Q2", "Q3", "Q4".
Valores: 85%, 92%, 78%, 95%.
Barras con degradado vertical de #00d4aa a #00a88a.
Cada barra crece secuencialmente con stagger de 0.5s.
Mostrar el porcentaje encima de cada barra con animacion de conteo.

Escena 4 (25-30s): CTA con "Pruebalo gratis en miapp.com" en Inter Bold 36px.
Debajo un boton simulado con fondo #00d4aa, texto negro "Empezar",
border-radius 8px, con scale pulsante sutil.

Transiciones: crossfade de 20 frames.
```

Este ejemplo cubre:
- Tipografia multi-fuente
- Cards con layout flexbox
- Graficos de barras SVG animados con spring
- Animacion de conteo de numeros
- Stagger en multiples elementos
- Palette de colores consistente

#### Ejemplo 4: Intro de YouTube

```
Crea una intro de YouTube de 7 segundos (1920x1080, 30fps).
Nombre del canal: "TechPulse". Tagline: "Tecnologia sin filtros".

0-2s: 5 circulos concentricos que escalan desde 0 con spring
(stagger 0.2s entre cada circulo, damping: 15).
Circulos: stroke-only, colores degradados de #4ecdc4 a #ff6b6b,
stroke-width 2px, sin fill.

2-4s: "TechPulse" aparece con efecto typewriter, Montserrat Black 80px, blanco.
Cursor parpadeante al final del texto.

4-5.5s: Tagline "Tecnologia sin filtros" fade-in desde abajo con
Easing.out(Easing.cubic), Inter Light 28px, color #999999.
Desplazamiento vertical de 20px a 0.

5.5-7s: Todo se mantiene estatico. Sin animaciones nuevas.

Fondo: degradado lineal de #0a0a0a a #1a1a2e (de arriba a abajo).
Todos los elementos centrados horizontal y verticalmente.
Un circulo decorativo grande (radio 200px, stroke #4ecdc4, opacity 10%)
detras del texto con stroke animado usando evolvePath (de 0 a 1 en 3 segundos).

Registra como "IntroYouTube" en Root.tsx.
```

Este ejemplo cubre:
- Animaciones concentricas con stagger
- Efecto typewriter con cursor parpadeante
- Combinacion de spring y easing
- evolvePath para animar trazados SVG
- Layout centrado con multiples capas

#### Ejemplo 5: Video de Datos Animados (Infografia)

```
Crea un video de infografia animada (1920x1080, 30fps, 20 segundos).

0-3s: Titular "El 73% de las empresas ya usan IA" aparece con scale spring
(damping: 200). Montserrat Bold 48px, blanco, centrado.

3-10s: Grafico de barras horizontal con 5 barras:
- Ventas: 73% (color #4ecdc4)
- Marketing: 68% (color #45b7aa)
- Soporte: 61% (color #3ca190)
- RRHH: 45% (color #338b76)
- Legal: 32% (color #2a755c)
Labels a la izquierda en Inter Regular 20px blanco.
Porcentaje al final de cada barra en Space Grotesk Bold 20px.
Las barras crecen secuencialmente con spring (stagger 0.4s entre cada una).
Fondo de cada barra: #1a1a1a con border-radius 4px.

10-17s: El numero "73%" en grande (Space Grotesk Bold 200px, color #4ecdc4)
cuenta de 0 a 73 con interpolate lineal. Centrado en pantalla.
Debajo: "de las empresas encuestadas" en Inter Regular 24px, #999999.

17-20s: Fuente del estudio: "Fuente: Estudio McKinsey 2025" en Inter Regular
16px, #666666, esquina inferior derecha.
Logo/texto "MiMarca" en esquina inferior izquierda, Inter Bold 16px, #4ecdc4.
Ambos aparecen con fade-in de 1 segundo.

Fondo general: #0a0a0a.
Registra como "InfografiaIA" en Root.tsx.
```

Este ejemplo cubre:
- Graficos de barras horizontales con SVG
- Animacion de conteo de numeros (de 0 a N)
- Stagger con delays especificos
- Multiples fuentes tipograficas
- Layout con elementos en esquinas
- Palette de colores con variaciones de un mismo tono

#### Ejemplo 6: Audiograma de Podcast

```
Crea un audiograma cuadrado (1080x1080, 30fps, 60 segundos).

Layout fijo (no cambia durante el video):
- Top 25%: Titulo "Episodio 42: El Futuro del Trabajo" en Inter Bold 36px
  blanco, centrado. Debajo: "Podcast Innovacion" en Inter Regular 20px,
  color #999999.
- Centro 50%: Barras de espectro de audio (12 barras verticales).
  Distribuidas horizontalmente con gap de 8px.
  Colores en degradado de izquierda a derecha: de #4ecdc4 a #ff6b6b.
  Altura de cada barra controlada por visualizeAudio(),
  rango de 20px a 200px.
  Border-radius 4px en la parte superior.
- Bottom 25%: Area de subtitulos. Texto en Inter Regular 24px blanco.
  La palabra activa se muestra en bold y color #4ecdc4.
  Maximo 2 lineas visibles.

Elementos decorativos:
- Foto del host: circulo de 80x80px en esquina superior izquierda (usa un
  placeholder de color solido #333 si no hay imagen).
- Marca de agua "Podcast Innovacion" en esquina inferior derecha,
  Inter Regular 14px, opacidad 30%, color blanco.
- Linea separadora horizontal de 1px #333 entre la zona del espectro y
  los subtitulos.

Fondo: #111111.
El audio se carga desde staticFile("podcast-ep42.mp3").
Los subtitulos se cargan desde staticFile("subtitulos.srt").

Registra como "AudiogramaPodcast" en Root.tsx.
```

Este ejemplo cubre:
- Formato cuadrado para redes sociales
- visualizeAudio() para espectro en tiempo real
- Subtitulos sincronizados con highlight de palabra activa
- Layout complejo con zonas fijas
- Elementos decorativos con baja opacidad
- Carga de assets externos (audio y SRT)

#### Ejemplo 7: Countdown / Cuenta Regresiva

```
Crea un video de cuenta regresiva (1080x1920, 30fps, 10 segundos) vertical.

Cada segundo muestra un numero del 10 al 1:
- Numero en Space Grotesk Bold 300px, blanco, centrado.
- Cada numero aparece con spring scale (damping: 10, rebote notable).
- Al salir, el numero se desvanece con opacidad 1 a 0 en 5 frames.

Fondo: cambia de color con cada numero:
10: #e74c3c, 9: #e67e22, 8: #f39c12, 7: #27ae60, 6: #2ecc71,
5: #1abc9c, 4: #3498db, 3: #2980b9, 2: #9b59b6, 1: #8e44ad

Circulo de progreso SVG alrededor del numero:
- Radio 200px, stroke-width 6px, color blanco, opacidad 50%.
- Se completa gradualmente (strokeDashoffset animado) a lo largo de los 10s.

Al final (ultimo medio segundo): pantalla blanca con flash y texto "GO!"
en negro, Montserrat Black 120px, con scale spring agresivo (damping: 5).

Registra como "Countdown" en Root.tsx.
```

#### Ejemplo 8: Presentacion de Slides

```
Crea una presentacion animada de 4 slides (1920x1080, 30fps, 40 segundos).

Slide 1 (0-10s) - Portada:
- Fondo degradado de #667eea a #764ba2.
- Titulo "El Estado del Desarrollo Web en 2025" en Montserrat Bold 56px blanco.
- Subtitulo "Un analisis de las tendencias actuales" en Inter Regular 24px,
  blanco opacidad 80%.
- Ambos aparecen con fade-in desde abajo, stagger 0.5s.

Slide 2 (10-20s) - Datos:
- Fondo #0f0f0f.
- Titulo "Frameworks mas usados" en Inter Bold 36px blanco, arriba.
- 4 barras horizontales con labels y porcentajes:
  React: 68%, Next.js: 45%, Vue: 32%, Svelte: 18%.
- Barras crecen con spring stagger.

Slide 3 (20-30s) - Quote:
- Fondo #1a1a2e.
- Comillas decorativas grandes (serif, 200px, opacidad 20%).
- Texto de cita en Inter Italic 32px blanco centrado.
- Autor debajo en Inter Regular 20px #4ecdc4.

Slide 4 (30-40s) - Cierre:
- Fondo degradado de #667eea a #764ba2 (como slide 1).
- "Gracias" en Montserrat Bold 72px blanco con spring.
- Links de redes sociales en fila, Inter Regular 20px.
- Fade-out general en ultimos 2 segundos.

Transiciones entre slides: wipe horizontal, 20 frames, springTiming.
Registra como "Presentacion" en Root.tsx.
```

---

## 6. Flujo para Editar Video Existente

### 6.1 Modificar Composiciones Existentes

Cuando ya tienes una composicion creada y quieres hacer cambios, simplemente describe las modificaciones a Claude. Claude leera el archivo actual y aplicara los cambios.

**Cambiar colores y tipografia:**
```
En la composicion HolaMundo, haz estos cambios:
- Cambia el fondo del degradado radial a: de #2d1b69 a #11001c
- Cambia la fuente a Poppins Bold 80px
- Cambia el color del texto a #4ecdc4
```

**Cambiar timing:**
```
En la composicion ProductDemo, ajusta el timing:
- Escena 1: de 5s a 3s (mas rapida)
- Escena 2: de 10s a 12s (necesita mas tiempo)
- Escena 3: mantener en 10s
- Escena 4: de 5s a 3s
Ajusta las transiciones proporcionalmente.
```

**Cambiar animaciones:**
```
En la composicion IntroYouTube:
- Cambia el spring del titulo de damping:12 a damping:200 (mas suave, sin rebote)
- Haz que los circulos aparezcan con fade-in en vez de scale
- Anade un leve efecto de rotacion (5 grados) al tagline cuando aparece
```

### 6.2 Anadir Escenas

Para anadir escenas a un video existente:

```
En la composicion ProductDemo, anade una nueva escena entre la escena 2
(features) y la escena 3 (grafico):

Nueva escena (debe durar 8 segundos):
- Titulo "Lo que dicen nuestros usuarios" en Inter Bold 32px blanco.
- 3 testimonios que aparecen secuencialmente (stagger 2s):
  - "Increible herramienta" - Maria G. (4.9 estrellas)
  - "Me ahorra 3 horas al dia" - Carlos R. (5.0 estrellas)
  - "No puedo vivir sin ella" - Ana P. (4.8 estrellas)
- Cada testimonio en una card con fondo #1a1a1a, border-radius 8px.
- Las estrellas son emojis amarillos.

Ajusta la duracion total de la composicion y los timings de las escenas
que vienen despues.
```

### 6.3 Patrones de Edicion Comunes

#### Subtitulos Animados

```
Anade subtitulos animados al video "PodcastClip".
Usa el formato Caption de Remotion.
Los subtitulos deben:
- Aparecer en la parte inferior (bottom 15%)
- Fuente Inter Bold 28px blanca con sombra negra
- La palabra activa se resalta en #4ecdc4
- Maximo 10 palabras visibles a la vez
- Background semi-transparente negro (opacidad 60%) detras del texto
```

#### Overlays de Texto (Lower Third)

```
Anade un lower third a la composicion "Entrevista":
- Aparece a los 2 segundos con slide desde la izquierda (spring, damping: 200)
- Barra de color #4ecdc4 de 4px de ancho a la izquierda
- Nombre: "Juan Garcia" en Inter Bold 24px blanco
- Cargo: "CEO & Fundador" en Inter Regular 18px #999999
- Fondo: #000000 opacidad 80%, padding 16px 24px, border-radius 8px (solo esquinas derechas)
- Desaparece a los 7 segundos con slide hacia la izquierda
- Posicion: esquina inferior izquierda con margen de 40px
```

#### Cambiar Ritmo y Velocidad

```
En la composicion "Reel3Tips":
- Reduce TODAS las transiciones de 30 frames a 12 frames (mas snapy)
- Haz que las animaciones de entrada de texto sean un 50% mas rapidas
- Anade un efecto de "flash" blanco (opacity 0 a 0.3 a 0 en 5 frames)
  en cada transicion
- Cambia springTiming a linearTiming en las transiciones
```

#### Insertar B-roll (Video de Fondo)

```
En la escena 2 de "ProductDemo":
- Anade un video de fondo usando <OffthreadVideo>
  con src={staticFile("broll-oficina.mp4")}
- Recorta el video: startFrom={5 * 30} (empieza en segundo 5 del video original)
- Aplica un overlay oscuro semi-transparente (div negro opacidad 60%)
  encima del video y debajo del texto
- El video debe llenar toda la escena (objectFit: "cover")
```

### 6.4 Ejemplos de Prompts de Edicion Compuestos

#### Edicion Multiple en una Composicion

```
En la composicion "ProductDemo", haz los siguientes cambios:

1. Cambia la transicion de crossfade a slide desde la izquierda, 15 frames,
   springTiming

2. Anade un lower third en la escena 2 con el texto "Juan Garcia - CEO"
   que aparezca con fade-in a los 2s y desaparezca a los 5s.
   Fuente Inter Bold 20px blanca. Fondo negro 70%.

3. Reduce la duracion total de 30s a 25s:
   - Escena 1: 4s (antes 5s)
   - Escena 2: 8s (antes 10s)
   - Escena 3: 8s (antes 10s)
   - Escena 4: 5s (igual)

4. Anade un efecto light-leak dorado en la transicion entre escena 1 y 2
   usando @remotion/light-leaks

5. Anade un sonido "whoosh" (staticFile("whoosh.mp3")) en cada transicion
```

#### Refactoring de Estilo

```
Refactoriza la composicion "Presentacion" para usar mi nueva paleta de colores:

Antes:
- Primario: #667eea
- Fondo: #0f0f0f

Despues:
- Primario: #4ecdc4
- Secundario: #ff6b6b
- Fondo: #0a0a0a
- Superficie: #141414
- Texto principal: #ffffff
- Texto secundario: #a0a0a0

Aplica estos cambios a TODAS las escenas. Los degradados deben ir de
#4ecdc4 a #ff6b6b. Los fondos de cards/barras deben ser #141414.
```

---

## 7. Mejores Practicas de Prompting para Resultados PRO

### 7.1 La Regla de Oro

**Se especifico con numeros.** La diferencia entre un resultado amateur y uno profesional esta en la precision:

| Malo (vago) | Bueno (especifico) |
|---|---|
| "texto grande" | "Montserrat Bold 64px" |
| "fade lento" | "fade-in de 1.5 segundos con Easing.out(Easing.cubic)" |
| "color rojo" | "#e94560" |
| "aparece con rebote" | "spring({ damping: 8, stiffness: 100, mass: 0.5 })" |
| "un poco de margen" | "padding: 40px" |
| "animacion suave" | "spring({ damping: 200 }) - alto damping = sin rebote" |
| "que dure un rato" | "durationInFrames: 450 (15 segundos a 30fps)" |

### 7.2 Estructura Optima de Prompt

Sigue este orden para obtener los mejores resultados:

**1. Especificaciones tecnicas primero**
```
Crea una composicion de 20 segundos, 1920x1080, 30fps.
```

**2. Estructura de escenas con timing exacto**
```
Escena 1 (0-5s): ...
Escena 2 (5-12s): ...
Escena 3 (12-20s): ...
```

**3. Estilo visual con valores concretos**
```
Paleta: fondo #0f0f0f, texto #ffffff, acento #4ecdc4.
Fuentes: Montserrat Bold para titulos, Inter Regular para cuerpo.
```

**4. Detalles de animacion con parametros**
```
Entradas con spring (damping: 200, sin rebote).
Transiciones slide de 20 frames con springTiming.
Stagger de 0.5s entre elementos de lista.
```

**5. Audio si aplica**
```
Musica de fondo: staticFile("bg-music.mp3") a volume 0.3.
SFX "pop" en cada aparicion de card.
```

### 7.3 Pedir Arquitectura Antes de Codigo

Para videos complejos, pidele a Claude que planifique antes de codificar:

```
Antes de escribir codigo, dame un storyboard textual del video con:
- Numero de escenas y nombre de cada una
- Timing exacto de cada escena (inicio-fin en segundos)
- Descripcion visual de lo que se ve en cada escena
- Tipo de transicion entre cada par de escenas
- Lista de componentes React que necesitaras crear
- Fuentes que necesitaras cargar
- Assets externos necesarios (audio, imagenes, videos)
- Estructura de archivos propuesta

Cuando yo apruebe el storyboard, entonces genera el codigo.
```

Esto te permite:
- Revisar la estructura antes de generar codigo
- Hacer cambios de alto nivel sin reescribir todo
- Asegurarte de que Claude entendio tu vision
- Identificar assets que necesitas preparar

### 7.4 Anti-patrones (Que NUNCA Pedir)

Estas son cosas que **nunca debes pedir** porque rompen Remotion o producen resultados incorrectos:

#### Nunca CSS Transitions
```
# MAL - Remotion no ejecuta CSS transitions
"Usa transition: opacity 0.3s ease"
"Anade transition-duration: 500ms"

# BIEN - Usa interpolate de Remotion
"Anima la opacidad con interpolate(frame, [0, 30], [0, 1])"
```

#### Nunca Clases animate-* de Tailwind
```
# MAL - Las animaciones CSS no se sincronizan con frames
"Usa animate-bounce de Tailwind"
"Anade animate-spin al icono"

# BIEN - Usa spring o interpolate
"Anima con spring({ damping: 8 }) para efecto bounce"
"Rota con interpolate(frame, [0, 30], [0, 360]) para spin"
```

#### Nunca useFrame() de React Three Fiber
```
# MAL - useFrame es de R3F, no de Remotion
"Usa useFrame para la animacion 3D"

# BIEN - Usa useCurrentFrame de Remotion
"Usa useCurrentFrame() de Remotion para controlar la animacion 3D"
```

#### Nunca img HTML ni Image de Next.js
```
# MAL - No se sincronizan con el renderizado de Remotion
"Usa <img src='foto.jpg'>"
"Usa <Image> de next/image"

# BIEN - Usa Img de Remotion
"Usa <Img src={staticFile('foto.jpg')}> de remotion"
```

#### Nunca Librerias de Animacion Externas
```
# MAL - Tienen su propio sistema de timing
"Usa Framer Motion para la animacion"
"Anade GSAP para el efecto"
"Usa react-spring para el rebote"

# BIEN - Remotion tiene todo lo necesario
"Usa spring() de Remotion para el rebote"
"Usa interpolate con Easing para el efecto"
```

### 7.5 Archivos de Direccion de Arte

Para mantener consistencia entre multiples videos, crea un archivo de direccion de arte en tu proyecto:

Crea el archivo `art-direction.md` en la raiz del proyecto:

```markdown
# Direccion de Arte - Mi Marca

## Colores
- Primario: #4ecdc4
- Secundario: #ff6b6b
- Acento: #ffd93d
- Fondo principal: #0f0f0f
- Fondo superficie: #1a1a1a
- Texto principal: #ffffff
- Texto secundario: #999999
- Texto terciario: #666666

## Tipografia
- Titulos: Montserrat Bold
- Subtitulos: Montserrat SemiBold
- Cuerpo: Inter Regular
- Enfasis: Inter Bold
- Datos/Numeros: Space Grotesk Bold
- Codigo: JetBrains Mono

## Tamanos de Fuente
- Titulo hero: 72px
- Titulo seccion: 48px
- Subtitulo: 32px
- Cuerpo: 24px
- Caption: 18px
- Etiqueta: 14px

## Animaciones Preferidas
- Entradas suaves: spring con damping: 200 (sin rebote)
- Botones/CTA: spring con damping: 8 (rebote notable)
- Textos largos: typewriter effect
- Textos cortos: fade-in desde abajo (20px desplazamiento)
- Transiciones entre escenas: slide o crossfade, 20 frames
- Stagger entre items: 0.4 segundos
- Fade-out final: 2 segundos, interpolate lineal

## Estilo General
- Minimalista con mucho espacio en blanco/negro
- Bordes redondeados: 12px para cards, 8px para botones
- Sombras: ninguna (estilo flat)
- Iconos: emojis o iconos SVG simples
- Separadores: lineas de 1px, color #333333

## Formatos Predeterminados
- YouTube: 1920x1080, 30fps
- Reels/TikTok: 1080x1920, 30fps
- Posts cuadrados: 1080x1080, 30fps
- Thumbnails: 1280x720, 1fps (Still)
```

Luego, en tus prompts a Claude, referencia este archivo:

```
Lee el archivo art-direction.md y aplica esos estilos al video que voy a pedirte.
Crea un reel vertical de 15 segundos sobre "5 Herramientas de IA para Diseno".
```

Claude leera tu archivo de direccion de arte y aplicara colores, fuentes, animaciones y estilos de manera consistente a todos los videos que cree.

Tambien puedes pedirle que actualice el archivo:

```
Anade al archivo art-direction.md una seccion de "Formatos de lower third"
con las especificaciones del lower third que usamos en el ultimo video.
```

### 7.6 Iteracion Incremental

La mejor estrategia para videos complejos es construir por capas:

**Ronda 1: Layout y estructura**
```
Crea la estructura basica del video con los fondos de cada escena y
rectangulos placeholder donde ira el contenido. Sin animaciones.
Quiero ver el layout primero.
```

**Ronda 2: Contenido y texto**
```
Ahora anade el texto real a cada escena. Posiciona todo correctamente.
Todavia sin animaciones, todo estatico.
```

**Ronda 3: Animaciones de entrada**
```
Anade animaciones de entrada a todos los elementos:
- Titulos: spring scale
- Textos: fade-in desde abajo
- Cards: slide desde la derecha con stagger
```

**Ronda 4: Transiciones entre escenas**
```
Anade transiciones entre las escenas usando TransitionSeries.
Usa slide desde la izquierda, 20 frames, springTiming.
```

**Ronda 5: Detalles finos**
```
Anade los toques finales:
- Sombra sutil en las cards (box-shadow: 0 4px 20px rgba(0,0,0,0.3))
- Linea decorativa animada debajo de los titulos (width de 0 a 100px)
- Punto parpadeante (opacidad oscilante) junto al texto "EN VIVO"
```

**Ronda 6: Audio**
```
Anade audio:
- Musica de fondo: staticFile("bg.mp3") a volume 0.2
- SFX "pop" en cada aparicion de card
- SFX "whoosh" en cada transicion
```

Esta estrategia evita que Claude tenga que manejar demasiada complejidad de una vez y te permite validar cada capa antes de anadir la siguiente.

---

## 8. Renderizado y Exportacion

### 8.1 Comando Basico

El comando fundamental para renderizar un video es:

```bash
npx remotion render <CompositionId> out/video.mp4
```

Donde:
- `<CompositionId>` es el `id` que definiste en la composicion dentro de Root.tsx
- `out/video.mp4` es la ruta y nombre del archivo de salida

Ejemplo:
```bash
npx remotion render HolaMundo out/hola-mundo.mp4
```

### 8.2 Opciones Principales

#### Codec (formato de salida)

```bash
--codec h264       # MP4 (default, mas compatible)
--codec h265       # MP4 con mejor compresion (menos compatible)
--codec vp8        # WebM (bueno para web)
--codec vp9        # WebM con mejor calidad
--codec prores     # MOV ProRes (para edicion profesional)
--codec gif        # GIF animado (sin audio)
```

#### Calidad (CRF - Constant Rate Factor)

```bash
--crf 18           # Alta calidad, archivo grande (default)
--crf 23           # Calidad media, buen balance
--crf 28           # Baja calidad, archivo pequeno
--crf 1            # Maxima calidad (archivos muy grandes)
```

Nota: Menor CRF = mejor calidad = archivo mas grande.

#### Resolucion

```bash
--width 1920 --height 1080    # Full HD horizontal
--width 1080 --height 1920    # Full HD vertical (reels)
--width 1080 --height 1080    # Cuadrado
--width 3840 --height 2160    # 4K
--width 480 --height 270      # Preview pequeno
```

#### Rango de Frames

```bash
--frames 0-89      # Solo los primeros 3 segundos (a 30fps)
--frames 90-179     # Solo del segundo 3 al 6
--frames 0-0        # Solo el primer frame (screenshot)
```

#### Audio

```bash
--muted             # Sin audio en la salida
```

#### Rendimiento

```bash
--concurrency 4     # Usar 4 hilos (default: mitad de CPUs)
--concurrency 1     # Un solo hilo (menos RAM, mas lento)
--concurrency 16    # 16 hilos (rapido, mucha RAM)
```

### 8.3 Tabla de Presets por Plataforma

| Plataforma | Resolucion | Codec | CRF | Comando Completo |
|---|---|---|---|---|
| YouTube | 1920x1080 | h264 | 18 | `npx remotion render MyComp out/youtube.mp4 --codec h264 --crf 18` |
| YouTube 4K | 3840x2160 | h264 | 18 | `npx remotion render MyComp out/youtube4k.mp4 --width 3840 --height 2160 --crf 18` |
| TikTok | 1080x1920 | h264 | 20 | `npx remotion render MyComp out/tiktok.mp4 --width 1080 --height 1920 --crf 20` |
| Instagram Reel | 1080x1920 | h264 | 20 | `npx remotion render MyComp out/reel.mp4 --width 1080 --height 1920 --crf 20` |
| Instagram Post | 1080x1080 | h264 | 20 | `npx remotion render MyComp out/post.mp4 --width 1080 --height 1080 --crf 20` |
| Instagram Story | 1080x1920 | h264 | 20 | `npx remotion render MyComp out/story.mp4 --width 1080 --height 1920 --crf 20` |
| Twitter/X | 1280x720 | h264 | 22 | `npx remotion render MyComp out/twitter.mp4 --width 1280 --height 720 --crf 22` |
| LinkedIn | 1920x1080 | h264 | 18 | `npx remotion render MyComp out/linkedin.mp4 --crf 18` |
| GIF Preview | 480x270 | gif | - | `npx remotion render MyComp out/preview.gif --codec gif --width 480 --height 270` |
| Edicion (ProRes) | 1920x1080 | prores | - | `npx remotion render MyComp out/edit.mov --codec prores` |
| Web (WebM) | 1280x720 | vp9 | 28 | `npx remotion render MyComp out/web.webm --codec vp9 --crf 28` |

### 8.4 Automatizar Variantes

#### Por idioma

```bash
# Generar versiones en multiples idiomas
for lang in es en fr pt; do
  npx remotion render MyComp "out/video-${lang}.mp4" \
    --props='{"language":"'$lang'"}'
done
```

Para que esto funcione, tu composicion debe aceptar un prop `language` y renderizar el texto segun el idioma. Define el schema con Zod en tu composicion.

#### Por formato

```bash
# Generar horizontal + vertical + cuadrado del mismo video
npx remotion render MyComp out/horizontal.mp4 --width 1920 --height 1080
npx remotion render MyComp out/vertical.mp4 --width 1080 --height 1920
npx remotion render MyComp out/cuadrado.mp4 --width 1080 --height 1080
```

Para que esto funcione bien, tu composicion debe ser responsive y usar `useVideoConfig()` para adaptar el layout segun las dimensiones.

#### Script de render multiple

```bash
#!/bin/bash
# render-all.sh - Renderiza todas las composiciones del proyecto

COMPOSITIONS=("Intro" "ProductDemo" "CTA" "Outro")
OUTPUT_DIR="out"

mkdir -p $OUTPUT_DIR

for comp in "${COMPOSITIONS[@]}"; do
  echo "Renderizando ${comp}..."
  npx remotion render "$comp" "${OUTPUT_DIR}/${comp}.mp4" --codec h264 --crf 18
  echo "${comp} completado!"
done

echo "Todos los renders completados!"
```

### 8.5 Render con la API (Vercel / Cloud)

El proyecto SuperVideos incluye una API de renderizado en la nube en `src/app/api/render/route.ts`. Esta API permite:

- Renderizar videos desde un endpoint HTTP
- Pasar props dinamicas via JSON
- Obtener el video resultante como URL de descarga
- Integrar la generacion de videos en workflows automatizados

Para usarla en produccion, despliega el proyecto en Vercel y configura las variables de entorno necesarias. Consulta el archivo `.env.example` para ver las variables requeridas.

Uso basico de la API:

```bash
# Iniciar render
curl -X POST https://tu-app.vercel.app/api/render \
  -H "Content-Type: application/json" \
  -d '{"compositionId": "MyComp", "inputProps": {"title": "Mi Video"}}'
```

La API devuelve un ID de render que puedes usar para consultar el progreso y obtener la URL del video final.

---

## 9. Troubleshooting y Tips Avanzados

### 9.1 Errores Comunes

| Error | Causa | Solucion |
|---|---|---|
| `Font not loaded` | La fuente no esta importada correctamente | Usa `@remotion/google-fonts`: `import { loadFont } from "@remotion/google-fonts/Montserrat"; const { fontFamily } = loadFont();` |
| `Cannot read property of undefined` | Props no definidas en el componente | Verifica que `defaultProps` esta definido y que el schema Zod coincide con los props que usa el componente |
| `Audio codec not supported` | El formato de audio no es compatible | Convierte el audio a MP3 o WAV. Remotion soporta MP3, WAV, AAC y OGG |
| `Memory limit exceeded` | Video muy largo o resolucion muy alta | Reduce resolucion para preview, usa `--concurrency 1`, o divide el video en segmentos |
| `ENOENT staticFile` | El asset no se encuentra | Verifica que el archivo esta en la carpeta `public/` y que el nombre es exacto (case-sensitive) |
| `Composition not found` | El id de composicion no coincide | Verifica el `id` en Root.tsx. El id del render debe coincidir exactamente |
| `Port 3000 already in use` | Otro proceso usa el puerto | Usa `--port 3001` o mata el proceso que ocupa el puerto |
| `Module not found` | Dependencia no instalada | Ejecuta `npm install` y luego `npm install <paquete>` si falta algo especifico |
| `RangeError: Invalid array length` | durationInFrames es 0 o negativo | Verifica que durationInFrames es un numero positivo mayor que 0 |
| `TypeError: interpolate expects number` | Se pasa un valor no numerico a interpolate | Asegurate de que `useCurrentFrame()` devuelve un numero y que los rangos son arrays de numeros |
| `Webpack compilation error` | Error de sintaxis en el codigo | Revisa la consola para ver el archivo y linea exacta del error |
| `FFMPEG not found` | FFmpeg no esta instalado | Remotion incluye FFmpeg, pero si falla, instala manualmente: `npm install @remotion/compositor` |

### 9.2 Tips de Rendimiento

#### Para Preview (Desarrollo)

- **Reduce la resolucion**: Previsualiza a 720p o incluso 480p. La composicion final se renderiza en la resolucion real.
- **Usa --frames parciales**: `npx remotion render MyComp preview.mp4 --frames 0-89` para probar solo los primeros 3 segundos.
- **Desactiva efectos pesados**: Comenta temporalmente light-leaks, audio visualization, y 3D para previews mas rapidos.
- **Usa web-safe fonts**: Durante el desarrollo, usa Arial/Helvetica. Carga Google Fonts solo cuando estes listo para render final.

#### Para Render Final

- **Concurrency optima**: Usa la mitad del numero de CPUs de tu maquina. Si tienes 8 cores, usa `--concurrency 4`.
- **Cierra otras aplicaciones**: El render consume mucha CPU y RAM. Cierra Chrome, VS Code, etc.
- **SSD recomendado**: El render escribe muchos archivos temporales. Un SSD acelera significativamente.
- **Monitorea la RAM**: Si ves que el render se cuelga, reduce `--concurrency` a 1 o 2.

#### Para Videos Largos (mas de 60 segundos)

- Divide el video en composiciones mas cortas y concatena con FFmpeg despues
- Usa `--frames` para renderizar por segmentos
- Considera usar Remotion Lambda para render en la nube (mas rapido y escalable)

### 9.3 Ideas Avanzadas

#### 3D con @remotion/three

Remotion se integra con Three.js a traves de `@remotion/three`. Regla fundamental: usa `useCurrentFrame()` de Remotion, NUNCA `useFrame()` de React Three Fiber.

```
Instala @remotion/three y crea una escena 3D con un cubo rotando.
El cubo debe rotar 360 grados en el eje Y a lo largo de toda la composicion.
Usa useCurrentFrame() para calcular la rotacion.
Iluminacion: una ambient light + una directional light.
Fondo: color #0a0a0a.
```

#### Charts y Visualizacion de Datos

Para graficos animados, usa SVG puro + `useCurrentFrame()` + `interpolate()`. No uses librerias de graficos que tengan sus propias animaciones (Chart.js, Recharts, etc.) porque su timing no se sincroniza con Remotion.

```
Crea un grafico de lineas SVG animado que muestre datos de ventas.
La linea debe dibujarse progresivamente usando strokeDasharray y strokeDashoffset.
Datos: Ene: 120, Feb: 145, Mar: 130, Abr: 180, May: 210, Jun: 195.
La linea se dibuja durante 3 segundos con easing Easing.out(Easing.cubic).
Puntos en cada dato que aparecen con spring scale cuando la linea los alcanza.
```

#### Captions y Subtitulos Automaticos

El flujo completo para subtitulos automaticos:

1. Transcribir audio con IA (Whisper, AssemblyAI, etc.) para obtener un archivo SRT
2. Importar el SRT en tu composicion con las funciones de Remotion
3. Mostrar las captions con highlight de palabra activa

```
Importa el archivo subtitulos.srt usando las funciones de Remotion para SRT.
Muestra los subtitulos en la parte inferior del video con:
- Fuente Inter Bold 28px blanca
- Sombra de texto negra para legibilidad
- La palabra que se esta diciendo en ese momento en color #4ecdc4 y bold
- Maximo 2 lineas visibles
- Fondo semi-transparente negro (50%) detras del texto
```

#### Voiceover con TTS

Integra text-to-speech (ElevenLabs, Google TTS, etc.) para narrar tus videos:

1. Genera el audio con el servicio TTS y guardalo en `public/`
2. Usa `calculateMetadata` para obtener la duracion del audio y ajustar la composicion
3. Sincroniza las escenas con el audio

```
Configura calculateMetadata para:
1. Leer la duracion del audio "narration.mp3" con getAudioDurationInSeconds
2. Ajustar durationInFrames de la composicion segun la duracion del audio
3. Calcular el timing de cada escena proporcionalmente

Anade el componente <Audio src={staticFile("narration.mp3")} /> al video.
```

#### Light Leaks para Transiciones Cinematicas

```
Instala @remotion/light-leaks y anade un efecto de light leak dorado
entre la escena 1 y la escena 2.
Duracion del efecto: 30 frames.
Color dominante: dorado/ambar.
Intensidad: 0.7 (de 0 a 1).
```

#### Datos en Tiempo Real con calculateMetadata

```
Configura calculateMetadata para:
1. Hacer fetch a https://api.example.com/stats
2. Usar los datos devueltos como props del video
3. Calcular la duracion segun la cantidad de datos

Esto permite generar videos con datos frescos cada vez que se renderiza.
```

#### Templates Parametrizados con Zod

Crea composiciones reutilizables que acepten parametros:

```
Crea una composicion parametrizada "SocialPost" que acepte estos input props
(definidos con schema Zod):
- title: string (requerido)
- subtitle: string (opcional, default "")
- backgroundColor: string (default "#0f0f0f")
- accentColor: string (default "#4ecdc4")
- format: enum ["horizontal", "vertical", "square"] (default "vertical")

Segun el format, ajusta width/height en calculateMetadata.
Usa defaultProps para los valores por defecto.
```

Luego puedes renderizar variantes:

```bash
npx remotion render SocialPost out/post1.mp4 \
  --props='{"title":"5 Tips de IA","accentColor":"#ff6b6b","format":"vertical"}'

npx remotion render SocialPost out/post2.mp4 \
  --props='{"title":"Novedades React","accentColor":"#61dafb","format":"square"}'
```

### 9.4 El Dashboard SuperConstructor

El proyecto SuperVideos incluye un dashboard interactivo accesible en la ruta `/dashboard` cuando ejecutas la aplicacion Next.js con `npm run dev`. Este dashboard ofrece:

- **Configurador visual**: Selecciona resolucion, fps, duracion y formato con controles graficos
- **Constructor de prompts**: Interfaz guiada para construir prompts efectivos paso a paso
- **Referencia de skills**: Catalogo navegable de las 40 skills con ejemplos de uso
- **Generador de comandos**: Construye el comando `npx remotion render` con las opciones correctas segun la plataforma destino
- **Historial**: Registro de videos creados y sus prompts para reutilizar

Para acceder al dashboard, asegurate de que la app Next.js esta corriendo y navega a `http://localhost:3000/dashboard`.

---

## 10. Referencia Rapida

### Chuleta de Comandos

```bash
# ============================================
# SETUP INICIAL
# ============================================

# Crear proyecto nuevo
npx create-video@latest mi-proyecto

# Entrar al proyecto
cd mi-proyecto

# Instalar dependencias
npm install

# Instalar Agent Skills de Remotion
npx skills add remotion-dev/skills

# ============================================
# DESARROLLO
# ============================================

# Iniciar Remotion Studio (preview en localhost:3000)
npm run dev

# Iniciar Remotion Studio en puerto alternativo
npx remotion studio --port 3001

# Abrir Claude Code
claude

# ============================================
# RENDERIZADO
# ============================================

# Render basico (MP4 H.264)
npx remotion render <CompositionId> out/video.mp4

# Render con opciones completas
npx remotion render <CompositionId> out/video.mp4 \
  --codec h264 \
  --crf 18 \
  --width 1920 \
  --height 1080

# Render vertical (Reels/TikTok)
npx remotion render <CompositionId> out/reel.mp4 \
  --width 1080 \
  --height 1920 \
  --crf 20

# Render cuadrado (Instagram Post)
npx remotion render <CompositionId> out/post.mp4 \
  --width 1080 \
  --height 1080 \
  --crf 20

# Render solo primeros 3 segundos (preview)
npx remotion render <CompositionId> out/preview.mp4 --frames 0-89

# Render como GIF
npx remotion render <CompositionId> out/preview.gif \
  --codec gif \
  --width 480 \
  --height 270

# Render ProRes para edicion
npx remotion render <CompositionId> out/edit.mov --codec prores

# Render sin audio
npx remotion render <CompositionId> out/muted.mp4 --muted

# Render con props dinamicas
npx remotion render <CompositionId> out/video.mp4 \
  --props='{"title":"Mi Titulo","color":"#ff6b6b"}'

# ============================================
# UTILIDADES
# ============================================

# Listar composiciones disponibles
npx remotion compositions

# Obtener info de un video
npx remotion get-video-metadata public/mi-video.mp4

# Screenshot de un frame especifico
npx remotion still <CompositionId> out/frame.png --frame 90
```

### APIs Clave de Remotion

#### Hooks Fundamentales

```typescript
// Obtener el frame actual (0, 1, 2, 3, ...)
const frame = useCurrentFrame();

// Obtener configuracion del video
const { fps, width, height, durationInFrames } = useVideoConfig();
```

#### Funciones de Animacion

```typescript
// interpolate: mapear frames a valores
const opacity = interpolate(frame, [0, 30], [0, 1]);
const x = interpolate(frame, [0, 60], [-100, 0], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// spring: animacion con fisica
const scale = spring({
  frame,
  fps,
  config: {
    damping: 200,    // Alto = suave, Bajo = rebote
    stiffness: 100,  // Rigidez del resorte
    mass: 1,         // Masa del objeto
  },
});

// Easing functions
const value = interpolate(frame, [0, 30], [0, 1], {
  easing: Easing.out(Easing.cubic),
});
```

#### Assets

```typescript
// Referenciar archivos en public/
const videoSrc = staticFile("mi-video.mp4");
const audioSrc = staticFile("musica.mp3");
const imgSrc = staticFile("foto.jpg");
```

#### Componentes de Layout

```tsx
// Contenedor que llena todo el frame
<AbsoluteFill style={{ backgroundColor: "#0f0f0f" }}>
  {/* contenido */}
</AbsoluteFill>

// Posicionar en el tiempo
<Sequence from={90} durationInFrames={150}>
  {/* Aparece en frame 90, dura 150 frames (5s a 30fps) */}
</Sequence>

// Secuencias lineales
<Series>
  <Series.Sequence durationInFrames={150}>
    {/* Escena 1: frames 0-149 */}
  </Series.Sequence>
  <Series.Sequence durationInFrames={150}>
    {/* Escena 2: frames 150-299 */}
  </Series.Sequence>
</Series>
```

#### Transiciones

```tsx
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={150}>
    <Escena1 />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={slide({ direction: "from-left" })}
    timing={springTiming({ config: { damping: 200 } })}
  />
  <TransitionSeries.Sequence durationInFrames={150}>
    <Escena2 />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

#### Media

```tsx
// Video
<OffthreadVideo src={staticFile("video.mp4")} />
<OffthreadVideo
  src={staticFile("video.mp4")}
  startFrom={90}   // Empieza en frame 90 del video fuente
  endAt={300}       // Termina en frame 300 del video fuente
/>

// Audio
<Audio src={staticFile("musica.mp3")} volume={0.5} />
<Audio
  src={staticFile("sfx.mp3")}
  volume={(f) => interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" })}
/>

// Imagen
<Img src={staticFile("foto.jpg")} style={{ width: "100%" }} />
```

#### Registro de Composiciones (Root.tsx)

```tsx
import { Composition } from "remotion";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MiVideo"
        component={MiVideoComponent}
        durationInFrames={300}  // 10 segundos a 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Mi Video",
        }}
      />
    </>
  );
};
```

### Formulas Utiles

```
Frames = Segundos * FPS
Segundos = Frames / FPS

Ejemplo a 30fps:
1 segundo = 30 frames
5 segundos = 150 frames
10 segundos = 300 frames
30 segundos = 900 frames
60 segundos = 1800 frames

Ejemplo a 60fps:
1 segundo = 60 frames
5 segundos = 300 frames
10 segundos = 600 frames
```

### Parametros de Spring

```
damping: 200  -> Movimiento suave, sin rebote (entradas elegantes)
damping: 100  -> Leve overshoot, profesional
damping: 20   -> Rebote moderado (llamativo)
damping: 8    -> Rebote fuerte (divertido, CTAs)
damping: 3    -> Rebote muy elastico (cartoon)

stiffness: 100 -> Velocidad estandar
stiffness: 200 -> Mas rapido
stiffness: 50  -> Mas lento

mass: 1        -> Peso estandar
mass: 0.5      -> Mas ligero (responde rapido)
mass: 2        -> Mas pesado (responde lento)
```

---

## Apendice: Checklist para Video Profesional

Antes de renderizar tu video final, verifica estos puntos:

- [ ] Resolucion correcta para la plataforma destino
- [ ] FPS consistente (30 o 60, no mezclar)
- [ ] Todas las fuentes cargadas con @remotion/google-fonts
- [ ] Colores en hexadecimal, no nombres de colores CSS
- [ ] Todas las animaciones usan interpolate/spring de Remotion (no CSS)
- [ ] Assets en public/ con nombres correctos (case-sensitive)
- [ ] Schema Zod definido si usas input props
- [ ] defaultProps definidos en la composicion
- [ ] Timing verificado: cada escena empieza y termina donde debe
- [ ] Transiciones funcionan correctamente (sin saltos)
- [ ] Audio sincronizado (si aplica)
- [ ] Subtitulos sincronizados (si aplica)
- [ ] Preview completo visto de principio a fin sin errores
- [ ] Render de prueba con --frames 0-89 exitoso
- [ ] Video final renderizado y verificado

---

---

# MODULO 8: SuperConstructor Dashboard

---

## 11. El SuperConstructor: Tu Centro de Control

### Que es el SuperConstructor

El SuperConstructor es un dashboard web integrado en tu proyecto SuperVideos que centraliza todo lo que necesitas para crear videos con Remotion + Claude Code. En lugar de recordar comandos, APIs y parametros de memoria, tienes una interfaz visual con 8 modulos especializados.

**URL de acceso**: `http://localhost:3001/dashboard` (se abre con `npm run dev`)

### Para quien es

- Creadores de contenido que quieren producir video con IA sin ser expertos en codigo
- Desarrolladores que quieren un workflow rapido para generar prompts optimizados
- Equipos que necesitan consistencia en sus producciones de video
- Cualquier persona aprendiendo Remotion que quiere una referencia visual interactiva

### Arquitectura del SuperConstructor

El dashboard tiene 8 tabs, cada uno con una funcion especifica dentro del flujo de produccion:

```
 Roadmap → Config → Prompts → Skills → Templates → Render → JSON → Custom Skills
    |         |        |         |          |          |        |         |
  Aprende   Define   Construye  Consulta  Arranca   Exporta  Parametra  Extiende
  el flujo  specs    el prompt  reglas    rapido    el video  datos     a Claude
```

### Como se conecta con Claude Code

El SuperConstructor **no ejecuta codigo directamente**. Su funcion es generar prompts perfectamente estructurados que luego pegas en Claude Code. El flujo es:

1. **Configuras** en el dashboard (dimensiones, estilo, escenas, animaciones)
2. **Copias** el prompt generado
3. **Pegas** en Claude Code (terminal con `claude` abierto en la carpeta del proyecto)
4. **Claude genera** el codigo Remotion siguiendo las skills instaladas
5. **Previsualizas** en Remotion Studio (`localhost:3100`)
6. **Iteras** volviendo al dashboard para ajustar y generar nuevos prompts

---

## 12. Roadmap: Flujo Completo de Generacion de Video

### Los 7 Pasos del Flujo

Este es el proceso completo que seguiras cada vez que crees un video:

#### Paso 1: Configurar Especificaciones (Tab Config)

Antes de escribir cualquier prompt, define las specs tecnicas:

- **Plataforma destino**: YouTube, TikTok, Instagram, LinkedIn, Twitter, Custom
- **Resolucion**: Se autocompleta segun la plataforma (ej: TikTok = 1080x1920)
- **FPS**: 30fps para la mayoria, 60fps para contenido gaming/deportivo
- **Duracion**: En segundos, el dashboard calcula los frames automaticamente

**Ejemplo practico**:
```
Plataforma: TikTok
Resolucion: 1080x1920 (vertical 9:16)
FPS: 30
Duracion: 15 segundos
Frames totales: 450
```

> **Tip PRO**: Empieza siempre con 720p (1280x720 o 720x1280) para previews rapidos. El renderizado a alta resolucion dejalo para el export final. Ahorraras mucho tiempo en iteraciones.

#### Paso 2: Disenar la Estructura (Tab Prompts > Escenas)

Define cuantas escenas tiene tu video y que ocurre en cada una:

- **Numero de escenas**: Recomendado 3-5 para videos cortos (15-30s)
- **Duracion por escena**: 3-7 segundos cada una funciona bien
- **Descripcion**: Que se ve, que texto aparece, que movimiento hay

**Ejemplo para un reel de 15 segundos**:
```
Escena 1 (0-5s): Fondo gradiente azul a morado. Texto grande "¿Sabias que...?" entra con spring desde abajo.
Escena 2 (5-10s): Cambio a fondo oscuro. Tres bullets aparecen uno por uno con stagger de 15 frames.
Escena 3 (10-15s): Logo centrado con efecto de particulas convergentes. CTA "Sigueme" abajo.
```

> **Tip PRO**: Divide videos largos en escenas de 3-7 segundos. Es el rango optimo para mantener atencion. Menos de 3 se siente apresurado, mas de 7 se siente lento.

#### Paso 3: Elegir Estilo Visual (Tab Prompts > Estilo)

Selecciona la estetica global del video:

| Estilo | Cuando usarlo | Caracteristicas |
|---|---|---|
| Minimalista | Corporativo, tech, SaaS | Mucho espacio en blanco, tipografia grande, movimientos sutiles |
| Cinematico | Storytelling, trailers | Letterbox, gradientes oscuros, transiciones suaves |
| Brutalista | Startups, Gen-Z | Alto contraste, tipografia bold, colores neon |
| Cartoon | Educativo, infantil | Formas redondeadas, colores saturados, rebotes exagerados |
| Data-driven | Reportes, finanzas | Graficos limpios, numeros grandes, transiciones precisas |
| Glassmorphism | Apps, productos digitales | Fondos difuminados, bordes translucidos, sombras suaves |

> **Tip PRO**: Usa maximo 2-3 colores y 2 fuentes para coherencia visual. Mas de eso genera ruido.

#### Paso 4: Configurar Animaciones (Tab Prompts > Animaciones)

Define como se mueven los elementos:

- **Tipo de spring**: damping:200 para elegancia, damping:8 para energia
- **Transiciones**: slide, fade, wipe, clockWipe entre escenas
- **Efectos**: Stagger para listas, typewriter para texto, parallax para fondos

**Referencia rapida de springs**:
```
Elegante y suave:    spring({ damping: 200, stiffness: 100 })
Profesional:         spring({ damping: 100, stiffness: 100 })
Con rebote:          spring({ damping: 20, stiffness: 100 })
Energetico:          spring({ damping: 8, stiffness: 100 })
Cartoon:             spring({ damping: 3, stiffness: 100 })
```

#### Paso 5: Generar y Copiar el Prompt (Tab Prompts > Prompt Generado)

El dashboard combina toda tu configuracion en un prompt optimizado. Ejemplo de lo que genera:

```
Crea un video Remotion con estas especificaciones:

SPECS TECNICAS:
- Resolucion: 1080x1920 (vertical 9:16)
- FPS: 30
- Duracion: 15 segundos (450 frames)
- Composition ID: "TikTokReel"

ESCENAS:
1. (frames 0-150) Fondo gradiente #667eea a #764ba2. Texto "¿Sabias que...?"
   entrada con spring({damping:200}) desde translateY(100).
2. (frames 150-300) Fondo #0f0f0f. Tres bullets con stagger de 15 frames,
   spring({damping:100}) en opacidad y translateX.
3. (frames 300-450) Logo centrado con escala spring({damping:20}).
   CTA "Sigueme" con fade in.

TRANSICIONES: Usar TransitionSeries con slide({direction:"from-left"})

ESTILO: Minimalista. Fuente: Inter (loadFont de @remotion/google-fonts).
Colores: #667eea (primario), #764ba2 (secundario), #ffffff (texto).

REGLAS: Usar useCurrentFrame + useVideoConfig. Animaciones SOLO con
interpolate/spring de Remotion. Assets en public/ con staticFile().
```

> **Tip PRO**: Anade contexto extra despues de copiar, como "Usa la skill de transiciones para TransitionSeries" o "Aplica la skill de text-animations para el efecto typewriter". Esto guia a Claude a consultar las reglas correctas.

#### Paso 6: Previsualizar e Iterar (Remotion Studio)

Despues de que Claude genera el codigo:

1. Abre Remotion Studio en `http://localhost:3100`
2. Selecciona tu composicion en el panel izquierdo
3. Reproduce el video completo con el boton de play
4. Navega frame a frame con las flechas del teclado
5. Identifica que cambiar y vuelve a Claude con prompts especificos

**Prompts de iteracion efectivos**:
```
# BIEN - Especifico
"En la escena 2, cambia el stagger de 15 a 10 frames y el color del
segundo bullet de blanco a #667eea"

# MAL - Vago
"Hazlo mas bonito"
```

#### Paso 7: Renderizar y Exportar (Tab Render)

Cuando el video esta perfecto, usa el Tab Render para generar el comando:

```bash
# Render basico MP4
npx remotion render src/remotion/index.ts TikTokReel out/reel.mp4

# Con calidad alta
npx remotion render src/remotion/index.ts TikTokReel out/reel.mp4 --codec h264 --crf 16

# Solo probar primeros 3 segundos
npx remotion render src/remotion/index.ts TikTokReel out/test.mp4 --frames 0-89
```

---

## 13. Guia de Cada Modulo del Dashboard

### Tab 1: Roadmap (🗺)

**Para que sirve**: Ver el flujo completo de generacion de video de un vistazo. Es tu mapa de ruta cada vez que empiezas un proyecto nuevo.

**Como usar**:
- Lee los 7 pasos en orden la primera vez
- Usa los tips de cada paso como referencia rapida
- Las secciones colapsables "Guia de la Plataforma" y "Posibilidades por Skill" son enciclopedias de consulta

**Cuando consultarlo**: Al inicio de cada proyecto nuevo para recordar el flujo optimo.

---

### Tab 2: Config (⚙)

**Para que sirve**: Establecer las especificaciones tecnicas del video antes de escribir cualquier prompt.

**Como usar**:
1. Haz click en un preset de plataforma (YouTube, TikTok, Instagram, etc.)
2. Los campos de ancho, alto y FPS se autocompletan
3. Ajusta la duracion en segundos
4. El calculo de frames totales (duracion x fps) aparece automaticamente
5. Puedes sobreescribir cualquier valor para dimensiones custom

**Presets disponibles**:
| Plataforma | Resolucion | Relacion | FPS |
|---|---|---|---|
| YouTube | 1920x1080 | 16:9 | 30 |
| TikTok | 1080x1920 | 9:16 | 30 |
| Instagram Reel | 1080x1920 | 9:16 | 30 |
| Instagram Feed | 1080x1080 | 1:1 | 30 |
| LinkedIn | 1920x1080 | 16:9 | 30 |
| Twitter/X | 1280x720 | 16:9 | 30 |

**Flujo**: Config → Prompts (las specs se incorporan al prompt generado)

---

### Tab 3: Prompts (✏)

**Para que sirve**: Construir prompts optimizados para Claude Code sin tener que escribirlos manualmente desde cero.

**Como usar**:
1. Abre cada seccion colapsable en orden:
   - **Escenas**: Define estructura, numero de escenas y que ocurre en cada una
   - **Estilo Visual**: Selecciona estetica general (minimalista, cinematico, etc.)
   - **Colores y Tipografia**: Define paleta de colores hex y fuentes
   - **Animaciones**: Elige tipo de spring, transiciones y efectos
   - **Audio**: Indica si hay musica, SFX o voz en off
   - **Notas Adicionales**: Instrucciones extra libres
2. El prompt se genera automaticamente en la seccion inferior
3. Click en "Copiar prompt" para llevarlo al clipboard
4. Pegalo en Claude Code

**Tip PRO**: La seccion "Notas Adicionales" es muy poderosa. Usa frases como:
- "Usa TransitionSeries para las transiciones entre escenas"
- "Aplica la skill de text-animations para efecto typewriter"
- "Genera un archivo de direccion de arte antes del codigo"
- "Crea el schema Zod para parametrizar textos y colores"

---

### Tab 4: Skills (📚)

**Para que sirve**: Consultar las 40 skills de Remotion instaladas sin salir del dashboard. Cada skill es un conjunto de reglas que Claude usa al generar codigo.

**Como usar**:
1. Usa la barra de busqueda para filtrar por nombre
2. Filtra por tags: animacion, audio, 3d, texto, datos, etc.
3. Click en una skill para ver:
   - **Resumen**: La regla principal que Claude sigue
   - **Codigo de ejemplo**: Snippet funcional que puedes copiar
   - **Tags**: Categorias a las que pertenece

**Las 6 categorias de skills**:

| Categoria | Skills | Para que |
|---|---|---|
| Animacion y Movimiento | animations, timing, sequencing, transitions, text-animations, trimming, stagger, easing, loop, freeze | Todo tipo de movimiento y efectos |
| Media y Contenido | videos, audio, images, gifs, assets, lottie | Integrar archivos multimedia |
| Texto y Subtitulos | subtitles, display-captions, import-srt, transcribe-captions, measuring-text, fonts | Texto animado y subtitulado |
| Datos y Visualizacion | charts, maps, parameters, calculate-metadata | Graficos y datos dinamicos |
| Efectos Avanzados | 3d, light-leaks, transparent-videos, audio-visualization, voiceover, sfx | Efectos cinematicos y 3D |
| Utilidades | tailwind, compositions, can-decode, extract-frames, get-durations, measuring-dom | Herramientas de soporte |

**Caso de uso tipico**: Estas construyendo un prompt y quieres saber como pedirle a Claude que haga subtitulos animados. Abres la skill "display-captions", ves el ejemplo de codigo, y anades al prompt: "Usa la tecnica de DisplayCaptions con highlight de palabra activa como en la skill display-captions".

---

### Tab 5: Templates (📋)

**Para que sirve**: Arrancar rapido con prompts profesionales ya probados y optimizados.

**8 templates disponibles**:

1. **Reel para Redes Sociales** - 15s vertical, 3 escenas con transiciones rapidas
2. **Demo de Producto** - 30s horizontal, 5 escenas con features animadas
3. **Video Explicativo** - 60s horizontal, escenas educativas con graficos
4. **Visualizacion de Datos** - 20s con barras animadas y contadores
5. **Logo Reveal** - 5s con efecto de particulas convergentes
6. **Anuncio/Comercial** - 20s con estructura hook-problema-solucion-CTA
7. **Intro de YouTube** - 7s con formas geometricas y typewriter
8. **Audiograma de Podcast** - 60s con espectro de audio y captions

**Como usar**:
1. Navega los templates disponibles
2. **"Usar template"**: Carga el prompt en el Tab Prompts para que lo personalices
3. **"Copiar"**: Copia el prompt directamente al clipboard para pegarlo en Claude Code

**Como personalizar un template**:
Despues de copiar, busca los valores que quieres cambiar:
- Colores hex (#667eea → tu color)
- Textos de ejemplo → tus textos reales
- Duraciones → tus duraciones deseadas
- Nombre de la composicion → tu nombre

---

### Tab 6: Render (▶)

**Para que sirve**: Construir el comando de render de Remotion sin memorizar flags ni parametros.

**Opciones disponibles**:
- **Composition ID**: El id que registraste en Root.tsx
- **Codec**: H.264 (MP4), H.265, VP9 (WebM), ProRes, GIF
- **CRF (calidad)**: 0-51 (menor = mejor calidad, mayor archivo)
- **Resolucion override**: Sobreescribir la resolucion de la composicion
- **Rango de frames**: Renderizar solo una porcion (ej: 0-89 para probar)
- **Flags extras**: --muted, --enforce-audio-track, --concurrency

**El comando se actualiza en tiempo real** conforme cambias opciones. Boton de copiar siempre disponible.

**Recomendaciones por plataforma**:
| Plataforma | Codec | CRF | Notas |
|---|---|---|---|
| YouTube | H.264 | 16-18 | Calidad alta, YouTube recomprime |
| TikTok | H.264 | 18-20 | Archivo < 287MB |
| Instagram | H.264 | 18-20 | < 650MB para feed, < 250MB para stories |
| LinkedIn | H.264 | 18 | < 5GB, recomendado < 200MB |
| Twitter/X | H.264 | 20-22 | < 512MB |
| Web (general) | VP9 WebM | 28-32 | Mas liviano, buena calidad |
| Edicion | ProRes 422 | - | Maxima calidad, archivo grande |

---

### Tab 7: JSON ({})

**Para que sirve**: Crear videos reutilizables con parametros variables. En lugar de hardcodear textos y colores, defines variables que puedes cambiar sin tocar el codigo.

**Como funciona**:
1. Define campos con nombre, tipo y valor por defecto
2. El dashboard genera dos cosas:
   - **JSON de defaultProps**: Para pegar en la Composition de Root.tsx
   - **Schema Zod**: Para validar los props en el componente

**Tipos de campo disponibles**:
- `string`: Textos (titulos, subtitulos, CTAs)
- `number`: Numeros (duraciones, tamaños, opacidades)
- `color`: Colores en hex (#667eea)
- `boolean`: Flags (mostrar/ocultar elementos)
- `enum`: Seleccion de opciones (estilo: "minimal" | "bold" | "neon")

**Caso de uso principal**: Videos en lote. Defines un template parametrizado y luego generas variantes cambiando solo el JSON:

```json
// Variante 1: Español
{ "titulo": "Descubre nuestro producto", "color": "#667eea", "idioma": "es" }

// Variante 2: Ingles
{ "titulo": "Discover our product", "color": "#667eea", "idioma": "en" }

// Variante 3: A/B test color
{ "titulo": "Descubre nuestro producto", "color": "#e74c3c", "idioma": "es" }
```

---

### Tab 8: Custom Skills (🔧)

**Para que sirve**: Crear skills propias que ensenan a Claude patrones especificos de tu proyecto o marca.

**Como usar**:
1. Define el **nombre** de la skill (ej: "mi-sistema-de-diseno")
2. Añade **tags** para categorizarla
3. Escribe la **descripcion**: cuando debe Claude usar esta skill
4. Define las **reglas** en Markdown: que debe hacer y que debe evitar
5. El dashboard genera el archivo SKILL.md listo para guardar

**Donde se guarda**: `.agents/skills/tu-skill/SKILL.md`

**Ejemplo de skill personalizada**:
```markdown
---
name: brand-miempresa
description: Sistema de diseno y reglas de marca para videos de MiEmpresa
tags: [brand, design-system, corporate]
---

# Reglas de Marca MiEmpresa

## Cuando usar
- Siempre que se genere un video para MiEmpresa o sus productos

## Reglas obligatorias
- Color primario: #2D5BFF
- Color secundario: #FF6B35
- Fuente titulos: Montserrat Bold (loadFont de @remotion/google-fonts)
- Fuente cuerpo: Inter Regular
- Logo siempre en esquina inferior derecha (48x48px)
- Duracion minima de logo en pantalla: 2 segundos
- Transiciones: Solo slide y fade, nunca wipe
- Springs: damping minimo 100 (nada cartoon)

## Anti-patrones
- NUNCA usar colores fuera de la paleta
- NUNCA usar Comic Sans o fuentes decorativas
- NUNCA hacer rebotes exagerados (damping < 50)
```

**Por que crear skills propias**:
- **Consistencia**: Todos los videos siguen las mismas reglas de marca
- **Velocidad**: No tienes que repetir instrucciones de marca en cada prompt
- **Equipo**: Cualquier persona del equipo genera videos con la misma estetica
- **Evolucion**: Puedes actualizar la skill y todos los videos futuros heredan los cambios

---

## 14. Ejercicios Practicos con el SuperConstructor

### Ejercicio 1: Tu Primer Reel en 5 Minutos

**Objetivo**: Crear un reel vertical de 15 segundos para TikTok.

**Pasos**:

1. **Tab Config**: Selecciona TikTok (1080x1920, 30fps, 15s)

2. **Tab Templates**: Click "Copiar" en "Reel para Redes Sociales"

3. **Terminal**: Abre Claude Code en la carpeta del proyecto
```bash
cd tu-proyecto-remotion
claude
```

4. **Pega el prompt** en Claude Code y espera a que genere el codigo

5. **Remotion Studio**: Abre `localhost:3100` y verifica el resultado

6. **Itera**: Vuelve a Claude Code con cambios especificos:
```
Cambia el color de fondo de la escena 1 de azul a #FF6B35.
Reduce la duracion de la escena 2 de 5 a 3 segundos y
redistribuye esos 2 segundos en la escena 3.
```

7. **Tab Render**: Genera el comando de render y ejecutalo:
```bash
npx remotion render src/remotion/index.ts TikTokReel out/mi-reel.mp4 --codec h264 --crf 18
```

---

### Ejercicio 2: Video Parametrizado Multi-idioma

**Objetivo**: Crear un video de producto que se pueda generar en 3 idiomas cambiando solo un JSON.

**Pasos**:

1. **Tab Config**: YouTube (1920x1080, 30fps, 30s)

2. **Tab JSON**: Define estos campos:
   - `titulo` (string): "Descubre ProductoX"
   - `subtitulo` (string): "La solucion que necesitas"
   - `cta` (string): "Pruebalo gratis"
   - `colorPrimario` (color): "#2D5BFF"
   - `idioma` (enum): "es" | "en" | "fr"

3. **Copia el schema Zod y el JSON** generados

4. **Tab Prompts**: Construye el prompt con las escenas y anade en notas:
```
Usa el schema Zod generado para los props.
El componente debe leer titulo, subtitulo, cta y colorPrimario de los props.
Registra la composicion con calculateMetadata para duracion dinamica.
```

5. **Pega todo en Claude Code** y espera el codigo

6. **Renderiza las 3 variantes**:
```bash
# Español
npx remotion render src/remotion/index.ts ProductDemo out/demo-es.mp4 --props='{"titulo":"Descubre ProductoX","subtitulo":"La solucion que necesitas","cta":"Pruebalo gratis","idioma":"es"}'

# Ingles
npx remotion render src/remotion/index.ts ProductDemo out/demo-en.mp4 --props='{"titulo":"Discover ProductX","subtitulo":"The solution you need","cta":"Try it free","idioma":"en"}'

# Frances
npx remotion render src/remotion/index.ts ProductDemo out/demo-fr.mp4 --props='{"titulo":"Decouvrez ProductX","subtitulo":"La solution dont vous avez besoin","cta":"Essayez gratuitement","idioma":"fr"}'
```

---

### Ejercicio 3: Crear tu Propia Skill de Marca

**Objetivo**: Crear una skill personalizada para que todos tus videos futuros sigan tu identidad visual.

**Pasos**:

1. **Tab Custom Skills**: Rellena los campos:
   - Nombre: `mi-marca`
   - Tags: brand, design-system
   - Descripcion: "Reglas de identidad visual de mi marca"

2. **Define las reglas**:
   - Colores primario y secundario (en hex)
   - Fuentes para titulos y cuerpo
   - Tipo de animaciones preferidas (springs suaves o energeticos)
   - Posicion y tamaño del logo
   - Que NUNCA debe hacer Claude

3. **Guarda el archivo** en `.agents/skills/mi-marca/SKILL.md`

4. **Prueba la skill** creando un video nuevo:
```
Crea un video de 10 segundos aplicando las reglas de la skill mi-marca.
Muestra el logo con una animacion de entrada y el slogan de la empresa.
```

5. **Verifica** que Claude aplico correctamente los colores, fuentes y estilo de tu marca.

---

### Ejercicio 4: De Template a Video Final Completo

**Objetivo**: Usar un template del dashboard, personalizarlo, iterarlo y renderizarlo.

**Pasos**:

1. **Tab Templates**: Selecciona "Anuncio/Comercial" → "Usar template"

2. **Tab Prompts**: El prompt se carga automaticamente. Personaliza:
   - Cambia los textos de ejemplo por los de tu producto real
   - Ajusta los colores a tu marca
   - Modifica las duraciones si necesitas

3. **Copia el prompt personalizado** y pegalo en Claude Code

4. **Previsualiza** en Remotion Studio

5. **Primera iteracion** - Pide a Claude:
```
Anade musica de fondo con fade in de 1 segundo y fade out de 2 segundos.
El volumen debe ser 0.3 para no tapar la voz.
Anade un archivo de audio en public/musica-fondo.mp3.
```

6. **Segunda iteracion** - Subtitulos:
```
Anade subtitulos animados usando la skill display-captions.
Los subtitulos deben aparecer sincronizados con las escenas.
Usa highlight de palabra activa en color amarillo #FFD700.
```

7. **Tab Render**: Configura H.264, CRF 16, copia y ejecuta el render final.

---

### Ejercicio 5: Dashboard de Datos Animado

**Objetivo**: Crear un video con graficos animados que muestre datos de tu negocio.

1. **Tab Config**: LinkedIn (1920x1080, 30fps, 20s)

2. **Tab Prompts**: Define estas escenas:
```
Escena 1 (0-7s): Titulo "Resultados Q1 2025" con fade in.
Tres metricas grandes con contador animado:
- Revenue: 0 → $2.4M
- Usuarios: 0 → 150K
- NPS: 0 → 87

Escena 2 (7-15s): Grafico de barras animado mostrando
revenue por mes (Ene: 600K, Feb: 800K, Mar: 1M).
Las barras crecen de abajo hacia arriba con spring({damping:100}).

Escena 3 (15-20s): Logo + texto "El futuro es brillante" + CTA.
```

3. **Tab Skills**: Consulta las skills "charts" y "text-animations" para enriquecer el prompt

4. **Anade en notas**:
```
Usa la skill de charts para los graficos de barras.
Usa interpolate con easing Easing.out(Easing.cubic) para los contadores.
Aplica la skill de stagger para que las metricas aparezcan una por una.
```

5. **Genera, previsualiza, itera y renderiza**

---

## Resumen del Curso

Has aprendido:

- **Modulo 1**: Como instalar Remotion, Claude Code y las Agent Skills
- **Modulo 2**: Las 40 skills disponibles y que hace cada una
- **Modulo 3**: Como crear videos desde cero y editar existentes con prompts
- **Modulo 4**: Tecnicas avanzadas de prompting para resultados profesionales
- **Modulo 5**: Como renderizar y exportar para cada plataforma
- **Modulo 6**: Como resolver problemas comunes
- **Modulo 7**: Referencia tecnica de APIs, formulas y parametros
- **Modulo 8**: Como usar el SuperConstructor para acelerar todo el proceso

**Tu workflow diario sera**:

```
Dashboard (Config + Prompts) → Copiar → Claude Code → Remotion Studio → Iterar → Render
```

Con practica, podras crear un video profesional completo en 10-15 minutos.

---

*SuperVideos Academy - Curso completo de creacion de videos con IA.*
*Remotion v4 + Claude Code + SuperConstructor Dashboard.*
*Para mas informacion: [remotion.dev](https://remotion.dev) | [Claude Code](https://claude.ai)*
