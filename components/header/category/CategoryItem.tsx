import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryItemProps {
  path: string;
  name: string;
  onClick: () => void;
}

export default function CategoryItem({
  path,
  name,
  onClick,
}: CategoryItemProps) {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/");
  const targetIndex = pathnameArray.indexOf("category") + 1;

  const backgroundColor = () => {
    if (pathnameArray.includes("category")) {
      if (!pathnameArray[targetIndex] && path === "") {
        return "bg-indigo-800";
      }

      if (pathnameArray[targetIndex] === path) {
        return "bg-indigo-800";
      }
    }
    return "";
  };

  return (
    <Link
      key={path}
      className={`block py-3 pl-3 hover:bg-indigo-600 ${backgroundColor()}`}
      href={`/category/${path}`}
      onClick={onClick}
    >
      {name}
    </Link>
  );
}
