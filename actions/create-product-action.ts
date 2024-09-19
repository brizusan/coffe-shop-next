"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function createProductAction(data: unknown) {
  console.log(data);
  const result = ProductSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  // crear el producto

  await prisma.product.create({
    data: {
      name: result.data.name,
      price: result.data.price,
      image: result.data.image,
      categoryId: result.data.categoryId,
    },
  });
}
