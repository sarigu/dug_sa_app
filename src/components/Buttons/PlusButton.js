import React from 'react';
import PlusIcon from '../../assets/icons/PlusIcon';
import './Buttons.css';

const PlusButton = (props) => (
  <div className="plus-button" onClick={props.selectedCallback}>
    <PlusIcon />
  </div>
);

export default PlusButton;
