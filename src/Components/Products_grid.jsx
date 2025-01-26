import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { Link } from "react-router";

export function Products_grid(props) {
  const {
    get_pocket_base_stickers_products,
    stickers_products,
    loading_stickers_products,
    setLoading_stickers_products,
  } = useContext(DataContext);

  useEffect(() => {
    console.log(props.data);
  }, []); // Dependencias vacías para que solo se ejecute al montar el componente

  return (
    <div className="products_features_container w-full">
      <div className="products_container w-full grid grid-cols-2 gap-4 flex-wrap mt-4 md:grid-cols-6 md:gap-6">
        {loading_stickers_products
          ? // Mostrar placeholders mientras los datos se cargan
            Array.from({ length: 12 }).map((_, index) => (
              <div class="flex w-full flex-col gap-4 ">
                <div class="skeleton h-40 w-full aspect-square"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
              </div>
            ))
          : // Mostrar los productos cuando los datos están cargados
            props.data.map((item) => (
              <Link
                className="product_item mb-4"
                key={item.id}
                to={`/product/${item.id}`}
              >
                <img
                  src={`https://mtb.pockethost.io/api/files/sticker_products/${item.id}/${item.principal_image}`}
                  alt={item.nombre}
                  className="rounded-md"
                />
                <div className="summary_container w-full flex flex-col justify-start items-start mt-2">
                  <p className="text-sm font-normal">{item.nombre}</p>
                  <div className="row_2 w-full text-sm">
                    <p className="text-xs text-slate-600">Desde:</p>
                    <p className="text-sm font-semibold">
                      {"S/ " + item.min_price + ".00"}
                    </p>
                    <p className="text-sm cursor-pointer underline">Ver más</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
