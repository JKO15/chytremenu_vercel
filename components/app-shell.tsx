'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CalendarRange,
  Moon,
  ScrollText,
  Search,
  ShoppingBasket,
  Sun,
} from 'lucide-react'
import { CommandPalette } from '@/components/command-palette'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/', label: 'Týden', icon: CalendarRange },
  { href: '/recepty', label: 'Recepty', icon: ScrollText },
  { href: '/nakupni-seznam', label: 'Nákup', icon: ShoppingBasket },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [dark, setDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [language, setLanguage] = useState<'CZ' | 'EN'>('CZ')

  // Adopt whatever the pre-paint script already applied.
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
    setMounted(true)
  }, [])

  // Only write once the user has actually toggled something.
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.toggle('dark', dark)
    root.classList.toggle('light', !dark)
    try {
      localStorage.setItem('cm-theme', dark ? 'dark' : 'light')
    } catch {
      /* private mode — theme just won't persist */
    }
  }, [dark, mounted])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <div className="min-h-svh">
      {/* ── Vertical rail (desktop) ── */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[76px] flex-col items-center border-r border-border bg-sidebar py-4 md:flex">
        <Link
          href="/"
          aria-label="chytré menu — domů"
          className="group grid size-11 place-items-center rounded-2xl bg-brand text-brand-foreground transition-transform hover:scale-105 active:scale-95"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="block h-[2.5px] w-4 rounded-full bg-current" />
            <span className="block h-[2.5px] w-4 rounded-full bg-current" />
            <span className="block h-[2.5px] w-2.5 rounded-full bg-current" />
          </span>
        </Link>

        <nav className="mt-8 flex flex-1 flex-col items-center gap-1.5">
          {nav.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex w-[60px] flex-col items-center gap-1.5 rounded-xl py-2.5 transition-colors',
                  active
                    ? 'bg-primary/12 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {active ? (
                  <span className="absolute -left-4 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                ) : null}
                <item.icon className="size-[18px]" />
                <span className="font-mono text-[9px] font-medium uppercase tracking-[0.1em]">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setDark((v) => !v)}
          aria-label={dark ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
          className="grid size-9 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>

        <span className="mt-3 grid size-9 place-items-center rounded-xl border border-border font-mono text-[11px] font-semibold">
          JK
        </span>
      </aside>

      {/* ── Content column ── */}
      <div className="flex min-h-svh flex-col md:pl-[76px]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <span className="grid size-8 place-items-center rounded-xl bg-brand text-brand-foreground">
              <span className="flex flex-col gap-[2px]">
                <span className="block h-[2px] w-3 rounded-full bg-current" />
                <span className="block h-[2px] w-3 rounded-full bg-current" />
                <span className="block h-[2px] w-2 rounded-full bg-current" />
              </span>
            </span>
            <span className="text-sm font-semibold tracking-tight">chytré menu</span>
          </div>

          <span className="hidden items-baseline gap-2.5 md:flex">
            <span className="text-[15px] font-semibold tracking-tight">chytré menu</span>
            <span className="tag rounded-md border border-accent/40 px-1.5 py-0.5 text-accent">
              beta
            </span>
          </span>

          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="ml-auto flex h-9 items-center gap-2 rounded-xl border border-border bg-card px-3 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground md:w-72"
          >
            <Search className="size-4 shrink-0" />
            <span className="hidden flex-1 text-left text-[13px] md:block">Hledat…</span>
            <kbd className="tag hidden rounded border border-border px-1.5 py-0.5 md:block">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            aria-label={dark ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-card text-muted-foreground md:hidden"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </header>

        <main className="engrave flex-1 px-4 pb-32 pt-6 md:px-8 md:pb-16 md:pt-8">{children}</main>

        <footer className="border-t border-border/70 px-4 py-6 md:px-8 md:py-5">
          <div className="flex flex-col gap-4 text-xs text-muted-foreground md:mx-auto md:max-w-[1240px] md:flex-row md:items-center md:justify-between">
            <nav aria-label="Právní a informační odkazy" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/kontakt" className="transition-colors hover:text-foreground">Kontakt</Link>
              <Link href="/obchodni-podminky" className="transition-colors hover:text-foreground">Obchodní podmínky</Link>
              <Link href="/ochrana-osobnich-udaju" className="transition-colors hover:text-foreground">Ochrana údajů</Link>
              <Link href="/nastaveni-cookies" className="transition-colors hover:text-foreground">Cookies</Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-lg border border-border/70 bg-background/50 p-1" role="group" aria-label="Výběr jazyka">
                {(['CZ', 'EN'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLanguage(item)}
                    aria-pressed={language === item}
                    className={cn(
                      'min-w-8 rounded-md px-2 py-1 font-mono text-[10px] font-semibold transition-colors',
                      language === item ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 border-l border-border/70 pl-4" aria-label="Sociální sítě">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-5 place-items-center rounded-full bg-muted-foreground text-[12px] font-bold leading-none text-background transition-colors hover:bg-foreground">f</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-5 place-items-center rounded-[5px] border-2 border-muted-foreground transition-colors hover:border-foreground"><span className="size-1.5 rounded-full border border-current" /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Floating dock (mobile) ── */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-center pb-4 md:hidden">
        <ul className="flex items-center gap-1 rounded-2xl border border-border bg-popover/90 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {nav.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-4 py-2.5 transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  <item.icon className="size-[18px]" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em]">
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  )
}
