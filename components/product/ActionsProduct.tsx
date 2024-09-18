import { FilterProducts } from "./FilterProducts";
import { CreateProduct } from "./CreateProduct";

export const ActionsProduct = () => {
  return (
    <div className="md:flex justify-between items-center">
      <CreateProduct />
      <FilterProducts />
    </div>
  );
};
