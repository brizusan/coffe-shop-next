/* eslint-disable @typescript-eslint/no-unused-vars */

import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: Product["id"]) => void;
  isProductInCart: (id: Product["id"]) => boolean;
  incrementQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  cleanOrder: () => void;
}

export const useStore = create<Store>((set , get) => ({
  order: [],

  addProduct: (product) => {
    const { categoryId, image, ...data } = product;

    if(get().isProductInCart(product.id)) {
      set((state) => ({
        order: state.order.map((item) => {
          return item.id === product.id && item.quantity <= 4
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * product.price,
              }
            : item;
        })
      }))
    }else{
      set((state) => ({
        order: [
          ...state.order,
          {
            ...data,
            quantity: 1,
            subtotal: 1 * product.price,
          },
        ],
      }));

    }
   
  },
  incrementQuantity(id) {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.id === id && item.quantity <= 4 ) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          };
        }
        return item;
      }),
    }));
  },
  decreaseQuantity(id) {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.id === id && item.quantity > 1 ) {
          return {
            ...item,
            quantity: item.quantity - 1,
            subtotal: (item.quantity - 1) * item.price,
          };
        }
        return item;
      }),
    }));
  },

  deleteProduct(id) {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
  isProductInCart(id) {
    return this.order.some((item) => item.id === id);
  },
  cleanOrder() {
    set({ order: [] });
  },

}));
