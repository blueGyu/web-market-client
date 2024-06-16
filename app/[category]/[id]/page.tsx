interface itemPageProps {
  id: string;
  categroy: string;
}

interface testProps {
  params: itemPageProps;
}

export default function ItemPage({ params }: testProps) {
  const { categroy, id } = params;
  return <div></div>;
}
