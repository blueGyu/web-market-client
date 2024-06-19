import ItemsList from "@/app/[category]/_items/ItemsList";
import type { Params } from "@/lib/definitions";

export default function CategoryPage({ params }: Params) {
  return <ItemsList category={params.category} />;
}
