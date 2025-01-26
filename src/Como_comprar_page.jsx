import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { Section_info } from "./Components/Section_info";
import { Como_pedir_component } from "./Components/Como_pedir_component";
export function Como_comprar_page() {
  return (
    <div className="flex w-full flex-col justify-start items-start h-screen">
      <Header />
      <div className="main w-full p-6 flex flex-col justify-start items-center bg-white border-t md:px-20">
        <Como_pedir_component />
        <Section_info
          title="¡Pide ya tus Stickers!"
          description="Puedes personalizar tus stickers con tus propios diseños y colores!"
          img="/images/house-plans-1.jpeg"
          cta="Ver Stickers"
          link="/"
        />
      </div>
      <Footer />
    </div>
  );
}
