import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import useCurrentUser from './hooks/use-current-user';

import AuthRoute from './components/auth-route';
import Header from './components/header';
import PrivateRoute from './components/private-route';
import ThemePicker from './components/theme-picker';
import { useGlobalDispatch } from './context/global-context';

import Account from './pages/account';
import Home from './pages/home';
import Login from './pages/login';
import Logout from './pages/logout';

export default function App() {
  const [parsedToken] = useCurrentUser();
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    dispatch({
      type: 'USER_SIGNED_IN',
      payload: {
        userLogin: parsedToken.currentUser
      }
    });
  }, [dispatch, parsedToken]);

  return (
    <Router>
      <Header />
      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/account" component={Account} />
        <Route exact path="/logout" component={Logout} />
        <Redirect from="*" to="/" />
      </Switch>
      <ThemePicker />
    </Router>
  );
}
