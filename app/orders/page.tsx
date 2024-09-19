"use client"
import { Logo } from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types";
import { formatDate, formatPrice } from "@/src/utils";
import React from "react";
import useSWR from "swr";

export default function OrdersPage() {
  
  const url = "/orders/api/";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data: orders, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {});

  if (error) return <p className="subtitle my-8">Error al cargar pedidos</p>;
  if (isLoading) return <p className="subtitle my-8">Cargando pedidos</p>;
  if (!orders) return <p className="subtitle my-8">No hay pedidos o ordenes liquidadas</p>;

  if(orders) return (
    <>
      <h1 className="subtitle my-8">Lista de Ordenes completadas</h1>
      <Logo />

      <section className="max-w-6xl mx-auto mt-8 w-11/12 md:w-5/6 lg:w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {
          orders.map((order) => (
            <div 
              key={order.id}
              className="bg-white shadow p-5 space-y-2 rounded-lg"  
            >
              <div className="flex justify-end">
                <p className="text-sm text-slate-600 font-semibold">{formatDate(order.orderReadyAt?.toString() as string)}</p>
              </div>
              <ul>
                {
                  order.OrderProducts.map((product) => (
                    <li 
                      key={product.id}
                      className="border-t first-of-type:border-none  text-sm py-2 capitalize text-slate-500 flex justify-between flex-row-reverse"
                    >
                      <p>{product.quantity}</p>
                      <p>{product.product.name}</p>
                    </li>
                  ))
                }
              </ul>
              <p className="font-bold text-base">Monto de Pago  - <span className="font-normal">{formatPrice(order.total)}</span></p>
            </div>
          ))
        }
      </section>
    </>
  );
}
