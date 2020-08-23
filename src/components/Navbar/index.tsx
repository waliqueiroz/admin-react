import React from 'react';

const Navbar: React.FC = () => {
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
            <a href="http://" className="dropdown-item dropdown-footer">
              Sair
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
