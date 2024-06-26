import Link from "next/link";
import ThemeSwitch from "@/components/header/theme/ThemeSwitch";
import Banner from "@/components/header/Banner";
import type { NavigationItem } from "@/lib/definitions";
import HorizontalNav from "@/components/header/navigation/HorizontalNav";
import VerticalNav from "@/components/header/navigation/VerticalNav";
import { ShoppingCart } from "@mui/icons-material";
import CartAlarm from "@/components/cart/CartAlarm";

export default async function Header() {
  const navigationItem: NavigationItem[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category`,
    {
      method: "GET",
    }
  )
    .then((data) => data.json())
    .then((data) => data.data)
    .catch((error) =>
      console.error(
        "Error: Header has an error while fetching navigation items."
      )
    );

  return (
    <>
      <Banner />
      <header className="flex justify-between h-header px-2.5 md:px-5">
        <div className="flex items-center h-full space-x-20">
          <Link href="/">WEB MARKET</Link>
          <HorizontalNav items={navigationItem} />
        </div>
        <div className="flex items-center h-full space-x-3">
          <div className="relative">
            <Link
              className="flex justify-center items-center size-6"
              href="/cart"
            >
              <ShoppingCart />
              <CartAlarm />
            </Link>
          </div>
          <ThemeSwitch />
          <VerticalNav items={navigationItem} />
        </div>
      </header>
    </>
  );
}
