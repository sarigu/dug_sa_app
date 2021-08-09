import React, { useState } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';
import './FilterComponent.css';

const Checkbox = ({
  optionValue, onSelected, optionId, setButtonText,
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        name={optionValue}
        value={optionValue}
        checked={checked}
        onChange={() => { onSelected(optionId); setChecked(!checked); setButtonText('Apply'); }}
      />
      <label>{optionValue}</label>
    </div>
  );
};

const FilterComponent = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [buttonText, setButtonText] = useState('Apply');

  const addOrRemove = (value) => {
    const index = selectedOptions.indexOf(value);
    if (index === -1) {
      selectedOptions.push(value);
      setSelectedOptions(selectedOptions);
    } else {
      selectedOptions.splice(index, 1);
      setSelectedOptions(selectedOptions);
    }

    props.setSelectedFilter(selectedOptions);
  };

  return (
    <div className="filter-component">
      <div className="filter-component-content">
        <p>{props.title}</p>
        <ArrowDown />
      </div>
      <div className="dropdown-content">
        {props.options && props.filterBy === 'subjects'
          ? props.options.map((option, index) => (
            <Checkbox
              key={index}
              optionId={option.id}
              optionValue={option.name}
              setButtonText={setButtonText}
              onSelected={(optionId) => { addOrRemove(optionId); }}
            />
          )) : props.options && props.filterBy === 'languages'
            ? props.options.map((option, index) => (
              <Checkbox
                key={index}
                optionId={option.id}
                optionValue={option.language}
                setButtonText={setButtonText}
                onSelected={(optionId) => { addOrRemove(optionId); }}
              />
            )) : null}
        <button onClick={() => { props.onApplyFilter(); setButtonText('Applied'); }} style={{ margin: '10px 0', height: '30px' }}>{buttonText}</button>
      </div>
    </div>
  );
};

export default FilterComponent;
