import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { participate_in_study_session, cancle_participation_in_study_session, cancel_study_session } from '../../actions/data';
import './StudySessionDetail.css';

const StudySessionDetail = ({ userType, studySession, participate_in_study_session, selectedCallback, sessionType, cancle_participation_in_study_session, cancel_study_session, studySessionParticipants }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        console.log(sessionType, "SESSION TYPE")
        if (studySession) {
            setIsLoaded(true);
            if (studySession.date) {
                let [year, month, day] = studySession.date.split('-');
                let date = day + "." + month + "." + year;
                setFormattedDate(date);
            }
        }
    }, [studySession]);

    const handleStudySessionParticipation = () => {
        console.log("----participate.-----")
        participate_in_study_session(studySession.id);
        selectedCallback();
    }

    const handleCancelStudySessionParticipation = () => {
        console.log("----delte.-----")
        cancle_participation_in_study_session(studySession.id)
        selectedCallback();
    }

    const handleCancelStudySession = () => {
        console.log("CANCEL SESSIOn", studySession.id)
        cancel_study_session(studySession.id);
        selectedCallback();
    }

    return (
        <div >
            {isLoaded && studySession ?
                <div className="study-session-container">
                    {userType === "student" && sessionType && sessionType === "study-session" ?
                        <h2>Do you want to book a slot for this study session?</h2>
                        : userType === "student" && sessionType && sessionType === "booked-study-session" ?
                            <h2>Do you want to cancel your slot in this study session?</h2>
                            : sessionType && sessionType === "cancelled-session" ?
                                <h2>This class was cancelled</h2> :
                                <h2>Study session details</h2>
                    }
                    <div className="study-session-details">
                        <h3>Teacher</h3>
                        <p>{studySession.teacher ? studySession.teacher.first_name + " " + studySession.teacher.last_name : null}</p>
                        <h3>Subject</h3>
                        <p>{studySession.subject ? studySession.subject.name : null}</p>
                        <h3>Language</h3>
                        <p>{studySession.language ? studySession.language.language : null}</p>
                        <h3>Date</h3>
                        <p>{formattedDate ? formattedDate : null}</p>
                        <h3>Time</h3>
                        <p>{studySession.start_time + " - " + studySession.end_time}</p>
                        <h3>Location</h3>
                        <p>{studySession.location ? studySession.location.name : null}</p>
                        <p>{studySession.location ? studySession.location.street + " ," + studySession.location.postal_code + " ," + studySession.location.city : null}</p>
                        <h3>Spots</h3>
                        <p>{studySession.taken_spots + " taken from " + studySession.available_spots}</p>
                        <h3>Description</h3>
                        <p>{studySession.description ? studySession.description : "No description"}</p>
                        {userType === "staff" && studySessionParticipants && studySessionParticipants.length > 0 ?
                            <>
                                <h3>Participants</h3>
                                {studySessionParticipants.map(participant => <p>{participant.user.first_name + " " + participant.user.last_name}</p>)}
                            </>
                            : null}
                    </div>
                    {userType === "student" && sessionType && sessionType === "study-session" ?
                        <button onClick={handleStudySessionParticipation}>Yes, book a slot!</button>
                        : userType === "student" && sessionType && sessionType === "booked-study-session" ?
                            <button onClick={handleCancelStudySessionParticipation} style={{ backgroundColor: "red" }}>Drop out</button>
                            : sessionType && sessionType === "cancelled-session" ?
                                null
                                : <button onClick={handleCancelStudySession} style={{ backgroundColor: "red" }}>Cancel the class</button>}
                </div>
                : <LoadingIcon />
            }
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    studySession: state.data.studySession,
    selectedCallback: props.selectedCallback,
    sessionType: props.sessionType,
    userType: state.auth.userType,
    studySessionParticipants: state.data.studySessionParticipants,
});

export default connect(mapStateToProps, { participate_in_study_session, cancle_participation_in_study_session, cancel_study_session })(StudySessionDetail);