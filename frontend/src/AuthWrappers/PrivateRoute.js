import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Menu from '../components/Menu/Menu';
import './PrivateRoute.css';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [menuWasSet, setMenuWasSet] = useState(false);

    return (
        console.log("isAuthenticated", isAuthenticated),
        console.log("openMenu", openMenu),
        <Route {...rest} render={props => (
            isAuthenticated ?
                <div className="page-wrapper">
                    <Navbar onMenuClick={() => { setOpenMenu(!openMenu); setMenuWasSet(true) }} menuShows={openMenu} />
                    <div className={menuWasSet && openMenu ? "menu active" : menuWasSet && !openMenu ? "menu inactive" : "menu"}><Menu /></div>
                    <div className="content-container">
                        <Component {...props} />
                    </div>
                </div>
                : <Redirect to='/' />
        )} />
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(PrivateRoute);