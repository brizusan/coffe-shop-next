import { ProductCard } from "@/components/product/ProductCard";
import { prisma } from "@/src/lib/prisma";
import { Category } from "@prisma/client";

async function getProducts(category: Category["slug"]) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

export default async function OrderPage({
  params,
}: {
  params: { category: Category["slug"] };
}) {
  const products = await getProducts(params.category);
  return (
    <>
      <section >
        <h2 className="text-center text-2xl mt-6 lg:text-3xl font-bold  text-amber-400">
          MI PEDIDO
        </h2>
        <p className="subtitle">Elige y personaliza tu pedido</p>
        <section className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 items-start lg:px-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    </>
  );
}
