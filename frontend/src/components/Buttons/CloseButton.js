import React from 'react';
import CloseIcon from '../../icons/CloseIcon'
import './Buttons.css'

const CloseButton = (props) => {
    return (
        <div onClick={() => props.selectedCallback()}>
            <CloseIcon />
        </div>
    );
};

export default CloseButton;