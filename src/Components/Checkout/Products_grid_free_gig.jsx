import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";

export function Products_grid_free_gig({
  data,
  send_click_signal,
  confirm_selection,
  active_product,
  active_size,
  handle_size_change,
}) {
  const { loading_stickers_products } = useContext(DataContext);

  const getSizeClass = (size) => {
    return size === active_size
      ? "bg-blue-500 text-white"
      : "bg-white text-black";
  };

  return (
    <div className="products_features_container w-full">
      <div className="products_container w-full grid grid-cols-2 gap-4 flex-wrap mt-4 lg:grid-cols-4 lg:gap-6">
        {loading_stickers_products
          ? Array.from({ length: 12 }).map((_, index) => (
              <div className="flex w-full flex-col gap-4" key={index}>
                <div className="skeleton h-40 w-full aspect-square"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
          : data.map((item) => {
              const isActive = active_product && active_product.id === item.id;

              return (
                <div
                  className={`product_item mb-4 flex flex-col justify-between cursor-pointer ${
                    isActive ? "border-2 border-blue-500" : ""
                  }`}
                  key={item.id}
                  onClick={() => !isActive && send_click_signal(item)}
                >
                  <div className="w-full aspect-[1/1]">
                    <img
                      src={`https://mtb.pockethost.io/api/files/sticker_products/${item.id}/${item.principal_image}`}
                      alt={item.nombre}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <div className="summary_container w-full flex flex-col justify-betwen items-start mt-2">
                    <p className="text-sm font-normal">{item.nombre}</p>
                  </div>
                  {isActive && (
                    <>
                      <div className="flex gap-2 mt-2">
                        <button
                          className={`border rounded-sm px-1 py-1 text-xs ${getSizeClass(
                            "S"
                          )}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handle_size_change("S");
                          }}
                        >
                          S: {item.size_s}
                        </button>
                        <button
                          className={`border rounded-sm px-1 py-1 text-xs ${getSizeClass(
                            "M"
                          )}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handle_size_change("M");
                          }}
                        >
                          M: {item.size_m}
                        </button>
                        <button
                          className={`border rounded-sm px-1 py-1 text-xs ${getSizeClass(
                            "L"
                          )}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handle_size_change("L");
                          }}
                        >
                          L: {item.size_l}
                        </button>
                      </div>
                      <button
                        className="w-full bg-black text-white radius-md text-sm py-1 px-2 rounded-sm mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirm_selection();
                        }}
                      >
                        Seleccionar
                      </button>
                    </>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}
