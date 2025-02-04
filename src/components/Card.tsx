export default function Card() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-sm transition-shadow transition-300 hover:shadow-lg cursor-pointer group">
      <div className="aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform transition-300"
          src="https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4"
          alt=""
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">Tablet Air</h3>

        <p className="mt-1 text-gray-600 text-sm">
          Tablet leve e potente com tela retina e suporte a caneta digital.
        </p>

        <h3 className="text-blue-600 font-bold mt-2">R$400,00</h3>
      </div>
    </div>
  );
}
