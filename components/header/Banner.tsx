"use client";

import { useState } from "react";
import Icon from "../common/Icon";
import { Close } from "@mui/icons-material";

export default function Banner() {
  const [banner, setBanner] = useState(true);

  const handleBannder = () => {
    setBanner(false);
  };

  return (
    <>
      {banner && (
        <div className="flex justify-end items-center h-10 px-3 bg-banner text-white text-sm md:text-base">
          <p className="mx-auto">
            포트폴리오 목적으로 만들어진 웹사이트 입니다.
          </p>
          <Icon onClick={handleBannder}>
            <Close />
          </Icon>
        </div>
      )}
    </>
  );
}
