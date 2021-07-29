import React from 'react';
import PlusIcon from '../../icons/PlusIcon'
import './Buttons.css'

const PlusButton = (props) => {
    return (
        <div className="plus-button" onClick={props.selectedCallback} >
            <PlusIcon />
        </div>
    );
};

export default PlusButton;