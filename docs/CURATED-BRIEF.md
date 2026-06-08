# CURATED BRIEF - Christian Brokerage
generated: 2026-06-05
based_on: repo audit, visual screenshots, local ARSENAL, existing business docs

## 1. Clasificacion del negocio
industry: servicios profesionales boutique
subvertical: seguros, taxes, asistencia administrativa migratoria
audience: comunidad hispana en Nueva York y EE.UU.; familias, trabajadores independientes, conductores TLC, pequenos negocios
brand_maturity: established
emotional_register: confiable, humano, local, profesional
competitive_pressure: medium

## 2. Tipo de proyecto
type: B corporativo con paginas de conversion por servicio
confidence: high
rationale: el sitio debe explicar multiples servicios, generar confianza y dirigir a WhatsApp/calendario sin depender de CMS en esta fase.

## 3. Estilo visual recomendado
primary_style: Editorial Humano
alternative_styles: [Glassmorphic Luxury sobrio, Organic Warm profesional]
why: el valor diferencial esta en la persona, la oficina real, las certificaciones y el trato en espanol. Las fotos propias elevan la marca mas que iconos 3D o fondos generados.
mood_adjectives: [editorial, cercano, autorizado]
not_minimalist_because: necesita transmitir calidez local y autoridad profesional, no solo presencia corporativa.
reference_sites: [Pentagram editorial rhythm, Aesop photographic restraint, Ramp trust density]

## 4. Tech stack recomendado
core_stack: Vite + React + Tailwind v4
visual_libraries: [framer-motion, gsap/ScrollTrigger existente, lucide-react]
motion_strategy: Framer Motion sutil + GSAP solo donde ya existe scroll storytelling
why_this_stack: mantiene el proyecto actual, reduce riesgo y permite una refactorizacion visual rapida sin migracion.

## 5. Skills a activar
mandatory: [frontend-design, stylistic-audit, a11y-audit, performance-audit]
type_specific: [corporate-site]
magic_layer: [magic-section-designer, motion-polish, ui-spec-author]

## 6. Librerias prioritarias
- framer-motion - reveals sobrios, drawer, accordion y microinteracciones.
- lucide-react - iconografia funcional en botones y servicios.
- gsap/ScrollTrigger - conservar solo para narrativas existentes donde aporte.

## 7. Blueprint seccion por seccion
sections:
  - id: home-hero
    treatment: hero-asymmetric-split-editorial
    why: reemplaza visual generado por retrato/oficina real y establece confianza inmediata.
    libraries: [framer-motion]
    intensity: medium
    a11y_consideration: headline simple, CTA claros, reduced-motion sin parallax.
    performance_budget: LCP <= 1.8s mobile; imagen hero optimizada y sin 3D.
  - id: service-pages-hero
    treatment: hero-asymmetric-split-editorial
    why: cada vertical necesita voz propia sin repetir plantilla oscura.
    libraries: [framer-motion]
    intensity: medium
    a11y_consideration: una sola jerarquia H1 por ruta.
    performance_budget: lazy de imagenes no criticas.
  - id: service-cards
    treatment: features-editorial-index-cards
    why: reduce densidad visible y deja el detalle en drawer.
    libraries: [framer-motion, lucide-react]
    intensity: subtle
    a11y_consideration: botones con labels, foco visible, contenido expandible en dialog.
    performance_budget: sin cursor glow ni backdrop-filter masivo.
  - id: booking
    treatment: cta-calendar-booking-inline
    why: conversion clara con fallback honesto cuando falte ID GHL.
    libraries: []
    intensity: subtle
    a11y_consideration: iframe con title y fallback no tecnico.
    performance_budget: cargar iframe solo si existe URL real.

## 8. Riesgos y banderas rojas
- Meta Pixel placeholder genera warnings y debe quedar gateado por env.
- Fotos generadas/3D degradan confianza cuando compiten con retratos reales.
- Copy largo en cards reduce escaneabilidad mobile.
- Bundle inicial ya esta por encima del budget ideal; evitar sumar librerias.

## 9. Decisiones del cliente
- Direccion visual aprobada: Editorial Humano.
- Alcance aprobado: sistema completo en esta primera pasada.

## 10. Gaps
gaps:
  - IDs reales de calendarios GoHighLevel por vertical.
  - Meta Pixel real o decision de removerlo.
