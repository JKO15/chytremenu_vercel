import type { Macros } from '@/lib/data'
import { cn } from '@/lib/utils'

/**
 * The signature instrument of the app: every macro is expressed as its share
 * of the meal's energy (protein 4 kcal/g, carbs 4 kcal/g, fat 9 kcal/g), so
 * the bar always reads as one full unit of energy. The same component renders
 * at 3 px inside a recipe card and at 12 px above the week — one visual idea,
 * consistently repeated at every scale.
 */
export function energyShare(m: Macros) {
  const p = m.protein * 4
  const c = m.carbs * 4
  const f = m.fat * 9
  const total = p + c + f || 1
  return {
    protein: (p / total) * 100,
    carbs: (c / total) * 100,
    fat: (f / total) * 100,
  }
}

export function MacroBar({
  macros,
  size = 'md',
  className,
}: {
  macros: Macros
  size?: 'xs' | 'md' | 'lg'
  className?: string
}) {
  const s = energyShare(macros)
  const height = size === 'xs' ? 'h-[3px]' : size === 'md' ? 'h-1.5' : 'h-3'

  return (
    <div
      className={cn('flex w-full overflow-hidden rounded-full bg-muted', height, className)}
      role="img"
      aria-label={`Rozložení energie: bílkoviny ${Math.round(s.protein)} %, sacharidy ${Math.round(
        s.carbs,
      )} %, tuky ${Math.round(s.fat)} %`}
    >
      <span style={{ width: `${s.protein}%` }} className="bg-primary" />
      <span style={{ width: `${s.carbs}%` }} className="bg-accent" />
      <span style={{ width: `${s.fat}%` }} className="bg-chart-5" />
    </div>
  )
}

export function MacroLegend({ macros, className }: { macros: Macros; className?: string }) {
  const rows = [
    { key: 'B', label: 'bílkoviny', value: macros.protein, dot: 'bg-primary' },
    { key: 'S', label: 'sacharidy', value: macros.carbs, dot: 'bg-accent' },
    { key: 'T', label: 'tuky', value: macros.fat, dot: 'bg-chart-5' },
  ]
  return (
    <dl className={cn('flex items-center gap-4', className)}>
      {rows.map((r) => (
        <div key={r.key} className="flex items-center gap-1.5">
          <span className={cn('size-2 shrink-0 rounded-full', r.dot)} />
          <dt className="tag">{r.label}</dt>
          <dd className="num font-mono text-xs font-semibold">{Math.round(r.value)}g</dd>
        </div>
      ))}
    </dl>
  )
}

/** Big instrument readout — oversized tabular figure with a mono caption. */
export function Readout({
  value,
  unit,
  label,
  tone = 'default',
  className,
}: {
  value: string | number
  unit?: string
  label: string
  tone?: 'default' | 'primary' | 'accent' | 'muted'
  className?: string
}) {
  const toneClass =
    tone === 'primary'
      ? 'text-primary'
      : tone === 'accent'
        ? 'text-accent'
        : tone === 'muted'
          ? 'text-muted-foreground'
          : 'text-foreground'

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className={cn('num flex items-baseline gap-1', toneClass)}>
        <span className="font-mono text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[0.9] tracking-tight">
          {value}
        </span>
        {unit ? (
          <span className="font-mono text-xs font-medium text-muted-foreground">{unit}</span>
        ) : null}
      </span>
      <span className="tag">{label}</span>
    </div>
  )
}

/** Horizontal meter: value against a target, with overshoot marked in apricot. */
export function Meter({
  value,
  target,
  className,
}: {
  value: number
  target: number
  className?: string
}) {
  const pct = Math.min((value / target) * 100, 100)
  const over = value > target
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-muted', className)}>
      <span
        style={{ width: `${pct}%` }}
        className={cn('block h-full rounded-full transition-[width] duration-700', {
          'bg-accent': over,
          'bg-primary': !over,
        })}
      />
    </div>
  )
}
