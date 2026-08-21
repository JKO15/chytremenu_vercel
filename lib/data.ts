export type Macros = {
  kcal: number
  protein: number
  carbs: number
  fat: number
}

export type Ingredient = {
  amount: string
  name: string
  note?: string
}

export type MealCategory =
  | "Snídaně"
  | "Dopolední svačina"
  | "Oběd"
  | "Odpolední svačina"
  | "Večeře"

export type Recipe = {
  slug: string
  title: string
  category: MealCategory | "Bez kategorie"
  servings: number
  minutes: number
  updated: string
  macros: Macros
  ingredients: Ingredient[]
  steps: string[]
  tags: string[]
  image?: string
  placeholder?: 'plate' | 'bowl' | 'kitchen' | 'yogurt' | 'apple'
  shared?: boolean
}

export const MEAL_CATEGORIES: MealCategory[] = [
  "Snídaně",
  "Dopolední svačina",
  "Oběd",
  "Odpolední svačina",
  "Večeře",
]

// Každý typ jídla má vlastní ilustrovaný placeholder, který se nabízí u receptů bez fotky.
export const PLACEHOLDER_BY_CATEGORY: Record<MealCategory, NonNullable<Recipe['placeholder']>> = {
  "Snídaně": "bowl",
  "Dopolední svačina": "yogurt",
  "Oběd": "plate",
  "Odpolední svačina": "apple",
  "Večeře": "kitchen",
}

// Vrátí placeholder variantu pro recept: explicitní hodnota má přednost, jinak se odvodí z kategorie jídla.
export function getPlaceholderVariant(
  recipe: Pick<Recipe, 'placeholder' | 'category'>,
): NonNullable<Recipe['placeholder']> {
  if (recipe.placeholder) return recipe.placeholder
  if (recipe.category in PLACEHOLDER_BY_CATEGORY) {
    return PLACEHOLDER_BY_CATEGORY[recipe.category as MealCategory]
  }
  return 'plate'
}

