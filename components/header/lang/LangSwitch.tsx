"use client";

import { useState, useEffect } from "react";
import { Translate, Check } from "@mui/icons-material";
import { useHandleOpened } from "@/lib/utils";

export default function LangSwitch() {
  const { isOpened, handleOpened } = useHandleOpened(false, "lang_wrap");

  return (
    <div className="relative">
      <div className="flex space-x-3" onClick={() => handleOpened(!isOpened)}>
        <div className="flex justify-center items-center size-7">
          <Translate />
        </div>
      </div>
      {isOpened && (
        <div
          id="lang_wrap"
          className="absolute right-0 w-36 rounded overflow-hidden bg-indigo-400"
        >
          <div className="flex items-center py-3 pl-3 hover:bg-indigo-600">
            <div className="flex justify-center items-center size-7 mr-3">
              <Check />
            </div>
            한국어
          </div>
          <div className="flex items-center py-3 pl-3 hover:bg-indigo-600">
            <div className="flex justify-center items-center size-7 mr-3">
              <Check />
            </div>
            English
          </div>
        </div>
      )}
    </div>
  );
}
