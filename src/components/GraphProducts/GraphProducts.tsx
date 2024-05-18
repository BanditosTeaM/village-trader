import "./GraphProducts.css";
import { GraphDisplay } from "../GraphDisplay/GraphDisplay";
import { useParams } from "react-router-dom";

interface GraphProductsProps {
  products: { id: number; name: string; quantity: number; idCity: number }[];
  onChangeProducts: (id: number, newQuantity: number, price: number) => void;
}

export const GraphProducts = ({
  products,
  onChangeProducts,
}: GraphProductsProps) => {
  const { cityId } = useParams<{ cityId: string }>();
  const cityProducts = products.filter(
    (product) => product.idCity === Number(cityId)
  );
  return (
    <>
      <div>
        {cityProducts.map((product) => (
          <div key={product.id}>
            {product.name}
            <GraphDisplay
              idGraph={product.name}
              id={product.id}
              onChangeProducts={onChangeProducts}
            />
          </div>
        ))}
      </div>
    </>
  );
};
