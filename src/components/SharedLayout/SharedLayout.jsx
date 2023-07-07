import { NavLink, Outlet } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Loader from "../Loader/Loader";
import scss from "./SharedLayout.module.scss";
import clsx from "clsx";

const SharedLayout = () => (
  <>
    <header className={scss.header}>
      <nav className={scss.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            clsx(scss.navItem, isActive && scss.isActive)
          }
        >
          Home
        </NavLink>
        <NavLink
          to="movies"
          className={({ isActive }) =>
            clsx(scss.navItem, isActive && scss.isActive)
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
    <ToastContainer autoClose={3000} theme="colored" />
  </>
);

export default SharedLayout;
