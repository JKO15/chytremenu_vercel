'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Plus, RotateCcw, Trash2, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Readout } from '@/components/macros'
import { getRecipe, shoppingList, week } from '@/lib/data'
import { cn } from '@/lib/utils'

/** The recipes this list was generated from — the plan made visible. */
const plannedRecipes = Array.from(
  new Set(week.flatMap((d) => d.entries.map((e) => e.slug))),
).flatMap((slug) => {
  const r = getRecipe(slug)
  return r ? [r] : []
})

type State = Record<string, boolean>

const initial: State = Object.fromEntries(
  shoppingList.flatMap((g) => g.items.map((i) => [`${g.aisle}|${i.name}`, Boolean(i.checked)])),
)

export function ShoppingList() {
  const [state, setState] = useState<State>(initial)

  const stats = useMemo(() => {
    const keys = Object.keys(state)
    const done = keys.filter((k) => state[k]).length
    return { total: keys.length, done, pct: keys.length ? (done / keys.length) * 100 : 0 }
  }, [state])

  function toggle(key: string) {
    setState((s) => ({ ...s, [key]: !s[key] }))
  }

  return (
    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-8">
      {/* ── Header ── */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="tag">Z jídelníčku 3.–9. 8.</span>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Nákup
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <Readout
              value={`${stats.done}/${stats.total}`}
              label="v košíku"
              tone={stats.done === stats.total ? 'primary' : 'default'}
            />
            <Readout value={shoppingList.length} label="regálů" tone="muted" />
          </div>
        </div>

        {/* Progress instrument */}
        <div className="flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <span
              style={{ width: `${stats.pct}%` }}
              className="block h-full rounded-full bg-primary transition-[width] duration-500"
            />
          </div>
          <span className="num font-mono text-[11px] font-semibold text-muted-foreground">
            {Math.round(stats.pct)} %
          </span>
        </div>
      </section>

      {/* ── Delivery strip ── */}
      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-accent/25 bg-accent/8 px-5 py-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Truck className="size-4" />
        </span>
        <div className="min-w-[200px] flex-1">
          <p className="text-sm font-semibold tracking-tight">Poslat rovnou do Rohlíku</p>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            Propojte účet a celý seznam se přesune do košíku jedním klikem.
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl border-accent/40 bg-transparent text-accent hover:bg-accent/12 hover:text-accent"
        >
          Propojit účet
        </Button>
      </section>

      {/* ── Source recipes ── */}
      <section className="flex flex-col gap-3">
        <span className="tag">nakupujete na {plannedRecipes.length} receptů z týdne</span>
        <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
          {plannedRecipes.map((r) => (
            <li key={r.slug} className="shrink-0">
              <Link
                href={`/recepty/${r.slug}`}
                className="group relative isolate flex h-[104px] w-[172px] flex-col justify-end overflow-hidden rounded-2xl"
              >
                <Image
                  src={r.image || '/placeholder.svg'}
                  alt={r.title}
                  fill
                  sizes="172px"
                  className="-z-10 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="scrim absolute inset-0 -z-10" />
                <span className="p-3 text-[12px] font-semibold leading-snug text-pretty text-white">
                  {r.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Aisles ── */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className="tag">seznam po regálech</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setState(Object.fromEntries(Object.keys(state).map((k) => [k, false])))}
              className="tag flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <RotateCcw className="size-3" />
              odškrtnout vše
            </button>
            <button
              type="button"
              className="tag flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-destructive"
            >
              <Trash2 className="size-3" />
              smazat hotové
            </button>
          </div>
        </div>

        {shoppingList.map((group) => {
          const groupDone = group.items.filter((i) => state[`${group.aisle}|${i.name}`]).length
          const complete = groupDone === group.items.length

          return (
            <article
              key={group.aisle}
              className={cn(
                'overflow-hidden rounded-2xl border bg-card transition-opacity',
                complete ? 'border-primary/30 opacity-60' : 'border-border',
              )}
            >
              <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
                <h2 className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                    {group.aisle}
                  </span>
                  {complete ? <Check className="size-3.5 text-primary" /> : null}
                </h2>
                <span className="num font-mono text-[11px] text-muted-foreground">
                  {groupDone}/{group.items.length}
                </span>
              </header>

              <ul className="divide-y divide-border">
                {group.items.map((item) => {
                  const key = `${group.aisle}|${item.name}`
                  const checked = state[key]
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        aria-pressed={checked}
                        onClick={() => toggle(key)}
                        className="group flex w-full items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-secondary/50"
                      >
                        <span
                          className={cn(
                            'grid size-5 shrink-0 place-items-center rounded-md border transition-colors',
                            checked
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border group-hover:border-primary/60',
                          )}
                        >
                          {checked ? <Check className="size-3" strokeWidth={3} /> : null}
                        </span>
                        <span
                          className={cn(
                            'num w-20 shrink-0 font-mono text-sm font-bold transition-colors',
                            checked ? 'text-muted-foreground' : 'text-foreground',
                          )}
                        >
                          {item.amount}
                          <span className="ml-0.5 text-[10px] font-medium text-muted-foreground">
                            {item.unit}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'flex-1 text-[15px] transition-colors',
                            checked && 'text-muted-foreground line-through',
                          )}
                        >
                          {item.name}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}

        <button
          type="button"
          className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Plus className="size-4" />
          Přidat vlastní položku
        </button>
      </section>
    </div>
  )
}
