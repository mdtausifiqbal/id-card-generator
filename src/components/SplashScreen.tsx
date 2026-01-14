import { Spinner } from "@heroui/react";

function Loading() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <img
        src="/icon-192.png"
        width={100}
        height={100}
        alt="ID Card Generator Logo"
        loading="lazy"
      />
      <h1 className="font-bold text-2xl text-center mb-8">ID Card Generator</h1>
      <Spinner size="lg" />
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
