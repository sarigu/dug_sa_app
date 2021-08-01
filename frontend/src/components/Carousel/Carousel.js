import React, { useState, useEffect } from 'react';
import './Carousel.css';

export const CarouselItem = ({ children }) => (
  <div className="carousel-item">
    {children}
  </div>
);

const Carousel = (props) => {
  const { children, backToIndex } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (backToIndex) {
      updateIndex(backToIndex);
    }
  }, [backToIndex]);

  return (
    <div className="carousel" id="carousel">
      <div
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
        style={{ cursor: 'pointer' }}
      />
      <div className="indicators">
        {React.Children.map(children, (child, index) => (
          <div
            className={`${index === activeIndex ? 'circle active-circle' : 'circle'}`}
            onClick={() => {
              updateIndex(index);
            }}
          />
        ))}
      </div>
      <div
        className="inner-container"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child) => React.cloneElement(child, { width: '100%' }))}
      </div>
      {activeIndex === React.Children.count(children) - 1
        ? (
          <button style={{ marginTop: '30px' }} onClick={() => { props.onSubmit(); }}>
            Submit
          </button>
        )
        : (
          <button style={{ marginTop: '30px' }} onClick={() => { updateIndex(activeIndex + 1); }}>
            Continue
          </button>
        )}
    </div>
  );
};

export default Carousel;
