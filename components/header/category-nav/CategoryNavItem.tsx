import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryItemProps {
  path: string;
  name: string;
  onClick: () => void;
}

export default function CategoryNavItem({
  path,
  name,
  onClick,
}: CategoryItemProps) {
  const pathname = usePathname().split("/")[1];

  const backgroundColor = () => {
    if (pathname === path) {
      return "bg-indigo-800";
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
}
