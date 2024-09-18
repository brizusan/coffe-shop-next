import { ActionsProduct } from "@/components/product/ActionsProduct";
import { ListProductPagination } from "@/components/product/ListProductPagination";
import { ListProductTable } from "@/components/product/ListProductTable";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function getTotalProducts() {
  return await prisma.product.count();
}

async function getProducts(pageSize: number, page: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: { category: true },
  });
  return products;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 12;
  //valida que pagina exista
  if (page < 1) redirect(`/admin/products`);

  const productsData = getProducts(pageSize, page);
  const totalProductsData = await getTotalProducts();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPage = Math.ceil(totalProducts / pageSize);
  const isEmtpy = products.length === 0;

  if (page > totalPage) {
    return redirect(`/admin/products`);
  }

  return (
    <>
      <h1 className="subtitle pt-8">Administrar Productos</h1>
      {!isEmtpy ? (
        <>
          <ActionsProduct />
          <ListProductTable products={products} />
          <ListProductPagination page={page} totalPage={totalPage} />
        </>
      ) : (
        <p className="text-center text-slate-800 text-2xl font-bold">
          No hay productos registrados
        </p>
      )}
    </>
  );
}
