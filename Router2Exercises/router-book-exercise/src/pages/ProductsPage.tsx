import { products } from "../products";

export function ProductsPage() {
    console.log(products);
    
  return (
    <div className="text-center p-5">
      <h2 className="text-xl font-bold text-slate-600">
        Here are some great tools for me
        <ul className="list-none m-0 p-0">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-1 text-base textslate-800">
              {product.name}
            </li>
          ))}
        </ul>
      </h2>
    </div>
  );
}
