import React from 'react';
import ArrowRight from '../../../icons/ArrowRight'
import '../../Buttons/Buttons.css'

const AllClassesButton = (props) => {
    return (
        <div className="inline-button" style={{ width: props.buttonWidth }}>
            <p>All classes</p>
            <ArrowRight />
        </div>
    );
};


export default AllClassesButton;