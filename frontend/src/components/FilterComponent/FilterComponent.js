import React, { useState } from 'react';
import ArrowDown from '../../icons/ArrowDown'
import './FilterComponent.css';

const Checkbox = ({ optionValue, onSelected, optionId }) => {
    const [checked, setChecked] = useState(false);
    return (
        <div className="checkbox-container">
            <input
                type="checkbox"
                name={optionValue}
                value={optionValue}
                checked={checked}
                onChange={() => { onSelected(optionId); setChecked(!checked) }}
            />
            <label >{optionValue}</label>
        </div>
    );
};


const FilterComponent = (props) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const addOrRemove = (value) => {
        let index = selectedOptions.indexOf(value);
        if (index === -1) {
            selectedOptions.push(value);
            setSelectedOptions(selectedOptions)
        } else {
            selectedOptions.splice(index, 1);
            setSelectedOptions(selectedOptions)
        }
    }

    return (
        <div className="filter-component">
            <div className="filter-component-content" >
                <p>{props.title}</p>
                <ArrowDown />
            </div>
            <div className="dropdown-content">
                {props.options && props.filterBy === "subjects" ? props.options.map((option, index) =>
                    <Checkbox optionId={option.id} optionValue={option.name} onSelected={(optionId) => { addOrRemove(optionId) }} />
                ) : null}
                <button onClick={() => props.onSelectedFilter(selectedOptions, props.filterBy)} style={{ margin: "20px 0", height: "30px" }}>Apply</button>
            </div>
        </div>
    );
};

export default FilterComponent;