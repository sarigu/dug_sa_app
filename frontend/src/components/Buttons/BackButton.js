import React from 'react';
import ArrowLeft from '../../icons/ArrowLeft'
import './Buttons.css'

const BackButton = (props) => {
    return (
        <div className="inline-button" style={{ width: props.buttonWidth }}>
            <ArrowLeft />
            <p>Back</p>
        </div>
    );
};

export default BackButton;