"use client";

import { observer } from "mobx-react-lite";
import useCart from "@/store/useCart";
import useBuyItem from "@/store/useBuyItem";
import { ChangeEvent, useEffect, useState } from "react";
import { Item } from "@/lib/definitions";
import Image from "next/image";
import { Delete } from "@mui/icons-material";
import { createPortal } from "react-dom";
import { Close } from "@mui/icons-material";

const CartList = observer(() => {
  const { buyItems, price, discount } = useBuyItem;
  const [isPayed, setIsPayed] = useState(false);
  useEffect(() => {
    useCart.offAlarm();
  });

  const handleShowPay = () => {
    setIsPayed(true);
  };

  const handleHidePay = () => {
    const itemsId: string[] = buyItems.map((item) => item.id);
    useCart.removeBuyItemInCart(itemsId);
    useBuyItem.resetBuyItem();
    setIsPayed(false);
  };

  return (
    <>
      <main className="flex flex-col justify-between min-h-page px-2.5 md:flex-row md:px-20">
        <div className="basis-2/3 pb-2.5 md:py-2.5 md:mr-2.5 space-y-2.5">
          {useCart.cartItems.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </div>
        <div className="sticky bottom-0 md:top-0 flex flex-col justify-between basis-1/3 min-w-[300px] max-h-page py-2.5 bg-white">
          <div className="flex flex-col justify-between w-full border rounded p-2.5 h-[150px]">
            <div>예상 구매 가격</div>
            <div className="flex justify-between items-center">
              <p>총 상품 가격</p>
              <p>{price} 원</p>
            </div>
            <div className="flex justify-between items-center">
              <p>총 할인 가격</p>
              <p className="w-[100px] text-end before:content-['-'] text-red-600">
                {discount} 원
              </p>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <p>총 결제 가격</p>
              <p>{price - discount} 원</p>
            </div>
          </div>
          <button
            className="flex justify-center items-center w-full h-11 bg-indigo-400 rounded text-white mt-2.5"
            onClick={handleShowPay}
          >
            상품 결제하기
          </button>
        </div>
      </main>
      {isPayed &&
        createPortal(
          <div className="fixed top-0 left-0 z-30 w-screen h-screen flex items-center justify-center bg-slate-400/60">
            <div className="flex flex-col justify-between w-[300px] h-[200px] bg-white p-2.5 rounded">
              <button
                className="flex justify-end cursor-pointer"
                onClick={handleHidePay}
              >
                <Close />
              </button>
              <div className="text-center">
                {buyItems.length > 0
                  ? "상품 결제가 완료되었습니다."
                  : "결제할 상품이 없습니다."}
              </div>
              <button
                className="flex justify-center items-center w-full h-11 bg-indigo-400 rounded"
                onClick={handleHidePay}
              >
                확인
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
});

export default CartList;

function CartItem({ item }: { item: Item }) {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    useBuyItem.addBuyItem(item);
  }, [item]);

  const handleBuyItem = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      useBuyItem.addBuyItem(item);
      setIsChecked(true);
    } else {
      useBuyItem.removeBuyItem(item);
      setIsChecked(false);
    }
  };

  const handleDelete = () => {
    useCart.removeCart(item.id);
    useBuyItem.removeBuyItem(item);
  };

  return (
    <div className="flex items-center h-[150px] border rounded">
      <div className="flex justify-center items-center min-w-10 bg-gray-400 h-full">
        <input type="checkbox" onChange={handleBuyItem} checked={isChecked} />
      </div>
      <div className="w-[150px] h-full">
        <Image
          className="min-w-[150px] h-full object-cover"
          src={item.img_info[0].img_path}
          alt={item.img_info[0].img_name}
          width={0}
          height={0}
          sizes="100vh"
          priority
        />
      </div>
      <div className="flex flex-col justify-between w-full h-full p-3">
        <div className="flex justify-between items-center">
          <div>{item.name}</div>
          <Delete onClick={handleDelete} />
        </div>
        <div className="text-end">{item.price} 원</div>
      </div>
    </div>
  );
}
