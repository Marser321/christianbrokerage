# BCL - Paquete de Prompts HighLevel/Vibe

Documento operativo para construir la landing BCL dentro de HighLevel/Vibe como destino de campanas. El objetivo no es crear una home institucional larga, sino una pagina comercial corta, elegante y confiable que herede la direccion visual de Christian Brokerage y convierta trafico pagado en leads medibles.

## Como usar este paquete

1. Copia el Prompt 0 primero para fijar contexto de marca.
2. Ejecuta los Prompts 1 a 5 en orden.
3. Usa el Prompt 6 despues de ver el primer resultado generado por HighLevel/Vibe.
4. Para la variante VSL / Video Sales Letter, usa los Prompts 7 y 8.
5. Para la pagina general de gracias post-agenda, usa los Prompts 9 y 10.
6. Antes de publicar, corre el checklist final de QA y tracking.

## Variables a completar

```txt
BCL_PAGE_URL="[URL final de la landing]"
BCL_LOGO_LIGHT="[logo BCL para fondos claros]"
BCL_LOGO_DARK="[logo BCL para fondos oscuros]"
HERO_IMAGE_OR_VIDEO="[foto real o video corto del equipo/oficina/cliente/contexto local]"
GHL_LOCATION_ID="[HighLevel Location ID]"
GHL_MAIN_FORM_ID="[ID interno si se usa form nativo como referencia, no iframe principal]"
GHL_EXTERNAL_TRACKING_SCRIPT="[script de External Tracking si aplica]"
META_PIXEL_ID="[Meta Pixel ID]"
GTM_ID="[Google Tag Manager ID]"
THANK_YOU_URL="[URL de thank-you o estado de confirmacion]"
WHATSAPP_NUMBER="[numero WhatsApp con pais, sin simbolos]"
PRIMARY_OFFER="[oferta principal de la campana]"
PRIMARY_SERVICE="[seguros, taxes, inmigracion/orientacion, o servicio especifico]"
CAMPAIGN_INTENT="[intencion de campana: cotizar, consulta, orientacion, revision, etc.]"
GHL_CALENDAR_URL="[URL del calendario principal de GoHighLevel]"
VSL_VIDEO_URL="[URL del video cuando este listo]"
VSL_POSTER_IMAGE="[foto de la persona/presentadora o imagen editorial temporal]"
VSL_PRESENTER_NAME="[nombre de la persona que aparece en el video/foto]"
VSL_STATUS="[placeholder | live]"
GENERAL_THANK_YOU_URL="[URL de la pagina general de gracias]"
MAIN_WEBSITE_URL="[URL del sitio principal Christian Brokerage o BCL]"
SUPPORT_CONTACT_LABEL="[texto de soporte: WhatsApp, telefono o email]"
SUPPORT_CONTACT_URL="[link de soporte secundario]"
RESCHEDULE_INSTRUCTIONS="[texto breve para cambiar o cancelar cita, si aplica]"
APPOINTMENT_CONFIRMATION_WINDOW="[ej. revisa tu email/SMS en los proximos minutos]"
```

## Estandar BCL

- BCL debe sentirse como una extension premium de Christian Brokerage, no como una landing generica.
- Conversion principal: formulario HighLevel visible en DOM.
- CTA secundario: WhatsApp.
- Audiencia principal: comunidad hispana en Nueva York y Estados Unidos, familias, trabajadores independientes, conductores TLC, pequenos negocios y personas que necesitan orientacion clara.
- Estilo: Editorial Humano. Serio, cercano, local, profesional, con profundidad visual y ritmo editorial.
- Paleta base: navy, gold, paper, warm white, slate.
- Fotografia: real, humana, con rostros, documentos, oficina, manos, contexto local o situaciones creibles.
- Evitar: gradientes genericos de plantilla, orbs decorativos, exceso de cards, copy inflado, promesas imposibles, fotos stock frias, hero que parezca SaaS, iframes como via principal del lead.

---

# Prompt 0 - Brand Context Capsule

Usa este prompt como primer mensaje dentro de HighLevel/Vibe para fijar la direccion de marca.

```txt
Actua como director creativo, UX strategist y frontend designer senior. Vamos a construir una landing llamada BCL dentro de HighLevel/Vibe. Esta landing sera usada para campanas de venta y captura de leads. No es una home institucional completa: es una pagina comercial corta, clara, premium y muy confiable.

Contexto de marca:
- BCL debe sentirse como una extension de Christian Brokerage.
- La marca madre transmite confianza local, profesionalismo humano y acompanamiento real.
- Los servicios se relacionan con seguros, taxes e inmigracion/orientacion administrativa.
- La audiencia principal es comunidad hispana en NY/USA: familias, trabajadores independientes, conductores TLC, pequenos negocios, personas que necesitan resolver tramites con seguridad y sin confusion.
- El tono debe ser directo, calido, profesional, bilingue cuando aporte valor, pero con espanol como idioma principal.

Direccion visual:
- Estilo: Editorial Humano.
- Sensacion: oficina boutique seria, cercana, con presencia local y calidad premium.
- Colores base:
  - Ink navy: #071827
  - Deep navy: #0d2a44
  - Brand blue: #1f5c9a
  - Gold: #b9913f
  - Soft gold: #dfc47a
  - Paper: #f7f3ea
  - Warm white: #fffaf0
  - Slate: #334155
  - Border: rgba(7, 24, 39, 0.12)
- Tipografia sugerida si el builder lo permite:
  - Display/editorial: Fraunces, Playfair Display, Cormorant Garamond o una serif editorial similar.
  - Body/UI: Public Sans, Inter, Manrope o una sans limpia similar.
- Debe tener modo claro y modo oscuro mediante variables CSS o estilos equivalentes.
- Usar profundidad sutil: bordes finos, sombras suaves, separadores editoriales, overlays limpios sobre fotografia real.
- Fotos reales con buen encuadre. Usar object-position/focal point para que rostros, documentos y elementos clave no queden cortados.

Restricciones de calidad:
- No crear una landing generica de agencia, SaaS o infoproducto.
- No usar orbs, blobs, bokeh decorativo, gradientes morados/azules genericos ni ilustraciones SVG sin relacion real.
- No anidar cards dentro de cards.
- No poner textos largos dentro de tarjetas compactas.
- No usar copy exagerado como "garantizado", "100% aprobado", "sin riesgo" o promesas legales/financieras imposibles.
- No usar iframe como conversion principal del lead. El formulario debe estar visible en DOM con inputs reales y atributos name.
- WhatsApp es CTA secundario, no la conversion principal.

Resultado esperado:
Construye una landing BCL de una pagina, corta y comercial, que se sienta premium, local y confiable. La pagina debe capturar leads con formulario HighLevel/DOM, preservar UTMs y enviar informacion suficiente para workflows posteriores.
```

---

# Prompt 1 - Wireframe One-Page

Este prompt define estructura, jerarquia y flujo. Usalo despues del Prompt 0.

