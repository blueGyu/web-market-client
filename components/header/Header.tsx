"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import CategoryNav from "./category-nav/CategoryNav";

export default function Header() {
  const router = useRouter();

  const toMainPage = () => {
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center h-16">
      <div className="flex space-x-20">
        <div onClick={toMainPage}>WEB MARKET</div>
        <CategoryNav />
      </div>
      <div className="flex space-x-3">
        <ThemeSwitch />
      </div>
    </header>
  );
}
