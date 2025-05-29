import { useEffect, useState } from "react";
import "./TaskManager.css";
interface TaskManagerProps {
  products: { id: number; name: string; quantity: number }[];
  onChangeProducts: (id: number, newQuantity: number, paymant: number) => void;
}

interface Task {
  id: number;
  name: string;
  quantity: number;
  payment: number;
}

const generateRandomTask = (
  products: { id: number; name: string; quantity: number }[],
  count: number
) => {
  const newTask = [];

  if (products.length === 0) {
    return [];
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    const randomQuantity = Math.floor(Math.random() * 5) + 1;

    newTask.push({
      id: randomProduct.id,
      name: randomProduct.name,
      quantity: randomQuantity,
      payment: randomQuantity * 30,
    });
  }

  return newTask;
};

export const TaskManager = ({
  products,
  onChangeProducts,
}: TaskManagerProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const count = 3;

  useEffect(() => {
    setTasks(generateRandomTask(products, count));

    const intervalId = setInterval(() => {
      setTasks(generateRandomTask(products, count));
    }, 10000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (
    index: number,
    id: number,
    quantity: number,
    paymant: number
  ) => {
    onChangeProducts(id, quantity, paymant);
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <section className="task-list">
      <h2>Список задач</h2>

      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div className="task" key={index}>
            Задача <br /> {task.quantity} шт. {task.name} <br />
            Оплата: {task.payment} <br />
            <button
              className="button-task"
              onClick={() =>
                handleButtonClick(index, task.id, task.quantity, task.payment)
              }
            >
              Отправить
            </button>
          </div>
        ))
      ) : (
        <div>Нет доступных продуктов для задания</div>
      )}
    </section>
  );
};
