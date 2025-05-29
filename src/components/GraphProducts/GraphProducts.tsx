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
          <div className="chart-card" key={product.id}>
            <span className="card-name">{product.name}</span>
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
