"use client";

import { useState } from "react";
import NavItem from "@/components/header/navigation/NavItem";
import type { NavigationItem } from "@/lib/definitions";

interface HorizontalNav {
  items: NavigationItem[];
}

export default function HorizontalNav({ items }: HorizontalNav) {
  const [isHovered, setIsHovered] = useState(false);
  const handleHover = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>Category</div>
      {isHovered && (
        <div className="absolute bg-category-nav w-40 rounded overflow-hidden z-30">
          {items.map((item, key) => {
            return <NavItem key={key} {...item} onClick={handleHover} />;
          })}
        </div>
      )}
    </div>
  );
}
