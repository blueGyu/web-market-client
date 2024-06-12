"use client";

import { useEffect, useState } from "react";
import CategoryCard from "./ItemCard";

interface CategoryProps {
  path: string;
  name: string;
  image_url: string;
}

interface itemProps {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  model_url: string;
  tags: string[];
  upload_date: string;
  uploader: {
    id: string;
    name: string;
  };
}

export default function ItemList({ category }: { category: string }) {
  const [items, setItems] = useState<itemProps[]>([]);

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
        console.log(items);
        setItems(items.data);
      } else {
        console.error("Error: 'fetchCategory' has error");
      }
    };

    fetchItems();
  }, [category]);

  return (
    <div className="grid grid-cols-4 grid-flow-row gap-4">
      {items.map((item) => {
        return <CategoryCard key={item.id} {...item} />;
      })}
    </div>
  );

  //   {
  //     "id": "item1",
  //     "name": "item1",
  //     "description": "item1에 대한 설명입니다.",
  //     "category": "cloth",
  //     "price": 9517,
  //     "image_url": "/items/image.png",
  //     "model_url": "/model/model.png",
  //     "tags": [
  //       "cloth",
  //       "item1"
  //     ],
  //     "upload_date": "2024-06-12",
  //     "uploader": {
  //       "id": "creater1",
  //       "name": "creater1"
  //     }
  //   },
}
