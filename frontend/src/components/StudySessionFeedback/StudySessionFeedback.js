import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { useHistory, useLocation } from "react-router-dom";
import './StudySessionFeedback.css';

const BookingSuccessMessage = (props) => {

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127881;</span>
            <h3>You successfully booked your spot!</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};

const FailMessage = (props) => {

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127871;</span>
            <h3>Ooops, something went wrong! <br />Please try again later</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};

const DropOutOfStudySessionSuccessMessage = (props) => {


    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#9989;</span>
            <h3>Your spot in the study session is cancelled!</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};


const CancelStudySessionSuccessMessage = (props) => {


    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#9989;</span>
            <h3>The study session is cancelled!</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};

const CreatedStudySessionSuccessMessage = (props) => {
    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#128218;</span>
            <h3>The new study session was created!</h3>
            <button onClick={() => { window.location.href = "/dashboard" }}>Go back</button>
        </div>
    );
};



const StudySessionFeedback = ({ isBooked, participationIsDeleted, sessionType, userType, isCancelled, selectedCallback, isCreated }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [isBooked, participationIsDeleted]);

    return (
        console.log(isCancelled, "isCancelled", userType, sessionType),
        <div className="feedback-container" >
            {isLoaded ?
                <div>
                    {userType === "student" && sessionType && sessionType === "study-session" ?
                        <div>
                            {isBooked ? <BookingSuccessMessage selectedCallback={selectedCallback} /> : <FailMessage selectedCallback={selectedCallback} />}
                        </div>
                        : userType === "student" && sessionType && sessionType !== "study-session" ?
                            <div>
                                {participationIsDeleted ? <DropOutOfStudySessionSuccessMessage selectedCallback={selectedCallback} /> : <FailMessage selectedCallback={selectedCallback} />}
                            </div>
                            : userType === "teacher" || userType === "staff" && sessionType && sessionType === "teacher-study-session" ?
                                <div>
                                    {isCancelled ? <CancelStudySessionSuccessMessage selectedCallback={selectedCallback} /> : <FailMessage selectedCallback={selectedCallback} />}
                                </div>
                                : userType === "teacher" || userType === "staff" && sessionType && sessionType === "added-class" ?
                                    <div>
                                        {isCreated ? <CreatedStudySessionSuccessMessage selectedCallback={selectedCallback} /> : <FailMessage selectedCallback={selectedCallback} />}
                                    </div>
                                    : <FailMessage selectedCallback={selectedCallback} />}
                </div>
                : <div className="feedback-loading-icon"><LoadingIcon /></div>}
        </div>
    );


};


const mapStateToProps = (state, props) => ({
    userType: state.auth.userType,
    isBooked: state.data.isBooked,
    isCancelled: state.data.isCancelled,
    participationIsDeleted: state.data.participationIsDeleted,
    sessionType: props.sessionType,
    selectedCallback: props.selectedCallback,
    isCreated: state.data.isCreated,
});

export default connect(mapStateToProps, {})(StudySessionFeedback);