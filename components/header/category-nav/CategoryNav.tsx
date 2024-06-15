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
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        { method: "GET" }
      );

      if (response.ok) {
        const categoryLists = await response.json();
        setCategory(categoryLists.data);
      } else {
        console.error("Error: 'fetchCategory' GET has error");
      }
    };

    fetchCategory();
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>Category</div>
      {isHovered && (
        <div
          id="category_wrap"
          className="absolute bg-indigo-400 w-40 rounded overflow-hidden z-30"
        >
          {category.map(({ name, path }) => {
            return (
              <CategoryNavItem
                key={path}
                name={name}
                path={path}
                onClick={() => setIsHovered(false)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
