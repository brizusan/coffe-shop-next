"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function updateProductAction(id:number , data: unknown) {
  const result = ProductSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }


  await prisma.product.update({
    where: {
      id: id
    },
    data: {
      name: result.data.name,
      price: result.data.price,
      image: result.data.image,
      categoryId: result.data.categoryId
    }
  })

  revalidatePath("/admin/products")
}