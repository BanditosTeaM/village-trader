import "./GraphProducts.css";
import { GraphDisplay } from "../GraphDisplay/GraphDisplay";
import { useParams } from "react-router-dom";
import useStore from "@/store";

export const GraphProducts = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const products = useStore((state) => state.products);

  const cityProducts = products.filter(
    (product) => product.idCity === Number(cityId)
  );

  return (
    <>
      <div>
        {cityProducts.map((product) => (
          <div className="chart-card" key={product.id}>
            <span className="card-name">{product.name}</span>
            <GraphDisplay idGraph={product.name} id={product.id} />
          </div>
        ))}
      </div>
    </>
  );
};
