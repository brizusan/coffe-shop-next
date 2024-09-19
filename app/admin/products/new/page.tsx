import { AddProductForm } from "@/components/admin/product/AddProductForm";
import { ProductForm } from "@/components/admin/product/ProductForm";
import { prisma } from "@/src/lib/prisma";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function CreateProductPage() {
  const categories = await getCategories() || [];

  return (
    <>
      <h1 className="subtitle my-8">Registrar Nuevo Producto</h1>

      <AddProductForm>
        <ProductForm categories={categories} />
      </AddProductForm>
    </>
  )
}
