import { Spinner } from "@heroui/react";

function Loading() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
      <Spinner size="lg" />
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
