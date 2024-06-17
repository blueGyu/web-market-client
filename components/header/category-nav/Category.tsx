"use client";

import { useState, useEffect } from "react";
import CategoryHorizontal from "./CategoryHorizontal";
import CategoryVertical from "./CategoryVertical";
import type { Category } from "@/lib/definitions";

interface CategoryType {
  type: "horizontal" | "vertical";
}

export default function Category({ type }: CategoryType) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        { method: "GET" }
      );

      if (response.ok) {
        const categories = await response.json();
        setCategories(categories.data);
      } else {
        console.error("Error: 'fetchCategory' GET has error");
      }
    };

    fetchCategory();
  }, []);

  return (
    <>
      {type === "horizontal" && <CategoryHorizontal categories={categories} />}
      {type === "vertical" && <CategoryVertical categories={categories} />}
    </>
  );
}
