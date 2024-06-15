"use client";

import type { Items } from "@/lib/definitions";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { ImageNotSupported, Circle } from "@mui/icons-material";
import { Mouse } from "@mui/icons-material";

export default function ItemImage({ img_info }: Pick<Items, "img_info">) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageCarousel = useCallback(
    (event: WheelEvent) => {
      if (isHovered) {
        event.preventDefault();
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
    // },
    [isHovered, img_info.length]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleImageCarousel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleImageCarousel);
    };
  }, [handleImageCarousel]);

  return (
    <div
      className="relative flex justify-center overflow-hidden basis-1/2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (
        <div className="absolute top-1 flex items-center z-10 space-x-1">
          <Mouse sx={{ fontSize: 10 }} />
          <p className="text-xs">마우스 스크롤하여 다른 이미지도 확인하세요.</p>
        </div>
      )}
      {img_info.map(({ img_name, img_path }, index) => {
        return (
          currentImageIndex === index &&
          (img_path === "" ? (
            <div>
              <ImageNotSupported />
            </div>
          ) : (
            <div key={index} className="relative">
              <Image
                width={0}
                height={0}
                src={img_path}
                alt={`${img_name} image`}
                sizes="100vh"
                style={{
                  width: "auto",
                  height: "auto",
                  objectFit: "cover",
                }}
                priority
              />
            </div>
          ))
        );
      })}
      <div className="absolute bottom-1 flex space-x-1">
        {img_info.map((_, index) => {
          const fill = currentImageIndex === index ? "white" : "";
          return <Circle key={index} sx={{ fontSize: 10, fill }} />;
        })}
      </div>
    </div>
  );
}
