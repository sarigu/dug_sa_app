import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import './Menu.css';

const Menu = ({ logout, user, menuWasSet, openMenu }) => {
    const [redirect, setRedirect] = useState(false);

    const handleLogout = () => {
        console.log("clicked logout")
        setRedirect(true);
        logout();
    };

    return (
        <div className={menuWasSet && openMenu ? "menu active" : menuWasSet && !openMenu ? "menu inactive" : "menu"}>
            <div className={menuWasSet && openMenu ? "menu-links-container" : "menu-links-container hidden"} >
                <div>Profile</div>
                <div>Languages</div>
                <div>Settings</div>
                <div>About</div>
                <div href='/' onClick={handleLogout}>Logout</div>
                {redirect ? <Redirect to='/' /> : null}
            </div >
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    user: state.auth.user,
    menuWasSet: props.menuWasSet,
    openMenu: props.openMenu,
});

export default connect(mapStateToProps, { logout })(Menu);