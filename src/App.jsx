import "./App.css";
import { DataContextProvider } from "./Context/DataContext";
import { Home } from "./Home";
import { Toaster } from "react-hot-toast";
import { ProductPage } from "./Product_page";
import { Category_page } from "./Category_page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About_page } from "./About_page";
import { Como_comprar_page } from "./Como_comprar_page";
import { WSP_floating_button } from "./Components/WSP_floating_button";
import { Payment_page } from "./Payment";
import { Payment_summary } from "./Paymet_sumary";
import ReactGA from "react-ga4";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/product/:productId", element: <ProductPage /> },
  { path: "/category/:category_name", element: <Category_page /> },
  { path: "/about", element: <About_page /> },
  { path: "/como-comprar", element: <Como_comprar_page /> },
  { path: "/payment", element: <Payment_page /> },
  { path: "/payment_summary", element: <Payment_summary /> },
]);

ReactGA.initialize("G-G3X2DKNF63");
function App() {
  return (
    <>
      <DataContextProvider>
        <Toaster />
        <WSP_floating_button />
        <div className="w-full flex justify-center items-center bg-[#F8FAFC]">
          <RouterProvider router={router} />
        </div>
      </DataContextProvider>
    </>
  );
}

export default App;
