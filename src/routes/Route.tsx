/* eslint-disable react/jsx-props-no-spreading */
import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Template from '../components/Template';
import { RootState } from '../store';

interface RouterWrapperProps {
  isPrivate?: boolean;
  routePermissions?: Array<string>;
  component: ElementType;
  path: string;
  exact?: boolean;
  description?: string;
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({
  component: Component,
  isPrivate,
  description,
  routePermissions,
  ...rest
}) => {
  const signed = useSelector<RootState, boolean>((state) => state.auth.signed);
  const userPermissons = useSelector<RootState, Array<string> | undefined>(
    (state) => state.auth.user?.permissions,
  );

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed) {
    const found = routePermissions
      ? routePermissions.some((permission) =>
          userPermissons?.includes(permission),
        )
      : true;

    if (!found) {
      return <Redirect to="/" />;
    }

    return (
      <Route
        {...rest}
        render={(props) => (
          <Template description={description}>
            <Component {...props} />
          </Template>
        )}
      />
    );
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouterWrapper;
