'use client'

import { useState } from 'react'
import { Check, KeyRound, Link2, ShoppingBasket, Store } from 'lucide-react'
import { cn } from '@/lib/utils'

type ShopId = 'rohlik' | 'kosik'
type RohlikMethod = 'oauth' | 'password'

const shops: { id: ShopId; label: string; icon: typeof Store }[] = [
  { id: 'rohlik', label: 'Rohlík.cz', icon: ShoppingBasket },
  { id: 'kosik', label: 'Košík.cz', icon: Store },
]

export function PurchaseSettingsModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [activeShop, setActiveShop] = useState<ShopId>('rohlik')
  const [rohlikMethod, setRohlikMethod] = useState<RohlikMethod>('oauth')
  const [connected, setConnected] = useState<Record<ShopId, boolean>>({
    rohlik: false,
    kosik: false,
  })

  if (!open) return null

  function close() {
    onOpenChange(false)
  }

  function connect(shop: ShopId) {
    setConnected((s) => ({ ...s, [shop]: true }))
  }

  function disconnect(shop: ShopId) {
    setConnected((s) => ({ ...s, [shop]: false }))
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/35 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-settings-title"
        className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="purchase-settings-title" className="text-lg font-semibold tracking-tight">
              Nastavení nákupu
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Propojte účty e-shopů, kam se odesílá nákupní seznam.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Zavřít dialog"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-xl leading-none text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            ×
          </button>
        </div>

        {/* ── Shop tabs ── */}
        <div
          role="tablist"
          aria-label="Výběr e-shopu"
          className="mt-5 flex items-center gap-1 rounded-xl border border-border bg-secondary/40 p-1"
        >
          {shops.map((shop) => {
            const active = activeShop === shop.id
            return (
              <button
                key={shop.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveShop(shop.id)}
                className={cn(
                  'flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <shop.icon className="size-4" />
                {shop.label}
                {connected[shop.id] ? (
                  <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>

        {/* ── Rohlík panel ── */}
        {activeShop === 'rohlik' ? (
          <div className="mt-5 flex flex-col gap-5">
            {connected.rohlik ? (
              <ConnectedState label="Rohlík.cz" onDisconnect={() => disconnect('rohlik')} />
            ) : (
              <>
                <div
                  role="radiogroup"
                  aria-label="Způsob přihlášení k Rohlík.cz"
                  className="flex items-center gap-1 rounded-xl border border-border p-1"
                >
                  <MethodButton
                    active={rohlikMethod === 'oauth'}
                    icon={Link2}
                    label="OAuth"
                    onClick={() => setRohlikMethod('oauth')}
                  />
                  <MethodButton
                    active={rohlikMethod === 'password'}
                    icon={KeyRound}
                    label="Jméno a heslo"
                    onClick={() => setRohlikMethod('password')}
                  />
                </div>

                {rohlikMethod === 'oauth' ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                      Přihlášení proběhne na stránkách Rohlík.cz. Heslo do aplikace neukládáme.
                      Propojení může časem vypršet — pak účet znovu připojte tlačítkem níže.
                    </p>
                    <button
                      type="button"
                      onClick={() => connect('rohlik')}
                      className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Připojit přes Rohlík.cz
                    </button>
                  </div>
                ) : (
                  <LoginForm shopLabel="Rohlík.cz" onSubmit={() => connect('rohlik')} />
                )}
              </>
            )}
          </div>
        ) : null}

        {/* ── Košík panel ── */}
        {activeShop === 'kosik' ? (
          <div className="mt-5 flex flex-col gap-5">
            {connected.kosik ? (
              <ConnectedState label="Košík.cz" onDisconnect={() => disconnect('kosik')} />
            ) : (
              <LoginForm shopLabel="Košík.cz" onSubmit={() => connect('kosik')} />
            )}
          </div>
        ) : null}
      </section>
    </div>
  )
}

function MethodButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean
  icon: typeof Link2
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors',
        active ? 'bg-primary/12 text-primary' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  )
}

function LoginForm({ shopLabel, onSubmit }: { shopLabel: string; onSubmit: () => void }) {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          E-mail
        </span>
        <input
          type="email"
          required
          placeholder="jan.novak@email.cz"
          className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary/50"
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Heslo
        </span>
        <input
          type="password"
          required
          placeholder="••••••••"
          className="h-10 rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary/50"
        />
      </label>
      <button
        type="submit"
        className="mt-1 inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Přihlásit se do {shopLabel}
      </button>
    </form>
  )
}

function ConnectedState({ label, onDisconnect }: { label: string; onDisconnect: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/8 px-4 py-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Check className="size-4" strokeWidth={3} />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">Účet {label} je propojen</p>
          <p className="text-[13px] text-muted-foreground">Nákupní seznam lze odeslat jedním klikem.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onDisconnect}
        className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        Odpojit účet
      </button>
    </div>
  )
}
