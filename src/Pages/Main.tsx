import Card from "../components/Card.tsx";
import { ShoppingCart } from "lucide-react";

function Main() {
  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-screen m-auto p-8 ">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="text-4xl font-bold">Max Store</h1>

          <button className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 grid place-items-center">
            <ShoppingCart size={16} />
          </button>
        </div>

        <div className="w-full grid grid-cols-4 gap-6">
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Main;
