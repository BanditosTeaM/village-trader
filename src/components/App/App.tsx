import { useEffect, useState } from "react";
import { Cities } from "../Cities";
import { Storage } from "../Storage";
import { TaskManager } from "../TaskManager";
import { GraphProducts } from "../GraphProducts";
import { Routes, Route, Navigate } from "react-router-dom";
import productsData from "@api/products.json";
import "./App.css";

export const App = () => {
  const [day, setDay] = useState(1);
  const [money, setMoney] = useState(500);
  const [products, setProducts] = useState(productsData);

  const handleButtonClick = () => {
    alert("Ты нашел посхалку, поздравляю и желаю хорошей игры!");
  };

  const buyProducts = (id: number, newQuantity: number, price: number) => {
    const totalCost = newQuantity * price;

    if (money >= totalCost) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + newQuantity }
            : product
        )
      );

      setMoney((prevMoney) => prevMoney - totalCost);
      console.log("Покупка совершена!");
    } else {
      console.log("Недостаточно денег");
    }
  };

  const sellProducts = (id: number, quantity: number, payment: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          if (product.quantity >= quantity) {
            setMoney((prevMoney) => prevMoney + payment);
            console.log("Продажа совершена!");

            return { ...product, quantity: product.quantity - quantity };
          } else {
            console.log("Недостаточно товара для продажи!");
          }
        }
        return product;
      })
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDay((prevDay) => prevDay + 1);
    }, 25000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="container">
        <header className="game-name">
          <button onClick={() => handleButtonClick()}>
            Деревенский трейдер
          </button>
        </header>
        <Cities />
        <div className="content">
          <div className="left-side">
            <div className="info-panel">
              <Storage products={products} />
              <div>
                <div>📅 День: {day}</div>
                <div>💰 Деньги: {money} ₣</div>
              </div>
            </div>
            <TaskManager products={products} onChangeProducts={sellProducts} />
          </div>

          <div className="right-side">
            <Routes>
              <Route path="/" element={<Navigate to="/city/1" />} />

              <Route
                path="/city/:cityId"
                element={
                  <GraphProducts
                    products={products}
                    onChangeProducts={buyProducts}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
