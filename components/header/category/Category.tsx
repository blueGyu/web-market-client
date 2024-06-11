"use client";

import { useState, useEffect } from "react";
import { useHandleOpened } from "@/lib/utils";
import CategoryItem from "./CategoryItem";

interface CategoryProps {
  path: string;
  name: string;
}

export default function Category() {
  const { isOpened, handleOpened } = useHandleOpened(false, "category_wrap");
  const [categoryLists, setCategoryLists] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`
      );

      if (response.ok) {
        const categoryLists = await response.json();
        setCategoryLists(categoryLists.data);
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
          {categoryLists.map(({ name, path }) => {
            return (
              <CategoryItem
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
