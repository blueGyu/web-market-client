import Spline from "@splinetool/react-spline";

interface itemPageProps {
  id: string;
  categroy: string;
}

interface testProps {
  params: itemPageProps;
}

export default function ItemPage({ params }: testProps) {
  const { id } = params;
  return <div>page</div>;
}
