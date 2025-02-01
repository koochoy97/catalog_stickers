export function Order_summary() {
  return (
    <div className="flex items-start gap-3">
      <img src="/images/sticker.png" className="w-[100px] rounded-md" alt="" />
      <div className="flex flex-col items-start justify-start h-full">
        <p className="font-semibold">Sticker Classic</p>
        <div className="text-sm text-[#6B7280] font-light">
          <p>3 unidades</p>
          <p>Nombre: Jaime </p>
          <p>Apellido: Koochoy</p>
          <p>Bandera: Perú</p>
        </div>
      </div>
    </div>
  );
}
