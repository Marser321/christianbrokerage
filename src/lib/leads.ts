import type { ServiceLeadPayload } from '../components/services/ServiceLeadWizard'

// Espeja el patrón de calendar.ts: la URL del webhook vive en una env var y se
// valida contra valores placeholder para no disparar a un endpoint falso.
const placeholderPattern = /REPLACE|PLACEHOLDER|WEBHOOK_URL|YOUR_/i

export type LeadResult = { ok: true } | { ok: false; reason: 'unset' | 'network' }

export function getLeadWebhook(): string | null {
  const raw = (import.meta.env as Record<string, string | undefined>).VITE_GHL_LEAD_WEBHOOK
  if (!raw || placeholderPattern.test(raw)) return null
  try {
    return new URL(raw).toString()
  } catch {
    return null
  }
}

/**
 * Envía el lead al webhook inbound de GoHighLevel.
 *
 * Los webhooks inbound de GHL normalmente NO devuelven cabeceras CORS, así que un
 * fetch "normal" desde el navegador fallaría al leer la respuesta aunque el lead sí
 * se reciba. Por eso usamos `mode: 'no-cors'`: el POST se entrega (GHL lo procesa)
 * pero la respuesta es opaca y no se puede leer el status. Tratamos "sin excepción"
 * como éxito optimista; el botón de WhatsApp en la confirmación cubre cualquier caso.
 *
 * No fijamos Content-Type (en no-cors se ignoraría); GHL parsea el cuerpo JSON igual.
 * Para confirmación 100% fiable habría que enrutar por un proxy server-side.
 */
export async function submitLead(payload: ServiceLeadPayload): Promise<LeadResult> {
  const url = getLeadWebhook()
  if (!url) return { ok: false, reason: 'unset' }

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: JSON.stringify(payload),
    })
    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
