import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import './Navbar.css';

const Navbar = ({ logout, user, userType }) => {
    const [redirect, setRedirect] = useState(false);

    const handleLogout = () => {
        logout();
        setRedirect(true);
    };

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <h2>Hi, {user ? user.first_name : null}<span>&#128075;&#127998;</span> </h2>
                <div>Burger</div>
            </div>
            <nav>
                <a href='/' onClick={handleLogout}>Logout</a>
            </nav>
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </div >
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);