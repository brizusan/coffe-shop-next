import Link from "next/link"

export const CreateProduct = () => {
  return (
    <div className="my-6">
    <Link
      href={"/admin/products/new"}
      className="bg-amber-400 px-8 py-2 rounded shadow hover:bg-amber-500 font-semibold text-white"
    >
      Crear Producto
    </Link>
  </div>
  )
}
