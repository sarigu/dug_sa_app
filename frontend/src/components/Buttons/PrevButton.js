import React from 'react';
import ArrowLeft from '../../icons/ArrowLeft'
import './Buttons.css'

const PrevButton = () => {
    return (
        <div className="inline-button prev-button">
            <ArrowLeft />
        </div>
    );
};

export default PrevButton;