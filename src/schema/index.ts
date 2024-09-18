import {z} from "zod"

export const OrderSchema = z.object({
  name: z.string().min(1,'El nombre es requerido'),
  total : z.number().min(1,'El total es requerido'),
  order : z.array(z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    subtotal: z.number()
  }))
})

export const FilterSchema = z.object({
  search: z.string().min(3,'Nombre de Producto requerido'),
})