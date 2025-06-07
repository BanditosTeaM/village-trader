import { toast } from "react-toastify";
import { create } from "zustand";

interface Task {
  id: number;
  name: string;
  quantity: number;
  payment: number;
}

type State = {
  money: number;
  day: number;
  products: Array<{
    id: number;
    name: string;
    quantity: number;
    idCity: number;
  }>;
  cities: Array<{
    id: number;
    name: string;
  }>;
  countBuyingProducts: number;
  countCompletedTask: number;
  alertShown: boolean;
  tasks: Task[];
  countTasks: number;
};

type Action = {
  buyProduct: (id: number, count: number, price: number) => void;
  sellProduct: (id: number, count: number, payment: number) => void;
  countProduct: (id: number) => number | undefined;
  increaseDay: () => void;
  generateTasks: () => void;
  removeTask: (index: number) => void;
  gameOver: () => void;
};

const useStore = create<State & Action>((set, get) => ({
  countTasks: 3,
  tasks: [],
  countBuyingProducts: 0,
  countCompletedTask: 0,
  alertShown: true,
  money: 49500,
  day: 1,
  products: [
    { id: 1, name: "🧱 Камень", quantity: 20, idCity: 1 },
    { id: 2, name: "🌲 Дерево", quantity: 20, idCity: 1 },
    { id: 3, name: "🍺 Пиво", quantity: 0, idCity: 1 },
    { id: 4, name: "🔩 Сталь", quantity: 0, idCity: 2 },
    { id: 5, name: "🧽 Резина", quantity: 0, idCity: 2 },
    { id: 6, name: "⚙️ Метал", quantity: 0, idCity: 2 },
    { id: 7, name: "🧱 Гранит", quantity: 0, idCity: 3 },
    { id: 8, name: "♻️ Пластик", quantity: 0, idCity: 3 },
    { id: 9, name: "🌿 Хлопок", quantity: 0, idCity: 3 },
    { id: 10, name: "🍻 Эль", quantity: 0, idCity: 4 },
    { id: 11, name: "🍶 Майбок", quantity: 0, idCity: 4 },
    { id: 12, name: "🍷 Портер", quantity: 0, idCity: 4 },
  ],
  cities: [
    { id: 1, name: "🏞️ Камнеград" },
    { id: 2, name: "🏭 Индустрион" },
    { id: 3, name: "🏕️ Тексополис" },
    { id: 4, name: "🍺 Брюбург" },
  ],
  increaseDay: () => set((state) => ({ day: state.day + 1 })),
  buyProduct: (id: number, count: number, price: number) =>
    set((state) => {
      const totalCost = count * price;

      if (state.money >= totalCost) {
        const newProducts = state.products.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + count }
            : product
        );

        toast("Покупка совершена");

        return {
          products: newProducts,
          money: state.money - totalCost,
          countBuyingProducts: state.countBuyingProducts + 1,
        };
      } else {
        toast("Ошибка: не хватает денег");
        return {};
      }
    }),
  sellProduct: (id: number, count: number, payment: number) =>
    set((state) => {
      const newProducts = state.products.map((product) =>
        product.id === id && product.quantity >= count
          ? { ...product, quantity: product.quantity - count }
          : product
      );

      return {
        products: newProducts,
        money: state.money + payment,
        countCompletedTask: state.countCompletedTask + 1,
      };
    }),
  countProduct: (id: number) => {
    const countProduct = get().products.find((product) => product.id === id);

    return countProduct?.quantity;
  },

  generateTasks: () => {
    const newTasks: Task[] = [];

    if (get().products.length === 0) return;

    for (let i = 0; i < get().countTasks; i++) {
      const randomIndex = Math.floor(Math.random() * get().products.length);
      const product = get().products[randomIndex];
      const quantity = Math.floor(Math.random() * 5) + 1;
      newTasks.push({
        id: product.id,
        name: product.name,
        quantity,
        payment: quantity * 30,
      });
    }

    set({ tasks: newTasks });
  },

  removeTask: (index: number) =>
    set((state) => ({
      tasks: state.tasks.filter((_, i) => i !== index),
    })),

  gameOver: () => {
    if (get().money >= 50000 && get().alertShown) {
      console.log("Алерт ебана");

      alert(
        `🎉 Поздравляем! Ты прошел игру!\n` +
          `📅 Кол-во дней пройдено: ${get().day}\n` +
          `🛒 Кол-во покупок сделано: ${get().countBuyingProducts}\n` +
          `✅ Кол-во задач выполнено: ${get().countCompletedTask}`
      );
      set({ alertShown: false });
    }
  },
}));

export default useStore;
