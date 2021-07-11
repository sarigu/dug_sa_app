import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboards/Dashboard';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ResetPassword from './pages/PasswordReset/ResetPassword';
import ResetPasswordConfirm from './pages/PasswordReset/ResetPasswordConfirm';
import FindTeachers from './pages/FindTeachers/FindTeachers';
import { Provider } from 'react-redux';
import store from './store';
import AuthWrapper from './AuthWrappers/AuthWrapper';
import PrivateRoute from './AuthWrappers/PrivateRoute';

const App = () => (
  <Provider store={store}>
    <Router>
      <AuthWrapper>
        <Switch>
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
          <PrivateRoute exact path='/find-teachers' component={FindTeachers} />
        </Switch>
      </AuthWrapper>
    </Router>
  </Provider>
);

export default App;