import { notFound } from "next/navigation"
import { RecipeDetail } from "@/components/recipe-detail"
import { getRecipe, recipes } from "@/lib/data"

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const recipe = getRecipe(slug)
  return {
    title: recipe ? `${recipe.title} — chytré menu` : "Recept — chytré menu",
    description: recipe
      ? `${recipe.macros.kcal} kcal na porci · ${recipe.macros.protein} g bílkovin.`
      : undefined,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = getRecipe(slug)
  if (!recipe) notFound()
  return <RecipeDetail recipe={recipe} />
}
