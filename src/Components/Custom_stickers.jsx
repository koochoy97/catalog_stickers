export function Custom_stickers_section() {
  return (
    <div className="hero bg-[#ECEDE4] mt-10 rounded-lg py-7">
      <div className="hero-content flex-col md:flex-row-reverse md:w-full gap-16">
        <img
          src="/public/images/house-plans-1.jpeg"
          className="w-full md:w-[350px] rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-2xl font-semibold ">¿Tienes un diseño propio?</h1>
          <p className="py-6">
            ¡No te preocupes! Puedes personalizar tus stickers con tus propios
            diseños y colores!
          </p>
          <button className="btn bg-black text-white rounded-full px-4">
            ¡Quiero mi Sticker!
          </button>
        </div>
      </div>
    </div>
  );
}
