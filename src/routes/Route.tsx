/* eslint-disable react/jsx-props-no-spreading */
import React, { ElementType } from 'react';
import { Route } from 'react-router-dom';

import Template from '../components/Template';

interface RouterWrapperProps {
  isPrivate?: boolean;
  component: ElementType;
  path: string;
  exact?: boolean;
}

const RouterWrapper: React.FC<RouterWrapperProps> = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const signed = true;

  if (!signed && isPrivate) {
    // return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    // return <Redirect to="/" />;
  }

  if (signed) {
    return (
      <Route
        {...rest}
        render={(props) => (
          <Template>
            <Component {...props} />
          </Template>
        )}
      />
    );
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default RouterWrapper;
