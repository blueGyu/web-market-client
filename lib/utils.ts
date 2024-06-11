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
