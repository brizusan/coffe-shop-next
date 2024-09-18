"use client";
import { useStore } from "@/src/store";
import ListCart from "../cart/ListCart";

export const OrderSummary = () => {
  const order = useStore((state) => state.order);
  const isEmpty = order.length === 0;

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-4">
      <h2 className="text-center text-2xl lg:text-3xl font-bold mt-6 text-amber-400">
        MI PEDIDO
      </h2>

      {isEmpty ? (
        <p className="text-xl mt-6 text-center font-semibold text-slate-600 mb-4">
          Agregar items a tu pedido
        </p>
      ) : (
        <ListCart order={order} />
      )}
    </aside>
  );
};
