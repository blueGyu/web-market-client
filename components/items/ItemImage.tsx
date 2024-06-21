"use client";

import type { Item } from "@/lib/definitions";
import Image from "next/image";
import { useState } from "react";
import { Mouse, Circle } from "@mui/icons-material";

export default function ItemImage({ img_info }: Pick<Item, "img_info">) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    if (isHovered) {
      const newIndex = currentImageIndex + 1;
      if (newIndex >= img_info.length) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(newIndex);
      }
    }
  };

  return (
    <div
      className="relative flex justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-2.5 z-10 flex justify-center items-center space-x-1.5 text-white">
        <Mouse sx={{ fontSize: 14 }} />
        <p className="text-sm">클릭하여 다른 이미지를 확인하세요.</p>
      </div>
      <div onClick={handleImageClick}>
        <Image
          className="w-full h-full object-cover"
          src={img_info[currentImageIndex].img_path}
          alt={img_info[currentImageIndex].img_name}
          width={0}
          height={0}
          sizes="100vh"
          priority
        />
      </div>
      <div className="absolute bottom-2.5 z-10 flex justify-center items-center space-x-2">
        {img_info.map((_, index) => {
          return (
            <Circle
              key={index}
              className={`${
                index === currentImageIndex ? "fill-circle" : "fill-circle-none"
              } text-sm`}
            />
          );
        })}
      </div>
    </div>
  );
}
