import { RecipeLibrary } from "@/components/recipe-library"

export const metadata = {
  title: "Recepty — chytré menu",
  description: "Kuchařka s fulltextovým hledáním podle názvu i suroviny a přesnými makry.",
}

export default function Page() {
  return <RecipeLibrary />
}
