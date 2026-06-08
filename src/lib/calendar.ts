const placeholderPattern = /REPLACE|PLACEHOLDER|CALENDAR_ID|YOUR_/i
const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid']

function readTrackedParam(name: string) {
  const fromUrl = new URLSearchParams(window.location.search).get(name)
  if (fromUrl) {
    try {
      window.sessionStorage.setItem(name, fromUrl)
    } catch {
      return fromUrl
    }
    return fromUrl
  }

  try {
    return window.sessionStorage.getItem(name)
  } catch {
    return null
  }
}

export function getCalendarSrc(envName: string, category: string) {
  const rawValue = (import.meta.env as Record<string, string | undefined>)[envName]
  if (!rawValue || placeholderPattern.test(rawValue)) return null

  try {
    const url = new URL(rawValue)
    for (const param of utmParams) {
      const value = readTrackedParam(param)
      if (value) url.searchParams.set(param, value)
    }
    url.searchParams.set('category', category)
    return url.toString()
  } catch {
    return null
  }
}
