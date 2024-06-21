import type { Item } from "@/lib/definitions";
import ItemCard from "@/components/items/ItemCard";

export default async function ItemsList({ category }: { category: string }) {
  const items: Item[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    }
  )
    .then((data) => data.json())
    .then((data) => data.data)
    .catch((error) => console.error("Error: 'fetchCategory' POST has error"));

  return (
    <div className="grid grid-flow-row gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2.5 md:px-5">
      {items.map((item) => {
        return <ItemCard key={item.id} item={item} />;
      })}
    </div>
  );
}
