import { useState } from "react";

export function Order_summary() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <div className="item flex items-start gap-3 w-full">
        <img
          src="/images/sticker.png"
          className="w-[45px] rounded-md"
          alt="Sticker"
        />
        <div className="flex flex-1 items-start justify-between">
          {/* Título y descripción */}
          <div className="flex flex-col items-start w-full">
            <p className="font-semibold text-sm">Sticker Classic</p>
            <p
              className={`text-xs text-[#6B7280] font-light overflow-hidden  ${
                expanded
                  ? "whitespace-normal max-w-full"
                  : "truncate max-w-[100px]"
              }`}
            >
              3 unidades - 3(S), 4(M), 5(L) - Nombre: Jaime - Apellido: Koochoy
              - Bandera: Perú
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-xs font-medium mt-1"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>

          {/* Precio alineado a la derecha */}
          <p className="font-semibold text-sm text-gray-700 min-w-[80px] text-right">
            S/. 15.00
          </p>
        </div>
      </div>

      <div className="item flex items-start gap-3 w-full">
        <img
          src="/images/sticker.png"
          className="w-[45px] rounded-md"
          alt="Sticker"
        />
        <div className="flex flex-1 items-start justify-between">
          {/* Título y descripción */}
          <div className="flex flex-col items-start w-full">
            <p className="font-semibold text-sm">Sticker Classic</p>
            <p
              className={`text-xs text-[#6B7280] font-light overflow-hidden  ${
                expanded
                  ? "whitespace-normal max-w-full"
                  : "truncate max-w-[100px]"
              }`}
            >
              3 unidades - 3(S), 4(M), 5(L) - Nombre: Jaime - Apellido: Koochoy
              - Bandera: Perú
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-xs font-medium mt-1"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>

          {/* Precio alineado a la derecha */}
          <p className="font-semibold text-sm text-gray-700 min-w-[80px] text-right">
            S/. 15.00
          </p>
        </div>
      </div>

      <div className="item flex items-start gap-3 w-full">
        <img
          src="/images/sticker.png"
          className="w-[45px] rounded-md"
          alt="Sticker"
        />
        <div className="flex flex-1 items-start justify-between">
          {/* Título y descripción */}
          <div className="flex flex-col items-start w-full">
            <p className="font-semibold text-sm">Sticker Classic</p>
            <p
              className={`text-xs text-[#6B7280] font-light overflow-hidden  ${
                expanded
                  ? "whitespace-normal max-w-full"
                  : "truncate max-w-[100px]"
              }`}
            >
              3 unidades - 3(S), 4(M), 5(L) - Nombre: Jaime - Apellido: Koochoy
              - Bandera: Perú
            </p>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-500 text-xs font-medium mt-1"
            >
              {expanded ? "Ver menos" : "Ver más"}
            </button>
          </div>

          {/* Precio alineado a la derecha */}
          <p className="font-semibold text-sm text-gray-700 min-w-[80px] text-right">
            S/. 15.00
          </p>
        </div>
      </div>

      <div className="total flex justify-between w-full border-t pt-3">
        <p className="font-semibold ">Total</p>
        <p className="font-semibold ">S/. 15.00</p>
      </div>
    </div>
  );
}
