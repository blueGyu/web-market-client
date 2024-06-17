"use client";

import { useEffect, useState } from "react";
import CategoryCard from "./ItemCard";
import type { Item } from "@/lib/definitions";

export default function ItemList({ category }: { category: string }) {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category }),
        }
      );

      if (response.ok) {
        const items = await response.json();
        setItems(items.data);
      } else {
        console.error("Error: 'fetchCategory' POST has error");
      }
    };

    fetchItems();
  }, [category]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
      {items.map((item) => {
        return <CategoryCard key={item.id} {...item} />;
      })}
    </div>
  );
}
