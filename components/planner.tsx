'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { RecipeVisual } from '@/components/recipe-visual'
import { ChevronLeft, ChevronRight, Plus, Share2, ShoppingBasket, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MacroBar, MacroLegend, Meter, Readout } from '@/components/macros'
import {
  MEAL_CATEGORIES,
  dailyTarget,
  dayMacros,
  getPlaceholderVariant,
  getRecipe,
  recipes,
  week as initialWeek,
  type MealCategory,
  type Macros,
  type PlanDay,
} from '@/lib/data'
import { cn } from '@/lib/utils'

const SLOT_SHORT: Record<MealCategory, string> = {
  Snídaně: 'Snídaně',
  'Dopolední svačina': 'Svačina I',
  Oběd: 'Oběd',
  'Odpolední svačina': 'Svačina II',
  Večeře: 'Večeře',
}

export function Planner() {
  const [days, setDays] = useState<PlanDay[]>(initialWeek)
  const [picker, setPicker] = useState<{ day: number; slot: MealCategory } | null>(null)
  const [servings, setServings] = useState(2)

  const totals = useMemo(() => {
    const sum = days.reduce<Macros>(
      (acc, d) => {
        const m = dayMacros(d)
        return {
          kcal: acc.kcal + m.kcal,
          protein: acc.protein + m.protein,
          carbs: acc.carbs + m.carbs,
          fat: acc.fat + m.fat,
        }
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 },
    )
    return {
      perDay: {
        kcal: Math.round(sum.kcal / days.length),
        protein: Math.round(sum.protein / days.length),
        carbs: Math.round(sum.carbs / days.length),
        fat: Math.round(sum.fat / days.length),
      },
      planned: days.reduce((n, d) => n + d.entries.length, 0),
      slots: days.length * MEAL_CATEGORIES.length,
    }
  }, [days])

  const today = days.find((d) => d.today)

  function addMeal(slug: string) {
    if (!picker) return
    setDays((prev) =>
      prev.map((d, i) =>
        i === picker.day
          ? { ...d, entries: [...d.entries, { slot: picker.slot, slug, servings }] }
          : d,
      ),
    )
    setPicker(null)
  }

  function removeMeal(dayIndex: number, slot: MealCategory, slug: string) {
    setDays((prev) =>
      prev.map((d, i) =>
        i === dayIndex
          ? { ...d, entries: d.entries.filter((e) => !(e.slot === slot && e.slug === slug)) }
          : d,
      ),
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8">
      {/* ── Instrument header ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="tag">Jídelníček · týden 32</span>
            <div className="flex items-center gap-3">
              <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                3.–9. srpna
              </h1>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Předchozí týden"
                  className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Následující týden"
                  className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
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
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                className="grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                +
              </button>
            </div>
            <Button variant="outline" className="gap-1.5 rounded-xl bg-card">
              <Share2 className="size-4" />
              Sdílet
            </Button>
            <Button className="gap-1.5 rounded-xl">
              <ShoppingBasket className="size-4" />
              Do nákupu
            </Button>
          </div>
        </div>

        {/* Weekly readout strip */}
        <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
          <div className="flex flex-wrap items-start gap-x-10 gap-y-6">
            <Readout value={totals.perDay.kcal} unit="kcal/den" label="průměr energie" />
            <Readout
              value={totals.perDay.protein}
              unit="g/den"
              label="bílkoviny"
              tone="primary"
            />
            <Readout
              value={`${totals.planned}/${totals.slots}`}
              label="obsazených okének"
              tone="muted"
            />
            <div className="min-w-[240px] flex-1">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="tag">rozložení energie za týden</span>
                <span className="num font-mono text-[11px] text-muted-foreground">
                  cíl {dailyTarget.kcal} kcal
                </span>
              </div>
              <MacroBar macros={totals.perDay} size="lg" />
              <MacroLegend macros={totals.perDay} className="mt-3 flex-wrap" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Today on the plate ── */}
      {today && today.entries.length > 0 ? (
        <section className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="tag text-primary">dnes na talíři · {today.date}</h2>
            <span className="num font-mono text-[11px] text-muted-foreground">
              {dayMacros(today).kcal} kcal / {dailyTarget.kcal} kcal
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {today.entries.map((e) => {
              const r = getRecipe(e.slug)
              if (!r) return null
              return (
                <Link
                  key={e.slot + e.slug}
                  href={`/recepty/${r.slug}`}
                  className="group relative isolate flex min-h-[200px] flex-col justify-end overflow-hidden rounded-3xl"
                >
                  <RecipeVisual
                    src={r.image}
                    alt={r.title}
                    variant={getPlaceholderVariant(r)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-10 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="scrim absolute inset-0 -z-10" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/14 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md">
                    {SLOT_SHORT[e.slot]}
                  </span>

                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-[15px] font-semibold leading-snug text-pretty text-white">
                      {r.title}
                    </h3>
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70">
                      <span className="num font-semibold text-white">
                        {r.macros.kcal * e.servings} kcal
                      </span>
                      <span className="num on-photo-accent font-semibold">
                        {r.macros.protein * e.servings} g B
                      </span>
                      <span className="num ml-auto">{e.servings}× porce</span>
                    </div>
                    <MacroBar macros={r.macros} size="xs" className="bg-white/20" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ) : null}

      {/* ── The week grid (desktop) ── */}
      <section className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
        <div className="grid grid-cols-[132px_repeat(5,minmax(0,1fr))_128px]">
          {/* header row */}
          <div className="border-b border-r border-border bg-muted/40 px-4 py-3">
            <span className="tag">den</span>
          </div>
          {MEAL_CATEGORIES.map((slot) => (
            <div
              key={slot}
              className="border-b border-r border-border bg-muted/40 px-3 py-3 text-center"
            >
              <span className="tag">{SLOT_SHORT[slot]}</span>
            </div>
          ))}
          <div className="border-b border-border bg-muted/40 px-3 py-3 text-right">
            <span className="tag">souhrn</span>
          </div>

          {/* day rows */}
          {days.map((day, dayIndex) => {
            const m = dayMacros(day)
            return (
              <div key={day.name} className="col-span-7 grid grid-cols-subgrid">
                <div
                  className={cn(
                    'flex flex-col justify-center gap-0.5 border-b border-r border-border px-4 py-4',
                    day.today && 'bg-primary/8',
                  )}
                >
                  <span
                    className={cn(
                      'text-sm font-semibold tracking-tight',
                      day.today && 'text-primary',
                    )}
                  >
                    {day.name}
                  </span>
                  <span className="num font-mono text-[11px] text-muted-foreground">
                    {day.date}
                  </span>
                  {day.today ? (
                    <span className="tag mt-1 text-primary">dnes</span>
                  ) : null}
                </div>

                {MEAL_CATEGORIES.map((slot) => {
                  const entries = day.entries.filter((e) => e.slot === slot)
                  return (
                    <div
                      key={slot}
                      className={cn(
                        'flex flex-col gap-1.5 border-b border-r border-border p-2',
                        day.today && 'bg-primary/4',
                      )}
                    >
                      {entries.map((e) => {
                        const r = getRecipe(e.slug)
                        if (!r) return null
                        return (
                          <div
                            key={e.slug}
                            className="group relative overflow-hidden rounded-xl bg-secondary transition-colors hover:bg-muted"
                          >
                            <Link href={`/recepty/${r.slug}`} className="block">
                              <span className="relative block h-14 overflow-hidden">
                                <RecipeVisual
                                  src={r.image}
                                  alt={r.title}
                                  variant={getPlaceholderVariant(r)}
                                  compact
                                  sizes="200px"
                                  className="transition-transform duration-700 group-hover:scale-110"
                                />
                              </span>
                              <span className="block px-2.5 pt-2 text-[12.5px] font-medium leading-snug tracking-tight text-pretty group-hover:text-primary">
                                {r.title}
                              </span>
                            </Link>
                            <div className="flex items-center justify-between gap-2 px-2.5 pt-1.5">
                              <span className="num font-mono text-[10px] text-muted-foreground">
                                {r.macros.kcal * e.servings} kcal · {e.servings}×
                              </span>
                            </div>
                            <MacroBar macros={r.macros} size="xs" className="mt-2 rounded-none" />
                            <button
                              type="button"
                              aria-label={`Odebrat ${r.title}`}
                              onClick={() => removeMeal(dayIndex, slot, e.slug)}
                              className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full border border-border bg-popover text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        )
                      })}
                      <button
                        type="button"
                        onClick={() => setPicker({ day: dayIndex, slot })}
                        aria-label={`Přidat jídlo — ${day.name}, ${slot}`}
                        className={cn(
                          'grid place-items-center rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/8 hover:text-primary',
                          entries.length ? 'h-7' : 'min-h-[74px] flex-1',
                        )}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  )
                })}

                <div
                  className={cn(
                    'flex flex-col justify-center gap-2 border-b border-border px-3 py-4',
                    day.today && 'bg-primary/8',
                  )}
                >
                  <span className="num text-right font-mono text-lg font-bold leading-none tracking-tight">
                    {m.kcal}
                  </span>
                  <span className="tag text-right">kcal</span>
                  <Meter value={m.kcal} target={dailyTarget.kcal} />
                  <MacroBar macros={m} size="xs" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Stacked days (mobile) ── */}
      <section className="flex flex-col gap-3 md:hidden">
        {days.map((day, dayIndex) => {
          const m = dayMacros(day)
          return (
            <article
              key={day.name}
              className={cn(
                'overflow-hidden rounded-2xl border bg-card',
                day.today ? 'border-primary/50' : 'border-border',
              )}
            >
              <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                <span className="flex items-baseline gap-2">
                  <span
                    className={cn('text-sm font-semibold', day.today && 'text-primary')}
                  >
                    {day.name}
                  </span>
                  <span className="num font-mono text-[11px] text-muted-foreground">
                    {day.date}
                  </span>
                </span>
                <span className="num font-mono text-sm font-bold">{m.kcal} kcal</span>
              </header>

              <div className="px-4 pt-3">
                <MacroBar macros={m} size="md" />
              </div>

              <ul className="flex flex-col divide-y divide-border px-4">
                {day.entries.length === 0 ? (
                  <li className="py-5 text-center text-sm text-muted-foreground">
                    Zatím nic naplánováno
                  </li>
                ) : (
                  day.entries.map((e) => {
                    const r = getRecipe(e.slug)
                    if (!r) return null
                    return (
                      <li key={e.slot + e.slug} className="flex items-center gap-3 py-3">
                        <span className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                          <RecipeVisual
                            src={r.image}
                            alt={r.title}
                            variant={getPlaceholderVariant(r)}
                            compact
                            sizes="48px"
                          />
                        </span>
                        <Link
                          href={`/recepty/${r.slug}`}
                          className="flex min-w-0 flex-1 flex-col gap-0.5"
                        >
                          <span className="tag">{SLOT_SHORT[e.slot]}</span>
                          <span className="text-[13px] font-medium leading-snug">{r.title}</span>
                        </Link>
                        <span className="num shrink-0 font-mono text-[11px] text-muted-foreground">
                          {r.macros.kcal * e.servings}
                        </span>
                        <button
                          type="button"
                          aria-label={`Odebrat ${r.title}`}
                          onClick={() => removeMeal(dayIndex, e.slot, e.slug)}
                          className="text-muted-foreground"
                        >
                          <X className="size-3.5" />
                        </button>
                      </li>
                    )
                  })
                )}
              </ul>

              <div className="p-3">
                <button
                  type="button"
                  onClick={() => setPicker({ day: dayIndex, slot: 'Snídaně' })}
                  className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-[12px] text-muted-foreground"
                >
                  <Plus className="size-3.5" />
                  Přidat jídlo
                </button>
              </div>
            </article>
          )
        })}
      </section>

      {/* ── Recipe picker ── */}
      {picker ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-md sm:items-center"
          onClick={() => setPicker(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vybrat recept"
            className="w-full max-w-lg overflow-hidden rounded-t-3xl border border-border bg-popover sm:rounded-3xl"
            onClick={(ev) => ev.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="tag">
                  {days[picker.day].name} · {picker.slot}
                </span>
                <h2 className="text-base font-semibold tracking-tight">Vybrat recept</h2>
              </div>
              <button
                type="button"
                aria-label="Zavřít"
                onClick={() => setPicker(null)}
                className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
              >
                <X className="size-4" />
              </button>
            </header>
            <ul className="max-h-[60vh] overflow-y-auto p-2">
              {recipes.map((r) => (
                <li key={r.slug}>
                  <button
                    type="button"
                    onClick={() => addMeal(r.slug)}
                    className="flex w-full items-center gap-3 rounded-xl p-2 pr-3 text-left transition-colors hover:bg-secondary"
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                      <RecipeVisual
                        src={r.image}
                        alt={r.title}
                        compact
                        sizes="48px"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{r.title}</span>
                      <span className="tag mt-0.5 block">
                        {r.category} · {r.minutes} min
                      </span>
                    </span>
                    <span className="w-16 shrink-0">
                      <MacroBar macros={r.macros} size="xs" />
                      <span className="num mt-1 block text-right font-mono text-[10px] text-muted-foreground">
                        {r.macros.kcal}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  )
}
