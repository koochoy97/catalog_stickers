import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

export function About_page() {
  return (
    <div className="flex w-full flex-col justify-start items-center h-screen">
      <Header />
      <div className="main w-full p-6 flex flex-col h-full justify-start items-center bg-white border-t md:px-20">
        <div className="main w-full mb-6 flex-col">
          <h1 className="text-2xl font-semibold w-full text-left">
            Sobre nosotros
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Nacimos durante la pandemia como una forma de canalizar nuestra
            pasión por el ciclismo y los deportes de acción. Comenzamos creando
            stickers únicos que representaran el espíritu de los riders y la
            energía que sentimos al practicar MTB y otros deportes extremos.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Ahora, en 2025, hemos regresado con más fuerza para seguir
            compartiendo productos que conecten con nuestra comunidad de
            ciclistas y deportistas. Somos riders de MTB que disfrutamos del
            ciclismo en todas sus formas, siempre buscando la adrenalina y la
            emoción en cada aventura.
          </p>
          <p className="text-lg text-gray-700">
            Nuestros stickers están diseñados para durar y adaptarse a tu
            estilo, ya sea para tu bicicleta, casco o cualquier lugar donde
            quieras reflejar tu pasión. ¡Gracias por acompañarnos en esta nueva
            etapa! 🚴‍♀️🔥
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
