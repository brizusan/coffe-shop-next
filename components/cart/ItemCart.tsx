import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatPrice } from "@/src/utils";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";

type ItemCartProps = {
  item: OrderItem;
};

export default function ItemCart({ item }: ItemCartProps) {
  const deleteProduct = useStore((state) => state.deleteProduct);
  const incrementQuantity = useStore((state) => state.incrementQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);

  const disableDecreaseButton = useMemo(() => item.quantity === 1, [item]);

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => deleteProduct(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatPrice(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            disabled={disableDecreaseButton}
            className="disabled:opacity-30"
            type="button"
            onClick={() => decreaseQuantity(item.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{item.quantity}</p>

          <button type="button" onClick={() => incrementQuantity(item.id)}>
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">{formatPrice(item.subtotal)}</span>
        </p>
      </div>
    </div>
  );
}
