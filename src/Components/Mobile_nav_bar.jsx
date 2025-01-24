import { Link } from "react-router";
export function Mobile_nav_bar() {
  return (
    <div class="drawer drawer-end md:hidden">
      <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label for="my-drawer-4" class="drawer-button btn ">
          <img src="/images/burger_menu.svg" alt="" className="w-8" />
        </label>
      </div>

      {/* Sidebar content  */}
      <div class="drawer-side z-50">
        <label
          for="my-drawer-4"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-6 text-lg">
          <div className="flex items-center gap-2">
            <img src="/images/circle_logo.png" className="w-14" alt="" />
            <p className="font-bold text-2xl px-2">Sprinta</p>
          </div>
          <div className="divider"></div>
          <Link to="/about" className="mb-2">
            <a>Sobre nosotros</a>
          </Link>

          <Link to="/como-comprar">
            <a>¿Cómo pedir?</a>
          </Link>
        </ul>
      </div>
    </div>
  );
}
