import type { Children } from "@/lib/definitions";

interface CaptionProps extends Children {
  type: "web" | "app";
}

export default function Caption({ children }: Children) {
  return (
    <div className="text-xs">
      <div className="flex items-center space-x-1 text-white">{children}</div>
    </div>
  );
}