```txt
Disena el wireframe completo de una landing one-page para BCL orientada a campanas. Mantiene el estilo Editorial Humano definido antes. La pagina debe ser corta, clara y orientada a conversion.

Objetivo principal:
Capturar lead mediante un formulario visible en DOM, ubicado en el hero o inmediatamente junto al hero en desktop, y antes del segundo scroll en mobile.

Estructura requerida:

1. Header minimo
- Logo BCL visible.
- Navegacion simple con anclas: Servicios, Confianza, Preguntas.
- Boton secundario WhatsApp.
- En mobile, header compacto con CTA visible.
- No dropdowns en esta landing. Esta pagina debe ser directa.

2. Hero comercial
- H1 claro con promesa directa: resolver o iniciar el tramite/servicio sin confusion.
- Subcopy humana y concreta: atencion en espanol, acompanamiento local, pasos claros.
- Formulario principal visible.
- CTA primario dentro del form: "Solicitar orientacion" o "Quiero que me contacten".
- CTA secundario a WhatsApp, menor jerarquia.
- Foto real o video corto como fondo/columna visual, con overlay sobrio.
- Debe dejar ver una pista de la siguiente seccion en desktop y mobile. No hacer un hero gigante que tape todo.

3. Trust strip
- 3 a 5 senales de confianza breves:
  - Atencion en espanol e ingles
  - Orientacion clara antes de avanzar
  - Servicios para familias, conductores y pequenos negocios
  - Seguimiento por telefono, email o WhatsApp
  - Equipo local con experiencia en procesos cotidianos
- No usar logos falsos ni reviews inventadas.

4. Servicios resumidos
- Tres rutas claras:
  - Seguros
  - Taxes
  - Inmigracion / orientacion documental
- Cada ruta debe tener 3 bullets maximo y un selector que conecte con el formulario.
- El usuario no debe tener que leer listas largas para saber donde entrar.

5. Bloque de objeciones
- Responder miedos reales:
  - "No se que servicio necesito"
  - "No quiero perder tiempo llenando algo que no aplica"
  - "Prefiero hablar con alguien en espanol"
  - "Tengo documentos o una situacion especifica"
- Formato sobrio: acordeones, lista editorial o paneles horizontales. No cards anidadas.

6. CTA final
- Repetir la promesa en una linea.
- Boton primario al formulario.
- WhatsApp secundario.
- Recordar que alguien del equipo revisara la solicitud.

7. Footer compacto
- Logo BCL.
- Texto legal/disclaimer breve.
- Links: privacidad, terminos si existen, contacto.
- Datos basicos de contacto si estan disponibles.

Reglas de UX:
- La ruta debe sentirse obvia: leer promesa, escoger servicio, completar formulario.
- Reducir opciones. No convertir la landing en directorio completo.
- Mantener la navegacion de pagina simple con anclas.
- En mobile, agregar sticky CTA despues del primer scroll: "Solicitar orientacion".
- Mantener foco visible, contraste alto y texto legible.

Entrega:
Devuelve la estructura de pagina y genera la primera version visual en HighLevel/Vibe con secciones reales, texto editable y formulario DOM.
```

---

# Prompt 2 - Design System

Usalo para exigir tokens, modo claro/oscuro y calidad visual consistente.

```txt
Ahora crea o ajusta el sistema visual de BCL para que herede la direccion premium de Christian Brokerage. Implementa tokens CSS o variables equivalentes en HighLevel/Vibe. Si el builder no permite tokens globales, replica estos valores de forma consistente en cada seccion.

Paleta:
```css
:root {
  --bcl-ink: #071827;
  --bcl-navy: #0d2a44;
  --bcl-blue: #1f5c9a;
  --bcl-gold: #b9913f;
  --bcl-gold-soft: #dfc47a;
  --bcl-paper: #f7f3ea;
  --bcl-warm: #fffaf0;
  --bcl-slate: #334155;
  --bcl-muted: #64748b;
  --bcl-border: rgba(7, 24, 39, 0.12);
  --bcl-shadow-soft: 0 18px 45px rgba(7, 24, 39, 0.10);
  --bcl-shadow-lift: 0 24px 70px rgba(7, 24, 39, 0.16);
  --bcl-radius: 8px;
  --bcl-radius-sm: 5px;
  --bcl-focus: 0 0 0 3px rgba(185, 145, 63, 0.32);
}

[data-theme="dark"] {
  --bcl-bg: #071827;
  --bcl-surface: #0d2a44;
  --bcl-text: #fffaf0;
  --bcl-text-muted: rgba(255, 250, 240, 0.72);
  --bcl-line: rgba(255, 250, 240, 0.16);
  --bcl-card: rgba(255, 250, 240, 0.06);
}

[data-theme="light"],
:root {
  --bcl-bg: #f7f3ea;
  --bcl-surface: #fffaf0;
  --bcl-text: #071827;
  --bcl-text-muted: #334155;
  --bcl-line: rgba(7, 24, 39, 0.12);
  --bcl-card: rgba(255, 250, 240, 0.86);
}
```

Tipografia:
- H1: serif editorial, fuerte pero contenida. No mas de 2 lineas en desktop si es posible.
- H2: editorial o sans semibold, segun contraste de seccion.
- Body: sans limpia, 16-18px, line-height 1.55.
- Labels de formulario: 13-14px, claros, sin microtexto ilegible.
- No usar letter-spacing negativo.
- No escalar fuentes con viewport width.

Layout:
- Mobile-first.
- Max width contenido: 1120px a 1200px.
- Secciones full-width con contenido interno contenido.
- Cards solo para items repetidos o paneles funcionales. No cards dentro de cards.
- Radio maximo de cards: 8px.
- Espaciado:
  - Mobile: 24px lateral, 48-64px vertical por seccion.
  - Desktop: 40px lateral, 72-96px vertical por seccion.
- Hero:
  - Desktop: composicion editorial con formulario visible y fotografia real.
  - Mobile: promesa, CTA/form, fotografia o trust signals sin cortar texto.

Botones:
- Primario: fondo gold o navy segun contraste, texto claro, peso 700.
- Secundario: outline sobrio o text button con icono.
- Estados hover: leve lift, cambio de borde o fondo. Nada excesivo.
- Focus visible con anillo gold.
- Iconos solo si aportan claridad: telefono, mensaje, shield, file, check.

Formulario:
- Debe sentirse como parte premium de la pagina, no como widget pegado.
- Labels claros arriba del input.
- Inputs con altura 46-52px.
- Selects nativos o custom accesibles.
- Checkbox de consentimiento con texto legible.
- Error states visibles.
- Thank-you state inline y claro.

Modo claro/oscuro:
- Debe existir soporte real para claro y oscuro.
- El modo oscuro debe sentirse editorial, no una inversion automatica plana.
- Asegurar contraste en labels, placeholders, borders y botones.
- Agregar toggle si el builder lo permite. Si no, dejar ambos estilos preparados y usar el modo que mejor combine con la campana.

Imagenes:
- Usar fotos reales.
- Aplicar object-fit: cover.
- Definir object-position por imagen:
  - Rostro/persona: center 28% o center 35%.
  - Documentos/manos: center 45%.
  - Oficina/contexto: center center.
- Nunca cortar rostros, documentos importantes o manos sosteniendo papeles.
- Evitar fotos oscuras, borrosas o demasiado stock.

Anti-template:
- No usar hero con gradiente generico y mockup falso.
- No usar bloques decorativos sin funcion.
- No usar colores de una sola familia en toda la pagina. Navy y paper dominan; gold actua como acento.
- No saturar con insignias. La confianza se construye con claridad, fotografia real y buen formulario.

Entrega:
Aplica este sistema visual a toda la landing y revisa que cada seccion parezca parte de la misma marca.
```

