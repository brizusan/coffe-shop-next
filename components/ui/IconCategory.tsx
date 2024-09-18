"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type IconCategoryProps = {
  category: Category;
};

export const IconCategory = ({ category }: IconCategoryProps) => {
  const pathname = useParams<{ category: string }>();
  return (
    <div
      className={`${category.slug === pathname.category ? "bg-amber-100" : ""}
          flex items-center  gap-3 justify-around w-full border-t border-gray-200 font-semibold px-2 py-4 last-of-type:border-b`}
    >
      <div className="w-16 h-16 relative">
        <Image fill src={`/icon_${category.slug}.svg`} alt={category.name} />
      </div>
      <Link href={`/order/${category.slug}`} className="text-lg">
        {category.name}
      </Link>
    </div>
  );
};
