import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css"

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navBtn}>
          <li className={css.navItemBtn}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li className={css.navItemBtn}>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
