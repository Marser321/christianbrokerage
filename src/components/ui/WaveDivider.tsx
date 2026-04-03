interface WaveDividerProps {
  from?: string
  to?: string
  flip?: boolean
  className?: string
  variant?: 'wave' | 'curve' | 'slant'
}

export function WaveDivider({
  from = '#ffffff',
  to = '#0a2540',
  flip = false,
  className = '',
  variant = 'wave',
}: WaveDividerProps) {
  const paths = {
    wave: 'M0,96L48,101.3C96,107,192,117,288,128C384,139,480,149,576,138.7C672,128,768,96,864,85.3C960,75,1056,85,1152,101.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    curve: 'M0,160L60,149.3C120,139,240,117,360,112C480,107,600,117,720,138.7C840,160,960,192,1080,192C1200,192,1320,160,1380,144L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
    slant: 'M0,288L1440,96L1440,320L0,320Z',
  }

  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{
        marginTop: '-1px',
        marginBottom: '-1px',
        transform: flip ? 'rotate(180deg)' : undefined,
        background: from,
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="block w-full"
        style={{ height: '80px' }}
      >
        <path
          fill={to}
          d={paths[variant]}
        />
      </svg>
    </div>
  )
}
