import React from 'react';
import { useHistory } from 'react-router-dom';
import './Logo.css';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  const history = useHistory();
  return (
    <img alt="dug-logo" src={logo} className="logo-img" onClick={() => history.push('/')} />
  );
};

export default Logo;
