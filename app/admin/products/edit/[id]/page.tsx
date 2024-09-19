import { EditProductForm } from "@/components/admin/product/EditProductForm";
import { ProductForm } from "@/components/admin/product/ProductForm";
import { BackButton } from "@/components/ui/BackButton";
import { prisma } from "@/src/lib/prisma";

async function getCategories() {
  return await prisma.category.findMany();
}

async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(+params.id);
  const categories = await getCategories();

  const isEmpty = product === null;
  return (
    <>
      <h1 className="subtitle mt-8">Editar Informacion de Producto</h1>
      <p className="font-semibold text-slate-400 text-center">
        Actualizar informacion del registro{" "}
      </p>
      {isEmpty ? (
        <p className="text-xl mt-6 text-center font-semibold text-slate-600 mb-4">
          No hay resultados con este registro
        </p>
      ) : (
        <>
          <BackButton />
          <EditProductForm>
            <ProductForm categories={categories} product={product} />
            <input type="hidden" id="id" value={product?.id} name="id" />
          </EditProductForm>
        </>
      )}
    </>
  );
}
