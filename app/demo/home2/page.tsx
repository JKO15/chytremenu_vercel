import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, CloudUpload, ListChecks, ShoppingCart, Utensils } from 'lucide-react'

const steps = [
  { number: '1', icon: CloudUpload, title: 'Nahrajte své recepty', text: 'Vyfoťte kuchařku nebo vložte PDF. Naše aplikace se postará o zbytek.' },
  { number: '2', icon: Utensils, title: 'Naplánujte si týden', text: 'Navolte si jídla a počet porcí. Všichni hned uvidí, co se vaří.' },
  { number: '3', icon: ListChecks, title: 'Nákupní seznam se vytvoří sám', text: 'Aplikace automaticky pospojuje suroviny do přehledného nákupního seznamu.' },
  { number: '4', icon: ShoppingCart, title: 'Šup s tím na Rohlík', text: 'Jedním kliknutím naplníte košík na Rohlíku.' },
]

export default function DemoHome2Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 pb-12">
      <header className="flex items-center justify-between border-b border-border py-5">
        <Link href="/demo/home2" className="flex items-baseline gap-2 font-semibold tracking-tight">
          <span className="text-xl">chytré menu</span><span className="tag text-primary">BETA</span>
        </Link>
        <nav aria-label="Hlavní navigace" className="flex items-center gap-3 text-sm">
          <Link href="#registrace" className="hidden rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex">Registrovat se</Link>
          <Link href="#prihlaseni" className="rounded-lg border border-border px-3 py-2 font-semibold transition-colors hover:border-primary/50 hover:text-primary">Přihlásit se</Link>
        </nav>
      </header>

      <section aria-labelledby="hero-title" className="grid items-center gap-10 pt-8 md:grid-cols-[1.05fr_.95fr] md:pt-14">
        <div className="flex flex-col items-start gap-6">
          <span className="tag text-primary">plánujte chytře, šetřete čas</span>
          <h1 id="hero-title" className="max-w-3xl text-balance text-5xl font-bold leading-[.94] tracking-[-.06em] md:text-7xl">Od babiččina receptu po plný košík na jeden klik.</h1>
          <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">Chaos v receptech? S Chytrým menu plánujete, digitalizujete rodinné recepty a nakupujete na Rohlíku jedním kliknutím. Nechte to na Chytrém menu.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#registrace" className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Vyzkoušet Chytré menu <ArrowRight className="size-4" /></Link>
            <Link href="#jak-to-funguje" className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold hover:border-primary/50">Jak to funguje <ChevronRight className="size-4" /></Link>
          </div>
        </div>
        <div className="engrave relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-xl shadow-black/10">
          <div className="rounded-2xl bg-background p-5">
            <div className="mb-8 flex items-center justify-between border-b border-border pb-4"><span className="tag text-primary">nákup na víkend</span><span className="rounded-full bg-primary/15 px-2 py-1 font-mono text-[10px] text-primary">ROHLÍK</span></div>
            <div className="space-y-5 font-mono text-xs"><div><p className="mb-2 text-[10px] uppercase tracking-widest text-primary">ZELENINA</p><p>Mrkev <span className="text-muted-foreground">(3×)</span></p><p>Celer</p><p>Cibule</p><p>Brambory</p></div><div><p className="mb-2 text-[10px] uppercase tracking-widest text-primary">MASO</p><p>Hovězí <span className="text-muted-foreground">(800 g)</span></p></div><div><p className="mb-2 text-[10px] uppercase tracking-widest text-primary">MLÉČNÉ</p><p>Smetana 33%</p><p>Mléko</p><p>Bílý jogurt</p></div></div>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-4"><span className="text-muted-foreground">7 položek</span><span className="rounded-lg bg-primary px-3 py-2 font-sans text-xs font-semibold text-primary-foreground">Objednat</span></div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 border-y border-border py-12 md:grid-cols-2 md:items-center" aria-labelledby="chaos-title">
        <div><h2 id="chaos-title" className="text-3xl font-bold tracking-[-.04em] md:text-5xl">Pamatujete si ten zmatek?</h2><p className="mt-5 text-base leading-7 text-muted-foreground"><strong className="text-foreground">Už žádné: „Já myslel, že to koupíš ty.“</strong> Složité recepty znamenají nekonečné seznamy a luštění vlastního písma mezi regály. Stačí jedna zapomenutá položka a nedělní oběd je v ohrožení.</p></div>
        <div className="rounded-2xl border border-border bg-card p-6 font-mono text-xs text-muted-foreground shadow-sm"><p className="mb-4 text-primary">Babiččina svíčková</p><p>— 800 g zadního hovězího masa</p><p>— 300 g kořenové zeleniny</p><p>— 1 cibule</p><p>— 250 ml smetany ke šlehání 33%</p><p>— 3 bobkové listy</p><p>— sůl a pepř</p><div className="mt-6 rounded-lg bg-primary/10 p-3 text-primary">Přidáno do sdíleného seznamu</div></div>
      </section>

      <section className="grid gap-10 md:grid-cols-2 md:items-center"><div className="order-2 rounded-[2rem] border border-border bg-card p-6 shadow-sm md:order-1"><div className="rounded-2xl bg-background p-5"><p className="tag mb-5 text-primary">takhle vypadá klid</p><p className="mb-4 text-xl font-semibold tracking-tight">Z receptu rovnou do košíku na Rohlíku.</p><p className="text-sm leading-6 text-muted-foreground">Už žádné ruční vypisování ani hledání zboží v e-shopu.</p></div></div><div className="order-1 md:order-2"><h2 className="text-3xl font-bold tracking-[-.04em] md:text-5xl">Nákup, který trval desítky minut, teď vyřešíte za pár vteřin.</h2><p className="mt-5 text-base leading-7 text-muted-foreground">Stačí vybrat recept a jedním kliknutím pošlete všechny ingredience přímo do svého nákupního košíku na Rohlik.cz – od stolu nebo cestou z práce.</p></div></section>

      <section id="jak-to-funguje" aria-labelledby="steps-title"><div className="mb-8"><p className="tag text-primary">jednoduše od začátku do konce</p><h2 id="steps-title" className="mt-3 text-3xl font-bold tracking-[-.04em] md:text-5xl">Jak to celé funguje</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map(({ number, icon: Icon, title, text }) => <article key={number} className="rounded-2xl border border-border bg-card p-5"><div className="mb-10 flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary"><Icon className="size-5" /></span><span className="font-mono text-xs text-primary">0{number}</span></div><h3 className="font-semibold leading-5">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></section>

      <section id="registrace" aria-labelledby="registration-title" className="grid gap-8 rounded-[2rem] border border-primary/25 bg-primary/10 p-6 md:grid-cols-[1fr_.8fr] md:p-12"><div><p className="tag text-primary">beta přístup</p><h2 id="registration-title" className="mt-3 text-3xl font-bold tracking-[-.04em] md:text-5xl">Buďte u toho jako první</h2><p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">Chytré menu právě ladíme k dokonalosti a vy můžete začít hned. Získejte předběžný přístup, digitalizujte své recepty a usnadněte si nákupy mezi prvními.</p></div><form className="flex flex-col gap-3 self-center"><label htmlFor="email" className="text-sm font-semibold">E-mail</label><input id="email" name="email" type="email" placeholder="vas@email.cz" required className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" /><label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input type="checkbox" required className="mt-1 accent-primary" /> Souhlasím s Obchodními podmínkami a Zásadami ochrany osobních údajů.</label><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">Získat kód a začít používat <ArrowRight className="size-4" /></button></form></section>

      <section id="prihlaseni" className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"><div><p className="font-semibold">Už máte účet?</p><p className="mt-1 text-sm text-muted-foreground">Přihlaste se a pokračujte tam, kde jste skončili.</p></div><Link href="#prihlaseni" className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold hover:border-primary/50">Přihlásit se <ArrowRight className="size-4" /></Link></section>
    </main>
  )
}