---

# Prompt 3 - Copy Conversion

Usalo para generar copy bilingue y mensajes de conversion. Mantiene placeholders para ajustar la oferta exacta.

```txt
Ahora escribe el copy de conversion para la landing BCL. Espanol primero, ingles como soporte opcional. El tono debe ser humano, local, profesional y directo. Evita hype, promesas absolutas o lenguaje legal/financiero riesgoso.

Contexto:
- BCL recibe trafico de campanas.
- El usuario probablemente llega con una necesidad concreta: seguros, taxes, inmigracion/orientacion documental o una consulta relacionada.
- El objetivo es que complete el formulario para que el equipo lo contacte.
- La pagina debe reducir ansiedad y confusion.

Reglas de copy:
- Claro sobre ingenioso.
- Una idea por seccion.
- Frases cortas.
- Beneficios concretos.
- Evitar "garantizado", "aprobacion segura", "sin riesgo", "somos los mejores".
- Enfocar en acompanamiento, claridad, rapidez razonable y seguimiento.
- No sonar como robot ni como plantilla de agencia.

Hero - opciones de H1 en espanol:
1. "Orientacion clara para avanzar con tu tramite"
2. "Cuéntanos que necesitas y te guiamos con el siguiente paso"
3. "Seguros, taxes y orientacion documental con atencion cercana"
4. "Empieza tu consulta con un equipo que te habla claro"

Hero - subcopy:
"Completa el formulario y un miembro del equipo revisara tu solicitud para orientarte segun tu servicio, documentos y mejor forma de contacto."

Hero - English support line:
"Spanish and English support available for families, drivers, workers and small businesses."

CTA primario:
- "Solicitar orientacion"
- "Quiero que me contacten"
- "Empezar mi consulta"

CTA secundario:
- "Hablar por WhatsApp"
- "Tengo una pregunta rapida"

Form intro:
"Dejanos tus datos y el servicio que necesitas. Asi podemos responderte con mas precision."

Form labels:
- Nombre completo
- Telefono
- Email
- Servicio principal
- Detalle del servicio
- Idioma preferido
- Mejor horario para contactarte
- Mensaje opcional
- Consentimiento para contacto

Consentimiento:
"Acepto que BCL / Christian Brokerage me contacte por telefono, texto, WhatsApp o email sobre mi solicitud. Puedo pedir que no me contacten en cualquier momento."

Servicios resumidos:

Seguros:
Titulo: "Seguros"
Copy: "Opciones para conductores, familias y negocios que necesitan cotizar o revisar cobertura."
Bullets:
- Auto, TLC y vehiculos comerciales
- Negocio, propiedad y responsabilidad
- Vida, salud y proteccion familiar
CTA: "Consultar por seguros"

Taxes:
Titulo: "Taxes"
Copy: "Apoyo para organizar tu declaracion, revisar documentos y entender el siguiente paso."
Bullets:
- Declaraciones personales y de negocio
- ITIN, IRS y documentos fiscales
- Planificacion y orientacion
CTA: "Consultar por taxes"

Inmigracion / orientacion documental:
Titulo: "Inmigracion y documentos"
Copy: "Orientacion administrativa para reunir informacion, entender requisitos y preparar documentos."
Bullets:
- Familia, estatus y ciudadania
- Traducciones y documentos
- Procesos consulares y seguimiento
CTA: "Consultar por documentos"

Trust strip:
- "Atencion en espanol e ingles"
- "Proceso claro desde el primer contacto"
- "Opciones para familias, conductores y pequenos negocios"
- "Seguimiento por telefono, email o WhatsApp"

Objeciones:

Pregunta: "No se exactamente que servicio necesito."
Respuesta: "No pasa nada. Selecciona la opcion mas cercana y explica tu situacion en el mensaje. El equipo revisara la solicitud antes de responder."

Pregunta: "Necesito enviar documentos?"
Respuesta: "Primero dejanos tus datos y el tipo de servicio. Si hace falta, te indicaremos que documentos preparar o como compartirlos de forma adecuada."

Pregunta: "Puedo hablar en espanol?"
Respuesta: "Si. La atencion en espanol es parte central de la experiencia."

Pregunta: "Esto reemplaza una consulta profesional formal?"
Respuesta: "No. La landing inicia el contacto y ayuda a orientar el siguiente paso. Segun tu caso, el equipo te indicara el proceso correspondiente."

CTA final:
Titulo: "Da el primer paso con claridad"
Copy: "Completa el formulario y recibe una respuesta orientada al servicio que necesitas."
Boton: "Solicitar orientacion"
WhatsApp: "Prefiero WhatsApp"

Footer disclaimer:
"La informacion enviada por este formulario se usa para responder a tu solicitud. Los servicios, requisitos y disponibilidad pueden variar segun cada caso. BCL / Christian Brokerage no promete resultados especificos."

Bilingue:
Agrega atributos o bloques editables data-es y data-en si el builder lo permite, pero muestra espanol por defecto. No dupliques toda la pagina si eso aumenta friccion. El ingles puede funcionar como soporte en lineas clave, labels o toggle simple.

Entrega:
Reemplaza copy generico por este copy, ajustando [PRIMARY_OFFER], [PRIMARY_SERVICE] y [CAMPAIGN_INTENT] si estan definidos.
```

---

# Prompt 4 - GHL Form + Tracking

Este es el prompt mas importante para conversion y atribucion. Usalo cuando la estructura visual ya exista.

