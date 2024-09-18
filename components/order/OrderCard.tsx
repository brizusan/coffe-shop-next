import { completeorder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatPrice } from "@/src/utils";

export const OrderCard = ({ order } : {order:OrderWithProducts}) => {


  return (
    <article
      aria-labelledby="summary-heading"
      className="mt-8 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-medium text-gray-900">
        Cliente: <span className="text-xl capitalize text-slate-700">{order.name}</span> 
      </p>
      <ul className="text-lg font-medium text-gray-900">
        <p className="mb-2">
          Productos Ordenados:
        </p>
        {
          order.OrderProducts.map((product) => (
            <li 
              className="border-t first-of-type:border-none  text-sm py-2 capitalize text-slate-500 flex justify-between flex-row-reverse" key={product.id}>
              <p>{product.quantity}</p> 
              <p>{product.product.name}</p> 
            </li>
          ))
        }
       
      </ul>
      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-medium text-gray-900">
            {formatPrice(order.total)}
          </dd>
        </div>
      </dl>

      <form
        action={completeorder}

      >
        <input type="hidden" name="order-id" value={order.id} />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Marcar Orden Completada"
        />
      </form>
    </article>
  );
};
