import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import './Menu.css';

const Menu = ({ logout, user, }) => {
    const [redirect, setRedirect] = useState(false);

    const handleLogout = () => {
        console.log("clicked logout")
        setRedirect(true);
        logout();
    };

    return (
        <div className="menu-links-container">
            <div>Profile</div>
            <div>Languages</div>
            <div>Settings</div>
            <div>About</div>
            <div href='/' onClick={handleLogout}>Logout</div>
            {redirect ? <Redirect to='/' /> : null}
        </div >
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Menu);