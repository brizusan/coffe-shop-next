import { Logo } from "../ui/Logo";
import { LinkNavigate } from "../ui/LinkNavigate";

const adminNavigation = [
  { url: "/admin/orders", name: "Pedidos", blank: false },
  { url: "/admin/products", name: "Productos", blank: false },
  { url: "/order/cafe", name: "Ver Quiosco", blank: true },
];

export const AdminSidebar = () => {
 
  return (
    <>
      <div className="space-y-3 ">
        <Logo />
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
          Navegación
        </p>
        <nav className="flex flex-col pt-10">
          {adminNavigation.map(({ url, name, blank }) => {
            return (
              <LinkNavigate key={url} url={url} name={name} blank={blank}/>
            );
          })}
        </nav>
      </div>
    </>
  );
};
