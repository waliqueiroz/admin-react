import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductList from '../pages/ProductList';
import ProductForm from '../pages/ProductForm';
import UserList from '../pages/UserList';
import UserForm from '../pages/UserForm';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      <Route
        exact
        path="/"
        component={Home}
        isPrivate
        description="Fluxo de aprovação"
        routePermissions={['product.index']}
      />

      <Route
        exact
        path="/products"
        component={ProductList}
        isPrivate
        description="Produtos"
        routePermissions={['product.index']}
      />
      <Route
        path="/products/create"
        component={ProductForm}
        isPrivate
        description="Produtos"
        routePermissions={['product.store']}
      />
      <Route
        path="/products/:id/edit"
        component={ProductForm}
        isPrivate
        description="Produtos"
        routePermissions={['product.update']}
      />

      <Route
        exact
        path="/users"
        component={UserList}
        isPrivate
        description="Usuários"
        routePermissions={['user.index']}
      />
      <Route
        path="/users/create"
        component={UserForm}
        isPrivate
        description="Usuários"
        routePermissions={['user.store']}
      />
      <Route
        path="/users/:id/edit"
        component={UserForm}
        isPrivate
        description="Usuários"
        routePermissions={['user.update']}
      />
    </Switch>
  );
};

export default Routes;
