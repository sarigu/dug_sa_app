import React from 'react';
import './TeacherCard.css';

const TeacherCard = (props) => {
    return (
        <div className="teacher-card" >
            <div className="teacher-information-container">
                <div className="teacher-img"></div>
                <div className="teacher-details">
                    <h4>{props.first_name} {props.last_name}</h4>
                    <h6>Subjects</h6>
                    <h6>Math, Biology</h6>
                    <h6>Languages</h6>
                    <h6>English</h6>
                    <h6>Area</h6>
                    <h6>Grabouw</h6>
                    <button>Check availibility</button>
                </div>
            </div>
            <div>heart</div>
        </div>
    );
};

export default TeacherCard;