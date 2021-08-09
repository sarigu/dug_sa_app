import React from 'react';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import './Buttons.css';

const BackButton = (props) => (
  <div className="inline-button" style={{ width: props.buttonWidth }} onClick={() => props.selectedCallback()}>
    <ArrowLeft />
    <p>Back</p>
  </div>
);

export default BackButton;
