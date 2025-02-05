import React from "react";

export function KitsGrid({
  kit_variations,
  stickers_variations,
  kit_selected,
  set_kit_selected,
}) {
  return (
    <div className="kits_container mt-2">
      <div className="text-lg font-normal flex justify-between items-center">
        <p>Kits Disponibles</p>
      </div>
      <div className="kits_grid flex gap-4 w-full mt-1 flex-wrap">
        {kit_variations?.length > 0 && stickers_variations.length > 0
          ? kit_variations.map((kit) => {
              const variation = stickers_variations.find(
                (variation) => variation.id === kit
              );
              return (
                <button
                  key={kit}
                  className={`text-md px-6 py-2 rounded-md border-2 font-semibold whitespace-nowrap hover:bg-[#ECEDE4] ${
                    kit_selected === variation?.id
                      ? "bg-[#ECEDE4] text-black"
                      : ""
                  }`}
                  onClick={() => set_kit_selected(variation?.id)}
                >
                  {variation?.nombre}
                </button>
              );
            })
          : // Mostrar Skeleton Loader mientras se cargan los datos
            Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-24 h-10 bg-gray-300 animate-pulse rounded-md"
                ></div>
              ))}
      </div>
    </div>
  );
}
