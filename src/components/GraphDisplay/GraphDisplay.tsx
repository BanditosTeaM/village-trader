import Chart from "chart.js/auto";
import "./GraphDisplay.css";
import { useEffect, useRef, useState } from "react";

interface GraphDisplayProps {
  idGraph: string;
  id: number;
  onChange: (id: number, newQuantity: number) => void;
}

export const GraphDisplay = ({ idGraph, id, onChange }: GraphDisplayProps) => {
  const myChartRef = useRef<Chart | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [data, setData] = useState<number[]>(
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

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    if (ctx) {
      myChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [1, 2, 3, 4, 5, 6, 7],
          datasets: [
            {
              label: "Цена за штуку",
              data: data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {
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
      onChange(id, quantity);
      console.log(quantity);

      console.log("Цена: " + data[data.length - 1]);
    }
  };

  return (
    <>
      <section>
        <div style={{ width: "400px", height: "150px" }}>
          <canvas id={idGraph}></canvas>
        </div>
        <div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder="Выбери количество"
          />
          <button onClick={handleButtonClick}>Последнее число</button>
        </div>
      </section>
    </>
  );
};
