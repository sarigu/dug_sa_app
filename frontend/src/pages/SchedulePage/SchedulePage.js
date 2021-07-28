import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Schedule from '../../components/Schedule/Schedule';
import StudySessionDetail from '../../components/StudySessionDetail/StudySessionDetail';
import StudySessionFeedback from '../../components/StudySessionFeedback/StudySessionFeedback';
import PopUp from '../../components/PopUp/PopUp';
import BackButton from '../../components/Buttons/BackButton';
import { useHistory } from "react-router-dom";
import { load_study_sessions, load_study_session } from '../../actions/data';
import './SchedulePage.css';

const SchedulePage = ({ user, load_study_sessions, load_study_session }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [showStudySessionDetails, setShowStudySessionDetails] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [sessionType, setSessionType] = useState();

    const history = useHistory();

    useEffect(() => {
        console.log("techer", user.id)
        load_study_sessions(user.id)
    }, []);

    const handleSelectedStudySession = (studySessionId, sessionType) => {
        console.log("I HANDLE", studySessionId, sessionType);
        load_study_session(studySessionId);
        setSessionType(sessionType);
        setShowStudySessionDetails(true);
        setShowPopup(true);
    }


    return (
        <div className="schedule-wrapper" >
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <h2>Schedule</h2>
            <Schedule selectedCallback={(studySessionId, sessionType) => handleSelectedStudySession(studySessionId, sessionType)} />
            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)} >
                    {showStudySessionDetails ? <StudySessionDetail sessionType={sessionType} selectedCallback={() => { setShowFeedback(true); setShowStudySessionDetails(false) }} />
                        : showFeedback ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => setShowPopup(false)} />
                            : null}
                </PopUp>
                : null
            }
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { load_study_sessions, load_study_session })(SchedulePage);