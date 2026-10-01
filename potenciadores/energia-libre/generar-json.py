#!/usr/bin/env python3
"""Genera energia-libre-v1.json, la entrada de la skill potenciador-de-prompts.

Uso:
  python3 generar-json.py
  node <skill>/assets/construir-potenciador.mjs energia-libre-v1.json energia-libre-potenciador-v1.html

El prompt_base se escribe aquí como texto normal y se parte en líneas,
porque la plantilla lo exige como ARRAY de líneas.
"""
import json
from pathlib import Path

AQUI = Path(__file__).parent
CIERRE = "💚 graciASAmArt 💚"

PROMPT_BASE = """{{DESTINO}}

## 🎯 OBJETIVO (por defecto; ajústalo si te lo pido)
Investigar qué dispositivos y qué conceptos de «ENERGÍA LIBRE» existen —desde lo que
mueve la naturaleza gratis hasta las máquinas que prometen más energía de la que
reciben— y organizarlo en una PRESENTACIÓN HTML autocontenida en dos partes:
  1. MAPA: listado de todo lo que hay, con una explicación corta de cada cosa.
  2. AMPLIAR: fichas que profundizan en cada concepto.
Escala: NO abastecer una ciudad; SÍ la AUTOGESTIÓN energética de casas, aldeas y
REDES LOCALES de energía. Fin último: usar la IA para fomentar estas investigaciones
y MATERIALIZARLAS (que acaben en algo que se pueda medir, prototipar o montar).

## 🧭 CÓMO TRABAJAS (innegociable)
1. Salvo que la cabecera diga «hacer ya», devuélveme PRIMERO un plan corto (objetivo ·
   bloques de investigación · orden · verificación · tiempo estimado) y espera mi OK.
2. Co-creación: tú PROPONES, yo RATIFICO. Una pregunta cada vez, con implicaciones,
   por qué sí / por qué no, y si es excluyente o acumulable.
3. Investiga con fuentes reales: cada afirmación relevante lleva enlace + fecha de
   consulta. Lo que no puedas verificar, márcalo «sin verificar». NUNCA inventes una
   referencia, una patente, una cifra ni un testimonio.
4. Español de España, directo, sin paja. Explícame cada término técnico nuevo en una
   línea.

## 🔍 COMPRENSIÓN CERTIFICADA (léela ANTES que nada — corrige tu lectura por defecto)
{{ACLARACIONES}}

## 🟡 DECISIONES RATIFICADAS EN ESTA SESIÓN (desde el potenciador HTML v1)
{{DECISIONES}}

### Mejoras extra activadas en esta sesión
{{EXTRAS}}

## ✅ YA DICHO POR MÍ (respétalo, NO lo reabras)
- Escala: autogestión energética y redes locales, no abastecer ciudades.
- Formato: presentación en HTML en dos partes (mapa con explicación corta → ampliar).
- El bombeo de agua cuenta como ACUMULACIÓN, dentro de la familia del agua.
- Quiero usar la IA para fomentar estas investigaciones y materializarlas.

## 🗺️ QUÉ INVESTIGAR (el catálogo de partida, con mis palabras)
A. LO QUE MUEVE LA NATURALEZA — el agua como motor
   - Turbinas que mueven ríos, regueros, arroyos, mareas y embalses (micro y pico
     hidráulica, turbinas de río sin presa, mareomotriz).
   - El agua como ACUMULACIÓN: subirla cuando sobra energía y turbinarla al bajar
     (bombeo, «batería de agua»), también a escala pequeña.
B. MÁQUINAS GENERADORAS MECÁNICAS Y MAGNÉTICAS
   - Motores y generadores de imanes permanentes.
   - Máquinas con poleas, impulsos, muelles, volantes… que aprovechan otras energías
     para generar electricidad.
C. PLASMA Y MaGrav — FUNDACIÓN KESHE (Mehran T. Keshe)
   - Unidades MaGrav, GANS («gas en estado nano»), bobinas nano-recubiertas y los
     accesorios que se vendían para «crear un campo sin resistencia».
   - Qué promete, qué se ha medido de forma independiente y su recorrido documentado.
D. TESLA
   - La torre Wardenclyffe y la transmisión inalámbrica de energía.
   - Todo lo de «energía libre» que se le atribuye: qué es suyo y está documentado, y
     qué es leyenda posterior.
E. TODO LO DEMÁS que se llame «energía libre» y merezca estar en el mapa.

## 🔬 RIGOR (guardarraíles — no negociables)
- Separa SIEMPRE dos sentidos de «energía libre»: (1) energía gratuita que la
  naturaleza ya mueve —ingeniería probada— y (2) máquinas que dicen dar más energía de
  la que reciben. Para las (2), di claramente si contradicen la conservación de la
  energía, si hay réplicas independientes y si hay fraude documentado.
- Respeto sin propaganda y sin burla: cuenta la historia, la promesa y la evidencia.
- Cifras con unidades y fuente: kW (potencia), kWh/año (energía), rendimiento en %.
- Seguridad: avisa de los riesgos (alta tensión en bobinas Tesla, presión y caudal en
  turbinas) y de los permisos necesarios para usar el agua de ríos y regueros.
- Si algo no lo encuentras, dilo. Un hueco honesto vale más que un dato inventado.

## 📦 ENTREGABLES
1. PRESENTACIÓN HTML autocontenida (sin servidor, se abre con doble clic):
   portada → MAPA (listado con explicación corta) → AMPLIAR (una ficha por concepto:
   qué es · cómo funciona · escala · coste orientativo · evidencia · fuentes ·
   siguiente paso para materializarlo) → cierre.
2. TABLA DE FUENTES: enlace, tipo (paper, patente, prensa, web del autor) y fecha.
3. «POR DÓNDE EMPEZAR»: los 3 conceptos más prometedores para la autogestión, con el
   primer experimento o prototipo de cada uno.

{{CIERRE_DESTINO}}"""


