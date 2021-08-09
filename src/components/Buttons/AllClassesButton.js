import React from 'react';
import ArrowRight from '../../assets/icons/ArrowRight';
import './Buttons.css';

const AllClassesButton = (props) => (
  <div className="inline-button" style={{ width: props.buttonWidth }} onClick={() => props.selectedCallback()}>
    <p>All classes</p>
    <ArrowRight />
  </div>
);

export default AllClassesButton;
