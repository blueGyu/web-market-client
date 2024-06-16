"use client";

import type { Items } from "@/lib/definitions";
import Image from "next/image";
import {
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  TouchEvent,
} from "react";
import { Mouse, Swipe, Circle } from "@mui/icons-material";
import Caption from "../common/Caption";
import { checkIsMobile } from "@/lib/utils";

export default function ItemImage({ img_info }: Pick<Items, "img_info">) {
  const isMobile = checkIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageWheel = useCallback(
    (event: WheelEvent) => {
      if (isHovered) {
        event.preventDefault();
        event.stopPropagation();
        if (event.deltaY < 0) {
          // 스크롤 업
          setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? img_info.length - 1 : prevIndex - 1
          );
        } else {
          // 스크롤 다운
          setCurrentImageIndex((prevIndex) =>
            prevIndex === img_info.length - 1 ? 0 : prevIndex + 1
          );
        }
      }
    },
    [isHovered, img_info.length]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleImageWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleImageWheel);
    };
  }, [handleImageWheel]);

  const handleImageSwipeStart = (event: TouchEvent) => {
    event.stopPropagation();
    setIsTouched(true);
    setStartX(event.touches[0].clientX);
  };

  const handleImageSwipeMove = (event: TouchEvent) => {
    event.stopPropagation();
    if (isTouched) {
      setCurrentX(event.touches[0].clientX);
    }
  };

  const handleImageSwipeEnd = (event: TouchEvent) => {
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
      onClick={(event: MouseEvent) => event.stopPropagation()}
      // PC hover event
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // mobile touch event
      onTouchStart={(event: TouchEvent) => handleImageSwipeStart(event)}
      onTouchMove={(event: TouchEvent) => handleImageSwipeMove(event)}
      onTouchEnd={(event: TouchEvent) => handleImageSwipeEnd(event)}
      onTouchCancel={(event: TouchEvent) => handleImageSwipeEnd(event)}
    >
      <div className="absolute top-1 z-10">
        {!isHovered && !isMobile && (
          <Caption>
            <Mouse sx={{ fontSize: 10 }} />
            <p>스크롤하여 다른 이미지도 확인하세요.</p>
          </Caption>
        )}
        {!isTouched && isMobile && (
          <Caption>
            <Swipe sx={{ fontSize: 10 }} />
            <p>스와이프로 다른 이미지도 확인하세요.</p>
          </Caption>
        )}
      </div>
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
