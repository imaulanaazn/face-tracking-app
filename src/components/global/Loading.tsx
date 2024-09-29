import LoadingAnimation from "./LoadingAnimation";

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-40">
        <LoadingAnimation />
      </div>
    </div>
  );
}
