import type { Children } from "@/lib/definitions";
import { createPortal } from "react-dom";

interface ScreenModalProps extends Children {
  id: string;
  target: Element;
}

export default function ScreenModal({
  id,
  target,
  children,
}: ScreenModalProps) {
  return createPortal(
    <div
      id={id}
      className="fixed top-0 left-0 z-20 w-screen h-screen flex items-center justify-center"
    >
      {children}
    </div>,
    target
  );
}
