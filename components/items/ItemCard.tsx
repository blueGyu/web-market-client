"use client";

import type { Item } from "@/lib/definitions";
import { MouseEvent, useEffect, useState } from "react";
import ItemImage from "./ItemImage";
import { Close, AddShoppingCart } from "@mui/icons-material/";
import Button from "../common/Button";
import ScreenModal from "../common/modal/ScreenModal";
import { checkIsMobile } from "@/lib/utils";

interface ItemCard extends Item {
  onClick: () => void;
}

export default function Item({
  id,
  category,
  name,
  price,
  description,
  img_info,
  model_url,
  uploader,
}: Item) {
  const [showModel, setShowModel] = useState(false);
  const isMobile = checkIsMobile();

  const handleShowModel = () => {
    setShowModel(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideModel = () => {
    setShowModel(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div
      className="flex flex-col bg-item-card rounded shadow-md shadow-item-card-shadow overflow-hidden
    md:hover:scale-[1.02] min-h-48"
    >
      <ItemImage img_info={img_info} id={id} />
      <div className="flex justify-between p-2.5 space-x-3 md:flex-col md:space-x-0 md:space-y-3">
        <div className="w-full">
          <div className="text-center text-sm md:text-base">{name}</div>
          <div className="text-end text-sm md:text-base">{price} 원</div>
        </div>
        <div className="flex space-x-2">
          {!isMobile && (
            <Button
              size="w-full min-h-11"
              backgroundColor="bg-viewer-button"
              textColor="text-white"
              onClick={handleShowModel}
            >
              <div className="text-sm md:text-base">3D 모델 보기</div>
            </Button>
          )}
          <Button
            size="min-w-11 min-h-11"
            textColor="text-white"
            backgroundColor="bg-viewer-button"
          >
            <AddShoppingCart />
          </Button>
        </div>
      </div>
      {showModel && (
        <ScreenModal id="three_d_modal" target={document.body}>
          <div onClick={handleHideModel}>
            <Close
              className="absolute top-5 right-5 bg-gray-200 p-2 rounded"
              fontSize="large"
              sx={{ fill: "black" }}
            />
          </div>
          <div className="flex flex-col w-full h-full">
            <iframe src={model_url} width="100%" height="100%" />
            <div
              className="flex flex-col justify-between bg-item-card w-full min-h-1/3 p-2.5
            md:absolute md:bottom-5 md:right-5 md:rounded md:w-1/4 md:min-h-1/3"
            >
              <div className="flex flex-col space-y-1 mb-2.5">
                <div className="text-end text-sm">{category}</div>
                <div className="text-center">{name}</div>
                <div className="text-end text-sm">제작자: {uploader.name}</div>
                <div className="text-end">{price} 원</div>
                <div>{description}</div>
              </div>
              <Button
                size="w-full min-h-11"
                textColor="text-white"
                backgroundColor="bg-viewer-button"
              >
                <AddShoppingCart className="mr-3" />
                장바구니 담기
              </Button>
            </div>
          </div>
        </ScreenModal>
      )}
    </div>
  );
}
