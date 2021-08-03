import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  const history = useHistory();
  return (
    <img alt="dug-logo" src={logo} style={{ cursor: 'pointer', width: '6%', float: 'right' }} onClick={() => history.push('/')} />
  );
};

export default Logo;
