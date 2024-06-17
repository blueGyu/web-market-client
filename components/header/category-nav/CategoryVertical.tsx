"use client";

import { useState } from "react";
import CategoryNavItem from "./CategoryNavItem";
import { Close, Menu } from "@mui/icons-material";
import type { CategoryGroup } from "@/lib/definitions";

export default function CategoryVertical({ categories }: CategoryGroup) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="relative block md:hidden">
      <Menu onClick={() => setIsClicked(true)} />
      {isClicked && (
        <div
          className={`fixed bg-category-nav top-0 right-0 bottom-0 w-44 overflow-hidden`}
        >
          <div className="flex justify-end py-5 pr-2.5">
            <Close onClick={() => setIsClicked(false)} />
          </div>
          <CategoryNavItem
            categories={categories}
            onClick={() => setIsClicked(false)}
          />
        </div>
      )}
    </div>
  );
}
