/* eslint-disable react/jsx-props-no-spreading */
import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Template from '../components/Template';
import { RootState } from '../store';

interface RouterWrapperProps {
  isPrivate?: boolean;
  component: ElementType;
  path: string;
  exact?: boolean;
  description?: string;
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({
  component: Component,
  isPrivate,
  description,
  ...rest
}) => {
  const signed = useSelector<RootState, boolean>((state) => state.auth.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed) {
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
