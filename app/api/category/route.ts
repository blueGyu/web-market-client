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