```txt
Ahora implementa el formulario principal y el tracking de la landing BCL para HighLevel. La conversion principal debe ser un formulario HTML visible en DOM, no un iframe como fuente principal del lead.

Requisitos criticos:
- Usar una etiqueta <form> real.
- Cada input, select, textarea y checkbox debe tener atributo name.
- Los campos deben estar visibles en DOM y ser capturables por HighLevel External Tracking.
- No depender de un iframe para capturar campos del formulario.
- Si HighLevel necesita mapear campos personalizados, usa nombres claros y consistentes.
- Preservar UTMs y parametros de campana en hidden fields o merge fields soportados por el builder.
- Si el builder no captura hidden fields en pruebas, mapear UTMs mediante soporte nativo de URL parameters/merge fields o campos custom temporales visibles durante QA.

Campos visibles minimos:
- full_name
- phone
- email
- service
- service_detail
- preferred_language
- best_time
- message
- consent

Campos ocultos / atribucion:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term
- gclid
- fbclid
- page_url
- referrer
- lead_source
- selected_service
- selected_service_detail
- campaign_intent
- landing_variant

Opciones de service:
- seguros
- taxes
- inmigracion_documentos
- no_estoy_seguro

Opciones de service_detail dependientes:
Para seguros:
- auto_tlc
- comercial_negocio
- propiedad
- vida_salud
- otro_seguro

Para taxes:
- declaracion_personal
- declaracion_negocio
- itin
- irs
- planificacion
- otro_tax

Para inmigracion_documentos:
- familia_estatus
- ciudadania
- traducciones
- consular
- otro_documento

HTML base sugerido:

```html
<form id="bcl-lead-form" class="bcl-lead-form" method="post" action="[GHL_FORM_ACTION_OR_ENDPOINT]" data-ghl-form="bcl-campaign-lead">
  <div class="form-grid">
    <label>
      Nombre completo
      <input type="text" name="full_name" autocomplete="name" required />
    </label>

    <label>
      Telefono
      <input type="tel" name="phone" autocomplete="tel" required />
    </label>

    <label>
      Email
      <input type="email" name="email" autocomplete="email" required />
    </label>

    <label>
      Servicio principal
      <select name="service" required>
        <option value="">Selecciona una opcion</option>
        <option value="seguros">Seguros</option>
        <option value="taxes">Taxes</option>
        <option value="inmigracion_documentos">Inmigracion / documentos</option>
        <option value="no_estoy_seguro">No estoy seguro</option>
      </select>
    </label>

    <label>
      Detalle del servicio
      <select name="service_detail" required>
        <option value="">Selecciona el detalle</option>
        <option value="auto_tlc">Auto, TLC o vehiculo comercial</option>
        <option value="comercial_negocio">Negocio o responsabilidad comercial</option>
        <option value="propiedad">Propiedad</option>
        <option value="vida_salud">Vida, salud o proteccion familiar</option>
        <option value="declaracion_personal">Declaracion personal</option>
        <option value="declaracion_negocio">Declaracion de negocio</option>
        <option value="itin">ITIN</option>
        <option value="irs">IRS o identidad fiscal</option>
        <option value="planificacion">Planificacion fiscal</option>
        <option value="familia_estatus">Familia o estatus</option>
        <option value="ciudadania">Ciudadania</option>
        <option value="traducciones">Traducciones o documentos</option>
        <option value="consular">Proceso consular</option>
        <option value="otro">Otro / necesito orientacion</option>
      </select>
    </label>

    <label>
      Idioma preferido
      <select name="preferred_language" required>
        <option value="es">Espanol</option>
        <option value="en">English</option>
        <option value="both">Ambos</option>
      </select>
    </label>

    <label>
      Mejor horario para contactarte
      <input type="text" name="best_time" placeholder="Ej. Manana, tarde, despues de las 5" />
    </label>

    <label class="form-full">
      Mensaje opcional
      <textarea name="message" rows="4" placeholder="Cuéntanos brevemente que necesitas"></textarea>
    </label>
  </div>

  <label class="consent-row">
    <input type="checkbox" name="consent" value="yes" required />
    <span>Acepto que BCL / Christian Brokerage me contacte por telefono, texto, WhatsApp o email sobre mi solicitud.</span>
  </label>

  <input type="hidden" name="utm_source" />
  <input type="hidden" name="utm_medium" />
  <input type="hidden" name="utm_campaign" />
  <input type="hidden" name="utm_content" />
  <input type="hidden" name="utm_term" />
  <input type="hidden" name="gclid" />
  <input type="hidden" name="fbclid" />
  <input type="hidden" name="page_url" />
  <input type="hidden" name="referrer" />
  <input type="hidden" name="lead_source" value="BCL Campaign Landing" />
  <input type="hidden" name="selected_service" />
  <input type="hidden" name="selected_service_detail" />
  <input type="hidden" name="campaign_intent" value="[CAMPAIGN_INTENT]" />
  <input type="hidden" name="landing_variant" value="bcl-editorial-humano-v1" />

  <button type="submit" class="button-primary">Solicitar orientacion</button>
  <p class="form-note">Un miembro del equipo revisara tu solicitud y te contactara segun la informacion enviada.</p>
</form>
```

Script de parametros:

```html
<script>
  (function () {
    var form = document.getElementById('bcl-lead-form');
    if (!form) return;

    var params = new URLSearchParams(window.location.search);
    var keys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'gclid',
      'fbclid'
    ];

    keys.forEach(function (key) {
      var field = form.querySelector('[name="' + key + '"]');
      if (field) field.value = params.get(key) || '';
    });

    var pageUrl = form.querySelector('[name="page_url"]');
    if (pageUrl) pageUrl.value = window.location.href;

    var referrer = form.querySelector('[name="referrer"]');
    if (referrer) referrer.value = document.referrer || '';

    var service = form.querySelector('[name="service"]');
    var detail = form.querySelector('[name="service_detail"]');
    var selectedService = form.querySelector('[name="selected_service"]');
    var selectedDetail = form.querySelector('[name="selected_service_detail"]');

    function syncSelections() {
      if (selectedService && service) selectedService.value = service.value || '';
      if (selectedDetail && detail) selectedDetail.value = detail.value || '';
    }

    if (service) service.addEventListener('change', syncSelections);
    if (detail) detail.addEventListener('change', syncSelections);
    syncSelections();
  })();
</script>
```

Tracking:
- Insertar GHL_EXTERNAL_TRACKING_SCRIPT antes de </body> si esta disponible.
- Insertar GTM_ID o Meta Pixel si la campana lo requiere y el cliente lo aprobo.
- Enviar evento de conversion al submit exitoso, no solo al click.
- Si hay thank-you state inline, mostrar confirmacion clara y mantener al usuario orientado.
- Si redirige a THANK_YOU_URL, preservar parametros importantes cuando sea posible.

Tags sugeridos para workflow:
- bcl_landing_lead
- source_campaign
- service_seguros / service_taxes / service_inmigracion_documentos
- language_es / language_en

Thank-you state:
Titulo: "Recibimos tu solicitud"
Copy: "Gracias. El equipo revisara la informacion y te contactara por el medio indicado."
CTA secundario: "Enviar mensaje por WhatsApp"

QA tecnico:
- Probar con: ?utm_source=facebook&utm_campaign=test&fbclid=test
- Confirmar que los campos existen en DOM.
- Confirmar que cada input tiene name.
- Confirmar que el contacto llega a HighLevel con servicio, detalle, fuente y UTMs.
- Confirmar que el formulario funciona sin depender de iframe.

Entrega:
Implementa el formulario, el llenado de parametros y el estado de confirmacion. No sacrifiques legibilidad visual por meter demasiados campos en el hero.
```

---

# Prompt 5 - Responsive + QA

Usalo para que HighLevel/Vibe haga una pasada critica despues de generar.

