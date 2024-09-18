"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkNavigateProps = {
  url: string;
  blank: boolean;
  name: string;
};

export const LinkNavigate = ({ url, blank, name }: LinkNavigateProps) => {
  const pathname = usePathname();

  return (
    <Link
      key={url}
      href={url}
      className={`${pathname === url ? "bg-amber-200" : ""} py-3 text-gray-600 hover:text-gray-800 text-center border-t font-semibold last-of-type:border-b`}
      target={blank ? "_blank" : "_self"}
    >
      {name}
    </Link>
  );
};
