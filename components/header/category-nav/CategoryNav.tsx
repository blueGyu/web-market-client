"use client";

import { useState, useEffect } from "react";
import { useHandleOpened } from "@/lib/utils";
import CategoryNavItem from "./CategoryNavItem";

interface CategoryProps {
  path: string;
  name: string;
  image_url: string;
}

export default function CategoryNav() {
  const { isOpened, handleOpened } = useHandleOpened(false, "category_wrap");
  const [category, setCategory] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );

      if (response.ok) {
        const categoryLists = await response.json();
        setCategory(categoryLists.data);
      } else {
        console.error("Error: 'fetchCategory' has error");
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="relative">
      <div onClick={() => handleOpened(!isOpened)}>Category</div>
      {isOpened && (
        <div
          id="category_wrap"
          className="absolute bg-indigo-400 w-40 rounded overflow-hidden"
        >
          {category.map(({ name, path }) => {
            return (
              <CategoryNavItem
                key={path}
                name={name}
                path={path}
                onClick={() => handleOpened(false)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
