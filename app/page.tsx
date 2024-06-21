import { Mouse } from "@mui/icons-material";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center w-screen h-page">
      <div className="absolute bottom-5 flex justify-center items-center">
        <Mouse sx={{ fontSize: 16, marginRight: 1 }} />
        클릭하여 애니메이션을 확인해보세요.
      </div>
      <iframe
        src="https://my.spline.design/untitled-253a40cc21402edf326830d87bb5a24b/"
        width="100%"
        height="100%"
      ></iframe>
    </main>
  );
}
