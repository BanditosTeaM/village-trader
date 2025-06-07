import { useEffect } from "react";
import useStore from "@/store";
import "./TaskManager.css";

export const TaskManager = () => {
  const sellProduct = useStore((state) => state.sellProduct);
  const productCount = useStore((state) => state.countProduct);
  const generateTasks = useStore((state) => state.generateTasks);
  const removeTask = useStore((state) => state.removeTask);
  const tasks = useStore((state) => state.tasks);

  useEffect(() => {
    generateTasks();
    const intervalId = setInterval(() => {
      generateTasks();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [generateTasks]);

  const handleButtonClick = (
    index: number,
    id: number,
    quantity: number,
    paymant: number
  ) => {
    sellProduct(id, quantity, paymant);
    removeTask(index);
  };

  return (
    <section className="task-list">
      <h2>Список задач</h2>

      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div className="task" key={index}>
            Задача <br /> {task.quantity} шт. {task.name} (у тебя{" "}
            {productCount(task.id)} шт) <br />
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
