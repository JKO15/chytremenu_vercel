import Image from 'next/image'
import { ChefHat, CookingPot, ForkKnife, Soup, Utensils } from 'lucide-react'
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
  variant = 'editorial',
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

  const isBowl = variant === 'bowl'
  const isKitchen = variant === 'kitchen'

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-between overflow-hidden p-5 text-brand-foreground',
        isBowl
          ? 'bg-[linear-gradient(135deg,oklch(0.28_0.08_185),oklch(0.52_0.13_187))]'
          : isKitchen
            ? 'bg-[linear-gradient(135deg,oklch(0.23_0.04_205),oklch(0.34_0.09_187)_52%,oklch(0.68_0.12_69))]'
            : 'bg-[linear-gradient(135deg,oklch(0.76_0.11_187),oklch(0.72_0.12_205)_48%,oklch(0.8_0.13_69))]',
        className,
      )}
      role="img"
      aria-label={`${alt} — fotka zatím není dostupná`}
    >
      {isBowl ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative mt-8 size-44 rounded-[50%] border-[18px] border-white/30 bg-brand-2/25 shadow-[0_18px_0_-4px_oklch(0_0_0_/_18%)] md:size-56">
            <div className="absolute inset-5 rounded-[50%] border-2 border-white/25 bg-brand/25" />
            <span className="absolute left-10 top-12 size-4 rounded-full bg-brand-2/80" />
            <span className="absolute right-12 top-20 size-5 rounded-full bg-brand/80" />
            <span className="absolute bottom-10 left-20 size-3 rounded-full bg-white/60" />
          </div>
        </div>
      ) : isKitchen ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative mt-8 flex items-center gap-4 text-white/65">
            <CookingPot className="size-28 stroke-[1.1] md:size-36" />
            <Utensils className="size-16 -rotate-12 stroke-[1.1] md:size-20" />
          </div>
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative mt-8 flex items-center gap-5 md:gap-8">
            <ForkKnife className="size-16 shrink-0 -rotate-6 stroke-[1.1] text-white/70 md:size-20" />
            <div className="relative size-44 shrink-0 rounded-full border-[18px] border-white/35 bg-white/12 shadow-[0_14px_0_-3px_oklch(0_0_0_/_16%)] md:size-56">
              <div className="absolute inset-5 rounded-full border-2 border-white/30" />
              <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-2/80 md:size-16" />
            </div>
            <span className="flex h-24 w-10 shrink-0 rotate-6 flex-col items-center gap-1 text-white/70 md:h-28 md:w-12">
              <span className="h-16 w-5 rounded-[55%_55%_30%_30%] border border-current md:h-20 md:w-6" />
              <span className="h-8 w-1.5 rounded-full bg-current md:h-9" />
            </span>
          </div>
        </div>
      )}
      <div className="relative flex items-center justify-between">
        <span className="rounded-full bg-white/35 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm">
          bez fotky · {isBowl ? 'miska' : isKitchen ? 'kuchyně' : 'talíř'}
        </span>
        {isBowl ? <Soup className="size-4 opacity-80" /> : isKitchen ? <CookingPot className="size-4 opacity-80" /> : <Utensils className="size-4 opacity-70" />}
      </div>
      <div className="relative flex items-end justify-between gap-3">
        {showTitle ? (
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] opacity-70">
              nový recept
            </span>
            <span className={cn('max-w-[24ch] font-semibold leading-snug', compact ? 'text-xs' : 'text-lg')}>
              {alt}
            </span>
          </div>
        ) : (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] opacity-70">
            nový recept
          </span>
        )}
        <ChefHat className={cn('shrink-0 opacity-80', compact ? 'size-7' : 'size-11')} />
      </div>
    </div>
  )
}
