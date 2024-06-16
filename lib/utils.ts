import { useState, useEffect } from "react";

export function useHandleOpened(initialState: boolean, id: string) {
  const [isOpened, setIsOpened] = useState(initialState);

  const handleOpened = (state: boolean) => {
    setIsOpened(state);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const targetWrap = document.getElementById(id);
    if (targetWrap && !targetWrap.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return { isOpened, handleOpened };
}

export function checkIsMobile() {
  const userAgent = window.navigator.userAgent;

  // 모바일 장치의 일반적인 사용자 에이전트를 확인합니다.
  if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
    return true;
  }
  if (/Mobi/i.test(userAgent)) {
    return true;
  }

  return false;
}
