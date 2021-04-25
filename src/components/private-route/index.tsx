import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useGlobalState } from '../../context/global-context';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const state = useGlobalState();
  
  return (
    <Route
      {...rest}
      render={props => ((state.userData) && <Component {...props} />) || (<Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
