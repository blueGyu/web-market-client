"use client";

import { useEffect, useState } from "react";
import CategoryCard from "./ItemCard";
import type { Items } from "@/lib/definitions";

interface CategoryProps {
  path: string;
  name: string;
  image_url: string;
}

export default function ItemList({ category }: { category: string }) {
  const [items, setItems] = useState<Items[]>([]);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
      {items.map((item) => {
        return <CategoryCard key={item.id} {...item} />;
      })}
    </div>
  );
}
