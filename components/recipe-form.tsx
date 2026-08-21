'use client'

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ImagePlus,
  Minus,
  Plus,
  Save,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MacroBar, energyShare } from '@/components/macros'
import { RecipeVisual } from '@/components/recipe-visual'
import { MEAL_CATEGORIES, PLACEHOLDER_BY_CATEGORY, dailyTarget, type MealCategory } from '@/lib/data'
import { cn } from '@/lib/utils'

type DraftIngredient = { amount: string; name: string; note: string }

export function RecipeForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<MealCategory>(MEAL_CATEGORIES[0])
  const [servings, setServings] = useState(2)
  const [minutes, setMinutes] = useState(15)

  const [kcal, setKcal] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  const [ingredients, setIngredients] = useState<DraftIngredient[]>([
    { amount: '', name: '', note: '' },
  ])
  const [steps, setSteps] = useState<string[]>([''])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [photo, setPhoto] = useState<string | null>(null)

  const macros = {
    kcal: Number(kcal) || 0,
    protein: Number(protein) || 0,
    carbs: Number(carbs) || 0,
    fat: Number(fat) || 0,
  }
  const share = energyShare(macros)

  const macroRows = [
    {
      label: 'bílkoviny',
      value: macros.protein,
      target: dailyTarget.protein,
      pct: share.protein,
      dot: 'bg-primary',
      onChange: setProtein,
      raw: protein,
    },
    {
      label: 'sacharidy',
      value: macros.carbs,
      target: dailyTarget.carbs,
      pct: share.carbs,
      dot: 'bg-accent',
      onChange: setCarbs,
      raw: carbs,
    },
    {
      label: 'tuky',
      value: macros.fat,
      target: dailyTarget.fat,
      pct: share.fat,
      dot: 'bg-chart-5',
      onChange: setFat,
      raw: fat,
    },
  ]

  function updateIngredient(index: number, field: keyof DraftIngredient, value: string) {
    setIngredients((list) =>
      list.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)),
    )
  }

  function addIngredient() {
    setIngredients((list) => [...list, { amount: '', name: '', note: '' }])
  }

  function removeIngredient(index: number) {
    setIngredients((list) => list.filter((_, i) => i !== index))
  }

  function updateStep(index: number, value: string) {
    setSteps((list) => list.map((s, i) => (i === index ? value : s)))
  }

  function addStep() {
    setSteps((list) => [...list, ''])
  }

  function removeStep(index: number) {
    setSteps((list) => list.filter((_, i) => i !== index))
  }

  function addTag() {
    const value = tagInput.trim()
    if (!value || tags.includes(value)) {
      setTagInput('')
      return
    }
    setTags((list) => [...list, value])
    setTagInput('')
  }

  function removeTag(index: number) {
    setTags((list) => list.filter((_, i) => i !== index))
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setPhoto(URL.createObjectURL(file))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    router.push('/recepty')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
      <Link
        href="/recepty"
        className="tag inline-flex w-fit items-center gap-1.5 transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        zpět na recepty
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-1.5">
          <span className="tag">Nový recept · koncept</span>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Vytvořit recept
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="gap-1.5 rounded-xl bg-card">
            Uložit jako koncept
          </Button>
          <Button type="submit" className="gap-1.5 rounded-xl">
            <Save className="size-4" />
            Uložit recept
          </Button>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div className="flex max-w-[640px] flex-col gap-10">
          {/* ── Photo + basics ── */}
          <section className="flex flex-col gap-5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative isolate flex min-h-[240px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border bg-card text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              {photo ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt="Náhled fotografie receptu"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="scrim absolute inset-0" />
                  <span className="tag relative z-10 mt-auto mb-4 flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-white backdrop-blur-md">
                    <ImagePlus className="size-3.5" />
                    změnit fotografii
                  </span>
                </>
              ) : (
                <>
                  <RecipeVisual
                    alt={title || category}
                    variant={PLACEHOLDER_BY_CATEGORY[category]}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="-z-10 opacity-90 transition-opacity group-hover:opacity-100"
                  />
                  <span className="tag relative z-10 mt-auto mb-4 flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-white backdrop-blur-md">
                    <ImagePlus className="size-3.5" />
                    přidat vlastní fotografii
                  </span>
                </>
              )}
            </button>
            {!photo ? (
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Bez vlastní fotky se použije ilustrovaný placeholder pro {'„'}
                {category}
                {'“'}. Každý typ jídla má svůj motiv — miska pro snídani, jogurt pro svačinu I, talíř
                pro oběd, jablko pro svačinu II a hrnec pro večeři.
              </p>
            ) : null}

            <label className="flex flex-col gap-1.5">
              <span className="tag">Název receptu</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="např. Cottage sýr s žitným chlebem a mrkví"
                className="h-12 rounded-xl border border-border bg-card px-4 text-[15px] font-semibold tracking-tight outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground focus:border-primary/50"
              />
            </label>

            <div className="flex flex-col gap-2">
              <span className="tag">Kategorie</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {MEAL_CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] transition-colors',
                    category === c
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border text-muted-foreground hover:bg-secondary hover:text-foreground',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Stepper label="porce" value={servings} onChange={setServings} min={1} />
              <Stepper label="minuty" value={minutes} onChange={setMinutes} min={1} step={5} />
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="tag">Štítky</span>
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2">
                {tags.map((t, i) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary-foreground"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(i)}
                      aria-label={`Odebrat štítek ${t}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addTag()
                    }
                  }}
                  onBlur={addTag}
                  placeholder={tags.length ? 'další štítek…' : 'např. vysoký protein, meal prep…'}
                  className="h-7 min-w-[140px] flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </label>
          </section>

          {/* ── Ingredients ── */}
          <section>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold tracking-tight">Ingredience</h2>
              <span className="tag">{ingredients.length} položek</span>
            </div>

            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <input
                    value={ing.amount}
                    onChange={(e) => updateIngredient(i, 'amount', e.target.value)}
                    placeholder="30 g"
                    aria-label="Množství"
                    className="num h-9 w-20 shrink-0 rounded-lg border border-border bg-background px-2.5 text-sm font-semibold outline-none transition-colors focus:border-primary/50"
                  />
                  <input
                    value={ing.name}
                    onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                    placeholder="název ingredience"
                    aria-label="Ingredience"
                    className="h-9 flex-1 rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-colors focus:border-primary/50"
                  />
                  <input
                    value={ing.note}
                    onChange={(e) => updateIngredient(i, 'note', e.target.value)}
                    placeholder="poznámka"
                    aria-label="Poznámka"
                    className="hidden h-9 w-32 shrink-0 rounded-lg border border-border bg-background px-2.5 text-sm text-muted-foreground outline-none transition-colors focus:border-primary/50 sm:block"
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(i)}
                    aria-label="Odebrat ingredienci"
                    className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={addIngredient}
              className="mt-3 flex items-center gap-1.5 rounded-xl border border-dashed border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <Plus className="size-4" />
              Přidat ingredienci
            </button>
          </section>

          {/* ── Steps ── */}
          <section>
            <h2 className="mb-5 text-xl font-bold tracking-tight">Postup</h2>
            <ol className="flex flex-col gap-5">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="num pt-2.5 font-mono text-2xl font-bold leading-none text-muted-foreground/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-1 items-start gap-2">
                    <textarea
                      value={step}
                      onChange={(e) => updateStep(i, e.target.value)}
                      placeholder="Popište krok postupu…"
                      rows={2}
                      className="flex-1 resize-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-[15px] leading-relaxed outline-none transition-colors focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      aria-label="Odebrat krok"
                      className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={addStep}
              className="mt-4 flex items-center gap-1.5 rounded-xl border border-dashed border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
            >
              <Plus className="size-4" />
              Přidat krok
            </button>
          </section>
        </div>

        {/* ── Nutrition instrument ── */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="border-b border-border px-5 py-5">
              <span className="tag">energie na 1 porci</span>
              <div className="num mt-2 flex items-baseline gap-2">
                <input
                  value={kcal}
                  onChange={(e) => setKcal(e.target.value)}
                  inputMode="numeric"
                  aria-label="Kalorie na porci"
                  placeholder="0"
                  className="w-24 bg-transparent font-mono text-[3rem] font-bold leading-[0.85] tracking-tighter outline-none placeholder:text-muted-foreground/40"
                />
                <span className="font-mono text-xs text-muted-foreground">kcal</span>
              </div>
              <p className="num mt-2 font-mono text-[11px] text-muted-foreground">
                {macros.kcal ? Math.round((macros.kcal / dailyTarget.kcal) * 100) : 0} % denního
                cíle ({dailyTarget.kcal} kcal)
              </p>
              <MacroBar macros={macros} size="lg" className="mt-4" />
            </div>

            <dl className="divide-y divide-border">
              {macroRows.map((row) => (
                <div key={row.label} className="flex flex-col gap-2 px-5 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span className={cn('size-2 rounded-full', row.dot)} />
                      <span className="tag">{row.label}</span>
                    </span>
                    <span className="num flex items-baseline gap-1.5">
                      <input
                        value={row.raw}
                        onChange={(e) => row.onChange(e.target.value)}
                        inputMode="numeric"
                        aria-label={`Množství: ${row.label}`}
                        placeholder="0"
                        className="w-12 bg-transparent text-right font-mono text-base font-bold outline-none placeholder:text-muted-foreground/40"
                      />
                      <span className="font-mono text-[10px] text-muted-foreground">g</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                      <span
                        style={{ width: `${Math.min((row.value / row.target) * 100, 100)}%` }}
                        className={cn('block h-full rounded-full', row.dot)}
                      />
                    </div>
                    <span className="num w-24 shrink-0 whitespace-nowrap text-right font-mono text-[10px] text-muted-foreground">
                      {Math.round(row.pct)} % energie
                    </span>
                  </div>
                </div>
              ))}
            </dl>

            <div className="border-t border-border bg-muted/30 px-5 py-4">
              <span className="tag">celkem za {servings} porce</span>
              <p className="num mt-1.5 font-mono text-sm font-bold">
                {Math.round(macros.kcal * servings)} kcal · {Math.round(macros.protein * servings)}{' '}
                g bílkovin
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground">
              <Sparkles className="mt-0.5 size-3.5 shrink-0 text-accent" />
              Makra dopočítáme automaticky, pokud vyplníte přesné množství surovin — teď je zadejte
              odhadem.
            </p>
          </div>
        </aside>
      </div>
    </form>
  )
}

function Stepper({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  step?: number
}) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1">
      <span className="tag pl-2">{label}</span>
      <button
        type="button"
        aria-label={`Méně (${label})`}
        onClick={() => onChange(Math.max(min, value - step))}
        className="grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Minus className="size-3.5" />
      </button>
      <span className="num w-7 text-center font-mono text-sm font-bold text-primary">{value}</span>
      <button
        type="button"
        aria-label={`Více (${label})`}
        onClick={() => onChange(value + step)}
        className="grid size-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
