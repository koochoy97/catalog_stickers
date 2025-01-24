import { createContext, useState } from "react";
import toast from "react-hot-toast";
import PocketBase from "pocketbase";
export const DataContext = createContext("");

const pb = new PocketBase("https://mtb.pockethost.io");

export function DataContextProvider(props) {
  const [stickers_products, setStickers_products] = useState([]);
  const [loading_stickers_products, setLoading_stickers_products] =
    useState(true);

  let get_pocket_base_stickers_products = async (
    field_filter = "",
    filter_value = ""
  ) => {
    if (stickers_products.length === 0) {
      setLoading_stickers_products(true);
      const filter =
        field_filter && filter_value
          ? `${field_filter} = '${filter_value}'`
          : "";

      try {
        const records = await pb.collection("sticker_products").getFullList({
          sort: "",
          filter: filter,
        });
        setLoading_stickers_products(false);
        setStickers_products(records); // Usa los datos como corresponda
        console.log("Sticker products:", records);
        return records;
      } catch (error) {
        console.error("Error fetching sticker products:", error);
        throw error;
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        get_pocket_base_stickers_products,
        stickers_products,
        loading_stickers_products,
        setLoading_stickers_products,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
