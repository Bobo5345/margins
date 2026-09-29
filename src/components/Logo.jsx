import { LOGOS } from '../config'

/** Transparent logo, WebP with PNG fallback. */
export default function Logo({ which = 'college', className = '', height, eager = false }) {
  const logo = LOGOS[which]
  return (
    <picture className={className}>
      <source srcSet={`${logo.src}.webp`} type="image/webp" />
      <img
        src={`${logo.src}.png`}
        width={logo.width}
        height={logo.height}
        style={height ? { height, width: 'auto' } : undefined}
        alt={logo.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
