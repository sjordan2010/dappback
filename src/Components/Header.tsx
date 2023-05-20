import "./Header.css";

export default function Header() {
  return (
    <header className="w-full flex justify-around items-center px-2 md:px-8 py-2 md:py-4 shadow-lg dark:shadow-none bg-gray-200 dark:bg-transparent">
      <div className="flex w-48 md:w-96 justify-center items-center gap-4 md:gap-12">
        <a href="https://www.dappback.com" target="_blank">
          <img
            src="/logo-v2.png"
            className="w-12 md:w-20 hover:scale-105 transition duration-150"
          />
        </a>
        <div className="flex flex-col md:flex-row md:gap-8">
          <a className="text-sm md:text-base dark:text-white hover:brightness-90" href="#">
            Rewards Store
          </a>
          <a className="text-sm md:text-base dark:text-white hover:brightness-90" href="#">
            Brands
          </a>
        </div>
      </div>
      <button
        onClick={() => {
          alert("connect wallet");
        }}
        className="text-sm font-thin md:text-base w-fit flex items-center wallet-btn text-gray-900 px-4 py-3 md:px-8 md:py-5 border rounded-xl transition duration-150 hover:scale-105 hover:brightness-110"
      >
        Connect Wallet &nbsp; <span className="font-normal">&#43;</span>
      </button>
    </header>
  );
}
