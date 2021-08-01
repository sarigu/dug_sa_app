import React, { useRef, useState } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';
import ArrowUp from '../../assets/icons/ArrowUp';
import './Accordion.css';

const Accordion = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const accordionRef = useRef();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (accordionRef.current.style.maxHeight === '2000px') {
      accordionRef.current.style.maxHeight = null;
      accordionRef.current.style.padding = '0px';
    } else {
      accordionRef.current.style.maxHeight = '2000px';
      accordionRef.current.style.padding = '0px 20px 20px 20px';
    }
  };

  return (
    <div>
      <div className="accordion" onClick={toggleAccordion}>
        <h3>{props.title}</h3>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </div>
      <div ref={accordionRef} className="accordion-content">
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
