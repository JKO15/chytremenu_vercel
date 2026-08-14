import { ShoppingList } from "@/components/shopping-list"

export const metadata = {
  title: "Nákupní seznam — chytré menu",
  description: "Nákupní seznam sloučený z jídelníčku, seskupený podle oddělení v prodejně.",
}

export default function Page() {
  return <ShoppingList />
}