def op(id_, tipo, titulo, descripcion, resumen, consecuencia, resultado, nota=None, etiqueta=None):
    o = {"id": id_, "tipo": tipo, "titulo": titulo, "descripcion": descripcion,
         "resumen": resumen, "consecuencia": consecuencia, "resultado": resultado}
    if nota:
        o["nota"] = nota
    if etiqueta:
        o["etiqueta"] = etiqueta
    return o


datos = {
    "id": "energia-libre-v1",
    "titulo": "Energía libre — Potenciador v1",
    "titulo_html": "Energía libre — <span class=\"k\">Potenciador v1</span>",
    "subtitulo": "Primera vuelta al prompt de investigación: certifica lo entendido, elige el destino, "
                 "ratifica cómo tratar lo no demostrado, el alcance, el territorio, el formato y el público, "
                 "y llévate el prompt —o la partitura por fases— listo para pegar.",
    "tags": ["🟡 5 decisiones", "🔍 7 certificaciones", "🧭 4 destinos", "🟢 7 mejoras extra",
             "🎼 partitura de 6 fases", "⚡ v1 · 2026-10-01"],
    "explicacion": {
        "objetivo": "Investigar qué dispositivos y conceptos de <strong>energía libre</strong> existen —desde "
                    "lo que mueve la naturaleza gratis (ríos, regueros, mareas, embalses, bombeo) hasta las "
                    "máquinas que prometen más de lo que reciben (imanes, poleas, muelles, MaGrav, Tesla)— y "
                    "presentarlo en un <strong>HTML en dos partes</strong>: mapa con explicación corta y fichas "
                    "para ampliar. Escala: <strong>autogestión y redes locales</strong>, no ciudades.",
        "mecanica": "Investigación con fuentes citadas → clasificación por nivel de evidencia → presentación "
                    "HTML autocontenida. Él <strong>propone</strong>, tú <strong>ratificas</strong>, una pregunta "
                    "cada vez. Nada se da por bueno sin enlace y fecha.",
        "contexto": [
            "Sin ficheros previos: investigación desde cero con fuentes web citadas",
            "Fundación Keshe (MaGrav, GANS, plasma) — keshe.foundation + condena por fraude, Kortrijk (Bélgica), 2017",
            "Tesla — torre Wardenclyffe (1901-1917), transmisión inalámbrica",
            "Territorio piloto opcional: Omaña (León), cuenca del Duero",
            "Ecosimía: Superfrecuencia · RuralMakers · SuperCursos",
        ],
        "flujo": ["Plan corto", "Tu OK", "Mapa con evidencia", "Fichas con fuentes",
                  "Presentación HTML", "Verificar con otro modelo", "Elegir el primer experimento"],
        "entregables": [
            "<strong>Presentación HTML</strong>: portada → mapa (listado con explicación corta) → fichas ampliadas → cierre.",
            "<strong>Tabla de fuentes</strong> con enlace, tipo y fecha de consulta.",
            "<strong>«Por dónde empezar»</strong>: los 3 conceptos más prometedores para la autogestión y su primer experimento.",
        ],
    },
    "certificaciones": [
        {"id": "c1", "afirmacion": "El corazón NO es abastecer una ciudad: es la <strong>autogestión</strong> de una casa, "
                                   "una aldea o una red local. Cada concepto se valora por si lo puede montar, mantener "
                                   "o compartir una comunidad pequeña."},
        {"id": "c2", "afirmacion": "«Energía libre» aquí significa DOS cosas que la presentación debe separar: (a) energía "
                                   "que la naturaleza mueve gratis —agua, mareas, viento, sol—, que es ingeniería probada, "
                                   "y (b) máquinas que prometen dar más energía de la que reciben, que se presentan con su "
                                   "historia y su estado real de evidencia."},
        {"id": "c3", "afirmacion": "El bombeo (subir agua cuando sobra energía y turbinarla cuando falta) entra como "
                                   "<strong>acumulación</strong>, no como generación: es una batería de agua que devuelve "
                                   "menos de lo que se le mete, pero que hace posible la autogestión."},
        {"id": "c4", "afirmacion": "La fundación de los MaGrav es la <strong>Fundación Keshe</strong> (Mehran T. Keshe): "
                                   "GANS, plasma y unidades MaGrav vendidas como accesorios. Se investiga su propuesta "
                                   "<strong>y</strong> su recorrido documentado, incluida la condena por fraude en Bélgica "
                                   "(2017), sin burla y sin propaganda."},
        {"id": "c5", "afirmacion": "Tesla entra por dos puertas que no se mezclan: lo que hizo de verdad (corriente alterna, "
                                   "bobina, transmisión inalámbrica, Wardenclyffe) y la leyenda de «energía libre» que se le "
                                   "atribuye después."},
        {"id": "c6", "afirmacion": "El formato es una <strong>presentación</strong> en HTML: primero un listado-mapa de "
                                   "todo con una explicación corta de cada cosa, y después la parte de ampliar conceptos."},
        {"id": "c7", "afirmacion": "La IA no está para opinar sobre si «funciona o no», sino para <strong>fomentar y "
                                   "materializar</strong>: cada concepto prometedor acaba en un siguiente paso concreto "
                                   "(medir, prototipar, replicar o montar)."},
    ],
    "destinos": [
        {"id": "orquestador", "icono": "🎼", "titulo": "Orquestador + subagentes",
         "descripcion": "Opus acota y planifica; subagentes Sonnet investigan cada familia en paralelo; un auditor "
                        "de contexto limpio verifica fuentes y clasificación.",
         "cabecera": ["# ORQUESTADOR OPUS — INVESTIGACIÓN «ENERGÍA LIBRE» → PRESENTACIÓN HTML",
                      "# Patrón: plan-and-delegate. Tú acotas y planificas; delegas la investigación por familias",
                      "# en subagentes Sonnet en paralelo y auditas cada ficha con un subagente de contexto limpio."],
         "cierre": ["Empieza por el PLAN CORTO (objetivo · bloques de investigación · reparto en subagentes ·",
                    "verificación · tiempo estimado). Espera mi OK antes de investigar a fondo.", CIERRE]},
        {"id": "sdd", "icono": "📐", "titulo": "SDD primero",
         "descripcion": "Especificar antes de construir: mapa de conceptos, estructura de cada ficha y criterios "
                        "de aceptación. Nada de HTML todavía.",
         "cabecera": ["# SDD — ESPECIFICAR LA PRESENTACIÓN «ENERGÍA LIBRE» (no construir todavía)",
                      "# Tu trabajo es dejar claro QUÉ se investiga y CÓMO se presenta, con criterios comprobables."],
         "cierre": ["Entrega la especificación: listado-mapa con una línea por concepto, estructura de ficha,",
                    "criterios de clasificación, fuentes candidatas y criterios de aceptación de la presentación.",
                    "NO construyas el HTML. Espera mi OK. " + CIERRE]},
        {"id": "hacer-ya", "icono": "⚡", "titulo": "Hacer YA",
         "descripcion": "Plan de 5 líneas y a investigar y construir en una sola sesión. Para una primera versión rápida.",
         "cabecera": ["# HACER YA — INVESTIGA Y CONSTRUYE LA PRESENTACIÓN «ENERGÍA LIBRE»",
                      "# Plan de 5 líneas, sin esperar más OK, y a construir."],
         "cierre": ["Dame el plan de 5 líneas y ponte a ello. Entrega el HTML + la tabla de fuentes",
                    "y dime qué ha quedado como hueco. " + CIERRE]},
        {"id": "skill", "icono": "🧬", "titulo": "Convertir en skill",
         "descripcion": "Empaquetar el método (investigar → clasificar por evidencia → presentar) como skill "
                        "reutilizable para cualquier tema.",
         "cabecera": ["# CONVERTIR EN SKILL — «investigador-con-semaforo» reutilizable",
                      "# Diseña la skill a partir de este caso; «energía libre» es su primera prueba."],
         "cierre": ["Entrega SKILL.md + plantilla HTML + este caso como ejemplo. Prueba la skill con el tema",
                    "y dime qué falló. Espera mi OK antes de instalarla. " + CIERRE]},
    ],
    "destino_defecto": "orquestador",
    "decisiones": [
        {"id": "d1", "titulo": "Cómo tratar lo no demostrado",
         "pregunta": "¿Cómo presenta la investigación los dispositivos que prometen más energía de la que reciben?",
         "defecto": "pot1",
         "opciones": [
             op("esperado", "esperado", "Divulgativo con nota",
                "Cada dispositivo se cuenta como lo cuentan sus defensores, con una nota breve de «no demostrado» cuando toque.",
                "Tono divulgativo: cada dispositivo se explica como lo cuentan sus defensores, con una nota breve de «no demostrado» cuando corresponda.",
                "La presentación es amable y rápida de hacer, pero lo probado y lo prometido pesan visualmente igual.",
                "Un catálogo legible donde tendrás que fiarte de las notas para separar lo real de lo prometido.",
                nota="Lo más cómodo; el riesgo es que alguien se lleve una idea equivocada."),
             op("pot1", "potenciado", "Semáforo de evidencia",
                "Cada concepto lleva un color con su porqué y su fuente: 🟢 probado y en el mercado · 🟡 real pero con "
                "matices (rendimiento, coste, escala) · 🟠 afirmaciones sin réplica independiente · 🔴 contradice la "
                "conservación de la energía o tiene fraude documentado.",
                "Semáforo de evidencia en cada concepto, con porqué y fuente: 🟢 probado y comercial · 🟡 real con matices "
                "(rendimiento, coste, escala) · 🟠 sin réplica independiente · 🔴 contradice la conservación de la energía "
                "o tiene fraude documentado.",
                "Cada ficha necesita una fuente que justifique su color: la investigación es más lenta, pero sólida.",
                "De un vistazo sabrás en qué invertir tiempo y dinero, y qué es todavía una promesa.",
                nota="Preseleccionado: sin él, el mapa mezcla ingeniería probada con promesas."),
             op("pot2", "potenciado", "Semáforo + laboratorio abierto",
                "Todo lo anterior y, para cada 🟠, un <strong>protocolo de verificación casero</strong>: qué medir "
                "(energía que entra frente a la que sale), con qué aparatos, durante cuánto tiempo y qué resultado lo "
                "confirmaría o lo descartaría.",
                "Semáforo de evidencia + para cada concepto 🟠 un protocolo de verificación casero: qué medir (energía de "
                "entrada frente a salida), con qué instrumentos, cuánto tiempo y qué resultado lo confirmaría o lo descartaría.",
                "Añade una sección práctica por dispositivo dudoso; exige algo de medición eléctrica básica.",
                "La curiosidad se convierte en ciencia ciudadana: podrás comprobar tú mismo lo que prometen.",
                nota="El que más encaja con «materializar»: ni creer ni descartar, medir."),
         ]},
        {"id": "d2", "titulo": "Alcance del catálogo",
         "pregunta": "¿Qué familias entran en el mapa inicial?",
         "defecto": "ratificado",
         "opciones": [
             op("ratificado", "ratificado", "Las cuatro familias que nombraste",
                "Agua y naturaleza (ríos, regueros, mareas, embalses, bombeo) · máquinas de imanes, poleas, muelles e "
                "impulsos · plasma y MaGrav (Keshe) · Tesla.",
                "Catálogo: las cuatro familias que nombré — agua y naturaleza (ríos, regueros, mareas, embalses y bombeo "
                "como acumulación), máquinas de imanes/poleas/muelles/impulsos, plasma y MaGrav (Fundación Keshe) y Tesla.",
                "Investigación centrada y abarcable; el mix real para autogestionarte se queda corto (sin sol ni viento).",
                "Un mapa fiel a tu curiosidad de partida, con cuatro bloques bien trabajados.",
                nota="Es lo que dijiste. Los potenciados lo amplían.", etiqueta="Tu aporte en sesión"),
             op("pot1", "potenciado", "+ Todo lo que la naturaleza mueve gratis",
                "Tus cuatro familias + viento (minieólica), sol (fotovoltaica y térmica), biomasa y biogás, geotermia "
                "somera, <strong>ariete hidráulico</strong> (bombea agua sin electricidad, con la fuerza del propio agua) "
                "y turbinas de vórtice para ríos pequeños.",
                "Las cuatro familias + el resto de lo que la naturaleza mueve gratis: minieólica, fotovoltaica y solar "
                "térmica, biomasa/biogás, geotermia somera, ariete hidráulico y turbinas de vórtice para ríos pequeños.",
                "El mapa crece bastante y la parte probada gana peso frente a la especulativa.",
                "Tendrás el abanico completo para diseñar un mix real de autogestión, no solo lo llamativo.",
                nota="Recomendado si el fin es autogestionarse de verdad."),
             op("pot2", "potenciado", "+ Los históricos de la «energía libre»",
                "Tus cuatro familias + los casos clásicos: Moray (energía radiante), Hendershot, Testatika (Methernitha), "
                "el SEG de Searl, Bedini, Perendev, la celda de agua de Stanley Meyer… cada uno con su historia y su "
                "estado de evidencia.",
                "Las cuatro familias + los casos históricos de «energía libre» (Moray, Hendershot, Testatika/Methernitha, "
                "SEG de Searl, Bedini, Perendev, celda de agua de Stanley Meyer…), cada uno con historia y estado de evidencia.",
                "Más investigación histórica y más dispositivos que clasificar con cuidado; poco aporte práctico.",
                "Un mapa completo del movimiento de la energía libre: sabrás de dónde viene cada idea que circula.",
                nota="Para entender el fenómeno; casi nada de esto se puede montar hoy."),
             op("pot3", "potenciado", "Todo + almacenamiento y redes",
                "Lo anterior + cómo se <strong>guarda</strong> y se <strong>comparte</strong> la energía: baterías, "
                "volantes de inercia, almacenamiento gravitatorio, hidrógeno verde, microrredes y comunidades energéticas.",
                "Catálogo completo (cuatro familias + renovables + históricos) + almacenamiento (baterías, volantes de "
                "inercia, gravitatorio, hidrógeno verde) y cómo se conecta todo en microrredes y comunidades energéticas.",
                "Es el alcance más grande: conviene seguir la partitura por fases con subagentes en paralelo.",
                "Una visión de sistema: generar, acumular y repartir energía en una red local.",
                nota="El más ambicioso. Pide destino orquestador."),
         ]},
        {"id": "d3", "titulo": "Aterrizaje en el territorio",
         "pregunta": "¿Cuánto aterriza la investigación en un lugar y en una forma de organizarse concretos?",
         "defecto": "esperado",
         "opciones": [
             op("esperado", "esperado", "Genérico",
                "Conceptos válidos en cualquier lugar, a escala de casa y aldea, sin un territorio concreto.",
                "Enfoque genérico: conceptos válidos en cualquier lugar, a escala de casa y aldea.",
                "Sirve para cualquiera que vea la presentación, pero no aterriza en decisiones tuyas.",
                "Una presentación reutilizable, sin trámites ni números de un lugar concreto."),
             op("pot1", "potenciado", "Anclado a Omaña",
                "Cada concepto de agua se mira con el caso de Omaña (León): ríos, regueros, <strong>antiguos "
                "molinos</strong> rehabilitables como microcentrales, estacionalidad del caudal y qué trámites pide la "
                "Confederación Hidrográfica del Duero para usar el agua.",
                "Anclado a Omaña (León): ríos, regueros y antiguos molinos rehabilitables como microcentrales, "
                "estacionalidad del caudal y trámites ante la Confederación Hidrográfica del Duero para usar el agua "
                "(con fuente y fecha).",
                "Hay que investigar normativa y datos locales; algunos solo se consiguen preguntando en la zona.",
                "Sabrás qué se puede montar en tu valle, con qué permisos y por dónde empezar.",
                nota="Revitalización rural pura: encaja con RuralMakers."),
             op("pot2", "potenciado", "Omaña + red local de energía",
                "Lo anterior + cómo montar una <strong>comunidad energética</strong> o un autoconsumo compartido en España "
                "(figuras legales vigentes, distancias, reparto entre vecinos) con el esquema de una microrred de aldea.",
                "Anclado a Omaña + cómo montar una comunidad energética o un autoconsumo compartido en España (figuras "
                "legales vigentes, distancias, reparto entre vecinos) con el esquema de una microrred de aldea.",
                "Suma una parte legal y organizativa que cambia con la normativa: habrá que fecharla.",
                "Un camino de la idea a una red de energía vecinal real, con sus pasos legales.",
                nota="Ecosimía: la energía como bien común."),
         ]},
        {"id": "d4", "titulo": "Formato de la presentación",
         "pregunta": "¿Cómo se ve y cómo se navega el HTML?",
         "defecto": "esperado",
         "opciones": [
             op("esperado", "esperado", "Página única con scroll",
                "Portada, mapa, fichas y cierre en una sola página que se recorre bajando.",
                "Formato: página HTML única con scroll (portada → mapa → fichas → cierre), autocontenida.",
                "Lo más rápido de construir y de imprimir; menos efecto en una charla.",
                "Un documento web largo que se lee como un informe."),
             op("pot1", "potenciado", "Modo diapositivas",
                "Navegación con flechas y teclado, una idea por pantalla, <strong>modo presentador</strong> con notas y "
                "una vista «listado» para imprimir.",
                "Formato diapositivas: navegación con flechas/teclado, una idea por pantalla, modo presentador con notas "
                "y vista listado imprimible; autocontenido.",
                "Más trabajo de maquetación; cada ficha tiene que caber en una pantalla.",
                "Una presentación lista para proyectar en una charla o grabar para un curso."),
             op("pot2", "potenciado", "Diapositivas + mapa interactivo",
                "Lo anterior + un <strong>mapa conceptual clicable</strong> (familias → conceptos → fichas) con filtros "
                "por nivel de evidencia, escala (casa · aldea · comarca) y coste.",
                "Diapositivas + mapa conceptual clicable (familias → conceptos → fichas) con filtros por nivel de "
                "evidencia, escala (casa/aldea/comarca) y coste.",
                "Hace falta un modelo de datos de los conceptos (un JSON) y más JavaScript.",
                "Una herramienta de exploración: cada cual busca lo que le sirve en vez de tragarse toda la charla.",
                nota="Reutilizable como superapp más adelante."),
         ]},
        {"id": "d5", "titulo": "Para quién es",
         "pregunta": "¿A quién le habla la presentación?",
         "defecto": "esperado",
         "opciones": [
             op("esperado", "esperado", "Para ti: cuaderno de investigación",
                "Tono directo y técnico cuando haga falta; es tu material de trabajo.",
                "Público: yo mismo; cuaderno de investigación con tono directo y técnico cuando haga falta.",
                "Se puede ir rápido y profundo; no está pensada para que la entienda cualquiera.",
                "Tu base de conocimiento para decidir qué investigar y qué montar."),
             op("pot1", "potenciado", "Divulgación para la comunidad",
                "Para una charla en la aldea o en una asociación: lenguaje claro, sin ecuaciones, con equivalencias "
                "cotidianas (cuántas bombillas, cuántas casas).",
                "Público: comunidad local; lenguaje claro, sin ecuaciones, con equivalencias cotidianas (bombillas, "
                "casas, meses de luz).",
                "Cada dato técnico necesita traducirse a algo cotidiano; se pierde algo de precisión.",
                "Algo que puedes presentar en un concejo o una asociación y que todo el mundo entiende."),
             op("pot2", "potenciado", "Material de SuperCurso",
                "Lo anterior + cada bloque acaba con una pregunta o un ejercicio, y la presentación sirve de lección "
                "para SuperCursos o Superfrecuencia.",
                "Público: comunidad + alumnado; cada bloque acaba con una pregunta o un ejercicio y la presentación "
                "sirve de lección para SuperCursos/Superfrecuencia.",
                "Hay que diseñar ejercicios y objetivos de aprendizaje además del contenido.",
                "Producto y curso a la vez: la investigación se convierte en una lección que se puede ofrecer.",
                nota="Ecosimía: todo es producto y curso a la vez."),
         ]},
    ],
    "extras": [
        {"id": "calc-hidro", "titulo": "Calculadora de microcentral",
         "descripcion": "Metes caudal (l/s) y salto (m) y te da potencia (kW) y energía al año (kWh), con la fórmula "
                        "P = η·ρ·g·Q·H explicada paso a paso."},
        {"id": "diagramas", "titulo": "Diagramas de funcionamiento",
         "descripcion": "Esquemas SVG de cómo funciona cada máquina: turbina, ariete hidráulico, bombeo, bobina de "
                        "Tesla y unidad MaGrav (tal como la describe la propia fundación)."},
        {"id": "glosario", "titulo": "Glosario mínimo",
         "descripcion": "kW frente a kWh, rendimiento, COP, conservación de la energía, «sobreunidad», salto, caudal… "
                        "una línea cada uno."},
        {"id": "linea-tiempo", "titulo": "Línea del tiempo",
         "descripcion": "De Tesla a Keshe y de los molinos a las comunidades energéticas: cuándo apareció cada idea y "
                        "qué pasó con ella."},
        {"id": "replicables", "titulo": "Fichas de proyectos replicables",
         "descripcion": "Para lo 🟢 y 🟡: qué hace falta, coste orientativo, dificultad y tiempo para montarlo en casa "
                        "o en la aldea."},
        {"id": "prompts-ia", "titulo": "Banco de prompts para seguir investigando",
         "descripcion": "Un prompt por concepto para profundizar con IA: patentes, réplicas independientes, papers y "
                        "proyectos parecidos."},
        {"id": "patentes", "titulo": "Rastreo de patentes",
         "descripcion": "Para cada dispositivo, sus patentes en Google Patents o Espacenet: número, estado y qué "
                        "protege realmente."},
    ],
    "lecciones": [
        {"titulo": "Separa lo probado de lo prometido",
         "texto": "Un prompt de investigación sin criterio de evidencia devuelve un catálogo donde todo pesa igual. "
                  "Pide la clasificación de forma explícita y la fuente de cada afirmación."},
        {"titulo": "Fuentes con enlace y fecha",
         "texto": "La IA puede inventar referencias que suenan bien. Exige enlace + fecha de consulta y que marque "
                  "«sin verificar» lo que no tenga fuente."},
        {"titulo": "Primero el mapa, luego el territorio",
         "texto": "El listado corto antes de ampliar te deja decidir qué merece profundizar, sin gastar horas ni "
                  "tokens en lo que no te interesa."},
        {"titulo": "Nombra lo que no recuerdas como hueco",
         "texto": "«La fundación de los MaGrav, acabada en V…» era un hueco declarado, y la certificación lo resuelve "
                  "(Keshe). Un hueco declarado se resuelve; uno escondido se inventa."},
        {"titulo": "La escala cambia la respuesta",
         "texto": "«No para una ciudad, sí para autogestión» cambia qué tecnologías importan. Sin escala, la IA te "
                  "habla de centrales de cientos de megavatios."},
        {"titulo": "Del interés al experimento",
         "texto": "Cierra cada bloque con un siguiente paso que se pueda medir. Así la investigación se materializa "
                  "en vez de quedarse en opinión."},
    ],
    "anatomia": [
        {"etiqueta": "🎯 Objetivo", "patron": "## 🎯 OBJETIVO"},
        {"etiqueta": "🧭 Cómo trabajas", "patron": "## 🧭 CÓMO TRABAJAS"},
        {"etiqueta": "🔍 Comprensión certificada", "patron": "## 🔍 COMPRENSIÓN CERTIFICADA"},
        {"etiqueta": "🟡 Decisiones", "patron": "## 🟡 DECISIONES"},
        {"etiqueta": "✅ Ya dicho", "patron": "## ✅ YA DICHO"},
        {"etiqueta": "🗺️ Qué investigar", "patron": "## 🗺️ QUÉ INVESTIGAR"},
        {"etiqueta": "🔬 Rigor y fuentes", "patron": "## 🔬 RIGOR"},
        {"etiqueta": "📦 Entregables", "patron": "## 📦 ENTREGABLES"},
        {"etiqueta": "💚 Cierre graciASAmArt", "patron": "graciASAmArt"},
    ],
    "prompt_base": PROMPT_BASE.split("\n"),
    "cierre": "Sé el cambio que quieres ver en el mundo. → " + CIERRE,
    "partitura": {
        "carpeta_base": "C:/Users/alimu/claude/energia-libre",
        "shell_defecto": "powershell",
        "prefijo": "S",
        "proceso": [
            "Cada sesión es una terminal nueva: abres la carpeta, lanzas el comando y el prompt entra solo. Al acabar, se cierra.",
            "Carpeta nueva y pequeña (energia-libre): no necesita la memoria de otros proyectos y todo lo investigado queda junto.",
            "Verifica un modelo distinto del que investigó: GPT vía Codex revisa lo que hizo Claude.",
        ],
        "fases": [
            {"id": "f0", "orden": 0, "nombre": "Ratificar en el potenciador",
             "proposito": "Abrir este HTML, certificar lo entendido, ratificar las decisiones y copiar el prompt.",
             "modo": "manual",
             "puerta_salida": "Prompt reconstruido copiado con 0 matices pendientes de redactar."},
            {"id": "f1", "orden": 1, "nombre": "Mapa y especificación (SDD)",
             "proposito": "Hacer el listado-mapa con explicación corta y especificar la presentación, sin construir nada.",
             "destino": "sdd", "modelo": "opus", "potencia": "high", "permisos": "plan", "modo": "interactivo",
             "herramientas": ["WebSearch", "WebFetch", "Read", "Glob", "Grep"],
             "puerta_entrada": "Fase 0 hecha.",
             "puerta_salida": "Listado-mapa con nivel de evidencia y fuente por concepto + índice de la presentación, aprobados por ti.",
             "por_que_carpeta": "Carpeta del proyecto, vacía al principio: no hace falta memoria de otros proyectos."},
            {"id": "f2", "orden": 2, "nombre": "Investigar a fondo",
             "proposito": "Investigar cada concepto aprobado y escribir su ficha con fuentes.",
             "destino": "orquestador", "modelo": "opus", "potencia": "high", "permisos": "acceptEdits",
             "modo": "interactivo",
             "herramientas": ["WebSearch", "WebFetch", "Read", "Write", "Edit", "Glob", "Grep", "Agent"],
             "puerta_entrada": "Mapa aprobado en la fase 1.",
             "puerta_salida": "Una ficha .md por concepto en fichas/ + fuentes.md con enlace y fecha de cada fuente.",
             "prompt_extra": [
                 "FASE 2 — Investiga a fondo SOLO los conceptos aprobados en la fase 1.",
                 "Reparte por familias (agua · máquinas · plasma/Keshe · Tesla · resto) en subagentes Sonnet en paralelo.",
                 "Escribe una ficha por concepto en fichas/<concepto>.md y todas las fuentes en fuentes.md.",
                 "Audita cada ficha con un subagente de contexto limpio antes de darla por buena.",
             ],
             "por_que_carpeta": "Aquí se escriben fichas/ y fuentes.md; acceptEdits solo en esta carpeta de trabajo."},
            {"id": "f3", "orden": 3, "nombre": "Construir la presentación",
             "proposito": "Maquetar la presentación HTML a partir de las fichas.",
             "destino": "hacer-ya", "modelo": "sonnet", "potencia": "high", "permisos": "acceptEdits",
             "modo": "interactivo",
             "herramientas": ["Read", "Write", "Edit", "Glob", "Grep"],
             "puerta_entrada": "fichas/ y fuentes.md completos.",
             "puerta_salida": "energia-libre.html se abre con doble clic, sin errores en consola, con mapa + fichas + fuentes.",
             "prompt_extra": [
                 "FASE 3 — Construye energia-libre.html a partir de fichas/ y fuentes.md.",
                 "No investigues de nuevo: si falta algo, márcalo como hueco y sigue.",
             ],
             "por_que_carpeta": "Lee fichas/ y escribe el HTML junto a ellas."},
            {"id": "f4", "orden": 4, "nombre": "Verificar con otros ojos",
             "proposito": "Que un modelo distinto revise fuentes, clasificación y cifras sin tocar nada.",
             "cli": "codex", "modelo": "gpt-5.6-terra", "potencia": "medium", "permisos": "plan",
             "modo": "interactivo",
             "puerta_entrada": "energia-libre.html construido.",
             "puerta_salida": "Tabla de problemas entregada; los graves, corregidos en una pasada de la fase 3.",
             "prompt_propio": [
                 "# VERIFICADOR (otro modelo, otra casa) — PRESENTACIÓN «ENERGÍA LIBRE»",
                 "Lee energia-libre.html, fichas/ y fuentes.md de esta carpeta. NO edites nada: solo informa.",
                 "Comprueba:",
                 "1. Cada concepto tiene nivel de evidencia y al menos una fuente con fecha.",
                 "2. Ningún dispositivo sin réplica independiente se presenta como tecnología lista para usar.",
                 "3. Las cifras llevan unidades y no confunden kW (potencia) con kWh (energía).",
                 "4. Los enlaces existen; si no puedes abrirlos, márcalos «no comprobado», nunca «válido».",
                 "5. Hay avisos de seguridad y de permisos donde toca.",
                 "Entrega una tabla: concepto · problema · gravedad · arreglo propuesto.",
                 "",
                 "Contexto de lo que se pidió:",
                 "{{PROMPT_RECONSTRUIDO}}",
             ],
             "nota": "Si tu Codex no tiene la búsqueda web activada, los enlaces saldrán «no comprobados»: es lo correcto, no un fallo.",
             "por_que_carpeta": "Solo lectura sobre la carpeta del proyecto."},
            {"id": "f5", "orden": 5, "nombre": "Elegir el primer experimento",
             "proposito": "Con la presentación y el «por dónde empezar», elegir UN concepto para materializar y ponerle fecha.",
             "modo": "manual",
             "puerta_entrada": "Verificación hecha.",
             "puerta_salida": "Un experimento elegido, con material, sitio y fecha."},
        ],
    },
}

salida = AQUI / "energia-libre-v1.json"
salida.write_text(json.dumps(datos, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
print("JSON escrito:", salida)
