import Link from "next/link";

type ListProductPaginationProps = {
  page: number;
  totalPage: number;
};

export const ListProductPagination = ({
  page,
  totalPage,
}: ListProductPaginationProps) => {
  const arrayPages = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <nav className="flex justify-center w-full mt-6">
      {page > 1 && page <= totalPage && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="bg-white px-4 py-1 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-4"
        >
          &laquo;
        </Link>
      )}
      {arrayPages.map((item) => (
        <Link
          key={item}
          href={`/admin/products?page=${item}`}
          className={`${
            item === page ? "bg-blue-200" : ""
          } bg-white px-4 py-1 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-4`}
        >
          {item}
        </Link>
      ))}

      {page < totalPage && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="bg-white px-4 py-1 text-sm ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-4"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
};
