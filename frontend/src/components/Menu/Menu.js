import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import './Menu.css';

const Menu = ({
  logout, menuWasSet, openMenu, selectedCallback, userType,
}) => {
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const handleLogout = () => {
    setRedirect(true);
    logout();
  };

  return (
    <div className={menuWasSet && openMenu ? 'menu active' : menuWasSet && !openMenu ? 'menu inactive' : 'menu'}>
      <div className={menuWasSet && openMenu ? 'menu-links-container' : 'menu-links-container hidden'}>
        <div onClick={() => { history.push('/dashboard'); selectedCallback(); }}>Home</div>
        {userType === 'teacher' || userType === 'student'
          ? <div onClick={() => { history.push('/all-classes'); selectedCallback(); }}>All classes</div>
          : null}
        <div onClick={() => { history.push('/work-in-progress'); selectedCallback(); }}>Profile</div>
        <div onClick={() => { history.push('/work-in-progress'); selectedCallback(); }}>Language</div>
        <div onClick={() => { history.push('/work-in-progress'); selectedCallback(); }}>Settings</div>
        <div onClick={() => { history.push('/about'); selectedCallback(); }}>About</div>
        <div href="/" onClick={handleLogout}>Logout</div>
        {redirect ? <Redirect to="/" /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.auth.user,
  userType: state.auth.userType,
  menuWasSet: props.menuWasSet,
  openMenu: props.openMenu,
  selectedCallback: props.selectedCallback,
});

export default connect(mapStateToProps, { logout })(Menu);
