import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CategoryGroup } from "@/lib/definitions";

interface CategoryItemProps extends CategoryGroup {
  onClick: () => void;
}

export default function CategoryNavItem({
  categories,
  onClick,
}: CategoryItemProps) {
  const pathname = usePathname().split("/")[1];

  return (
    <>
      {categories.map(({ name, path }) => {
        const backgroundColor = () => {
          if (pathname === path) {
            return "bg-category-selected";
          }

          return "";
        };
        return (
          <Link
            key={path}
            className={`block py-3 pl-3 hover:bg-indigo-600 ${backgroundColor()}`}
            href={`/${path}`}
            onClick={onClick}
          >
            {name}
          </Link>
        );
      })}
    </>
  );
}
