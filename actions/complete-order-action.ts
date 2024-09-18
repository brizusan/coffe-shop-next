"use server";
import {revalidatePath} from "next/cache"

import { prisma } from "@/src/lib/prisma";

export async function completeorder(formData: FormData) {
  const id = formData.get("order-id");

  try {
    await prisma.order.update({
      where: {
        id : Number(id)
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now())
      }
    })

    revalidatePath("/admin/orders")
  } catch (error) {
    console.log(error);    
  }
}