import React from 'react';
import { Link } from 'react-router-dom';

import adminImg from '../../assets/img/AdminLTELogo.png';
import userDefault from '../../assets/img/img_default.png';

const Sidebar: React.FC = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="a" className="brand-link">
        <img
          src={adminImg}
          alt="AdminLTE"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="pref-logo-text brand-text font-weight-light">NOW</span>
      </a>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src={userDefault}
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <a href="a" className="d-block">
              Adminho
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li v-if="hasPermission('product.index')" className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home nav-icon" />
                <p>Início</p>
              </Link>
            </li>
            <li v-if="hasPermission('product.index')" className="nav-item">
              <Link to="/products" className="nav-link">
                <i className="far fa-circle nav-icon" />
                <p>Produtos</p>
              </Link>
            </li>
            <li v-if="hasPermission('user.index')" className="nav-item">
              <Link to="/users" className="nav-link">
                <i className="far fa-user nav-icon" />
                <p>Usuários</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
