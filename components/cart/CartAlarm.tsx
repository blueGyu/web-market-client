"use client";

import useCart from "@/store/useCart";
import { observer } from "mobx-react-lite";

const CartAlarm = observer(() => {
  const alarm = useCart.alarm;
  return (
    <>
      {alarm && (
        <div className="absolute top-0 right-0 bg-red-600 rounded-full w-2 h-2" />
      )}
    </>
  );
});

export default CartAlarm;
