export function Como_pedir_component() {
  return (
    <div className="como_pedir_section w-full">
      <h1 className="text-xl font-semibold w-full text-left">
        ¿Cómo pedir tus Stickers?
      </h1>
      <p className="mb-2">
        ¡Conseguir tus Stickers Sprinta Personalizado es muy sencillo!{" "}
      </p>
      <ol className="list-decimal pl-5">
        <li className="mb-4">
          <h3 className="text-lg font-bold">
            Elige el modelo y el tipo de kit que desees
          </h3>
          <p> Los kits están separados por cantidad de Stickers.</p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-bold">
            Selecciona las medidas que desees.
          </h3>
          <p>Podrás escoger todas las medidas que desees dentro de tu kit.</p>
        </li>
        <li className="mb-4">
          <h3 className="text-lg font-bold">
            Brindanos los nombres y bandera (Solo para Stickers personalizados)
          </h3>
          <p>Indícanos los nombres y banderas que deseas agregar.</p> <br />
          (Nota: Solo se podrá elegir un nombre, apellido y bandera por kit .)
        </li>
      </ol>
    </div>
  );
}
