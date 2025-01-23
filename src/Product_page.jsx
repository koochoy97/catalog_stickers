import { useEffect, useContext, useState } from "react";
import { Header } from "./Components/Header";
import { BreadCrump } from "./Components/BreadCrump";
import { useParams, useLocation } from "react-router";
import { DataContext } from "./Context/DataContext";

export function ProductPage() {
  const { get_pocket_base_stickers_products, stickers_products } =
    useContext(DataContext);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  const { productId } = useParams();
  const location = useLocation(); // Usamos useLocation para detectar cambios en la URL
  const [imageHeight, setImageHeight] = useState(0); // Guardar altura de la imagen

  useEffect(() => {
    get_pocket_base_stickers_products("id", productId);
  }, []);

  useEffect(() => {
    if (stickers_products.length > 0) {
      setLoading(false);
      setItem(stickers_products);
    }
  }, [stickers_products]); // Cuando stickers_products cambie, actualiza item

  useEffect(() => {
    setItem([]);
    setLoading(true);
  }, [location]);
  return (
    <div
      className="flex w-full flex-col justify-start items-center bg-slate-100 h-screen"
      key={location.pathname}
    >
      <Header />

      <div className="main mt-6 flex flex-col justify-start items-center w-full">
        <div className="sub_header w-full px-5"></div>

        {/* Mostrar imagen solo si no está cargando */}
        {loading ? (
          <div class="skeleton h-32 w-full"></div>
        ) : (
          <>
            <img
              src={`https://mtb.pockethost.io/api/files/sticker_products/${item?.[0]?.id}/${item?.[0]?.principal_image}`}
              alt={item?.[0]?.nombre}
              className="w-full"
            />
            <div className="summary_item text-left w-full mt-6 px-5">
              <BreadCrump />
              <h1 className="text-2xl font-semibold">{item?.[0]?.nombre}</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
