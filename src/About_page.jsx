import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

export function About_page() {
  return (
    <div className="flex w-full flex-col justify-between items-center">
      <Header />
      <div className="main w-full p-6 flex flex-col justify-start items-center bg-slate-100 md:px-20">
        <div className="sub_header w-full  ">
          <h1 className="text-2xl font-semibold w-full text-left">
            Sobre nosotros
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
