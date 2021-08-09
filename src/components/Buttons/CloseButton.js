import React from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';
import './Buttons.css';

const CloseButton = (props) => (
  <div onClick={() => props.selectedCallback()}>
    <CloseIcon />
  </div>
);

export default CloseButton;
