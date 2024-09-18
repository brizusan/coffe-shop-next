import { ListProductTable } from "@/components/product/ListProductTable";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function getProductsBySearch(search: string) {
  const filterProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return filterProducts;
}

export default async function SearchProductPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const filterProducts = await getProductsBySearch(searchParams.search);

  const isEmpty = filterProducts.length === 0;
  
  return (
    <>
      <h1 className="subtitle pt-8">Busqueda de los Productos</h1>
      <p className="text-center text-sm text-slate-700 font-bold">
        resultados de la busqueda :{" "}
        <span className="text-lg uppercase">{searchParams.search}</span>
      </p>
      <div className="flex justify-end my-6">
        <Link
          href="/admin/products"
          className="bg-amber-400 px-8 py-2 rounded shadow hover:bg-amber-500 font-semibold text-white"
        >
          Volver
        </Link>
      </div>
      {isEmpty ? (
        <p className="text-xl mt-6 text-center font-semibold text-slate-600 mb-4">
          No hay resultados para la busqueda
        </p>
      ) : (
        <ListProductTable products={filterProducts} />
      )}
    </>
  );
}
