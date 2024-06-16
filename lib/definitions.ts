import { ReactNode } from "react";

export interface Children {
  children: ReactNode;
}

type imageProps = { img_name: string; img_path: string };

export interface Items {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  img_info: imageProps[];
  model_url: string;
  tags: string[];
  upload_date: string;
  uploader: {
    id: string;
    name: string;
  };
}
