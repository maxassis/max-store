import { useEffect, useState } from "react";
import Card from "../components/Card.tsx";
import CarrinhoBtn from "../components/CarrinhoBtn.tsx";

interface Products {
  id: number;
  name: string;
  price: string;
  image: string;
}

function Main() {
  const [data, setData] = useState<Products[]>([]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/09ec48e4-6cc8-45a9-8f9c-eb841cb468ed")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-full m-auto p-10 ">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="text-4xl font-bold">Max Store</h1>

          <CarrinhoBtn />
        </div>

        <div className="w-full grid grid-cols-4 gap-6">
          {data.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
