import React, { useState, useEffect } from "react";
import "./Carousel.css";

export const CarouselItem = ({ children }) => {
    return (
        <div className="carousel-item">
            {children}
        </div>
    );
};

const Carousel = (props) => {
    const { children, backToIndex } = props;

    useEffect(() => {
        if (backToIndex) {
            updateIndex(backToIndex);
        }
    }, [backToIndex]);

    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };

    return (
        <div className="carousel" id="carousel">
            <div
                onClick={() => {
                    updateIndex(activeIndex - 1);
                }}
                style={{ cursor: "pointer" }}
            >

            </div>
            <div className="indicators">
                {React.Children.map(children, (child, index) => {
                    return (
                        <div
                            className={`${index === activeIndex ? "circle active" : "circle"}`}
                            onClick={() => {
                                updateIndex(index);
                            }}
                        >
                        </div>
                    );
                })}
            </div>
            <div
                className="inner-container"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "100%" });
                })}
            </div>
            {activeIndex == React.Children.count(children) - 1 ?
                <button style={{ marginTop: "30px" }} onClick={() => { props.onSubmit(); }} >
                    Submit
            </button>
                :
                <button style={{ marginTop: "30px" }} onClick={() => { updateIndex(activeIndex + 1); }} >
                    Continue
            </button>
            }
        </div>
    );
};

export default Carousel;
