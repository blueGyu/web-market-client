import ItemList from "@/components/items/ItemList";
import type { Params } from "@/lib/definitions";

export default function CategoryPage({ params }: Params) {
  const { category } = params;
  return <ItemList category={category} />;
}
