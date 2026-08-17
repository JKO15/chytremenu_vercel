import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  ShoppingBasket,
  Sparkles,
  Utensils,
} from 'lucide-react'
import { RecipeVisual } from '@/components/recipe-visual'
import { recipes } from '@/lib/data'

const featured = [
  recipes.find((recipe) => recipe.slug === 'kureci-stir-fry-s-ryzi'),
  recipes.find((recipe) => recipe.slug === 'quinoa-s-proteinem-a-orechovym-maslem'),
  recipes.find((recipe) => recipe.slug === 'tvarohovy-dezert-s-malinami'),
].filter(Boolean)

const steps = [
  { icon: CalendarDays, title: 'Naplánujete týden', text: 'Vyberete si jídla, která dávají smysl vašemu dni.' },
  { icon: Sparkles, title: 'Makra se spočítají', text: 'Energie i bílkoviny vidíte dřív, než začnete vařit.' },
  { icon: ShoppingBasket, title: 'Nakoupíte bez přemýšlení', text: 'Seznam se seskládá podle regálů a počtu porcí.' },
]

export default function DemoHomePage() {
  return (
    <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-20 pb-8 md:gap-28">
      <section className="grid items-center gap-12 pt-8 md:grid-cols-[1.02fr_0.98fr] md:pt-16">
        <div className="flex flex-col items-start gap-7">
          <div className="flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 tag text-primary">
            <span className="size-1.5 rounded-full bg-primary" />
            chytré menu / nová homepage
          </div>
          <h1 className="max-w-2xl text-balance text-[clamp(3.2rem,7vw,6.8rem)] font-bold leading-[0.88] tracking-[-0.065em]">
            Jídlo, které <span className="text-primary">zapadne</span> do vašeho dne.
          </h1>
          <p className="max-w-lg text-pretty text-base leading-7 text-muted-foreground md:text-lg">
            Chytré menu propojí vaše recepty, týdenní plán a nákupní seznam. Méně rozhodování, více dobrého jídla.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
              Sestavit můj týden
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/recepty" className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold transition-colors hover:border-primary/40 hover:bg-secondary">
              Projít recepty
            </Link>
          </div>
          <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" /> bez složitostí</span>
            <span className="size-1 rounded-full bg-border" />
            <span>pro běžný život</span>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-black/15 md:min-h-[540px]">
          <RecipeVisual src="/food/kureci-rize.jpg" alt="Kuřecí stir-fry s rýží a zeleninou" className="absolute inset-0" sizes="(min-width: 768px) 48vw, 100vw" />
          <div className="scrim absolute inset-0" />
          <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-md">dnešní oběd</div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="mb-2 tag text-white/60">12:30 · hotovo za 30 min</p>
              <h2 className="max-w-xs text-2xl font-semibold leading-tight tracking-tight">Kuřecí stir-fry s rýží</h2>
            </div>
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-center text-primary-foreground">
              <span className="num font-mono text-sm font-bold">612</span><span className="font-mono text-[8px] uppercase">kcal</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 border-y border-border py-6 md:grid-cols-3 md:gap-0" aria-label="Výhody chytrého menu">
        {[
          ['01', 'Jídelníček na míru', 'Týdenní přehled, který se dá opravdu dodržet.'],
          ['02', 'Makra pod kontrolou', 'Přehledné hodnoty bez tabulek a kalkulačky.'],
          ['03', 'Nákup za pár kliknutí', 'Všechny ingredience na jednom chytrém seznamu.'],
        ].map(([number, title, text], index) => (
          <div key={title} className={`flex gap-4 px-1 md:px-6 ${index > 0 ? 'md:border-l md:border-border' : ''}`}>
            <span className="font-mono text-xs text-primary">{number}</span>
            <div><h2 className="font-semibold tracking-tight">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-8" aria-labelledby="how-it-works">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div><p className="tag text-primary">jak to funguje</p><h2 id="how-it-works" className="mt-2 text-3xl font-bold tracking-[-0.04em] md:text-5xl">Od nápadu k večeři.</h2></div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">Nástroj, který přemýšlí za vás, ale nechává vám volnost.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => <article key={step.title} className="rounded-2xl border border-border bg-card p-5"><div className="mb-8 flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-primary/12 text-primary"><step.icon className="size-5" /></span><span className="tag">0{index + 1}</span></div><h3 className="text-lg font-semibold tracking-tight">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p></article>)}
        </div>
      </section>

      <section className="flex flex-col gap-8" aria-labelledby="featured-recipes">
        <div className="flex items-end justify-between gap-4"><div><p className="tag text-primary">z kuchyně chytrého menu</p><h2 id="featured-recipes" className="mt-2 text-3xl font-bold tracking-[-0.04em] md:text-5xl">Recepty, na které se těšíte.</h2></div><Link href="/recepty" className="hidden items-center gap-1 text-sm font-semibold text-primary md:flex">Všechny recepty <ChevronRight className="size-4" /></Link></div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((recipe) => recipe && <Link href={`/recepty/${recipe.slug}`} key={recipe.slug} className="group relative isolate flex min-h-[310px] flex-col justify-end overflow-hidden rounded-3xl"><RecipeVisual src={recipe.image} alt={recipe.title} variant={recipe.placeholder} className="-z-10 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" /><div className="scrim absolute inset-0 -z-10" /><div className="flex flex-col gap-2 p-5 text-white"><div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/70"><span>{recipe.category}</span><span className="flex items-center gap-1"><Clock3 className="size-3" />{recipe.minutes} min</span></div><h3 className="text-xl font-semibold leading-tight tracking-tight">{recipe.title}</h3><span className="flex items-center gap-1 font-mono text-[10px] text-primary">{recipe.macros.kcal} kcal <Flame className="size-3" /></span></div></Link>)}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-primary/10 px-6 py-12 text-center md:px-12 md:py-16"><div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5"><span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Utensils className="size-5" /></span><h2 className="text-balance text-3xl font-bold tracking-[-0.04em] md:text-5xl">Váš týden může začít u jednoho dobrého jídla.</h2><p className="max-w-lg text-sm leading-6 text-muted-foreground">Otevřete plánovač a poskládejte si týden, který chutná i funguje.</p><Link href="/" className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">Začít plánovat <ArrowRight className="size-4" /></Link></div></section>
    </div>
  )
}
