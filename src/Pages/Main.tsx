import Card from "../components/Card.tsx";
import CarrinhoBtn from "../components/CarrinhoBtn.tsx";

function Main() {
  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-screen m-auto p-8 ">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="text-4xl font-bold">Max Store</h1>

          <CarrinhoBtn />
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
