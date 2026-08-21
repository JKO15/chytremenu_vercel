import { RecipeForm } from '@/components/recipe-form'

export const metadata = {
  title: 'Nový recept — chytré menu',
  description: 'Vytvořte nový recept s ingrediencemi, postupem a nutričními údaji.',
}

export default function Page() {
  return <RecipeForm />
}
