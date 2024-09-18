"use client";
import { FilterSchema } from "@/src/schema";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const FilterProducts = () => {
  const handleFilter = async (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = FilterSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return
    }

    redirect(`/admin/products/search?search=${result.data.search}`)


  };

  return (
    <form action={handleFilter}>
      <input
        type="text"
        name="search"
        placeholder="Buscar..."
        className="border p-2 rounded"
      />
      <input
        type="submit"
        value="Buscar"
        className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-2 px-4 rounded ml-2"
      />
    </form>
  );
};
