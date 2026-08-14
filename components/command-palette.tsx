'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarRange, CornerDownLeft, ScrollText, Search, ShoppingBasket } from 'lucide-react'
import { recipes } from '@/lib/data'
import { cn } from '@/lib/utils'

type Item = {
  label: string
  hint: string
  href: string
  kind: 'page' | 'recipe'
}

const pages: Item[] = [
  { label: 'Týden', hint: 'Jídelníček', href: '/', kind: 'page' },
  { label: 'Recepty', hint: 'Knihovna', href: '/recepty', kind: 'page' },
  { label: 'Nákup', hint: 'Seznam po regálech', href: '/nakupni-seznam', kind: 'page' },
]

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(() => {
    const recipeItems: Item[] = recipes.map((r) => ({
      label: r.title,
      hint: `${r.macros.kcal} kcal · ${r.category}`,
      href: `/recepty/${r.slug}`,
      kind: 'recipe',
    }))
    const all = [...pages, ...recipeItems]
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setCursor(0)
  }, [query])

  if (!open) return null

  function go(item: Item | undefined) {
    if (!item) return
    onOpenChange(false)
    router.push(item.href)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 px-4 pt-[12vh] backdrop-blur-md"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Rychlé hledání"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setCursor((c) => Math.min(c + 1, items.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setCursor((c) => Math.max(c - 1, 0))
              } else if (e.key === 'Enter') {
                e.preventDefault()
                go(items[cursor])
              } else if (e.key === 'Escape') {
                onOpenChange(false)
              }
            }}
            placeholder="Hledat recept, surovinu nebo sekci…"
            className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="tag rounded border border-border px-1.5 py-0.5">esc</kbd>
        </div>

        <ul className="max-h-[46vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              Nic jsme nenašli.
            </li>
          ) : (
            items.map((item, i) => (
              <li key={item.href + item.label}>
                <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(item)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                    i === cursor ? 'bg-secondary' : 'hover:bg-secondary/60',
                  )}
                >
                  <span
                    className={cn(
                      'grid size-7 shrink-0 place-items-center rounded-lg',
                      i === cursor ? 'bg-primary text-primary-foreground' : 'bg-muted',
                    )}
                  >
                    {item.kind === 'page' ? (
                      item.href === '/' ? (
                        <CalendarRange className="size-3.5" />
                      ) : item.href === '/recepty' ? (
                        <ScrollText className="size-3.5" />
                      ) : (
                        <ShoppingBasket className="size-3.5" />
                      )
                    ) : (
                      <ScrollText className="size-3.5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{item.label}</span>
                    <span className="tag block truncate normal-case tracking-normal">
                      {item.hint}
                    </span>
                  </span>
                  {i === cursor ? (
                    <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