```txt
Haz una auditoria responsive, accesible y visual de la landing BCL. Corrige problemas directamente. Usa criterio estricto: esta pagina recibira trafico pagado, asi que cada friccion puede bajar conversion.

Viewports a revisar:
- Mobile pequeno: 360px
- Mobile comun: 390px / 430px
- Tablet: 768px
- Desktop: 1280px
- Desktop ancho: 1440px+

Checklist visual:
- El logo BCL se ve claro en header.
- El hero comunica la promesa en menos de 5 segundos.
- El formulario aparece arriba del fold en desktop o antes del segundo scroll en mobile.
- No hay texto cortado.
- No hay botones con texto apretado.
- No hay elementos superpuestos.
- No hay cards anidadas.
- No hay secciones que parezcan plantillas genericas.
- La foto principal muestra rostro, documentos o elemento clave bien encuadrado.
- El modo claro y el modo oscuro tienen contraste suficiente.
- El gold se usa como acento, no como pintura sobre toda la pagina.
- El footer no compite con la conversion.

Checklist UX:
- La ruta de conversion es obvia: promesa -> servicio -> formulario.
- WhatsApp se entiende como alternativa secundaria.
- Los servicios no son una lista larga.
- Los acordeones de objeciones abren/cerran bien.
- En mobile, el CTA sticky no tapa campos del form ni footer.
- El usuario puede volver al formulario desde CTA final.

Checklist accesibilidad:
- Todos los inputs tienen label visible.
- Focus visible en links, botones, inputs y selects.
- El checkbox de consentimiento es facil de tocar en mobile.
- Los textos tienen contraste suficiente.
- Las imagenes tienen alt descriptivo.
- No usar solo color para comunicar errores.
- Respetar prefers-reduced-motion si hay animaciones.
- Botones y links tienen nombres claros.

Checklist performance:
- Optimizar imagen hero.
- Evitar videos pesados si no aportan conversion.
- No cargar librerias innecesarias.
- Mantener animaciones simples: opacity + translateY 16-24px, 0.45-0.65s.
- No usar animaciones infinitas decorativas.

Checklist tracking:
- Probar con URL:
  [BCL_PAGE_URL]?utm_source=facebook&utm_medium=paid_social&utm_campaign=test_bcl&fbclid=test
- Enviar lead de prueba para seguros.
- Enviar lead de prueba para taxes.
- Enviar lead de prueba para inmigracion/documentos.
- Confirmar que HighLevel recibe:
  - full_name
  - phone
  - email
  - service
  - service_detail
  - preferred_language
  - consent
  - utm_source
  - utm_medium
  - utm_campaign
  - fbclid o gclid si existe
  - page_url
  - referrer
  - lead_source
  - tags/workflow correctos
- Confirmar que el formulario es DOM visible y cada campo tiene name.

Correcciones obligatorias:
- Si el hero se ve generico, reemplazar composicion por foto real + promesa + form.
- Si el formulario parece widget pegado, integrarlo visualmente con bordes, spacing y labels premium.
- Si mobile se siente largo, recortar copy antes de recortar claridad.
- Si una imagen corta la parte importante, ajustar object-position, no cambiar asset.
- Si el usuario tiene que recorrer demasiado para entender servicios, condensar y priorizar.

Entrega:
Corrige la landing hasta que se sienta lista para campanas pagadas y documenta los cambios principales realizados.
```

---

# Prompt 6 - Refinement Prompt

Usalo despues de ver el primer resultado. Es una segunda pasada critica para quitar "olor a template".

```txt
Revisa la landing BCL como si fueras director creativo y CRO senior antes de lanzar campanas pagadas. No agregues secciones nuevas salvo que sea imprescindible. Mejora lo que ya existe.

Problema a resolver:
La pagina debe sentirse como una extension premium de Christian Brokerage: Editorial Humano, navy/gold/paper, fotografia real, confianza local, modo claro/oscuro. Si algo se siente generico, frio, saturado o confuso, corrigelo.

Auditoria critica:

1. Jerarquia
- El H1 debe decir exactamente que valor recibe el usuario.
- El subtitulo debe reducir ansiedad.
- El formulario debe tener jerarquia de conversion principal.
- WhatsApp debe seguir siendo secundario.

2. Navegacion
- Header minimo.
- Anclas utiles, no menu pesado.
- CTA visible sin presionar demasiado.
- En mobile, nada debe sentirse escondido o desordenado.

3. Visual
- Revisa si la composicion parece landing generica.
- Elimina gradientes decorativos innecesarios.
- Elimina orbs, blobs o fondos abstractos.
- Ajusta sombras para que haya profundidad, no ruido.
- Revisa balance entre navy, paper, warm white y gold.
- Mantener cards con radio maximo 8px.
- No cards dentro de cards.

4. Imagenes
- Ajusta object-position para cada imagen.
- Rostros: priorizar ojos y expresion.
- Documentos: priorizar papel/manos/textura.
- Oficina: priorizar contexto real y luz.
- No reemplazar fotos en esta pasada, solo reencuadrar y mejorar overlays.

5. Copy
- Cambia frases genericas por frases especificas.
- Quita promesas absolutas.
- Quita adjetivos vacios.
- Reduce parrafos largos.
- Haz que los bullets de servicios ayuden a seleccionar ruta.
- Mantener espanol como idioma principal.

6. Formulario
- Labels visibles.
- Inputs con name.
- Campos obligatorios claros.
- Consentimiento legible.
- Thank-you state claro.
- Hidden fields para UTMs y parametros.
- No usar iframe como principal.

7. Mobile
- Revisa 360px y 390px.
- Que ningun boton corte texto.
- Que el CTA sticky no tape el form.
- Que el formulario no parezca interminable.
- Que la foto no empuje la conversion demasiado abajo.

8. Accesibilidad
- Focus visible.
- Contraste correcto.
- Alt text descriptivo.
- Estados de error claros.
- Animaciones reducidas si el usuario lo prefiere.

Output esperado:
- Aplica los cambios directamente.
- Luego entrega una lista breve:
  - Cambios visuales realizados
  - Cambios de copy realizados
  - Cambios de UX/tracking realizados
  - Riesgos pendientes antes de publicar

Criterio final:
Si la pagina podria confundirse con una plantilla comun de landing, todavia no esta lista. Debe sentirse local, humana, sobria y comercialmente clara.
```

---

# Prompt 7 - VSL Placeholder + Calendario

Usa este prompt para crear una variante VSL / Video Sales Letter enfocada en publicidad directa. Esta variante no reemplaza la landing con formulario: es una pagina mas simple, con video o placeholder y una sola conversion hacia calendario GoHighLevel.

