interface StorageProps {
  products: { id: number; name: string; quantity: number }[];
}

export const Storage = ({ products }: StorageProps) => {
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