export const recipes: Recipe[] = [
  {
    slug: "cottage-syr-s-zitnym-chlebem-a-mrkvi",
    title: "Cottage sýr s žitným chlebem a mrkví",
    category: "Snídaně",
    servings: 1,
    minutes: 8,
    updated: "4. srpna 2026",
    macros: { kcal: 199, protein: 22, carbs: 7, fat: 7 },
    ingredients: [
      { amount: "30 g", name: "žitného kváskového chleba" },
      { amount: "87 g", name: "cottage", note: "½ kelímku" },
      { amount: "93 g", name: "mrkve", note: "1 ks" },
    ],
    steps: [
      "Mrkev nakrájíme na kolečka nebo nastrouháme.",
      "Přidáme do cottage sýru a zamícháme.",
      "Podáváme s žitným chlebem.",
    ],
    tags: ["vysoký protein", "bez cukru", "do 10 minut"],
    image: "/food/cottage-chleb.jpg",
  },
  {
    slug: "quinoa-s-proteinem-a-orechovym-maslem",
    title: "Quinoa s proteinem a ořechovým máslem",
    category: "Snídaně",
    servings: 2,
    minutes: 22,
    updated: "2. srpna 2026",
    macros: { kcal: 467, protein: 25, carbs: 52, fat: 15 },
    ingredients: [
      { amount: "176 g", name: "quinoy", note: "6 polévkových lžic" },
      { amount: "118 g", name: "bílého jogurtu 3,5 %" },
      { amount: "30 g", name: "proteinu" },
      { amount: "20 g", name: "ořechového másla" },
      { amount: "60 g", name: "borůvek" },
    ],
    steps: [
      "Quinou několikrát spaříme horkou vodou a propereme.",
      "Dáme do hrnce a vaříme 15 minut do měkka, poté necháme vychladnout.",
      "Vmícháme jogurt s proteinem, doplníme ořechovým máslem a borůvkami.",
    ],
    tags: ["meal prep", "vysoký protein"],
    image: "/food/quinoa-protein.jpg",
  },
  {
    slug: "vlocky-s-jogurtem-a-banánem",
    title: "Vločky s jogurtem a banánem",
    category: "Snídaně",
    servings: 1,
    minutes: 10,
    updated: "1. srpna 2026",
    macros: { kcal: 454, protein: 50, carbs: 14, fat: 14 },
    ingredients: [
      { amount: "60 g", name: "ovesných vloček" },
      { amount: "150 g", name: "skyru" },
      { amount: "1 ks", name: "banánu" },
      { amount: "10 g", name: "medu" },
    ],
    steps: [
      "Vločky večer promícháme v misce se skyrem a necháme v chladu.",
      "Ráno přidáme nakrájený banán a med.",
    ],
    tags: ["overnight", "vysoký protein"],
    image: "/food/vlocky-banan.jpg",
  },
  {
    slug: "kureci-stir-fry-s-ryzi",
    title: "Kuřecí stir-fry s rýží a zeleninou",
    category: "Oběd",
    servings: 2,
    minutes: 30,
    updated: "30. července 2026",
    macros: { kcal: 612, protein: 46, carbs: 61, fat: 18 },
    ingredients: [
      { amount: "300 g", name: "kuřecích prsou" },
      { amount: "150 g", name: "jasmínové rýže" },
      { amount: "200 g", name: "wok zeleniny" },
      { amount: "20 ml", name: "sójové omáčky" },
      { amount: "10 ml", name: "sezamového oleje" },
    ],
    steps: [
      "Rýži uvaříme podle návodu.",
      "Kuřecí maso nakrájíme na kostky a orestujeme na sezamovém oleji.",
      "Přidáme zeleninu, krátce prohodíme a dochutíme sójovou omáčkou.",
      "Podáváme s rýží.",
    ],
    tags: ["rodinné", "one pan"],
    image: "/food/kureci-rize.jpg",
  },
  {
    slug: "cocka-na-kyselo",
    title: "Čočka na kyselo s vejcem",
    category: "Večeře",
    servings: 4,
    minutes: 45,
    updated: "28. července 2026",
    macros: { kcal: 388, protein: 24, carbs: 44, fat: 12 },
    ingredients: [
      { amount: "300 g", name: "čočky" },
      { amount: "4 ks", name: "vejce" },
      { amount: "1 ks", name: "cibule" },
      { amount: "20 ml", name: "octa" },
      { amount: "5 g", name: "solí máslo" },
    ],
    steps: [
      "Čočku propereme a uvaříme do měkka.",
      "Cibuli osmahneme na masle a vmícháme do čočky, dochutíme octem.",
      "Podáváme se sázeným vejcem.",
    ],
    tags: ["levné", "rostlinné bílkoviny"],
    image: "/food/cocka-vejce.jpg",
  },
  {
    slug: "tvarohovy-dezert-s-malinami",
    title: "Tvarohový dezert s malinami",
    category: "Odpolední svačina",
    servings: 2,
    minutes: 6,
    updated: "26. července 2026",
    macros: { kcal: 175, protein: 5, carbs: 25, fat: 6 },
    ingredients: [
      { amount: "250 g", name: "tvarohu" },
      { amount: "100 g", name: "malin" },
      { amount: "15 g", name: "medu" },
    ],
    steps: ["Tvaroh smícháme s medem.", "Navrstvíme s malinami do sklenice."],
    tags: ["rychlé", "dezert"],
    image: "/food/tvaroh-maliny.jpg",
    shared: true,
  },
  {
    slug: "zeleny-toast-s-avokadem",
    title: "Zelený toast s avokádem",
    category: "Snídaně",
    servings: 1,
    minutes: 7,
    updated: "12. srpna 2026",
    macros: { kcal: 318, protein: 11, carbs: 31, fat: 17 },
    ingredients: [
      { amount: "2 plátky", name: "žitného chleba" },
      { amount: "½ ks", name: "avokáda" },
      { amount: "1 ks", name: "vejce" },
      { amount: "1 hrst", name: "microgreens" },
    ],
    steps: [
      "Chléb opečeme dozlatova.",
      "Avokádo rozmačkáme s citronem a rozetřeme na toast.",
      "Dokončíme vejcem a microgreens.",
    ],
    tags: ["nové", "rychlé", "vegetariánské"],
    placeholder: "plate",
  },
  {
    slug: "miska-s-cizrnou-a-fetou",
    title: "Miska s cizrnou, fetou a bylinkami",
    category: "Oběd",
    servings: 2,
    minutes: 18,
    updated: "11. srpna 2026",
    macros: { kcal: 428, protein: 18, carbs: 49, fat: 17 },
    ingredients: [
      { amount: "240 g", name: "cizrny" },
      { amount: "80 g", name: "fety" },
      { amount: "120 g", name: "okurky a rajčat" },
      { amount: "1 hrst", name: "čerstvých bylinek" },
    ],
    steps: ["Zeleninu nakrájíme a smícháme s cizrnou.", "Navrch rozdrobíme fetu a přidáme bylinky."],
    tags: ["meal prep", "vegetariánské"],
    placeholder: "bowl",
  },
  {
    slug: "zapečene-gnocchi-se-spenatem",
    title: "Zapečené gnocchi se špenátem",
    category: "Večeře",
    servings: 3,
    minutes: 35,
    updated: "10. srpna 2026",
    macros: { kcal: 506, protein: 21, carbs: 64, fat: 18 },
    ingredients: [
      { amount: "500 g", name: "gnocchi" },
      { amount: "200 g", name: "baby špenátu" },
      { amount: "150 g", name: "mozzarelly" },
    ],
    steps: ["Gnocchi promícháme se špenátem a smetanou.", "Zapečeme s mozzarellou dozlatova."],
    tags: ["comfort food", "vegetariánské"],
    placeholder: "kitchen",
  },
]

