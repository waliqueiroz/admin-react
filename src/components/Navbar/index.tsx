import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="http://">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="http://">
            <i className="fas fa-cogs" />
          </a>
          <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
            <button
              onClick={handleSignOut}
              type="button"
              className="dropdown-item dropdown-footer"
            >
              Sair
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
