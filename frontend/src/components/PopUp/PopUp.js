import React, { useState } from 'react';
import './PopUp.css';
import CloseIcon from '../../icons/CloseIcon';
import Schedule from '../Schedule/Schedule';

const PopUp = (props) => {
    return (
        <div className="pop-up-background">
            <div className="pop-up-container">
                <div onClick={props.selectedCallback} className="closeButton"> <CloseIcon /></div>
                <Schedule />
            </div>
        </div>
    );
};


export default PopUp;