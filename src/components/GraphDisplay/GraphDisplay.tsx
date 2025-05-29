import Chart from "chart.js/auto";
import "./GraphDisplay.css";
import { useEffect, useRef, useState } from "react";

interface GraphDisplayProps {
  idGraph: string;
  id: number;
  onChangeProducts: (id: number, newQuantity: number, price: number) => void;
}

export const GraphDisplay = ({
  idGraph,
  id,
  onChangeProducts,
}: GraphDisplayProps) => {
  const myChartRef = useRef<Chart | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * (11 - 4) + 4))
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift();
        newData.push(Math.floor(Math.random() * (11 - 4) + 4));
        return newData;
      });
    }, 5000);

    const canvas = document.getElementById(idGraph) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      myChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              label: "Цена за штуку, ₣",
              data: data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
      clearInterval(intervalId);
    };
  }, [idGraph, data]);

  const handleButtonClick = () => {
    if (data.length > 0) {
      const price = quantity * data[data.length - 1];
      onChangeProducts(id, quantity, price);
    }
  };

  return (
    <>
      <section>
        <div className="chart-component">
          <canvas id={idGraph}></canvas>
        </div>
        <div className="chart-action">
          <input
            className="chart-input"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button className="chart-button" onClick={handleButtonClick}>
            Купить
          </button>
        </div>
      </section>
    </>
  );
};
