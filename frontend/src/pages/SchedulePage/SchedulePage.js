import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Schedule from '../../components/Schedule/Schedule';
import StudySessionDetail from '../../components/StudySessionDetail/StudySessionDetail';
import StudySessionFeedback from '../../components/StudySessionFeedback/StudySessionFeedback';
import StudySessionForm from '../../components/StudySessionForm/StudySessionForm';
import PopUp from '../../components/PopUp/PopUp';
import BackButton from '../../components/Buttons/BackButton';
import PlusButton from '../../components/Buttons/PlusButton';
import { useHistory } from "react-router-dom";
import { load_study_sessions, load_study_session } from '../../actions/data';
import './SchedulePage.css';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

const SchedulePage = ({ user, load_study_sessions, load_study_session, isCreated }) => {

    const [showPopup, setShowPopup] = useState(false);
    const [showStudySessionDetails, setShowStudySessionDetails] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [addStudySession, setAddStudySession] = useState(false);
    const [sessionType, setSessionType] = useState();
    const [addStudySessionFeeback, setAddStudySessionFeedback] = useState(false);
    const [addStudySessionFeebackIsLoaded, setAddStudySessionFeedbackIsLoaded] = useState(false);

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

    const handleAddStudySession = () => {
        console.log("---add---wuhuu");
        setAddStudySession(true);
        setShowPopup(true);
    }


    return (
        <div className="schedule-wrapper" >
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <h2>Schedule</h2>
            <Schedule selectedCallback={(studySessionId, sessionType) => handleSelectedStudySession(studySessionId, sessionType)} />
            <div className="plus-button-container">  <PlusButton selectedCallback={handleAddStudySession} /></div>
            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)} >
                    {showStudySessionDetails ? <StudySessionDetail sessionType={sessionType} selectedCallback={() => { setShowFeedback(true); setShowStudySessionDetails(false) }} />
                        : showFeedback ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => setShowPopup(false)} /> :
                            addStudySession ? <StudySessionForm selectedCallback={() => { console.log("NEXT STEP"); setAddStudySessionFeedback(true); setAddStudySession(false); setSessionType("added-class") }} />
                                : addStudySessionFeeback ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => setShowPopup(false)} />
                                    : null}
                </PopUp>
                : null
            }
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    user: state.auth.user,
    isCreated: state.data.isCreated,
});

export default connect(mapStateToProps, { load_study_sessions, load_study_session })(SchedulePage);