import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './pages/Dashboards/Dashboard';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ResetPassword from './pages/PasswordReset/ResetPassword';
import ResetPasswordConfirm from './pages/PasswordReset/ResetPasswordConfirm';
import FindTeachers from './pages/FindTeachers/FindTeachers';
import SchedulePage from './pages/SchedulePage/SchedulePage';
import AllClasses from './pages/AllClasses/AllClasses';
import AllTeachers from './pages/AllTeachers/AllTeachers';
import AccessCodes from './pages/AccessCodes/AccessCodes';
import WorkInProgress from './pages/WorkInProgress/WorkInProgress';
import About from './pages/About/About';
import AuthWrapper from './AuthWrappers/AuthWrapper';
import PrivateRoute from './AuthWrappers/PrivateRoute';

const App = () => (
  <Provider store={store}>
    <Router>
      <AuthWrapper>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
          <PrivateRoute exact path="/find-teachers" component={FindTeachers} />
          <PrivateRoute exact path="/all-classes" component={AllClasses} />
          <PrivateRoute exact path="/schedule" component={SchedulePage} />
          <PrivateRoute exact path="/teachers" component={AllTeachers} />
          <PrivateRoute exact path="/work-in-progress" component={WorkInProgress} />
          <PrivateRoute exact path="/about" component={About} />
          <PrivateRoute exact path="/access-codes" component={AccessCodes} />
        </Switch>
      </AuthWrapper>
    </Router>
  </Provider>
);

export default App;
