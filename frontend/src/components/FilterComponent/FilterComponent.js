import React from 'react';
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
                Drop Down
                Drop Down
                Drop Down
                Drop Down
                Drop Down
                Drop Down
            </div>
        </div>
    );
};

export default FilterComponent;