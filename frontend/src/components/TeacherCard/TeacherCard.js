import React from 'react';
import './TeacherCard.css';
import Heart from '../../icons/Heart';
import FilledHeart from '../../icons/FilledHeart';

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
                    <div className="teacher-image" style={{ backgroundImage: `url(${props.profileImage})` }}></div>
                    <div className="teacher-details">
                        <h4>{props.firstName} {props.lastName}</h4>
                        <h5>Subjects</h5>
                        {props.subjects ? props.subjects.map((subject, index) => <h5 key={index} className="subtext">{subject.name}</h5>) : <h5>No subjects</h5>}
                        <h5>Languages</h5>
                        {props.languages ? props.languages.map((language, index) => <h5 key={index} className="subtext">{language.language}</h5>) : <h5>No languages</h5>}
                        <h5>Area</h5>
                        <h5 className="subtext">{props.city}</h5>
                        <button className="availibility-button">Check availibility</button>
                    </div>
                    <div style={{ alignSelf: "flex-start", marginRight: "10px" }}> <Heart /></div>
                </div>
            </div>
        }</div>
    );
};

export default TeacherCard;