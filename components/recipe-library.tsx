'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Clock, FileUp, Plus, Search, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MacroBar } from '@/components/macros'
import { RecipeVisual } from '@/components/recipe-visual'
import { MEAL_CATEGORIES, recipes } from '@/lib/data'
import { cn } from '@/lib/utils'

type Sort = 'novinky' | 'kcal' | 'protein' | 'cas'

const SORTS: { key: Sort; label: string }[] = [
  { key: 'novinky', label: 'nejnovější' },
  { key: 'kcal', label: 'energie' },
  { key: 'protein', label: 'bílkoviny' },
  { key: 'cas', label: 'čas' },
]

export function RecipeLibrary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('Vše')
  const [sort, setSort] = useState<Sort>('novinky')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = recipes.filter((r) => {
      const matchesCategory = category === 'Vše' || r.category === category
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.name.toLowerCase().includes(q)) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
    list = [...list]
    if (sort === 'kcal') list.sort((a, b) => b.macros.kcal - a.macros.kcal)
    if (sort === 'protein') list.sort((a, b) => b.macros.protein - a.macros.protein)
    if (sort === 'cas') list.sort((a, b) => a.minutes - b.minutes)
    return list
  }, [query, category, sort])

  const [lead, ...rest] = filtered

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
      {/* ── Title + controls ── */}
      <section className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
        <div className="flex flex-col gap-1.5">
          <span className="tag">Knihovna · {filtered.length} receptů</span>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Recepty
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-11 min-w-[240px] flex-1 items-center gap-2.5 rounded-full border border-border bg-card px-4">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Název nebo surovina…"
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <span className="sr-only">Hledat v receptech</span>
          </label>
          <Button variant="outline" size="icon" className="size-11 rounded-full bg-transparent">
            <FileUp className="size-4" />
            <span className="sr-only">Import receptu ze souboru</span>
          </Button>
          <Link
            href="/recepty/novy"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-primary pl-4 pr-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Plus className="size-4" />
            Nový recept
          </Link>
        </div>
      </section>

      {/* ── Filter row ── */}
      <section className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['Vše', ...MEAL_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors',
                category === c
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="tag hidden sm:inline">řadit</span>
          <div className="flex items-center gap-1">
            {SORTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                className={cn(
                  'rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors',
                  sort === s.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border py-24 text-center">
          <p className="text-sm font-medium">Žádný recept neodpovídá filtru</p>
          <p className="mt-1 text-sm text-muted-foreground">Zkuste jiný výraz nebo kategorii.</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          {/* ── Lead card: full-bleed photo ── */}
          <Link
            href={`/recepty/${lead.slug}`}
            className="group relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl lg:sticky lg:top-24 lg:max-h-[560px] lg:min-h-[520px]"
          >
            <RecipeVisual
              src={lead.image}
              alt={lead.title}
              variant={lead.placeholder}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="-z-10 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="scrim absolute inset-0 -z-10" />

            <div className="absolute left-5 top-5 flex items-center gap-2">
              <span className="rounded-full bg-brand px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-foreground">
                {lead.category}
              </span>
              <span className="rounded-full bg-white/12 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md">
                {lead.minutes} min
              </span>
            </div>

            <div className="flex flex-col gap-4 p-5 lg:p-7">
              <h2 className="max-w-[22ch] text-[clamp(1.6rem,3.2vw,2.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-balance text-white">
                {lead.title}
              </h2>

              <div className="flex flex-wrap items-end gap-x-7 gap-y-3">
                <span className="num flex items-baseline gap-1 font-mono text-white">
                  <span className="text-3xl font-bold leading-none tracking-tight">
                    {lead.macros.kcal}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/60">kcal</span>
                </span>
                <span className="num on-photo-accent flex items-baseline gap-1 font-mono">
                  <span className="text-3xl font-bold leading-none tracking-tight">
                    {lead.macros.protein}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-white/70">g B</span>
                </span>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-foreground">
                  otevřít
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>

              <MacroBar macros={lead.macros} size="md" className="bg-white/20" />
            </div>
          </Link>

          {/* ── Grid of photo cards ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((r) => (
              <Link
                key={r.slug}
                href={`/recepty/${r.slug}`}
                className="group relative isolate flex min-h-[240px] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <RecipeVisual
                  src={r.image}
                  alt={r.title}
                  variant={r.placeholder}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
                  compact
                  className="-z-10 transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="scrim absolute inset-0 -z-10" />

                <span className="absolute left-4 top-4 rounded-full bg-white/14 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md">
                  {r.category}
                </span>
                {r.shared ? (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-2 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-brand-2-foreground">
                    sdílený
                  </span>
                ) : null}

                <div className="flex flex-col gap-2.5 p-4">
                  <h3 className="text-[15px] font-semibold leading-snug text-pretty text-white">
                    {r.title}
                  </h3>

                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70">
                    <span className="num font-semibold text-white">{r.macros.kcal} kcal</span>
                    <span className="num on-photo-accent font-semibold">{r.macros.protein} g B</span>
                    <span className="num ml-auto flex items-center gap-1">
                      <Users className="size-3" />
                      {r.servings}
                    </span>
                    <span className="num flex items-center gap-1">
                      <Clock className="size-3" />
                      {r.minutes}
                    </span>
                  </div>

                  <MacroBar macros={r.macros} size="xs" className="bg-white/20" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
