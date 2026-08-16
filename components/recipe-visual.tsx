import Image from 'next/image'
import { ChefHat, CookingPot, ForkKnife, Leaf, Soup, Utensils } from 'lucide-react'
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

  const isBowl = variant === 'bowl'
  const isKitchen = variant === 'kitchen'

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col justify-between overflow-hidden p-5 text-white',
        isBowl
          ? 'bg-[radial-gradient(circle_at_50%_38%,oklch(0.55_0.12_187)_0_18%,transparent_19%),linear-gradient(135deg,oklch(0.16_0.035_205),oklch(0.31_0.09_187)_58%,oklch(0.46_0.09_187))]'
          : isKitchen
            ? 'bg-[radial-gradient(circle_at_50%_36%,oklch(0.54_0.12_187)_0_17%,transparent_18%),linear-gradient(135deg,oklch(0.15_0.03_205),oklch(0.3_0.08_187)_55%,oklch(0.68_0.12_69))]'
            : 'bg-[radial-gradient(circle_at_50%_38%,oklch(0.72_0.12_187)_0_20%,transparent_21%),linear-gradient(135deg,oklch(0.18_0.035_205),oklch(0.34_0.09_187)_52%,oklch(0.68_0.12_69))]',
        className,
      )}
      role="img"
      aria-label={`${alt} — fotka zatím není dostupná`}
    >
      {isBowl ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative mt-8 size-48 md:size-64">
            <div className="absolute inset-x-2 bottom-5 h-28 rounded-[50%] border-8 border-brand/70 bg-brand/25 shadow-[0_18px_0_-5px_oklch(0_0_0_/_28%)] md:h-36" />
            <div className="absolute inset-x-8 bottom-24 h-20 rounded-[50%] border-4 border-brand-2/80 bg-brand-2/25 md:bottom-32 md:h-24" />
            <span className="absolute left-16 top-12 size-7 rounded-full bg-brand-2/90 shadow-[18px_10px_0_oklch(0.72_0.12_187),-16px_24px_0_oklch(0.78_0.1_69)] md:left-20 md:top-16" />
            <span className="absolute right-12 top-20 h-14 w-7 rotate-45 rounded-full bg-brand/80 md:right-16 md:top-24" />
            <Leaf className="absolute -right-4 top-8 size-16 rotate-12 text-brand-2/80 md:-right-8 md:top-12 md:size-20" />
          </div>
        </div>
      ) : isKitchen ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative mt-8">
            <CookingPot className="size-40 stroke-[1.2] text-brand md:size-56" />
            <span className="absolute left-1/2 top-[-30px] h-16 w-8 -translate-x-1/2 rounded-full border-4 border-brand-2/75 border-b-0 md:top-[-42px] md:h-24 md:w-12" />
            <span className="absolute left-[38%] top-[-22px] h-12 w-5 -rotate-12 rounded-full border-4 border-brand-2/60 border-b-0 md:top-[-32px] md:h-20" />
            <Utensils className="absolute -bottom-6 -right-28 size-24 rotate-12 stroke-[1.2] text-brand-2 md:-bottom-8 md:-right-36 md:size-32" />
          </div>
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative mt-8 flex items-center gap-6 md:gap-10">
            <ForkKnife className="size-24 shrink-0 -rotate-6 stroke-[1.1] text-brand md:size-36" />
            <div className="relative size-48 shrink-0 rounded-full border-[18px] border-brand/80 bg-brand/20 shadow-[0_18px_0_-5px_oklch(0_0_0_/_28%)] md:size-72 md:border-[22px]">
              <div className="absolute inset-6 rounded-full border-2 border-brand-2/70 md:inset-8" />
              <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-2/90 shadow-[12px_16px_0_oklch(0.72_0.12_187)] md:size-24" />
            </div>
            <span className="flex h-36 w-14 shrink-0 rotate-6 flex-col items-center gap-1 text-brand md:h-48 md:w-18">
              <span className="h-24 w-7 rounded-[55%_55%_30%_30%] border-2 border-current md:h-32 md:w-9" />
              <span className="h-12 w-2 rounded-full bg-current md:h-16 md:w-2.5" />
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
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/75">
              nový recept
            </span>
            <span className={cn('max-w-[24ch] font-semibold leading-snug', compact ? 'text-xs' : 'text-lg')}>
              {alt}
            </span>
          </div>
        ) : (
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/75">
            nový recept
          </span>
        )}
        <ChefHat className={cn('shrink-0 opacity-80', compact ? 'size-7' : 'size-11')} />
      </div>
    </div>
  )
}
