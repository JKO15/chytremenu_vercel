'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RecipeVisual } from '@/components/recipe-visual'
import {
  ArrowLeft,
  CalendarPlus,
  Clock,
  Pencil,
  Share2,
  ShoppingBasket,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MacroBar, energyShare } from '@/components/macros'
import { dailyTarget, type Recipe } from '@/lib/data'
import { cn } from '@/lib/utils'

function scaleAmount(amount: string, factor: number) {
  const match = amount.match(/^([\d.,]+)\s*(.*)$/)
  if (!match) return amount
  const value = Number.parseFloat(match[1].replace(',', '.')) * factor
  const rounded = value >= 10 ? Math.round(value) : Math.round(value * 10) / 10
  return `${String(rounded).replace('.', ',')} ${match[2]}`.trim()
}

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.servings)
  const [done, setDone] = useState<number[]>([])
  const factor = servings / recipe.servings
  const share = energyShare(recipe.macros)

  const macroRows = [
    {
      label: 'bílkoviny',
      value: recipe.macros.protein,
      target: dailyTarget.protein,
      pct: share.protein,
      dot: 'bg-primary',
    },
    {
      label: 'sacharidy',
      value: recipe.macros.carbs,
      target: dailyTarget.carbs,
      pct: share.carbs,
      dot: 'bg-accent',
    },
    {
      label: 'tuky',
      value: recipe.macros.fat,
      target: dailyTarget.fat,
      pct: share.fat,
      dot: 'bg-chart-5',
    },
  ]

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
      <Link
        href="/recepty"
        className="tag inline-flex w-fit items-center gap-1.5 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        zpět na recepty
      </Link>

      {/* ── Photographic hero ── */}
      <header className="flex flex-col gap-5">
        <div className="relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl md:min-h-[440px]">
          <RecipeVisual
            src={recipe.image}
            alt={recipe.title}
            variant={recipe.placeholder}
            priority
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="-z-10"
          />
          <div className="scrim absolute inset-0 -z-10" />

          <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-foreground">
              {recipe.category}
            </span>
            <span className="num flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-md">
              <Clock className="size-3" />
              {recipe.minutes} min
            </span>
            {!recipe.image ? (
              <span className="flex items-center gap-1.5 rounded-full bg-brand-2 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-2-foreground">
                BEZ FOTOGRAFIE
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 p-5 md:p-8">
            <h1 className="max-w-3xl text-[clamp(1.9rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.035em] text-balance text-white">
              {recipe.title}
            </h1>

            {!recipe.image ? (
              <p className="flex w-fit items-center gap-2 rounded-lg border border-brand-2/40 bg-brand-2/15 px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-2">
                <span className="size-1.5 rounded-full bg-brand-2" />
                Tento recept zatím nemá fotografii
              </p>
            ) : null}

            <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
              <span className="num flex items-baseline gap-1 font-mono text-white">
                <span className="text-3xl font-bold leading-none tracking-tight md:text-4xl">
                  {recipe.macros.kcal}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-white/60">
                  kcal/porce
                </span>
              </span>
              <span className="num on-photo-accent flex items-baseline gap-1 font-mono">
                <span className="text-3xl font-bold leading-none tracking-tight md:text-4xl">
                  {recipe.macros.protein}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-white/70">
                  g bílkovin
                </span>
              </span>
              <span className="num ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
                aktualizace {recipe.updated}
              </span>
            </div>

            <MacroBar macros={recipe.macros} size="md" className="bg-white/20" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-8">
          <Button className="gap-1.5 rounded-xl">
            <ShoppingBasket className="size-4" />
            Do nákupního seznamu
          </Button>
          <Button variant="outline" className="gap-1.5 rounded-xl bg-card">
            <CalendarPlus className="size-4" />
            Naplánovat
          </Button>
          <Button variant="outline" className="gap-1.5 rounded-xl bg-card">
            <Share2 className="size-4" />
            Sdílet
          </Button>
          <span className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Upravit recept"
              className="rounded-xl text-muted-foreground"
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Smazat recept"
              className="rounded-xl text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </span>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div className="flex max-w-[640px] flex-col gap-10">
          {/* ── Ingredients ── */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight">Ingredience</h2>
              <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
                <span className="tag pl-2">porce</span>
                <button
                  type="button"
                  aria-label="Méně porcí"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  −
                </button>
                <span className="num w-5 text-center font-mono text-sm font-bold text-primary">
                  {servings}
                </span>
                <button
                  type="button"
                  aria-label="Více porcí"
                  onClick={() => setServings((s) => Math.min(20, s + 1))}
                  className="grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  +
                </button>
              </div>
            </div>

            <ul className="divide-y divide-border border-y border-border">
              {recipe.ingredients.map((ing, i) => {
                const checked = done.includes(i)
                return (
                  <li key={ing.name}>
                    <button
                      type="button"
                      aria-pressed={checked}
                      onClick={() =>
                        setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))
                      }
                      className="group flex w-full items-baseline gap-4 py-3.5 text-left"
                    >
                      <span
                        className={cn(
                          'num w-24 shrink-0 font-mono text-sm font-bold tabular-nums transition-colors',
                          checked ? 'text-muted-foreground' : 'text-primary',
                        )}
                      >
                        {scaleAmount(ing.amount, factor)}
                      </span>
                      <span
                        className={cn(
                          'flex-1 text-[15px] transition-colors',
                          checked && 'text-muted-foreground line-through',
                        )}
                      >
                        {ing.name}
                        {ing.note ? (
                          <span className="text-muted-foreground"> ({ing.note})</span>
                        ) : null}
                      </span>
                      <span
                        className={cn(
                          'mt-1 size-4 shrink-0 rounded border transition-colors',
                          checked
                            ? 'border-primary bg-primary'
                            : 'border-border group-hover:border-primary/60',
                        )}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* ── Steps ── */}
          <section>
            <h2 className="mb-5 text-xl font-bold tracking-tight">Postup</h2>
            <ol className="flex flex-col gap-6">
              {recipe.steps.map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="num font-mono text-2xl font-bold leading-none text-muted-foreground/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="flex-1 pt-0.5 text-[15px] leading-relaxed text-pretty">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {recipe.tags.length ? (
            <section className="flex flex-wrap items-center gap-2 border-t border-border pt-6">
              {recipe.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </section>
          ) : null}
        </div>

        {/* ── Nutrition instrument ── */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-5">
              <span className="tag">na 1 porci</span>
              <div className="num mt-2 flex items-baseline gap-2">
                <span className="font-mono text-[3rem] font-bold leading-[0.85] tracking-tighter">
                  {recipe.macros.kcal}
                </span>
                <span className="font-mono text-xs text-muted-foreground">kcal</span>
              </div>
              <p className="num mt-2 font-mono text-[11px] text-muted-foreground">
                {Math.round((recipe.macros.kcal / dailyTarget.kcal) * 100)} % denního cíle (
                {dailyTarget.kcal} kcal)
              </p>
              <MacroBar macros={recipe.macros} size="lg" className="mt-4" />
            </div>

            <dl className="divide-y divide-border">
              {macroRows.map((row) => (
                <div key={row.label} className="flex flex-col gap-2 px-5 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="flex items-center gap-2">
                      <span className={cn('size-2 rounded-full', row.dot)} />
                      <span className="tag">{row.label}</span>
                    </dt>
                    <dd className="num flex items-baseline gap-2">
                      <span className="font-mono text-base font-bold">{row.value}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">g</span>
                    </dd>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        style={{ width: `${Math.min((row.value / row.target) * 100, 100)}%` }}
                        className={cn('block h-full rounded-full', row.dot)}
                      />
                    </div>
                    <span className="num w-24 shrink-0 whitespace-nowrap text-right font-mono text-[10px] text-muted-foreground">
                      {Math.round(row.pct)} % energie
                    </span>
                  </div>
                </div>
              ))}
            </dl>

            <div className="border-t border-border bg-muted/30 px-5 py-4">
              <span className="tag">celkem za {servings} porce</span>
              <p className="num mt-1.5 font-mono text-sm font-bold">
                {Math.round(recipe.macros.kcal * factor)} kcal ·{' '}
                {Math.round(recipe.macros.protein * factor)} g bílkovin
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
