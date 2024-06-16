import type { Children } from "@/lib/definitions";
import { MouseEvent } from "react";

interface ViewerButtonProps extends Children {
  type: "web" | "app";
  onClick: (event: MouseEvent) => void;
}

export default function ViewerButton({
  type,
  onClick,
  children,
}: ViewerButtonProps) {
  return (
    <div
      className={`mt-3 text-center w-full py-2 rounded bg-viewer-button text-white ${
        type === "web" ? "hidden md:block" : "block md:hidden"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
