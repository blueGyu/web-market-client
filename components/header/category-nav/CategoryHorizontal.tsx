"use client";

import { useState } from "react";
import CategoryNavItem from "./CategoryNavItem";
import type { CategoryGroup } from "@/lib/definitions";

export default function CategoryHorizontal({ categories }: CategoryGroup) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>Category</div>
      {isHovered && (
        <div className="absolute bg-category-nav w-40 rounded overflow-hidden z-30">
          <CategoryNavItem
            categories={categories}
            onClick={() => setIsHovered(false)}
          />
        </div>
      )}
    </div>
  );
}
