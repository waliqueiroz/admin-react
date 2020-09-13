import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductList from '../pages/ProductList';
import ProductForm from '../pages/ProductForm';
import UserList from '../pages/UserList';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
        isPrivate
        description="Fluxo de aprovação"
      />
      <Route path="/login" component={Login} />

      <Route
        exact
        path="/products"
        component={ProductList}
        isPrivate
        description="Produtos"
      />
      <Route
        path="/products/create"
        component={ProductForm}
        isPrivate
        description="Produtos"
      />
      <Route
        path="/products/:id/edit"
        component={ProductForm}
        isPrivate
        description="Produtos"
      />

      <Route
        exact
        path="/users"
        component={UserList}
        isPrivate
        description="Produtos"
      />
      {/* <Route
        path="/users/create"
        component={ProductForm}
        isPrivate
        description="Produtos"
      />
      <Route
        path="/users/:id/edit"
        component={ProductForm}
        isPrivate
        description="Produtos"
      /> */}
    </Switch>
  );
};

export default Routes;
