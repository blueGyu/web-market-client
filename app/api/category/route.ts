import type { Item, NavigationItem } from "@/lib/definitions";

export async function GET() {
  try {
    const response = await fetch(`http://localhost:3000/json/category.json`);

    if (!response.ok) {
      return Response.json(
        { message: "Error fetchItems: Failed to fetch data" },
        { status: 500 }
      );
    }

    const data: NavigationItem[] = await response.json();

    // 데이터를 DB에서 가져오기 될 경우 추가 코드 작성하기

    return Response.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error", data: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { category, id } = await request.json();

    if (!category) {
      return Response.json(
        { message: "Error fetchItems: No category" },
        { status: 500 }
      );
    }

    const api_url = "http://localhost:3000";
    if (!api_url) {
      return Response.json(
        { message: "Error fetchItems: NEXT_PUBLIC_URL is not defined" },
        { status: 500 }
      );
    }

    const response = await fetch(`${api_url}/json/items.json`);
    if (!response.ok) {
      return Response.json(
        { message: "Error fetchItems: Failed to fetch data" },
        { status: 500 }
      );
    }

    const data: Item[] = await response.json();

    const checkImage = data.map((eachData: Item) => {
      if (eachData.img_info.length < 1) {
        return {
          ...eachData,
          img_info: [{ img_name: "No image", img_path: "icon" }],
        };
      } else {
        return eachData;
      }
    });

    // 추후 db 쿼리로 해결될 부분
    let returnData = [];
    if (category === "all") {
      returnData = checkImage;
    } else {
      returnData = checkImage.filter(
        (data: Item) => data.category === category
      );

      if (id) {
        returnData = returnData.filter((data: Item) => data.id === id);
      }
    }

    return Response.json(
      { message: "Success", data: returnData },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Error", data: error }, { status: 500 });
  }
}
