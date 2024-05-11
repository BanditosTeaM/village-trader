import "./Cities.css";
import citiesData from "@api/cities.json";
import productsData from "@api/products.json";
import { GraphDisplay } from "../GraphDisplay/GraphDisplay";
import { useState } from "react";

export const Cities = () => {
  const [products, setProducts] = useState(productsData);

  const onChange = (id: number, newQuantity: number) => {
    console.log(newQuantity);

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + newQuantity }
          : product
      )
    );
  };

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
            {product.name} - {product.quantity} шт
            <GraphDisplay
              idGraph={product.name}
              id={product.id}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </>
  );
};
