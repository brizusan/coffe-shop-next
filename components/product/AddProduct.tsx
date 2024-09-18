"use client";
import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductProps = {
  product: Product;
}


export const AddProduct = ({product} : AddProductProps) => {

  const addProduct = useStore((state) => state.addProduct);

  return (
    <button
      onClick={() => addProduct(product)}
      type="button"
      className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-semibold w-full mt-4 py-2 rounded "
    >
      Agregar
    </button>
  );
};
