"use client";

import type { Items } from "@/lib/definitions";
import { useState } from "react";
import ItemImage from "./ItemImage";
import { createPortal } from "react-dom";
import { Close } from "@mui/icons-material/";

export default function ItemCard({
  name,
  price,
  img_info,
  model_url,
  uploader,
}: Items) {
  const [showModel, setShowModel] = useState(false);

  const handleShowModel = () => {
    setShowModel(true);
    document.body.classList.add("overflow-hidden");
  };

  const handleHideModel = () => {
    setShowModel(false);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div className="flex bg-slate-50 rounded drop-shadow-xl overflow-hidden">
      <ItemImage img_info={img_info} />
      <div className="flex flex-col justify-between basis-1/2 p-2.5">
        <div>
          <div className="text-center pb-3 lg:text-lg">{name}</div>
          <div className="text-end">{price} 원</div>
        </div>
        <div>
          <div className="text-end text-sm pb-3">제작자. {uploader.name}</div>
          <div
            className="flex justify-center items-center w-full py-2 bg-indigo-500 rounded"
            onClick={handleShowModel}
          >
            3D 모델 보기
          </div>
        </div>
      </div>
      {showModel &&
        createPortal(
          <div
            id="three_d_model"
            className="fixed top-0 left-0 z-20 w-screen h-screen bg-black bg-opacity-75 flex items-center justify-center"
          >
            <iframe src={model_url} width="100%" height="100%"></iframe>
            <Close
              onClick={handleHideModel}
              className="absolute top-5 right-5 bg-gray-200 p-2 rounded"
              fontSize="large"
            />
          </div>,
          document.body
        )}
    </div>
  );
}

//   {
//     "id": "item1",
//     "name": "item1",
//     "description": "item1에 대한 설명입니다.",
//     "category": "cloth",
//     "price": 9517,
//     "image_url": "/items/category.png",
//     "model_url": "/model/category.png",
//     "tags": [
//       "cloth",
//       "item1"
//     ],
//     "upload_date": "2024-06-12",
//     "uploader": {
//       "id": "creater1",
//       "name": "creater1"
//     }
//   },
