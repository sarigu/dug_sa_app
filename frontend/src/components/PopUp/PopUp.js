import React from 'react';
import './PopUp.css';
import CloseIcon from '../../assets/icons/CloseIcon';

const PopUp = (props) => {
  const { children } = props;
  return (
    <div className="pop-up-background">
      <div className="pop-up-container">
        <div onClick={props.selectedCallback} className="closeButton">
          {' '}
          <CloseIcon />
        </div>
        <div className="pop-up-content">{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
