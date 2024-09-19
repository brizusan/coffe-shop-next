import { z } from "zod";

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  total: z.number().min(1, "El total es requerido"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      quantity: z.number(),
      subtotal: z.number(),
    })
  ),
});

export const FilterSchema = z.object({
  search: z.string().min(3, "Nombre de Producto requerido"),
});

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Campo nombre obligatorio" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Precio no válido" })
    .or(z.number().min(1, { message: "Campo precio obligatorio" })),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La Categoría es Obligatoria" })
    .or(z.number().min(1, { message: "La Categoría es Obligatoria" })),
  image: z.string().min(1 , {message: "La imagen es obligatoria"}),
});
