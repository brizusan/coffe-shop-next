import { ProductWithCategory } from "@/src/types";
import { formatPrice } from "@/src/utils";
import Link from "next/link";
import React from "react";

export const ItemProductTable = ({ product }: { product: ProductWithCategory }) => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 capitalize">{product.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatPrice(product.price)}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category?.name}</td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <Link 
          className="text-indigo-500 hover:text-indigo-700"
        href={`/admin/products/edit/${product.id}`}>Editar
        <span className="sr-only">{product.name}</span>
        </Link>
      </td>
    </tr>
  );
};
