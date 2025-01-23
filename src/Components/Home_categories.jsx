export function Home_categories() {
  return (
    <div className="categories_container flex w-full justify-start items-center gap-2 mt-4 overflow-x-auto">
      <div className="categories_container flex w-full justify-start items-center gap-2 mt-4 overflow-x-auto">
        <button className="text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0">
          Stickers personalizados
        </button>
        <button className="text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0">
          Stickers de Bicicletas
        </button>
        <button className="text-xs px-3 py-3 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0">
          Stickers Random
        </button>
      </div>
    </div>
  );
}
