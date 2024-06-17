import type { ChildrenNode } from "@/lib/definitions";
import { MouseEvent } from "react";

interface ViewerButtonProps extends ChildrenNode {
  size: string;
  backgroundColor: string;
  textColor: string;
  onClick?: (event: MouseEvent) => void;
}

export default function Button({
  size,
  backgroundColor,
  textColor,
  onClick,
  children,
}: ViewerButtonProps) {
  return (
    <div
      className={`flex justify-center items-center rounded ${size} ${backgroundColor} ${textColor}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
