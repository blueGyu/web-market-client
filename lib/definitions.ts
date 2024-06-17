import { ReactNode } from "react";

export interface ChildrenNode {
  children: ReactNode;
}

type imageProps = { img_name: string; img_path: string };

export interface Item {
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

export interface Category {
  path: string;
  name: string;
  image_url: string;
}

export interface CategoryGroup {
  categories: Category[];
}

export interface Params {
  params: {
    category: string;
    id: string;
  };
}
