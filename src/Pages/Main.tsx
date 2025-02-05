import Card from "../components/Card.tsx";
import CarrinhoBtn from "../components/CarrinhoBtn.tsx";

const products = [
  {
    id: 1,
    name: "Tablet Air",
    price: "400,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreibbibk4gsdpalapcmm4tctuj3ctonrvdd3m23qwvrtdsxtrh22na4",
  },
  {
    id: 2,
    name: "PlayStation 5",
    price: "500,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreihuq6wr2bzfgcmevrimummisdvstwq5mvj7jmkrav2zntwtsdfdai",
  },
  {
    id: 3,
    name: "Notebook Asus",
    price: "600,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreideyi4vg27t3vymjd3go5e5d2jyfg2fz5etuivoqbueybmbsbpwl4",
  },
  {
    id: 4,
    name: "Camera Canon",
    price: "700,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreid4i5d53r63v55z6yt53idkrdxlatdulag3hupaludufvbfe3tseq",
  },
  {
    id: 5,
    name: "HeadPhone",
    price: "800,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreicfoztp77v4htutmui5fdoisy2ealdphlgpw4munsp6kaoldnxvyi",
  },
  {
    id: 6,
    name: "Iphone 16",
    price: "900,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreid2uhtidirzbeokrsss5b4etk4ikgqhlspfo4z32eknfkt25n553u",
  },
  {
    id: 7,
    name: "Smart Watch",
    price: "1000,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreifrfvmf4lwb6mv3fjxpn6kag3ahrtfo3uki4ava4kvkxefrn3zwmu",
  },
  {
    id: 8,
    name: "Macbook Air M3",
    price: "1100,00",
    image:
      "https://yellow-fascinating-badger-992.mypinata.cloud/ipfs/bafkreieigc5xnr2gfrotcx3vuahhwtcpqutymenc6w6vgssv7vuit2mpza",
  },
];

function Main() {
  return (
    <div className="bg-gray-50 w-full h-full">
      <div className="max-w-[87.5rem] h-full m-auto p-10 ">
        <div className="flex justify-between items-center mb-8 ">
          <h1 className="text-4xl font-bold">Max Store</h1>

          <CarrinhoBtn />
        </div>

        <div className="w-full grid grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
