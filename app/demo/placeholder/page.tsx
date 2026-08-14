import Link from 'next/link'
import { ArrowLeft, Check, ImageOff } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { RecipeVisual } from '@/components/recipe-visual'

const variants = [
  {
    key: 'plate' as const,
    label: 'Talíř',
    recipe: 'Zelený toast s avokádem',
    description: 'Klasické prostření: vidlička vlevo, talíř uprostřed a nůž vpravo.',
    tone: 'Teplý editorial',
  },
  {
    key: 'bowl' as const,
    label: 'Miska',
    recipe: 'Miska s cizrnou, fetou a bylinkami',
    description: 'Barevná miska s jednoduchými ingrediencemi, vhodná pro bowl recepty.',
    tone: 'Ingredience',
  },
  {
    key: 'kitchen' as const,
    label: 'Kuchyně',
    recipe: 'Zapečené gnocchi se špenátem',
    description: 'Hrnec a příbor jako klidnější ilustrace pro teplá jídla a comfort food.',
    tone: 'Kuchyňská ilustrace',
  },
]

export default function PlaceholderDemoPage() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-border pb-7">
          <Link
            href="/recepty"
            className="flex w-fit items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Zpět na recepty
          </Link>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-2xl flex-col gap-2">
              <p className="tag text-primary">demo / vizuální systém</p>
              <h1 className="text-balance text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[0.94] tracking-[-0.05em]">
                Recept bez fotografie,
                <br />
                ale ne bez charakteru.
              </h1>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Tři tematické varianty placeholderu pro recepty, které zatím nemají vlastní fotografii.
                Každá varianta funguje v galerii, detailu i týdenním jídelníčku.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <ImageOff className="size-4 text-brand-2" />
              3 varianty k porovnání
            </div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-3" aria-label="Varianty placeholderů">
          {variants.map((variant) => (
            <article key={variant.key} className="flex flex-col gap-4">
              <div className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-black/10">
                <RecipeVisual
                  src={undefined}
                  alt={variant.recipe}
                  variant={variant.key}
                  showTitle
                />
              </div>
              <div className="flex flex-col gap-2 px-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-tight">{variant.label}</h2>
                  <span className="tag rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-primary">
                    {variant.tone}
                  </span>
                </div>
                <p className="text-sm font-medium">{variant.recipe}</p>
                <p className="text-sm leading-6 text-muted-foreground">{variant.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-4 border-t border-border pt-7" aria-labelledby="large-placeholders">
          <div className="flex flex-col gap-2">
            <p className="tag text-primary">detail receptu / velký formát</p>
            <h2 id="large-placeholders" className="text-2xl font-semibold tracking-tight md:text-3xl">
              Jak placeholder funguje jako hero
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Stejné motivy ve velikosti, kterou používá detail receptu. Díky větší ploše je vidět kompozice talíře, misky i kuchyňské ilustrace mnohem přesněji.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {variants.map((variant) => (
              <div
                key={`hero-${variant.key}`}
                className="relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl border border-border shadow-2xl shadow-black/10 md:min-h-[440px]"
              >
                <RecipeVisual
                  src={undefined}
                  alt={variant.recipe}
                  variant={variant.key}
                  showTitle
                />
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 border-t border-border pt-6 md:grid-cols-3">
          {['V galerii', 'V jídelníčku', 'V detailu receptu'].map((label) => (
            <div key={label} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              <span className="grid size-5 place-items-center rounded-full bg-primary/15 text-primary">
                <Check className="size-3" />
              </span>
              {label}
            </div>
          ))}
        </section>
      </div>
    </AppShell>
  )
}
