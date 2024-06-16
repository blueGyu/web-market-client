interface CategoryProps {
  type: "horizontal" | "vertical";
}

export default function Category({ type }: CategoryProps) {
  return (
    <div>
      {type === "horizontal" && <div>horizontal</div>}
      {type === "vertical" && <div>vertical</div>}
    </div>
  );
}
