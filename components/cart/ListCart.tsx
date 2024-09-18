import { useMemo } from "react";
import { toast } from 'react-toastify';
import ItemCart from "./ItemCart";
import { OrderItem } from "@/src/types";
import { formatPrice } from "@/src/utils";
import { OrderSchema } from "@/src/schema";
import { createOrderAction } from "@/actions/create-order-action";
import { useStore } from "@/src/store";

type ListCardProps = {
  order: OrderItem[];
};

export default function ListCart({ order }: ListCardProps) {
  const cleanOrder = useStore((state) => state.cleanOrder);

  const totalPagar = useMemo(() => {
    return order.reduce((total, item) => total + item.subtotal, 0);
  }, [order]);

  const handleCreateOrder =async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total: totalPagar,
      order

    }

    const result = OrderSchema.safeParse(data);

    // validacion desde el cliente
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    //validacion desde server action => servidor
    const response = await createOrderAction(data);
    if(response?.errors){
      return response.errors.forEach(error => toast.error(error.message))
    }

    toast.success("Orden creada con exito")
    setTimeout(() => {
      cleanOrder()
    }, 1000);
  };

  return (
    <>
      <section className="grid gap-2 my-8">
        {order.map((item) => (
          <ItemCart key={item.id} item={item} />
        ))}

        <div className="border-t border-gray-200 mt-4 pt-4">
          <p className="text-xl lg:text-2xl font-semibold text-center">
            Total a Pagar :{" "}
            <span className="text-amber-500 font-bold">
              {formatPrice(totalPagar)}
            </span>
          </p>
          <form className="w-full mt-10 space-y-2" action={handleCreateOrder}>
            <input
              id="name"
              name="name"
              className="py-1 rounded px-4 border border-gray-400 w-full"
              type="text"
              placeholder="Ingrese nombre de cliente"
            />

            <input
              className="py-2 rounded font-semibold uppercase text-white bg-black hover:opacity-90  w-full text-center cursor-pointer"
              type="submit"
              value="Confirmar pedido"
            />
          </form>
        </div>
      </section>
    </>
  );
}
