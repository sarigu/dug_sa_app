import React from 'react';
import { connect } from 'react-redux';
import Burgermenu from '../../icons/Burgermenu';
import CloseIcon from '../../icons/CloseIcon';
import { useHistory } from "react-router-dom";
import './Navbar.css';

const Navbar = ({ user, onMenuClick, menuShows }) => {
    const history = useHistory();
    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <h2 style={{ cursor: "pointer" }} onClick={() => { history.push("/dashboard") }}>Hi, {user ? user.first_name : null}<span>&#128075;&#127998;</span> </h2>
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