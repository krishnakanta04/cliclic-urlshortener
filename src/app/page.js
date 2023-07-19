import UrlShortener from "./components/UrlShortener";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-[1300px] px-[24px]">
        <h1 className=" text-6xl font-bold text-center my-[10px] ">cliclic</h1>
        <p className="text-2xl font-bold text-center">
          Simplify and Share Your URLs
        </p>
        <UrlShortener />
      </div>
    </div>
  );
}
