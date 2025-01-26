import { createContext, useState } from "react";
import toast from "react-hot-toast";
import PocketBase from "pocketbase";
export const DataContext = createContext("");

const pb = new PocketBase("https://mtb.pockethost.io");

export function DataContextProvider(props) {
  const [stickers_products, setStickers_products] = useState([]);
  const [loading_stickers_products, setLoading_stickers_products] =
    useState(true);
  const [loading_stickers_variations, setLoading_stickers_variations] =
    useState(true);

  const [filteres_stickers_products, setFilteres_stickers_products] = useState(
    []
  );

  const [categories, setCategories] = useState([]);
  const [stickers_variations, setStickers_variations] = useState([]);

  let get_pocket_base_stickers_products = async (
    field_filter = "",
    filter_value = ""
  ) => {
    if (stickers_products.length <= 1) {
      setLoading_stickers_products(true);
      const filter =
        field_filter && filter_value
          ? `${field_filter} = '${filter_value}'`
          : "";

      try {
        const records = await pb
          .collection("stickers_product_view")
          .getFullList({
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

  let get_pocketbase_support_items = async (entity) => {
    if (stickers_variations.length === 0) {
      switch (entity) {
        case "kit_variations":
          setLoading_stickers_variations(true);
          break;
      }
      try {
        const records = await pb.collection(entity).getFullList({
          sort: "",
        });
        switch (entity) {
          case "kit_variations":
            setStickers_variations(records);
            console.log("Sticker variations:", records);
            setLoading_stickers_variations(false);
            break;
          case "categories":
            setCategories(records);
        }
      } catch (error) {
        console.error("Error fetching sticker variations:", error);
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
        get_pocketbase_support_items,
        stickers_variations,
        categories,
        filteres_stickers_products,
        loading_stickers_variations,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
