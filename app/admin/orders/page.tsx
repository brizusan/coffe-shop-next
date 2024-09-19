"use client";
import { OrderCard } from "@/components/order/OrderCard";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

// !  Solo en server Components
// async function getPendingOrder() {
//   const orders = await prisma.order.findMany({
//     where: {
//       status: false,

//     },
//     include: {
//       OrderProducts: {
//         include: {
//           product: true,
//         },
//       },
//     },
//     take: 6,
//   });
//   return orders;
// }

export default function OrdersPage() {
  // ! Solo Server Components
  // const orders = await getPendingOrder();
  // const updateOrders = async()=>{
  //   "use server"
  //   revalidatePath("/admin/orders")
  // }
  const url = "/admin/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data: orders, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: (1000 * 60 ) * 3,
    revalidateOnFocus: false,
  });

  // const isEmtpy = useMemo(()=>orders?.length === 0, [orders])

  if (error)
    return (
      <p className="text-center text-slate-800 text-2xl font-bold">
        Error al cargar pedidos
      </p>
    );

  return (
    <>
      <h2 className="subtitle py-8">Administrar pedidos</h2>

      {/*  <form action={updateOrders} className="max-w-7xl mx-auto">
      // ? Solo en server Components
        <div className="flex justify-end my-6">
          <input
            type="submit"
            value="actualizar ordenes"
            className="bg-amber-400 px-8 py-2 border border-slate-900 rounded shadow hover:bg-amber-500 font-semibold text-white cursor-pointer capitalize"
          />
        </div>
      </form> */}

      {!isLoading ? (
        <section className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {orders?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>
      ) : (
        <p className="text-center text-slate-800 text-2xl font-bold">
          No hay pedidos pendientes
        </p>
      )}
    </>
  );
}
