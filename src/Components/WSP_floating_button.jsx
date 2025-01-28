import ReactGA from "react-ga4";

export function WSP_floating_button() {
  const handle_WSP_Click = () => {
    ReactGA.event({
      category: "Botón Comprar", // Categoría del evento
      action: "Click en WSP Floatting Buttom", // Acción que se realiza
    });
  };

  return (
    <a
      className="fixed bottom-4 right-4 w-16 h-16 bg-[#25D366] rounded-full flex justify-center items-center cursor-pointer shadow-lg z-50"
      href="https://api.whatsapp.com/send?phone=51959274550&text=%C2%A1Hola!%20Me%20gustaría%20pedir%20un%20Sticker"
      target="_blank"
      onClick={handle_WSP_Click}
    >
      <img src="/images/wsp_button.png" alt="whatsapp" className="w-full" />
    </a>
  );
}
