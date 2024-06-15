import fs from "fs";
import path from "path";

interface CategoryProps {
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

export async function GET() {
  try {
    const returnArray: CategoryProps[] = [];

    for (let i = 1; i <= 50; i++) {
      const categoryArray = ["workspace", "cloth"];
      const randomIndex = Math.floor(Math.random() * categoryArray.length);
      const category = categoryArray[randomIndex];
      const name = `item${i}`;
      const price = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

      returnArray.push({
        id: `item${i}`,
        name: `item${i}`,
        description: `item${i}에 대한 설명입니다.`,
        category,
        price,
        image_url: `/items/${category}.png`,
        model_url: `/model/${category}.png`,
        tags: [category, name],
        upload_date: "2024-06-12",
        uploader: {
          id: `creater${i}`,
          name: `creater${i}`,
        },
      });
    }

    const filePath = path.join(process.cwd(), "/public/json/dummy_items.json");

    const jsonString = JSON.stringify(returnArray, null, 2);

    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        console.error("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error", data: error }, { status: 500 });
  }
}
