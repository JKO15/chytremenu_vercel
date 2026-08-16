import Image from 'next/image'
import { cn } from '@/lib/utils'

type RecipeVisualProps = {
  src?: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  compact?: boolean
  showTitle?: boolean
  variant?: 'plate' | 'bowl' | 'kitchen'
}

export function RecipeVisual({
  src,
  alt,
  className,
  sizes = '100vw',
  priority,
  compact = false,
  showTitle = false,
  variant = 'plate',
}: RecipeVisualProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover', className)}
      />
    )
  }

  const imageByVariant = {
    plate: '/food/placeholder-plate.png',
    bowl: '/food/placeholder-bowl.png',
    kitchen: '/food/placeholder-kitchen.png',
  } as const

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-brand', className)} role="img" aria-label={`${alt} — fotka zatím není dostupná`}>
      <Image
        src={imageByVariant[variant]}
        alt={`${alt} — ilustrovaný placeholder`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent p-5 pt-16 text-white">
        <div className="flex items-end justify-between gap-3">
          {showTitle ? (
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80">nový recept</span>
              <span className={cn('max-w-[24ch] font-semibold leading-snug', compact ? 'text-xs' : 'text-lg')}>{alt}</span>
            </div>
          ) : (
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80">bez fotky</span>
          )}
        </div>
      </div>
    </div>
  )
}
