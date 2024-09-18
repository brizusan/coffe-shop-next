import { OrderSidebar } from "@/components/order/OrderSidebar";
import { OrderSummary } from "@/components/order/OrderSummary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        <main className="flex flex-1  md:h-screen md:overflow-y-scroll px-4">
          {children}
        </main>

        <OrderSummary />
      </div>
      <ToastContainer />
    </>
  );
}
