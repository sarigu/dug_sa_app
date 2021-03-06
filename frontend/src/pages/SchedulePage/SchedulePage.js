import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Schedule from '../../components/Schedule/Schedule';
import StudySessionDetail from '../../components/StudySessionDetail/StudySessionDetail';
import StudySessionFeedback from '../../components/StudySessionFeedback/StudySessionFeedback';
import StudySessionForm from '../../components/StudySessionForm/StudySessionForm';
import PopUp from '../../components/PopUp/PopUp';
import BackButton from '../../components/Buttons/BackButton';
import PlusButton from '../../components/Buttons/PlusButton';
import { load_study_sessions, load_study_session } from '../../actions/data';
import './SchedulePage.css';
import StudySessionEdit from '../../components/StudySessionEdit/StudySessionEdit';

const SchedulePage = ({
  user, load_study_sessions, load_study_session, userType,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showStudySessionDetails, setShowStudySessionDetails] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [addStudySession, setAddStudySession] = useState(false);
  const [sessionType, setSessionType] = useState();
  const [addStudySessionFeeback, setAddStudySessionFeedback] = useState(false);
  const [showStudySessionEdit, setShowStudySessionEdit] = useState(false);
  const [afterFeedback, setAfterFeedback] = useState(false);

  const history = useHistory();

  useEffect(() => {
    load_study_sessions(user.id);
  }, []);

  useEffect(() => {
    if (afterFeedback && userType === 'teacher') {
      load_study_sessions(user.id);
    }
    setShowFeedback(false);
  }, [afterFeedback]);

  const handleSelectedStudySession = (studySessionId, sessionType) => {
    load_study_session(studySessionId);
    setSessionType(sessionType);
    setShowStudySessionDetails(true);
    setShowPopup(true);
  };

  const handleAddStudySession = () => {
    setAddStudySession(true);
    setShowPopup(true);
  };

  return (
    <div className="schedule-wrapper">
      <BackButton buttonWidth="70px" selectedCallback={() => history.push('/dashboard')} />
      <h2 style={{ marginTop: '40px' }}>Schedule</h2>
      <Schedule selectedCallback={(studySessionId, sessionType) => handleSelectedStudySession(studySessionId, sessionType)} />
      {userType === 'teacher' ? (
        <div className="plus-button-container">
          <PlusButton selectedCallback={handleAddStudySession} />
        </div>
      )
        : null}
      {showPopup
        ? (
          <PopUp selectedCallback={() => setShowPopup(false)}>
            {showStudySessionDetails
              ? <StudySessionDetail sessionType={sessionType} selectedCallback={() => { setShowFeedback(true); setShowStudySessionDetails(false); setAfterFeedback(false); }} handleEdit={() => { setShowStudySessionEdit(true); setShowStudySessionDetails(false); }} />
              : showFeedback
                ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => { setShowPopup(false); setAfterFeedback(true); }} />
                : addStudySession
                  ? <StudySessionForm selectedCallback={() => { setAddStudySessionFeedback(true); setAddStudySession(false); setSessionType('added-class'); setAfterFeedback(false); }} />
                  : addStudySessionFeeback
                    ? <StudySessionFeedback sessionType={sessionType} selectedCallback={() => { setShowPopup(false); setAfterFeedback(true); }} />
                    : showStudySessionEdit
                      ? <StudySessionEdit selectedCallback={() => { setShowFeedback(true); setShowStudySessionEdit(false); setSessionType('updated-session'); setAfterFeedback(false); }} />
                      : null}
          </PopUp>
        )
        : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  userType: state.auth.userType,
});

export default connect(mapStateToProps, { load_study_sessions, load_study_session })(SchedulePage);
