import useStore from "@/store";

export const Storage = () => {
  const products = useStore((state) => state.products);

  return (
    <>
      <section>
        <h1>Склад</h1>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              {product.quantity > 0 && (
                <div>
                  {product.name} - {product.quantity} шт
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
