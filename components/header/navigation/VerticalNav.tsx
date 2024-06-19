"use client";

import { useState } from "react";
import type { NavigationItem } from "@/lib/definitions";
import NavItem from "@/components/header/navigation/NavItem";
import Icon from "@/components/common/Icon";
import { Close, Menu } from "@mui/icons-material";

interface VerticalNav {
  items: NavigationItem[];
}

export default function VerticalNav({ items }: VerticalNav) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(false);
  };

  return (
    <div className="block md:hidden">
      <Icon onClick={() => setIsClicked(true)}>
        <Menu />
      </Icon>
      {isClicked && (
        <div className="fixed bg-category-nav top-0 right-0 bottom-0 w-44 z-40">
          <div className="flex justify-end py-5 pr-2.5">
            <Icon onClick={() => setIsClicked(false)}>
              <Close />
            </Icon>
          </div>
          <nav>
            {items.map((item, key) => {
              return <NavItem key={key} {...item} onClick={handleClick} />;
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
