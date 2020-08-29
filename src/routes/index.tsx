import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductList from '../pages/ProductList';

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
        path="/products"
        component={ProductList}
        isPrivate
        description="Produtos"
      />
    </Switch>
  );
};

export default Routes;
