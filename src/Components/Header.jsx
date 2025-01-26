import { Mobile_nav_bar } from "./Mobile_nav_bar";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <div className="navbar bg-base-100 px-6 md:px-20 w-full justify-between items-center flex">
      <Link to="/" className="flex cursor-pointer ">
        <img src="/images/circle_logo.png" alt="" className="w-12" />
        <p className="font-bold text-2xl px-2">Sprinta</p>
      </Link>
      <div className="flex-none">
        <ul className="menu menu-horizontal hidden md:flex">
          <li>
            <Link
              to="/about"
              className={`mr-4 ${
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
        </ul>
        <Mobile_nav_bar />
      </div>
    </div>
  );
}
