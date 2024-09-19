import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: true,
    },
    include: {
      OrderProducts: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
  });
  return Response.json(orders);
}