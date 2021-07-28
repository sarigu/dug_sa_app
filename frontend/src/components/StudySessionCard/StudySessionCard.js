import React, { useEffect, useState } from 'react';
import './StudySessionCard.css';


const StudySessionCard = (props) => {

    return (
        <div className={props.isActive ? "reminder-card" : "reminder-card cancelled-card"} style={{ backgroundColor: `${props.subjectColor}` }}>
            {!props.isActive ? <div className="cancelled-heading-wrapper"><strong>Cancelled</strong><span>&#128680;</span></div> : null}
            <strong>{props.subject + " with " + props.teacher.first_name + " " + props.teacher.last_name}</strong>
            <p>{props.startTime + " - " + props.endTime + " on " + props.date}</p>
            <p>{"at " + props.location}</p>
        </div>
    );
};



export default StudySessionCard;