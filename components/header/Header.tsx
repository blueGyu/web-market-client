"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ThemeSwitch from "./theme/ThemeSwitch";
import Category from "./category-nav/Category";
import { Close } from "@mui/icons-material";

export default function Header() {
  const router = useRouter();
  const [banner, setBanner] = useState(true);

  const toMainPage = () => {
    router.push("/");
  };

  return (
    <>
      {banner && (
        <div className="flex justify-center items-center bg-banner h-10 text-slate-50 text-sm md:text-base">
          포트폴리오 목적으로 만들어진 웹사이트 입니다.
          <Close
            className="absolute right-5"
            onClick={() => setBanner(false)}
          />
        </div>
      )}
      <header className="flex justify-between items-center h-header px-2.5 md:px-5">
        <div className="flex space-x-20">
          <div onClick={toMainPage}>WEB MARKET</div>
          <Category type="horizontal" />
        </div>
        <div className="flex space-x-3">
          <ThemeSwitch />
          <Category type="vertical" />
        </div>
      </header>
    </>
  );
}
