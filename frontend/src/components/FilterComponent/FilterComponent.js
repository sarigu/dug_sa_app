import React from 'react';
import ArrowDown from '../../icons/ArrowDown'
import './FilterComponent.css';


const FilterComponent = (props) => {
    return (
        <div className="filter-component">
            <p>{props.title}</p>
            <ArrowDown />
        </div>
    );
};

export default FilterComponent;