import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../Loader/Loader";
import scss from "./SharedLayout.module.scss";
import clsx from "clsx";

const SharedLayout = () => (
  <>
    <header className={scss.header}>
      <nav className={scss.nav}>
        <NavLink
          to="/goit-react-hw-05-movies/"
          className={({ isActive }) =>
            isActive ? clsx(scss.navItem, scss.isActive) : scss.navItem
          }
        >
          Home
        </NavLink>
        <NavLink
          to="movies"
          className={({ isActive }) =>
            isActive ? clsx(scss.navItem, scss.isActive) : scss.navItem
          }
        >
          Movies
        </NavLink>
      </nav>
    </header>
    <main>
      <div className={scss.container}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  </>
);

export default SharedLayout;
