import logoHorizontal from '../../assets/images/logo-cb-horizontal.png'
import { useVariant } from '../../context/VariantContext'

type ThemedLogoProps = {
  className?: string
  /**
   * - "auto": azul en tema claro, blanco (reverso de marca) en tema oscuro.
   * - "onInvert": siempre blanco; para superficies navy fijas (footer) en cualquier tema.
   */
  tone?: 'auto' | 'onInvert'
}

/**
 * El logo horizontal es azul sobre transparente. Para fondos oscuros lo
 * renderizamos en blanco con un filtro (tratamiento reverso de marca), evitando
 * el recuadro blanco y el bajo contraste de azul-sobre-navy.
 */
export function ThemedLogo({ className, tone = 'auto' }: ThemedLogoProps) {
  const { theme } = useVariant()
  const white = tone === 'onInvert' || theme === 'dark'
  return (
    <img
      src={logoHorizontal}
      alt="Christian Brokerage"
      className={`${white ? 'logo-on-dark ' : ''}${className ?? ''}`}
    />
  )
}
