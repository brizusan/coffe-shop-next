import { prisma } from "@/src/lib/prisma";
import { IconCategory } from "../ui/IconCategory";
import { Logo } from "../ui/Logo";

async function getCategories() {
  return await prisma.category.findMany();
}

export const OrderSidebar = async () => {
  const categories = await getCategories();
  return (
    <aside className="md:w-72  md:h-screen bg-white">
      <Logo />
      <h2 className="text-center text-2xl lg:text-3xl font-bold mt-10 text-amber-400">
        CATEGORIAS
      </h2>
      <nav className="mt-10">
        {categories.map((category) => (
          <IconCategory key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
};
