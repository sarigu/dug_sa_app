import React, { useEffect } from 'react';
import ArrowDown from '../../icons/ArrowDown'
import './FilterComponent.css';


const FilterComponent = (props) => {

    return (
        <div className="filter-component">
            <div className="filter-component-content" >
                <p>{props.title}</p>
                <ArrowDown />
            </div>
            <div className="dropdown-content">
                drop down contents
            </div>
        </div>
    );
};

export default FilterComponent;