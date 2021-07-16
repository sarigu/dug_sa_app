import React from 'react';
import './TeacherCard.css';

const TeacherCard = (props) => {
    return (
        <div> {props.view === "overview" ?
            <div className="teacher-card small" >
                <div className="teacher-information-container small-container">
                    <div className="teacher-image" style={{ backgroundImage: `url(${props.profileImage})` }}></div>
                    <div className="teacher-details">
                        <h4>{props.firstName} {props.lastName}</h4>
                    </div>
                </div>
            </div>
            :
            <div className="teacher-card big" >
                <div className="teacher-information-container big-container">
                    <div className="teacher-img"></div>
                    <div className="teacher-details">
                        <h4>{props.firstName} {props.lastName}</h4>
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
        }</div>
    );
};

export default TeacherCard;