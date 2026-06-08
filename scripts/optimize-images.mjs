// Optimiza TODO el set de "Fotos para la WEB" -> public/images/** según el
// manifiesto (Prompts Imagenes - Christian Brokerage.md §9).
// Editorial = nombre base; Fotográfica = sufijo -foto. Conserva el aspecto
// nativo (sin recorte): el encuadre real se hace en CSS/JSX con object-position.
// Uso: node scripts/optimize-images.mjs   (requiere sharp; npm i sharp --no-save)
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, join } from 'node:path'
import { mkdir, readdir, stat } from 'node:fs/promises'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDir, '..', '..')
const SRC_DIR = join(projectRoot, 'Fotos para la WEB')
const OUT_DIR = resolve(scriptDir, '..', 'public', 'images')
const PREFIX = 'ChatGPT Image 5 jun 2026, '
const MAX_EDGE = 1600
const QUALITY = 80

// Catálogo: cada timestamp del archivo -> ruta de salida (sin extensión).
const JOBS = [
  // ===== EDITORIAL (Parte 1, sin rostros) =====
  ['12_54_39', 'bg/section-light'],
  ['12_54_32', 'bg/section-warm'],
  ['12_54_24', 'bg/section-navy'],
  ['12_54_17', 'bg/hero-seguros'],
  ['12_54_10', 'bg/hero-taxes'],
  ['12_54_02', 'bg/hero-inmigracion'],
  ['12_53_54', 'cards/main-seguros'],
  ['12_53_46', 'cards/main-taxes'],
  ['12_54_49', 'cards/main-inmigracion'],
  ['12_53_35', 'verticals/seguros'],
  ['12_53_26', 'verticals/taxes'],
  ['12_53_18', 'verticals/inmigracion'],
  ['12_53_09', 'services/seg-auto'],
  ['12_53_01', 'services/seg-tlc'],
  ['12_52_52', 'services/seg-negocio'],
  ['12_52_45', 'services/seg-casa'],
  ['12_52_37', 'services/seg-salud'],
  ['12_52_29', 'services/seg-hipoteca'],
  ['12_52_20', 'services/seg-identidad'],
  ['12_52_11', 'services/seg-alarma'],
  ['12_52_02', 'services/tax-personal'],
  ['12_51_54', 'services/tax-comercial'],
  ['12_51_47', 'services/tax-empresas'],
  ['12_51_39', 'services/tax-itin'],
  ['12_51_31', 'services/tax-auditoria'],
  ['12_51_23', 'services/tax-retiro'],
  ['12_51_16', 'services/tax-529'],
  ['12_51_09', 'services/inm-i130'],
  ['12_51_01', 'services/inm-ajuste'],
  ['12_50_45', 'services/inm-n400'],
  ['12_50_35', 'services/inm-trad'],
  ['12_50_28', 'services/inm-consular'],
  ['12_50_20', 'menu/menu-neutral'],
  ['12_50_12', 'menu/menu-seguros'],
  ['12_50_05', 'menu/menu-taxes'],
  ['12_49_57', 'menu/menu-inmigracion'],
  ['12_49_50', 'drawer/drawer-seguros'],
  ['12_49_41', 'drawer/drawer-taxes'],
  ['12_49_33', 'drawer/drawer-inmigracion'],

  // ===== FOTOGRÁFICA (Parte 2, con personas / placement-aware) =====
  ['12_49_24', 'bg/hero-home-foto'],
  ['12_49_16', 'bg/hero-seguros-foto'],
  ['12_49_06', 'bg/hero-taxes-foto'],
  ['12_48_58', 'bg/hero-inmigracion-foto'],
  ['12_44_16', 'bg/contacto-foto'],
  ['12_48_50', 'verticals/seguros-foto'],
  ['12_48_40', 'verticals/taxes-foto'],
  ['12_46_08', 'verticals/inmigracion-foto'],
  ['12_48_31', 'cards/main-seguros-foto'],
  ['12_48_23', 'cards/main-taxes-foto'],
  ['12_48_16', 'cards/main-inmigracion-foto'],
  ['12_48_08', 'services/seg-auto-foto'],
  ['12_48_00', 'services/seg-tlc-foto'],
  ['12_47_52', 'services/seg-negocio-foto'],
  ['12_47_44', 'services/seg-casa-foto'],
  ['12_47_36', 'services/seg-salud-foto'],
  ['12_47_28', 'services/seg-hipoteca-foto'],
  ['12_47_03', 'services/seg-identidad-foto'],
  ['12_47_11', 'services/seg-alarma-foto'],
  ['12_47_19', 'services/tax-personal-foto'],
  ['12_46_55', 'services/tax-comercial-foto'],
  ['12_46_47', 'services/tax-empresas-foto'],
  ['12_46_40', 'services/tax-itin-foto'],
  ['12_46_32', 'services/tax-auditoria-foto'],
  ['12_46_24', 'services/tax-retiro-foto'],
  ['12_46_16', 'services/tax-529-foto'],
  ['12_46_08', 'services/inm-i130-foto'], // reúso (familia/reunión)
  ['12_45_59', 'services/inm-ajuste-foto'],
  ['12_45_52', 'services/inm-n400-foto'],
  ['12_45_43', 'services/inm-trad-foto'],
  ['12_48_16', 'services/inm-consular-foto'], // reúso (familia con pasaporte)
  ['12_45_27', 'menu/menu-neutral-foto'],
  ['12_45_19', 'menu/menu-seguros-foto'],
  ['12_45_12', 'menu/menu-taxes-foto'],
  ['12_45_04', 'menu/menu-inmigracion-foto'],
  ['12_44_57', 'drawer/drawer-seguros-foto'],
  ['12_44_41', 'drawer/drawer-taxes-foto'],
  ['12_44_31', 'drawer/drawer-inmigracion-foto'],
]

async function run() {
  const available = new Set(await readdir(SRC_DIR))
  const dirs = new Set(JOBS.map(([, out]) => dirname(join(OUT_DIR, out))))
  await Promise.all([...dirs].map((d) => mkdir(d, { recursive: true })))

  let totalIn = 0
  let totalOut = 0
  const missing = []

  for (const [stamp, out] of JOBS) {
    const file = `${PREFIX}${stamp}.png`
    if (!available.has(file)) {
      missing.push(file)
      continue
    }
    const inPath = join(SRC_DIR, file)
    const outPath = join(OUT_DIR, `${out}.webp`)
    await sharp(inPath)
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)
    const [a, b] = await Promise.all([stat(inPath), stat(outPath)])
    totalIn += a.size
    totalOut += b.size
  }

  console.log(`Procesadas ${JOBS.length - missing.length}/${JOBS.length} imágenes`)
  console.log(`Total: ${(totalIn / 1024 / 1024).toFixed(1)}MB -> ${(totalOut / 1024 / 1024).toFixed(1)}MB`)
  console.log(`Salida: ${OUT_DIR}`)
  if (missing.length) {
    console.log(`\n⚠ Faltan ${missing.length} fuentes:`)
    missing.forEach((m) => console.log(`  - ${m}`))
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
