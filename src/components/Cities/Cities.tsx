import "./Cities.css";
import citiesData from "@api/cities.json";
import { GraphDisplay } from "../GraphDisplay/GraphDisplay";

interface CitiesProps {
  products: { id: number; name: string; quantity: number }[];
  onChangeProducts: (id: number, newQuantity: number, price: number) => void;
}

export const Cities = ({ products, onChangeProducts }: CitiesProps) => {
  return (
    <>
      <div>
        {citiesData.map((city) => (
          <a key={city.id} href="#">
            {city.name}
          </a>
        ))}
      </div>

      <div>
        {products.map((product) => (
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
