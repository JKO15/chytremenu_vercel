import Link from 'next/link'
import { ArrowRight, CalendarDays, Check, Clock3, ListChecks, ShoppingBasket, Sparkles, Utensils } from 'lucide-react'
import { RecipeVisual } from '@/components/recipe-visual'
import { recipes } from '@/lib/data'

const featured = recipes.filter((recipe) => ['kureci-stir-fry-s-ryzi', 'tvarohovy-dezert-s-malinami'].includes(recipe.slug))

const steps = [
  { icon: CalendarDays, title: 'Naplánujete týden', text: 'Vyberete si jídla, která dávají smysl vašemu dni.' },
  { icon: ListChecks, title: 'Seznam se vytvoří sám', text: 'Ingredience se spojí do přehledného nákupního seznamu.' },
  { icon: ShoppingBasket, title: 'Nakoupíte bez přemýšlení', text: 'Jedním kliknutím pošlete vše do košíku na Rohlíku.' },
]

export default function DemoHome3Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 pb-12 md:gap-28">
      <header className="flex items-center justify-between py-5">
        <Link href="/demo/home3" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-xl bg-primary text-sm text-primary-foreground">cm</span>
          <span className="text-lg">chytré menu</span>
          <span className="tag text-primary">BETA</span>
        </Link>
        <nav aria-label="Hlavní navigace" className="flex items-center gap-2 text-sm">
          <Link href="#registrace" className="hidden rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground sm:inline-flex">Registrovat se</Link>
          <Link href="#prihlaseni" className="rounded-lg border border-border px-3 py-2 font-semibold hover:border-primary/50 hover:text-primary">Přihlásit se</Link>
        </nav>
      </header>

      <section className="grid items-center gap-12 pt-4 md:grid-cols-[1.04fr_.96fr] md:pt-10" aria-labelledby="hero-title">
        <div className="flex flex-col items-start gap-6">
          <p className="tag text-primary">plánujte chytře, šetřete čas</p>
          <h1 id="hero-title" className="max-w-2xl text-balance text-5xl font-bold leading-[.95] tracking-[-.06em] md:text-7xl">Od babiččina receptu po plný košík.</h1>
          <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">Chaos v receptech? S Chytrým menu plánujete, digitalizujete rodinné recepty a nakupujete na Rohlíku jedním kliknutím.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="#registrace" className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5"><span>Vyzkoušet Chytré menu</span><ArrowRight className="size-4" /></Link>
            <Link href="#jak-to-funguje" className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold hover:border-primary/50">Jak to funguje</Link>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground"><Check className="size-4 text-primary" /> bez složitostí <span className="size-1 rounded-full bg-border" /> pro běžný život</div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-black/10">
          <RecipeVisual src="/food/kureci-rize.jpg" alt="Kuřecí stir-fry s rýží a zeleninou" className="aspect-[.9] w-full" sizes="(min-width: 768px) 45vw, 100vw" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/35 p-4 text-white backdrop-blur-md"><p className="tag text-white/65">dnešní oběd · 30 min</p><div className="mt-2 flex items-end justify-between gap-3"><h2 className="text-xl font-semibold">Kuřecí stir-fry s rýží</h2><span className="rounded-lg bg-primary px-2 py-1 font-mono text-xs text-primary-foreground">612 kcal</span></div></div>
        </div>
      </section>

      <section className="grid gap-8 border-y border-border py-10 md:grid-cols-[.85fr_1.15fr] md:items-center" aria-labelledby="chaos-title">
        <div><p className="tag text-primary">znáte to?</p><h2 id="chaos-title" className="mt-3 text-3xl font-bold tracking-[-.05em] md:text-5xl">Pamatujete si ten zmatek?</h2></div>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground"><strong className="text-foreground">Už žádné: „Já myslel, že to koupíš ty.“</strong> Složité recepty znamenají nekonečné seznamy a luštění vlastního písma mezi regály. Chytré menu vezme recept, plán i nákup na sebe.</p>
      </section>

      <section id="jak-to-funguje" aria-labelledby="steps-title"><div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="tag text-primary">jednoduše od začátku do konce</p><h2 id="steps-title" className="mt-3 text-3xl font-bold tracking-[-.05em] md:text-5xl">Od nápadu k večeři.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Méně rozhodování, více dobrého jídla.</p></div><div className="grid gap-4 md:grid-cols-3">{steps.map(({ icon: Icon, title, text }, index) => <article key={title} className="rounded-2xl border border-border bg-card p-5"><div className="mb-10 flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary"><Icon className="size-5" /></span><span className="tag">0{index + 1}</span></div><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></section>

      <section className="grid gap-4 md:grid-cols-2" aria-label="Ukázka receptů">{featured.map((recipe) => <Link key={recipe.slug} href={`/recepty/${recipe.slug}`} className="group relative isolate min-h-64 overflow-hidden rounded-3xl"><RecipeVisual src={recipe.image} alt={recipe.title} variant={recipe.placeholder} className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 768px) 50vw, 100vw" /><div className="scrim absolute inset-0 -z-10" /><div className="absolute inset-x-5 bottom-5 text-white"><div className="flex items-center gap-3 text-xs text-white/70"><span>{recipe.category}</span><span className="flex items-center gap-1"><Clock3 className="size-3" />{recipe.minutes} min</span></div><h3 className="mt-2 text-xl font-semibold">{recipe.title}</h3></div></Link>)}</section>

      <section id="registrace" className="grid gap-8 rounded-[2rem] border border-primary/25 bg-primary/10 p-6 md:grid-cols-[1fr_.78fr] md:p-12" aria-labelledby="registration-title"><div><div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><span className="tag text-primary">beta přístup</span></div><h2 id="registration-title" className="mt-4 text-3xl font-bold tracking-[-.05em] md:text-5xl">Buďte u toho jako první.</h2><p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">Chytré menu právě ladíme k dokonalosti. Získejte předběžný přístup, digitalizujte své recepty a usnadněte si nákupy mezi prvními.</p></div><form className="flex flex-col gap-3 self-center"><label htmlFor="beta-email" className="text-sm font-semibold">E-mail</label><input id="beta-email" name="email" type="email" placeholder="vas@email.cz" required className="h-12 rounded-xl border border-border bg-background px-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20" /><label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input type="checkbox" required className="mt-1 accent-primary" /> Souhlasím s Obchodními podmínkami a Zásadami ochrany osobních údajů.</label><button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">Získat kód a začít používat <ArrowRight className="size-4" /></button></form></section>

      <section id="prihlaseni" className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8"><div><p className="font-semibold">Už máte účet?</p><p className="mt-1 text-sm text-muted-foreground">Přihlaste se a pokračujte tam, kde jste skončili.</p></div><Link href="#prihlaseni" className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold hover:border-primary/50">Přihlásit se <ArrowRight className="size-4" /></Link></section>
    </main>
  )
}
