'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  CalendarRange,
  LogOut,
  Mail,
  Moon,
  ScrollText,
  Search,
  Settings2,
  ShoppingBasket,
  Sun,
  Trash2,
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
  const [accountOpen, setAccountOpen] = useState(false)
  const [rohlikModalOpen, setRohlikModalOpen] = useState(false)
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
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

        <div className="relative mt-3">
          <button
            type="button"
            onClick={() => setAccountOpen((value) => !value)}
            aria-expanded={accountOpen}
            aria-haspopup="menu"
            aria-label="Otevřít uživatelské menu"
            className={cn(
              'grid size-9 place-items-center rounded-xl border border-border font-mono text-[11px] font-semibold transition-colors hover:bg-secondary',
              accountOpen && 'border-primary/50 bg-primary/10 text-primary',
            )}
          >
            JK
          </button>
          {accountOpen ? (
            <div className="absolute bottom-0 left-12 z-50 w-64 rounded-2xl border border-border bg-card p-2 text-sm shadow-xl" role="menu" aria-label="Uživatelské menu">
              <div className="px-3 py-2">
                <p className="font-semibold text-foreground">Jakub Kopp</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Nastavení účtu</p>
              </div>
              <div className="my-1 h-px bg-border" />
              <Link href="/nastaveni/email" role="menuitem" onClick={() => setAccountOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Mail className="size-4" />
                <span>Změnit e-mail</span>
              </Link>
              <button type="button" role="menuitem" onClick={() => { setAccountOpen(false); setRohlikModalOpen(true) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <Settings2 className="size-4" />
                <span>Nastavení Rohlíku</span>
              </button>
              <div className="my-1 h-px bg-border" />
              <button type="button" role="menuitem" onClick={() => { setAccountOpen(false); setDeleteAccountModalOpen(true) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-destructive transition-colors hover:bg-destructive/10">
                <Trash2 className="size-4" />
                <span>Zrušit účet</span>
              </button>
              <div className="my-1 h-px bg-border" />
              <button type="button" role="menuitem" onClick={() => setAccountOpen(false)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <LogOut className="size-4" />
                <span>Odhlásit se</span>
              </button>
            </div>
          ) : null}
        </div>
      </aside>

      {rohlikModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/35 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setRohlikModalOpen(false) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="rohlik-dialog-title" className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 id="rohlik-dialog-title" className="text-lg font-semibold tracking-tight">Nastavení Rohlíku</h2>
              <button type="button" onClick={() => setRohlikModalOpen(false)} aria-label="Zavřít dialog" className="grid size-8 place-items-center rounded-lg text-xl leading-none text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">×</button>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Přihlášení proběhne na stránkách Rohlík.cz (OAuth). Heslo do aplikace neukládáme. Propojení může časem vypršet — pak účet znovu připojte tlačítkem níže.</p>
            <button type="button" onClick={() => setRohlikModalOpen(false)} className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Připojit účet rohlík</button>
          </section>
        </div>
      ) : null}

      {deleteAccountModalOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteAccountModalOpen(false) }}>
          <section role="dialog" aria-modal="true" aria-labelledby="delete-account-dialog-title" className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-destructive/10 text-destructive"><Trash2 className="size-4" /></span>
                <h2 id="delete-account-dialog-title" className="pt-1 text-lg font-semibold tracking-tight">Zrušení účtu</h2>
              </div>
              <button type="button" onClick={() => setDeleteAccountModalOpen(false)} aria-label="Zavřít dialog" className="grid size-8 place-items-center rounded-lg text-xl leading-none text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">×</button>
            </div>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">Na váš e-mail odešleme potvrzovací odkaz. K trvalému smazání účtu dojde až po kliknutí na tento odkaz ve vaší schránce.</p>
            <div className="mt-4 rounded-xl border border-brand-2/50 bg-brand-2/15 px-4 py-3 text-sm leading-6 text-foreground">
              <p className="font-semibold">Důležité</p>
              <p className="mt-1">Odkaz platí 24 hodin. Pokud požádáte o nový odkaz, předchozí platnost okamžitě zaniká.</p>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setDeleteAccountModalOpen(false)} className="inline-flex h-10 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">Zrušit</button>
              <button type="button" onClick={() => setDeleteAccountModalOpen(false)} className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Odeslat odkaz e-mailem</button>
            </div>
          </section>
        </div>
      ) : null}

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