```txt
Actua como director creativo, CRO senior y builder experto en HighLevel/Vibe. Necesito convertir la pagina BCL en una landing VSL / Video Sales Letter para trafico de campanas.

Objetivo:
La pagina debe lograr que una persona entienda la promesa rapido, vea o identifique el espacio del video, y agende una cita en el calendario de GoHighLevel. No debe sentirse como una home, ni como un directorio, ni como una landing generica con demasiadas opciones.

Conversion principal:
- Unico CTA principal: "Agendar mi consulta" / "Schedule my call".
- Todos los botones principales deben dirigir al mismo enlace base: [GHL_CALENDAR_URL].
- Preservar UTMs y parametros de campana al enviar al calendario si el builder lo permite.
- No usar formulario principal en esta variante.
- WhatsApp puede existir solo como contacto secundario muy discreto, o eliminarse si distrae.

Navegacion:
- Quitar menu superior completo.
- No usar links a Inicio, Nosotros, Servicios, Contacto ni anchors largos.
- Header minimo:
  - Logo BCL.
  - Toggle de idioma ES/EN opcional.
  - Boton pequeno "Agendar" hacia [GHL_CALENDAR_URL].
- No dropdowns.
- No redes sociales arriba.
- No barra de navegacion con multiples caminos.

Estructura requerida:

1. Header ultra simple
- Logo BCL alineado a la izquierda.
- Toggle ES/EN a la derecha si aplica.
- CTA pequeno a calendario.
- Altura compacta.

2. Hero VSL
- H1 directo, maximo 2 lineas.
- Subcopy breve que explique para quien es y que pasa despues de agendar.
- Bloque de video como elemento principal.
- CTA principal debajo del video y, en desktop, tambien cerca del copy.
- Trust microcopy debajo del CTA.

3. Placeholder del video
Mientras el VSL final no este listo, crear un placeholder premium:
- Contenedor 16:9 o 4:5 segun encuadre, responsive.
- Usar [VSL_POSTER_IMAGE] como imagen temporal si esta disponible, idealmente foto real de [VSL_PRESENTER_NAME].
- Si no hay foto todavia, usar un bloque editorial sobrio con fondo navy/paper, textura sutil y texto:
  - "Video en preparacion"
  - "Muy pronto: una guia breve para entender el siguiente paso"
- Agregar icono de play discreto, pero no fingir que reproduce si no hay video.
- Si el video todavia no existe, el click del placeholder puede llevar al calendario o no hacer nada; no debe abrir un modal vacio.
- Incluir microcopy:
  - "Mira el video y agenda una llamada cuando estes listo."
  - Si el video esta pendiente: "Mientras preparamos el video, puedes agendar tu orientacion directamente."

Cuando [VSL_VIDEO_URL] exista:
- Reemplazar placeholder por embed/video real.
- Mantener poster image.
- Usar controls.
- No autoplay con sonido.
- Activar captions/subtitulos si existen.
- Mantener el CTA visible cerca del video.

4. Servicios resumidos debajo
Mantener servicios abajo, pero sin crear rutas separadas.
- Tres bloques simples:
  - Seguros
  - Taxes
  - Inmigracion / documentos
- Cada bloque explica en 2 o 3 bullets a quien ayuda.
- Cada bloque tiene el mismo CTA: "Agendar mi consulta".
- Todos los CTAs van a [GHL_CALENDAR_URL].
- Si se agregan parametros como ?service=seguros, hacerlo solo para tracking y sin cambiar el destino base.

5. Objeciones minimas
Maximo 3 preguntas:
- "No se si este servicio aplica para mi."
- "Que pasa despues de agendar?"
- "Puedo recibir atencion en espanol?"
Respuestas cortas, claras y sin lenguaje legal riesgoso.

6. CTA final
- Una frase de cierre.
- Boton principal a [GHL_CALENDAR_URL].
- Microcopy: "Elige un horario disponible y el equipo te indicara el siguiente paso."

7. Footer minimo
- Logo BCL o Christian Brokerage si corresponde.
- Disclaimer breve.
- Privacidad/terminos si existen.
- No agregar menus, servicios largos ni enlaces que saquen al usuario de la conversion.

Copy sugerido:

H1 opciones:
- "Antes de avanzar, mira esto en menos de unos minutos"
- "Agenda con claridad el servicio que necesitas"
- "Una guia corta para dar el siguiente paso"
- "Seguros, taxes y documentos con una ruta clara para empezar"

Subcopy:
"Esta pagina fue creada para personas que llegan desde campanas y necesitan orientacion rapida. Mira el video o agenda directamente para que el equipo revise tu caso y te indique el siguiente paso."

CTA:
- "Agendar mi consulta"
- "Ver horarios disponibles"
- "Quiero reservar mi llamada"

Trust microcopy:
- "Atencion en espanol e ingles"
- "Orientacion clara antes de avanzar"
- "Para familias, conductores, trabajadores y pequenos negocios"

Reglas visuales:
- Mantener Editorial Humano: navy, gold, paper, foto real, profundidad sutil.
- No gradientes genericos.
- No orbs, blobs ni decoracion abstracta.
- No cards dentro de cards.
- No hero gigante sin conversion visible.
- No texto largo encima del video.
- El video o placeholder debe ser el punto focal de la pagina.
- La pagina debe entenderse en un pantallazo corto.

Tracking:
- Decorar todos los links a [GHL_CALENDAR_URL] con UTMs actuales:
  - utm_source
  - utm_medium
  - utm_campaign
  - utm_content
  - utm_term
  - gclid
  - fbclid
  - page_url
  - referrer
- Si el calendario no acepta todos los parametros, preservar al menos UTMs, gclid/fbclid y campaign.

Script sugerido para links del calendario:

```html
<script>
  (function () {
    var calendarBase = '[GHL_CALENDAR_URL]';
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
    var current = new URLSearchParams(window.location.search);
    var calendarLinks = document.querySelectorAll('a[data-calendar-link="true"]');

    calendarLinks.forEach(function (link) {
      try {
        var url = new URL(link.getAttribute('href') || calendarBase, window.location.origin);
        keys.forEach(function (key) {
          var value = current.get(key);
          if (value) url.searchParams.set(key, value);
        });
        url.searchParams.set('page_url', window.location.href);
        if (document.referrer) url.searchParams.set('referrer', document.referrer);
        link.setAttribute('href', url.toString());
      } catch (error) {
        link.setAttribute('href', calendarBase);
      }
    });
  })();
</script>
```

Entrega:
Construye la variante VSL con placeholder de video/foto, sin menu superior, con servicios resumidos debajo y un solo destino de conversion: el calendario de GoHighLevel.
```

---

# Prompt 8 - Refinamiento VSL Sin Distracciones

Usa este prompt como segunda pasada especifica para la pagina VSL. Su funcion es eliminar friccion, enlaces innecesarios y cualquier elemento que compita con el video y el calendario.

