import type { ChildrenNode } from "@/lib/definitions";
import { MouseEvent } from "react";

interface Icon extends ChildrenNode {
  onClick?: (event: MouseEvent) => void;
}

export default function Icon({ onClick, children }: Icon) {
  return (
    <div className="flex justify-center items-center w-6 h-6" onClick={onClick}>
      {children}
    </div>
  );
}
