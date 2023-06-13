import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import scss from "./SharedLayout.module.scss";

const SharedLayout = () => (
  <div className={scss.container}>
    <header className={scss.header}>
      <nav className={scss.nav}>
        <NavLink to={"/goit-react-hw-05-movies/"} className={scss.nav__item}>
          Home
        </NavLink>
        <NavLink to={"movies"} className={scss.nav__item}>
          Movies
        </NavLink>
      </nav>
    </header>
    <Suspense fallback={<div>Loading page...</div>}>
      <Outlet />
    </Suspense>
  </div>
);

export default SharedLayout;
