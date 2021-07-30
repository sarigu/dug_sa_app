import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Burgermenu from '../../icons/Burgermenu';
import CloseIcon from '../../icons/CloseIcon';
import './Navbar.css';

const Navbar = ({ user, onMenuClick, menuShows }) => {

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <h2>Hi, {user ? user.first_name : null}<span>&#128075;&#127998;</span> </h2>
                <div onClick={() => { onMenuClick() }}>{menuShows ? <CloseIcon /> : <Burgermenu />}</div>
            </div>
        </div >
    );
};

const mapStateToProps = (state, props) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    onMenuClick: props.onMenuClick,
    menuShows: props.menuShows
});

export default connect(mapStateToProps, null)(Navbar);