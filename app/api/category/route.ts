export async function GET() {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/json/category.json`
    ).then((data) => data.json());

    // 데이터를 DB에서 가져오기 될 경우 추가 코드 작성하기

    return Response.json({ message: "Success", data }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error", data: error }, { status: 500 });
  }
}

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

export async function POST(request: Request) {
  try {
    const { category } = await request.json();

    const data: CategoryProps[] = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/json/dummy_items.json`
    ).then((data) => data.json());

    let returnData = [];
    if (category === "all") {
      returnData = data;
    } else {
      returnData = data.filter((data) => data.category === category);
    }

    return Response.json(
      { message: "Success", data: returnData },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Error", data: error }, { status: 500 });
  }
}
