"use client";

import Image from "next/image";
import { useState } from "react";

interface itemProps {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  model_url: string;
  tags: string[];
  upload_date: string;
  uploader: {
    id: string;
    name: string;
  };
}

export default function ItemCard({
  name,
  description,
  price,
  image_url,
  tags,
  uploader,
}: itemProps) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <div
      className="relative h-24"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <div>
        <div className="relative">
          이미지
          <Image src={image_url} alt={name} fill />
        </div>
        <div>
          <div>{name}</div>
          <div>{price}</div>
        </div>
      </div>
      {tooltip && (
        <div className="absolute top-0 left-0 bg-slate-500">
          <div>{name}</div>
          <div>{price}</div>
          <div>{description}</div>
          <div>{uploader.name}</div>
        </div>
      )}
    </div>
  );
}
