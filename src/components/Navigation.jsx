import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css"

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navBtn}>
          <li>
            <NavLink className={css.navItemBtn} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={css.navItemBtn} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
