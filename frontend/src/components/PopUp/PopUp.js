import React, { useState } from 'react';
import './PopUp.css';
import CloseIcon from '../../icons/CloseIcon';

const PopUp = (props) => {
    const { children } = props;
    return (
        <div className="pop-up-background">
            <div className="pop-up-container">
                <div onClick={props.selectedCallback} className="closeButton"> <CloseIcon /></div>
                <div className="pop-up-content">{children}</div>
            </div>
        </div>
    );
};


export default PopUp;