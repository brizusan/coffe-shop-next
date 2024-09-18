import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex justify-center my-4">
      <div className="w-36 h-36 relative">
        <Image src="/logo.svg" alt="logo" fill className="object-contain" />
      </div>
    </div>
  );
};
