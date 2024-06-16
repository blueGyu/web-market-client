"use client";

import type { Items } from "@/lib/definitions";
import { MouseEvent, useEffect, useState } from "react";
import ItemImage from "./ItemImage";
import { Close } from "@mui/icons-material/";
import { useRouter } from "next/navigation";
import ViewerButton from "../common/ViewerButton";
import ScreenModal from "../common/modal/ScreenModal";
import { checkIsMobile } from "@/lib/utils";

export default function ItemCard({
  id,
  category,
  name,
  price,
  img_info,
  model_url,
  uploader,
}: Items) {
  const [showModel, setShowModel] = useState(false);
  const router = useRouter();
  const isMobile = checkIsMobile();

  const handleShowModel = (event: MouseEvent) => {
    event.stopPropagation();
    setShowModel(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideModel = (event: MouseEvent) => {
    event.stopPropagation();
    setShowModel(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleMovePage = (category: string, id: string) => {
    router.push(`/${category}/${id}`);
  };

  return (
    <div
      className="flex bg-item-card rounded shadow-md shadow-item-card-shadow overflow-hidden md:hover:scale-[1.02] min-h-48"
      onClick={() => handleMovePage(category, id)}
    >
      <div className="basis-1/2">
        <ItemImage img_info={img_info} />
      </div>
      <div className="flex flex-col justify-between basis-1/2 p-2.5">
        <div>
          <div className="text-center pb-3 md:text-lg">{name}</div>
          <div className="text-end">{price} 원</div>
        </div>
        <div>
          <div className="text-end text-sm">제작자. {uploader.name}</div>
          {!isMobile && (
            <ViewerButton type="web" onClick={handleShowModel}>
              3D 모델 보기
            </ViewerButton>
          )}
        </div>
      </div>
      {showModel && (
        <ScreenModal id="three_d_modal" target={document.body}>
          <iframe src={model_url} width="100%" height="100%"></iframe>
          <div onClick={handleHideModel}>
            <Close
              className="absolute top-5 right-5 bg-gray-200 p-2 rounded"
              fontSize="large"
            />
          </div>
        </ScreenModal>
      )}
    </div>
  );
}