```txt
Revisa la pagina BCL VSL como especialista en direct response, CRO y diseno editorial premium. El objetivo es reducir distracciones y aumentar claridad. No agregues mas contenido; mejora y simplifica lo existente.

Principio central:
Esta pagina no es una web institucional. Es una pagina VSL para campanas. El usuario debe entender rapidamente:
1. Que esta viendo.
2. Para que servicio aplica.
3. Que debe hacer despues.

Accion unica:
- La accion principal es agendar en [GHL_CALENDAR_URL].
- Todos los CTAs principales deben llevar al mismo calendario.
- No debe haber formulario principal.
- No debe haber menu de navegacion.
- No debe haber dropdowns.
- No debe haber links que compitan con calendario.

Auditoria de distracciones:
- Elimina links de header excepto logo, idioma y CTA de calendario.
- Elimina menus, anchors multiples, redes sociales superiores y botones secundarios innecesarios.
- Reduce el footer a disclaimer y links legales minimos.
- Si WhatsApp compite con calendario, eliminarlo o bajarlo al footer.
- Si hay demasiados bloques de servicios, condensarlos.
- Si hay texto largo antes del video, cortarlo.
- Si el CTA queda lejos del video, acercarlo.

Hero y placeholder:
- El video o placeholder debe ser el foco visual.
- Si no existe video, usar [VSL_POSTER_IMAGE] o foto real de [VSL_PRESENTER_NAME].
- No simular reproduccion si el video no esta listo.
- El placeholder debe sentirse intencional, no como un hueco vacio.
- Mantener aspect ratio estable en desktop y mobile.
- En mobile, el H1, placeholder y CTA deben aparecer sin una navegacion larga antes.

Copy:
- Cambiar textos genericos por mensajes directos.
- Quitar frases de marca que no ayuden a agendar.
- Quitar promesas absolutas.
- Mantener espanol principal y toggle English si existe.
- El ingles no debe duplicar todo ni alargar la pagina si no hace falta.

Servicios abajo:
- Mantener Seguros, Taxes e Inmigracion/documentos.
- No crear paginas separadas.
- No crear rutas alternativas.
- Cada servicio debe tener CTA al mismo calendario.
- Los bullets deben ayudar a reconocer necesidad, no explicar todo el catalogo.

Visual:
- Mantener navy/gold/paper.
- Usar profundidad sutil.
- No usar orbs, blobs, fondos abstractos ni gradientes genericos.
- No cards anidadas.
- No exceso de sombras.
- El modo claro/oscuro debe seguir funcionando, pero no debe convertirse en protagonista.

Calendario y tracking:
- Verificar que todos los botones del calendario tengan data-calendar-link="true".
- Preservar UTMs, gclid y fbclid al pasar al calendario.
- Probar URL:
  [BCL_PAGE_URL]?utm_source=facebook&utm_medium=paid_social&utm_campaign=vsl_test&fbclid=test
- Confirmar que los links al calendario mantienen parametros.

Checklist final:
- En 5 segundos se entiende la promesa.
- No hay menu superior.
- No hay distracciones fuertes.
- El placeholder del video se ve premium.
- La foto no corta rostro ni elemento clave.
- El CTA de calendario es claro.
- Todos los servicios llevan al mismo calendario.
- Mobile 360px no corta texto ni tapa botones.
- Footer minimo.

Entrega:
Aplica los cambios directamente y devuelve una lista breve:
- Distracciones removidas
- Ajustes del placeholder/video
- Ajustes de CTAs/calendario
- Riesgos pendientes antes de publicar
```

---

# Prompt 9 - Pagina General de Gracias Post-Agenda

Usa este prompt para crear una pagina paralela a la VSL: una unica pagina general de gracias para cualquier persona que ya agendo desde campanas, sin importar si venia por seguros, taxes o inmigracion/documentos.

