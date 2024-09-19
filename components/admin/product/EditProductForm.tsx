"use client";
import { updateProductAction } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type EditProductFormProps = {
  children: React.ReactNode;
};

export const EditProductForm = ({ children }: EditProductFormProps) => {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const id = formData.get("id");
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const respuesta = await updateProductAction(+id!, data);
    if (respuesta?.errors) {
      return respuesta.errors.forEach((error) => toast.error(error.message));
    }

    toast.success("Producto actualizado con exito");

    setTimeout(() => {
      router.push("/admin/products");
    }, 1500);
  };

  return (
    <form
      action={handleSubmit}
      className="space-y-2 mt-12 max-w-4xl mx-auto bg-white rounded shadow border p-6 lg:p-8"
    >
      {children}
      <div className="flex justify-center pt-4">
        <input
          className="bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer px-8 py-2 rounded text-white uppercase font-semibold"
          type="submit"
          value="actualizar producto"
        />
      </div>
    </form>
  );
};