export const dailyTarget: Macros = { kcal: 2200, protein: 140, carbs: 240, fat: 70 }

type PlanEntry = { slot: MealCategory; slug: string; servings: number }

export type PlanDay = {
  name: string
  date: string
  today?: boolean
  entries: PlanEntry[]
}

export const week: PlanDay[] = [
  {
    name: "Pondělí",
    date: "3. 8.",
    entries: [
      { slot: "Snídaně", slug: "cottage-syr-s-zitnym-chlebem-a-mrkvi", servings: 2 },
      { slot: "Oběd", slug: "kureci-stir-fry-s-ryzi", servings: 2 },
      { slot: "Večeře", slug: "cocka-na-kyselo", servings: 2 },
    ],
  },
  {
    name: "Úterý",
    date: "4. 8.",
    today: true,
    entries: [
      { slot: "Snídaně", slug: "quinoa-s-proteinem-a-orechovym-maslem", servings: 2 },
      { slot: "Dopolední svačina", slug: "zeleny-toast-s-avokadem", servings: 1 },
      { slot: "Odpolední svačina", slug: "tvarohovy-dezert-s-malinami", servings: 2 },
      { slot: "Večeře", slug: "cocka-na-kyselo", servings: 2 },
    ],
  },
  {
    name: "Středa",
    date: "5. 8.",
    entries: [
      { slot: "Snídaně", slug: "vlocky-s-jogurtem-a-banánem", servings: 2 },
      { slot: "Oběd", slug: "kureci-stir-fry-s-ryzi", servings: 2 },
    ],
  },
  {
    name: "Čtvrtek",
    date: "6. 8.",
    entries: [{ slot: "Snídaně", slug: "cottage-syr-s-zitnym-chlebem-a-mrkvi", servings: 2 }],
  },
  {
    name: "Pátek",
    date: "7. 8.",
    entries: [
      { slot: "Oběd", slug: "kureci-stir-fry-s-ryzi", servings: 2 },
      { slot: "Dopolední svačina", slug: "tvarohovy-dezert-s-malinami", servings: 1 },
    ],
  },
  { name: "Sobota", date: "8. 8.", entries: [] },
  {
    name: "Neděle",
    date: "9. 8.",
    entries: [{ slot: "Večeře", slug: "cocka-na-kyselo", servings: 4 }],
  },
]

export function getRecipe(slug: string) {
  return recipes.find((r) => r.slug === slug)
}

export function dayMacros(day: PlanDay): Macros {
  return day.entries.reduce<Macros>(
    (acc, e) => {
      const r = getRecipe(e.slug)
      if (!r) return acc
      return {
        kcal: acc.kcal + r.macros.kcal * e.servings,
        protein: acc.protein + r.macros.protein * e.servings,
        carbs: acc.carbs + r.macros.carbs * e.servings,
        fat: acc.fat + r.macros.fat * e.servings,
      }
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 },
  )
}

export type ShoppingItem = {
  amount: string
  unit: string
  name: string
  checked?: boolean
}

export type ShoppingGroup = {
  aisle: string
  items: ShoppingItem[]
}

export const shoppingList: ShoppingGroup[] = [
  {
    aisle: "Mléko a mléčné výrobky",
    items: [
      { amount: "118", unit: "g", name: "bílý jogurt 3,5 % tuku" },
      { amount: "250", unit: "g", name: "tvaroh polotučný", checked: true },
      { amount: "174", unit: "g", name: "cottage sýr" },
    ],
  },
  {
    aisle: "Maso a ryby",
    items: [{ amount: "600", unit: "g", name: "kuřecí prsa" }],
  },
  {
    aisle: "Ovoce a zelenina",
    items: [
      { amount: "186", unit: "g", name: "mrkev" },
      { amount: "400", unit: "g", name: "wok zelenina" },
      { amount: "100", unit: "g", name: "maliny" },
      { amount: "2", unit: "ks", name: "banán" },
    ],
  },
  {
    aisle: "Trvanlivé a suché",
    items: [
      { amount: "176", unit: "g", name: "quinoa" },
      { amount: "300", unit: "g", name: "čočka" },
      { amount: "150", unit: "g", name: "jasmínová rýže", checked: true },
      { amount: "60", unit: "g", name: "ovesné vločky" },
    ],
  },
  {
    aisle: "Pečivo",
    items: [{ amount: "60", unit: "g", name: "žitný kváskový chléb" }],
  },
]
