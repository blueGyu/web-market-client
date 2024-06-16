import ItemList from "@/components/items/ItemList";

interface CategoryProps {
  category: string;
}

interface ParamProps {
  params: CategoryProps;
}

export default function CategoryPage({ params }: ParamProps) {
  const { category } = params;
  return <ItemList category={category} />;
}
