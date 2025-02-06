import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext";

export function Products_grid_free_gig(props) {
  const { loading_stickers_products } = useContext(DataContext);

  useEffect(() => {
    console.log(props.data);
  }, []); // Dependencias vacías para que solo se ejecute al montar el componente

  return (
    <div className="products_features_container w-full">
      <div className="products_container w-full grid grid-cols-2 gap-4 flex-wrap mt-4 md:grid-cols-6 md:gap-6">
        {loading_stickers_products
          ? // Mostrar placeholders mientras los datos se cargan
            Array.from({ length: 12 }).map((_, index) => (
              <div className="flex w-full flex-col gap-4" key={index}>
                <div className="skeleton h-40 w-full aspect-square"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))
          : // Mostrar los productos cuando los datos están cargados
            props.data.map((item) => {
              // Verificar si el producto es el activo
              const isActive =
                props.active_sticker && props.active_sticker.id === item.id;

              return (
                <div
                  className={`product_item mb-4 ${
                    isActive ? "border-2 border-blue-500" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    props.send_click_signal(item);
                  }}
                >
                  <img
                    src={`https://mtb.pockethost.io/api/files/sticker_products/${item.id}/${item.principal_image}`}
                    alt={item.nombre}
                    className="rounded-md"
                  />
                  <div className="summary_container w-full flex flex-col justify-start items-start mt-2">
                    <p className="text-sm font-normal">{item.nombre}</p>
                    <div className="row_2 w-full text-sm"></div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
