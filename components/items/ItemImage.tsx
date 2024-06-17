"use client";

import type { Item } from "@/lib/definitions";
import Image from "next/image";
import { useState, TouchEvent } from "react";
import { Mouse, Swipe, Circle } from "@mui/icons-material";
import Caption from "../common/Caption";
import { checkIsMobile } from "@/lib/utils";

export default function ItemImage({
  id,
  img_info,
}: Pick<Item, "id" | "img_info">) {
  const isMobile = checkIsMobile();
  const [isTouched, setIsTouched] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
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

  const handleImageSwipeStart = (event: TouchEvent) => {
    event.defaultPrevented;
    event.stopPropagation();
    setIsTouched(true);
    setStartX(event.touches[0].clientX);
  };

  const handleImageSwipeMove = (event: TouchEvent) => {
    event.defaultPrevented;
    event.stopPropagation();
    if (isTouched) {
      setCurrentX(event.touches[0].clientX);
    }
  };

  const handleImageSwipeEnd = (event: TouchEvent) => {
    event.defaultPrevented;
    event.stopPropagation();
    setIsTouched(false);
    const deltaX = startX - currentX;

    if (Math.abs(deltaX) > 50) {
      // 스와이프 감지 임계값
      if (deltaX > 0) {
        // 왼쪽으로 스와이프
        setCurrentImageIndex((prevIndex) =>
          prevIndex === img_info.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // 오른쪽으로 스와이프
        setCurrentImageIndex((prevIndex) =>
          prevIndex === 0 ? img_info.length - 1 : prevIndex - 1
        );
      }
    }
  };

  return (
    <div
      className="relative flex justify-center overflow-hidden w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={(event: TouchEvent) => handleImageSwipeStart(event)}
      onTouchMove={(event: TouchEvent) => handleImageSwipeMove(event)}
      onTouchEnd={(event: TouchEvent) => handleImageSwipeEnd(event)}
      onTouchCancel={(event: TouchEvent) => handleImageSwipeEnd(event)}
    >
      <div className="absolute top-1 z-10">
        {!isHovered && !isMobile && (
          <Caption>
            <Mouse sx={{ fontSize: 10 }} />
            <p>클릭하여 다른 이미지도 확인하세요.</p>
          </Caption>
        )}
        {!isTouched && isMobile && (
          <Caption>
            <Swipe sx={{ fontSize: 10 }} />
            <p>스와이프로 다른 이미지도 확인하세요.</p>
          </Caption>
        )}
      </div>
      <div data-target={id} onClick={handleImageClick}>
        {img_info.map(({ img_name, img_path }, index) => {
          const image = img_path === "" ? "" : img_path;
          return (
            currentImageIndex === index && (
              <Image
                key={img_name}
                width={0}
                height={0}
                src={image}
                alt={`${img_name} image`}
                sizes="100vh"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                priority
              />
            )
          );
        })}
      </div>
      <div className="absolute bottom-1 flex space-x-1">
        {img_info.map((_, index) => {
          const fill =
            currentImageIndex === index
              ? "var(--image-index-selected)"
              : "var(--image-index-none-seleted)";
          return (
            <Circle key={index} sx={{ fontSize: 10, fill, border: "white" }} />
          );
        })}
      </div>
    </div>
  );
}
