import type { ChildrenNode } from "@/lib/definitions";

export default function Caption({ children }: ChildrenNode) {
  return (
    <div className="text-xs">
      <div className="flex items-center space-x-1 text-white">{children}</div>
    </div>
  );
}
