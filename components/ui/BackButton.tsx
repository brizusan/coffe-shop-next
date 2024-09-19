"use client"
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter()
  return (
    <div className="flex justify-end my-6">
      <button
        onClick={() => router.back()}
        className="bg-amber-400 px-8 py-2 rounded shadow hover:bg-amber-500 font-semibold text-white"
      >
        Volver
      </button>
    </div>
  );
};
