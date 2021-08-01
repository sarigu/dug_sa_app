import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar/Navbar';
import Menu from '../components/Menu/Menu';
import './PrivateRoute.css';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menuWasSet, setMenuWasSet] = useState(false);

  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated
          ? (
            <div className="page-wrapper">
              <Navbar
                onMenuClick={() => { setOpenMenu(!openMenu); setMenuWasSet(true); }}
                menuShows={openMenu}
              />
              <Menu
                menuWasSet={menuWasSet}
                openMenu={openMenu}
                selectedCallback={() => setOpenMenu(false)}
              />
              <Component {...props} />
            </div>
          )
          : <Redirect to="/" />
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);