```txt
Actua como director creativo, CRO senior y builder experto en HighLevel/Vibe. Necesito crear una pagina general de gracias para BCL / Christian Brokerage, pensada para mostrarse despues de que una persona agenda en el calendario de GoHighLevel.

Objetivo:
La persona ya agendo. Esta pagina no debe seguir vendiendo fuerte ni abrir nuevas rutas. Debe confirmar, tranquilizar, explicar el siguiente paso y medir la conversion. Debe servir para cualquier servicio: seguros, taxes, inmigracion/documentos u orientacion general.

Conversion ya lograda:
- No agregar formulario principal.
- No poner varios CTAs de venta.
- No invitar a volver a agendar salvo que sea para reprogramar mediante instrucciones discretas.
- No crear rutas diferentes por servicio.
- No mostrar menus ni dropdowns.
- No distraer con redes sociales arriba.

Estructura requerida:

1. Header minimo
- Logo BCL o Christian Brokerage, segun disponibilidad.
- Sin menu.
- Sin links de servicios.
- Toggle ES/EN opcional si ya existe en la VSL.
- Si hay link de soporte, dejarlo pequeno y secundario.

2. Hero de confirmacion
- Mensaje principal:
  - "Gracias, tu cita fue agendada"
  - o "Listo, recibimos tu agenda"
- Subcopy:
  - "Revisa tu email o mensajes para la confirmacion. El equipo revisara la informacion disponible y te indicara el siguiente paso durante la llamada."
- Incluir un indicador visual elegante de exito: check simple, sello editorial o pequeno panel gold/navy.
- No usar confetti, animaciones infantiles ni celebracion excesiva.

3. Bloque visual principal
- Usar una foto real del equipo, oficina o persona/presentadora si esta disponible.
- Si no hay foto final, usar un bloque editorial premium con navy/paper/gold:
  - "Tu solicitud ya esta en camino"
  - "El siguiente paso es revisar tu cita y preparar cualquier informacion basica que pueda ayudar."
- La foto o bloque debe sentirse intencional, no como placeholder vacio.
- Aplicar object-fit: cover y object-position para no cortar rostros ni documentos.

4. Proximos pasos
Mostrar 3 pasos claros:

Paso 1: "Revisa la confirmacion"
Copy: "Busca el email o mensaje de confirmacion con la fecha, hora y detalles de la cita."

Paso 2: "Ten a mano informacion basica"
Copy: "Segun el servicio, puede ayudar tener documentos, preguntas o datos relevantes cerca durante la llamada. No envies informacion sensible por esta pagina."

Paso 3: "Atiende la llamada o entra a tu cita"
Copy: "El equipo te orientara con el siguiente paso segun tu caso."

5. Servicios generales, sin nuevas rutas
Mostrar un bloque pequeno que confirme que la pagina sirve para:
- Seguros
- Taxes
- Inmigracion / documentos

Regla:
- No usar CTAs por servicio.
- No enlazar a paginas separadas.
- No repetir todo el catalogo.
- Solo reforzar que la cita puede estar relacionada con cualquiera de estas areas.

6. Soporte secundario
Agregar una linea discreta:
"Si necesitas cambiar algo antes de tu cita, revisa el mensaje de confirmacion o contactanos por [SUPPORT_CONTACT_LABEL]."

Boton secundario opcional:
- "Contactar soporte"
- Link: [SUPPORT_CONTACT_URL]

Este boton debe tener menor jerarquia que el mensaje de confirmacion. No debe competir visualmente.

7. Footer minimo
- Logo.
- Disclaimer breve.
- Links legales si existen.
- Link discreto al sitio principal: [MAIN_WEBSITE_URL]
- No menu largo.

Copy sugerido:

H1:
"Gracias, tu cita fue agendada"

Subcopy:
"Ya tenemos tu solicitud. Revisa tu confirmacion y prepara cualquier informacion que pueda ayudar al equipo a orientarte mejor."

Microcopy:
"La disponibilidad, requisitos y pasos pueden variar segun cada caso. Durante la cita te indicaremos el camino correspondiente."

English support:
"Your appointment has been scheduled. Please check your confirmation message and keep any helpful information nearby for your call."

Proximos pasos:
- "Revisa tu confirmacion"
- "Prepara tus preguntas"
- "Habla con el equipo"

Reglas visuales:
- Mantener Editorial Humano: navy, paper, warm white, gold, fotografia real.
- Debe sentirse linda, cuidada y premium, pero tranquila.
- No usar estilo de fiesta, confetti, emojis, stock generico ni banners agresivos.
- No usar hero gigante sin contenido util.
- No usar cards anidadas.
- No meter formulario.
- No crear una landing nueva de venta.
- La pagina debe sentirse como cierre correcto de una experiencia de campana.

Tracking:
- Insertar GHL_EXTERNAL_TRACKING_SCRIPT si aplica.
- Insertar GTM_ID / Meta Pixel si corresponde.
- Disparar evento de visita de pagina de gracias, por ejemplo:
  - appointment_scheduled_thank_you
  - bcl_calendar_thank_you_view
- Si hay parametros en la URL, preservarlos para analitica:
  - utm_source
  - utm_medium
  - utm_campaign
  - utm_content
  - utm_term
  - gclid
  - fbclid
  - service
  - appointment_id si GoHighLevel lo envia
- No inventar datos si no llegan por URL.

Script sugerido para evento basico:

```html
<script>
  (function () {
    var params = new URLSearchParams(window.location.search);
    var payload = {
      event: 'bcl_calendar_thank_you_view',
      page_url: window.location.href,
      referrer: document.referrer || '',
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
      gclid: params.get('gclid') || '',
      fbclid: params.get('fbclid') || '',
      service: params.get('service') || ''
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    if (typeof fbq === 'function') {
      fbq('trackCustom', 'BCLCalendarThankYouView', payload);
    }
  })();
</script>
```

Entrega:
Construye una pagina general de gracias post-agenda, visualmente premium y reutilizable para todos los servicios. Debe confirmar la cita, explicar proximos pasos y mantener tracking, sin distraer al usuario con nuevas rutas.
```

---

# Prompt 10 - Refinamiento Pagina de Gracias General

Usa este prompt despues de generar la pagina de gracias para asegurar que se mantenga enfocada, hermosa y reutilizable.

```txt
Revisa la pagina general de gracias BCL como director creativo, CRO senior y especialista en experiencia post-conversion. La persona ya agendo; ahora la pagina debe dar tranquilidad, claridad y continuidad de marca.

Principio central:
Esta pagina no vende. Confirma, orienta y cuida la experiencia. Debe funcionar igual de bien para seguros, taxes, inmigracion/documentos o una consulta general.

Auditoria de enfoque:
- Quitar menu superior.
- Quitar dropdowns.
- Quitar CTAs multiples de venta.
- Quitar enlaces a servicios si compiten con la confirmacion.
- Quitar formulario si aparece.
- Quitar textos que pidan volver a agendar como accion principal.
- Mantener soporte o WhatsApp solo como ayuda secundaria.

Hero:
- El H1 debe confirmar la accion completada.
- El subtitulo debe explicar que hacer ahora.
- Debe ser claro en menos de 5 segundos.
- El estado visual de exito debe ser sobrio y premium.
- No confetti, no celebraciones exageradas, no emojis.

Proximos pasos:
- Deben ser 3 pasos maximo.
- Deben aplicar a cualquier servicio.
- No pedir documentos especificos que puedan no aplicar.
- Incluir aviso de no enviar informacion sensible por esta pagina.
- El usuario debe saber que revisar email/SMS o confirmacion de calendario es lo primero.

Visual:
- Mantener navy/gold/paper/warm white.
- Usar una foto real si existe.
- Si hay placeholder, debe verse editorial e intencional.
- Ajustar object-position para rostros, oficina o documentos.
- No cards anidadas.
- No bloques decorativos sin funcion.
- No hero generico de "thank you page" de plantilla.

Mobile:
- Revisar 360px y 390px.
- El H1 no debe cortarse.
- Los pasos no deben quedar apretados.
- El boton de soporte no debe competir con el mensaje principal.
- El footer debe ser compacto.

Tracking:
- Confirmar que se dispara un evento de thank-you view.
- Confirmar que se preservan UTMs si vienen en URL.
- Confirmar que no se inventan parametros.
- Confirmar que no hay doble disparo de conversion si la plataforma ya mide appointment booked en otro punto. Si existe riesgo de duplicacion, nombrar el evento como view y no como purchase/lead.

Copy final recomendado:
- H1: "Gracias, tu cita fue agendada"
- Subcopy: "Revisa tu confirmacion y prepara cualquier informacion que pueda ayudar al equipo durante la llamada."
- Paso 1: "Revisa tu confirmacion"
- Paso 2: "Prepara tus preguntas"
- Paso 3: "Habla con el equipo"

Checklist final:
- Sirve para cualquier servicio.
- No parece otra landing de venta.
- No tiene menu.
- No tiene rutas alternativas fuertes.
- Es linda, calma y premium.
- Explica que pasa despues.
- Tracking listo.
- Mobile limpio.

Entrega:
Aplica los cambios directamente y devuelve una lista breve:
- Distracciones removidas
- Ajustes visuales
- Ajustes de copy
- Ajustes de tracking
- Riesgos pendientes antes de publicar
```

---

# Checklist final de publicacion

## Prueba de URL y parametros

Abrir:

```txt
[BCL_PAGE_URL]?utm_source=facebook&utm_medium=paid_social&utm_campaign=test_bcl&utm_content=ad_01&fbclid=test
```

Confirmar:

- La pagina carga sin errores visibles.
- El formulario esta en DOM.
- Cada campo tiene atributo `name`.
- Los parametros se copian a los campos correspondientes o quedan disponibles via merge fields.
- `page_url` guarda la URL completa.
- `referrer` se guarda si existe.

## Prueba por servicio

Enviar 3 leads de prueba:

1. Seguros / auto_tlc
2. Taxes / itin
3. Inmigracion-documentos / traducciones

Confirmar en HighLevel:

- Contacto creado o actualizado.
- Nombre, telefono y email correctos.
- Servicio y detalle correctos.
- Fuente `BCL Campaign Landing`.
- UTMs presentes.
- Tags correctos.
- Workflow correcto disparado.
- Consentimiento registrado.

## Prueba visual

Revisar:

- 360px
- 390px
- 768px
- 1280px
- 1440px

Confirmar:

- Sin texto cortado.
- Sin solapamientos.
- Sin cards anidadas.
- Sin hero generico.
- Formulario visible temprano.
- Buen contraste en claro y oscuro.
- Foto principal con foco correcto.
- CTA primario evidente.
- WhatsApp secundario.

## Referencias HighLevel

- External Tracking: https://help.gohighlevel.com/support/solutions/articles/155000006092
- URL Parameters en Websites/Funnels: https://help.gohighlevel.com/support/solutions/articles/155000005722-url-parameters-in-websites-and-funnels
- Enhanced Form Tracking / Custom Field Capture: https://ideas.gohighlevel.com/changelog/enhanced-form-tracking-custom-field-capture
