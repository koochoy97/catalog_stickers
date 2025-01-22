import "./App.css";
import { DataContextProvider } from "./Context/DataContext";
import { Home } from "./Home";
import { Toaster } from "react-hot-toast";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);
function App() {
  return (
    <>
      <DataContextProvider>
        <Toaster />
        <div className="w-full flex justify-center items-center bg-[#F8FAFC]">
          <RouterProvider router={router} />
        </div>
      </DataContextProvider>
    </>
  );
}

export default App;
