import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { useHistory } from "react-router-dom";
import './StudySessionFeedback.css';

const BookingSuccessMessage = () => {
    const history = useHistory();

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127881;</span>
            <h3>You successfully booked your spot!</h3>
            <button onClick={() => history.push("/dashboard")}>Go back</button>
        </div>
    );
};

const BookingFailMessage = () => {
    const history = useHistory();

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127871;</span>
            <h3>Ooops, something went wrong! <br />Please try again later</h3>
            <button onClick={() => history.push("/dashboard")}>Go back</button>
        </div>
    );
};

const CancelStudySessionSuccessMessage = () => {
    const history = useHistory();

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#9989;</span>
            <h3>Your spot in the study session is cancelled!</h3>
            <button onClick={() => history.push("/dashboard")}>Go back</button>
        </div>
    );
};

const CancelStudySessionFailMessage = () => {
    const history = useHistory();

    return (
        <div className="feedback-content">
            <span className="feedback-icon" >&#127871;</span>
            <h3>Ooops, something went wrong! <br />Please try again later</h3>
            <button onClick={() => history.push("/dashboard")}>Go back</button>
        </div>
    );
};


const StudySessionFeedback = ({ isBooked, participationIsDeleted, sessionType }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, [isBooked, participationIsDeleted]);

    return (
        <div className="feedback-container" >
            {isLoaded ?
                <div>
                    {sessionType && sessionType === "study-session" ?
                        <div>
                            {isBooked ? <BookingSuccessMessage /> : <BookingFailMessage />}
                        </div>
                        : <div>
                            {participationIsDeleted ? <CancelStudySessionSuccessMessage /> : <CancelStudySessionFailMessage />}
                        </div>}
                </div>
                : <div className="feedback-loading-icon"><LoadingIcon /></div>}
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    isBooked: state.data.isBooked,
    participationIsDeleted: state.data.participationIsDeleted,
    sessionType: props.sessionType
});

export default connect(mapStateToProps, {})(StudySessionFeedback);