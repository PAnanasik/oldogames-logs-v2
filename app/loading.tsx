import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        width={120}
        height={120}
        src="/logo.png"
        alt="Logo"
        className="animate-pulse duration-700"
      />
    </div>
  );
}
