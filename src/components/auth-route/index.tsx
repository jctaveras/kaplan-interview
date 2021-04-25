
import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useGlobalState } from '../../context/global-context';

interface AuthRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const AuthRoute: FunctionComponent<AuthRouteProps> = ({ component: Component, ...rest }) => {
  const state = useGlobalState();

  return (
    <Route
      {...rest}
      render={props =>
        (!(state.userData && state.userData.userLogin) && <Component {...props} />) || (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AuthRoute;
