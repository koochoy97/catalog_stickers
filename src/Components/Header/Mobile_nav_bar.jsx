import { Link, useLocation } from "react-router-dom";

export function Mobile_nav_bar() {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <div className="drawer drawer-start md:hidden w-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button">
          <img src="/images/burger_menu.svg" alt="" className="w-8" />
        </label>
      </div>

      {/* Sidebar content */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-6 text-lg">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/circle_logo.png" className="w-14" alt="" />
            <p className="font-bold text-2xl px-2">Sprinta</p>
          </Link>
          <div className="divider"></div>
          <li>
            <Link
              to="/about"
              className={`mb-2 ${
                location.pathname === "/about" ? "font-bold" : ""
              }`}
            >
              Sobre nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/como-comprar"
              className={`${
                location.pathname === "/como-comprar" ? "font-bold" : ""
              }`}
            >
              ¿Cómo pedir?
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className={`${location.pathname === "/" ? "font-bold" : ""}`}
            >
              Shop
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
