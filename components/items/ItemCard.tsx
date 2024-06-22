"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import type { Item } from "@/lib/definitions";
import ItemImage from "./ItemImage";
import { Close, AddShoppingCart } from "@mui/icons-material/";
import useCart from "@/store/useCart";
import Button from "@/components/common/Button";

export default function ItemCard({ item }: { item: Item }) {
  const { category, name, price, description, img_info, model_url, uploader } =
    item;
  const [show3D, setShow3D] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleShow3D = () => {
    setShow3D(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHide3D = () => {
    setShow3D(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleShowCart = () => {
    useCart.addCart(item);
    setShowCart(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideCart = () => {
    setShowCart(false);
    setShow3D(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div className="flex flex-col bg-item-card rounded overflow-hidden max-w-[480px] hover:scale-[1.02]">
      <ItemImage img_info={img_info} />
      <div className="flex flex-col items-center p-2.5 space-y-2.5">
        <div className="w-full h-full space-y-1">
          <p className="text-ellipsis text-center">{name}</p>
          <p className="text-end text-xs">made by. {uploader.name}</p>
          <p className="text-center">{price} 원</p>
        </div>
        <div className="flex items-center w-full">
          <div className="hidden md:block w-full mr-2.5">
            <Button onClick={handleShow3D}>3D 모델보기</Button>
          </div>
          <div className="w-full md:max-w-11 h-11" onClick={handleShowCart}>
            <Button onClick={handleShowCart}>
              <AddShoppingCart className="hidden md:block" />
              <p className="block md:hidden">장바구니 담기</p>
            </Button>
          </div>
        </div>
      </div>
      {show3D &&
        createPortal(
          <div className="fixed top-0 left-0 z-20 w-screen h-screen flex items-center justify-center">
            <button onClick={handleHide3D}>
              <Close
                className="absolute top-5 right-5 bg-gray-200 p-2 rounded"
                fontSize="large"
                sx={{ fill: "black" }}
              />
            </button>
            <div className="flex flex-col w-full h-full">
              <iframe src={model_url} width="100%" height="100%" />
              <div
                className="flex flex-col justify-between bg-item-card w-full min-h-1/3 p-2.5
            md:absolute md:bottom-5 md:right-5 md:rounded md:w-1/4 md:min-h-1/3"
              >
                <div className="flex flex-col space-y-1 mb-2.5">
                  <div className="text-end text-sm">{category}</div>
                  <div className="text-center">{name}</div>
                  <div className="text-end text-sm">
                    made by. {uploader.name}
                  </div>
                  <div className="text-end">{price} 원</div>
                  <div>{description}</div>
                </div>
                <Button onClick={handleShowCart}>장바구니 담기</Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      {showCart &&
        createPortal(
          <div className="fixed top-0 left-0 z-30 w-screen h-screen flex items-center justify-center bg-slate-400/60">
            <div className="flex flex-col justify-between w-[300px] h-[200px] p-2.5 rounded bg-item-card">
              <button
                className="flex justify-end cursor-pointer"
                onClick={handleHideCart}
              >
                <Close />
              </button>
              <div className="text-center">장바구니에 상품이 담겼습니다.</div>
              <Button onClick={handleHideCart}>확인</Button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
