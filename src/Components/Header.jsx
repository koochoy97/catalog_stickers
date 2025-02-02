import { Mobile_nav_bar } from "./Mobile_nav_bar";
import { Link, useLocation } from "react-router-dom";
import { Shopping_cart } from "./Shopping_cart";

export function Header() {
  const location = useLocation(); // Obtén la ruta actual

  return (
    <div className="navbar bg-base-100 px-6 md:px-20 w-full justify-between items-center flex">
      <Mobile_nav_bar />

      <Link
        to="/"
        className="flex cursor-pointer w-full justify-center md:w-auto "
      >
        <img src="/images/circle_logo.png" alt="" className="w-12" />
        <p className="font-bold text-2xl px-2 hidden md:block">Sprinta</p>
      </Link>
      <div className="flex-none w-auto">
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
      </div>
      <Shopping_cart />
    </div>
  );
}
