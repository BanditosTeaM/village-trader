import { useEffect } from "react";
import { Cities } from "../Cities";
import { Storage } from "../Storage";
import { TaskManager } from "../TaskManager";
import { GraphProducts } from "../GraphProducts";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useStore from "@/store";
import "./App.css";

export const App = () => {
  const money = useStore((state) => state.money);
  const day = useStore((state) => state.day);
  const increaseDay = useStore((state) => state.increaseDay);
  const gameOver = useStore((state) => state.gameOver);
  const handleButtonClick = () => {
    toast("Ты нашел пасхалку, поздравляю и желаю хорошей игры!");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      increaseDay();
    }, 25000);

    return () => clearInterval(intervalId);
  }, [increaseDay]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      gameOver();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [gameOver]);

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
              <Storage />
              <div>
                <div>📅 День: {day}</div>
                <div>💰 Деньги: {money} ₣</div>
              </div>
            </div>
            <TaskManager />
          </div>

          <div className="right-side">
            <Routes>
              <Route path="/" element={<Navigate to="/city/1" />} />
              <Route path="/city/:cityId" element={<GraphProducts />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
