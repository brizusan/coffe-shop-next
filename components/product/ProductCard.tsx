import { Product } from "@prisma/client";
import {formatPrice} from "@/src/utils"
import Image from "next/image";
import { AddProduct } from "./AddProduct";

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({product} : ProductCardProps) => {
  return (
    <div className="border bg-white rounded-sm h-full">

      <Image 
        width={450}
        height={550}
        src={`/products/${product.image}.jpg`}
        alt={`Imagen de producto ${product.name}`}
      />

      <div className="p-4">
        <h3 className="text-2xl lg:text-4xl font-bold text-slate-600">{product.name}</h3>
        <p className="mt-5 font-bold text-amber-400 text-3xl">{formatPrice(product.price)}</p>
        <AddProduct 
          product={product}/>
      </div>
    </div>
  );
};
