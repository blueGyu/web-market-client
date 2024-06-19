"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/lib/definitions";
import { useEffect, useState } from "react";

interface NavItem extends NavigationItem {
  onClick: () => void;
}

export default function NavItem({ name, path, onClick }: NavItem) {
  const pathname = usePathname().split("/")[1];
  const [isHovered, setIsHovered] = useState(false);
  const selectedPath = pathname === path ? "bg-category-selected" : "";

  return (
    <Link
      className={`block py-3 pl-3 hover:bg-indigo-600 ${selectedPath}
      ${isHovered ? "--category-nav-hovered" : ""}`}
      href={`/${path}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {name}
    </Link>
  );
}
