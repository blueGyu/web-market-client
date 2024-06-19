import type { ChildrenNode } from "@/lib/definitions";
import { MouseEvent } from "react";

interface ViewerButtonProps extends ChildrenNode {
  onClick?: (event: MouseEvent) => void;
}

export default function Button({ onClick, children }: ViewerButtonProps) {
  return (
    <div
      className="flex justify-center items-center w-full h-11 bg-viewer-button text-white rounded"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
