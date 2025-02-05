import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function Card({ name, price, image, id }: CardProps) {
  const navigate = useNavigate();

  const goToProduct = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      onClick={() => goToProduct(id + "")}
      className="w-full h-full rounded-lg overflow-hidden shadow-sm transition-shadow transition-300 hover:shadow-lg cursor-pointer group"
    >
      <div className="aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform transition-300"
          src={image}
          alt=""
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

        <p className="mt-1 text-gray-600 text-sm">
          Tablet leve e potente com tela retina e suporte a caneta digital.
        </p>

        <h3 className="text-blue-600 font-bold mt-2">R${price}</h3>
      </div>
    </div>
  );
}
