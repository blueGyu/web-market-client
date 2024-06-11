"use client";

import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import Category from "./category/Category";

export default function Header() {
  const router = useRouter();

  const toMainPage = () => {
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center h-16">
      <div className="flex space-x-20">
        <div onClick={toMainPage}>WEB MARKET</div>
        <Category />
      </div>
      <div className="flex space-x-3">
        <ThemeSwitch />
      </div>
    </header>
  );
}
