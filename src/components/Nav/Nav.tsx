/* eslint-disable array-callback-return */
import './Nav.scss';
import { NavLink } from 'react-router-dom';

export type Props = {
  direction: string
}

export const Nav: React.FC<Props> = ({ direction }) => {
  return (
    <div className="nav">
      <ul className={direction === 'column' ? 'nav__menu--phone' : 'nav__menu'}>
        <li
          className="nav__menu-item"
        >
          <NavLink
            to="/"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__nav-link'
              : 'nav__nav-link')}
          >
            home
          </NavLink>
        </li>

        <li className="nav__menu-item">
          <NavLink
            to="/phones"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__nav-link'
              : 'nav__nav-link')}
          >
            phones
          </NavLink>
        </li>

        <li className="nav__menu-item">
          <NavLink
            to="/tablets"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__nav-link'
              : 'nav__nav-link')}
          >
            tablets
          </NavLink>
        </li>

        <li className="nav__menu-item">
          <NavLink
            to="/accessories"
            className={({ isActive }) => (isActive
              ? 'nav__is-active nav__nav-link'
              : 'nav__nav-link')}
          >
            accessories
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
