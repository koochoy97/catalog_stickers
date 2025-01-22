import { createContext, useState } from "react";
import toast from "react-hot-toast";
import PocketBase from "pocketbase";
export const DataContext = createContext("");

const pb = new PocketBase("https://mtb.pockethost.io");

export function DataContextProvider(props) {
  const [stickers_products, setStickers_products] = useState([]);
  async function get_pocket_base_stickers_products() {
    try {
      const records = await pb.collection("sticker_products").getFullList({
        sort: "",
      });
      setStickers_products(records); // Usa los datos como corresponda
      console.log("Sticker products:", records);
      return records;
    } catch (error) {
      console.error("Error fetching sticker products:", error);
      throw error;
    }
  }

  return (
    <DataContext.Provider
      value={{ get_pocket_base_stickers_products, stickers_products }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
