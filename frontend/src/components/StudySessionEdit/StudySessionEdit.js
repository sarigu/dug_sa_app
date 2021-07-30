import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { load_subjects, load_languages } from '../../actions/auth';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { edit_study_session } from '../../actions/data';
import './StudySessionEdit.css';

const StudySessionEdit = ({ load_subjects, load_languages, subjects, languages, userType, studySession, edit_study_session, selectedCallback, studySessionParticipants }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [formattedDate, setFormattedDate] = useState();
    const [language, setLanguage] = useState();
    const [subject, setSubject] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const [wordCountdown, setWordCountdown] = useState(500);
    const [isActive, setIsActive] = useState(true);


    useEffect(() => {
        load_subjects();
        load_languages();
    }, []);


    useEffect(() => {
        if (studySession) {
            setIsLoaded(true);
            if (studySession.date) {
                let [year, month, day] = studySession.date.split('-');
                let date = day + "." + month + "." + year;
                setFormattedDate(date);
            }
            setDescription(studySession.description);
            setStartTime(studySession.start_time);
            setEndTime(studySession.end_time);
            setSubject(studySession.subject.name);
            setLanguage(studySession.language.language);
            setError(false);

        }
    }, [studySession]);


    const handleUpdate = () => {
        console.log(language, subject, startTime, endTime, error, description, isActive)

        console.log(error, startTime > endTime, startTime == endTime)
        if (error || startTime > endTime || startTime == endTime) {
            console.log("ERR")
            setError(true);
        } else {
            console.log("UPDATE______")
            //call function
            edit_study_session(studySession.id, language, subject, startTime, endTime, description, isActive);
            selectedCallback();
        }

    }

    return (
        <div >
            {isLoaded && studySession ?
                <div className="study-session-container">
                    <h2>Update the class</h2>
                    {error ? <div className="error-message">Oops, something went wrong. Please check all the fields again</div> : null}
                    <div className="study-session-details">
                        <h3>Teacher</h3>
                        <p>{studySession.teacher ? studySession.teacher.first_name + " " + studySession.teacher.last_name : null}</p>
                        <h3>Subject</h3>
                        <select onChange={e => { setError(false); setSubject(e.target.value) }}>{subjects && subjects.map((subject, index) => <option key={index} value={subject.name}>{subject.name}</option>)}</select>
                        <h3>Language</h3>
                        <select onChange={e => { setError(false); setLanguage(e.target.value) }}>{languages && languages.map((languages, index) => <option key={index} value={languages.language}>{languages.language}</option>)}</select>
                        <h3>Date</h3>
                        <p>{formattedDate ? formattedDate : null}</p>
                        <h3>Start Time</h3>
                        <input
                            type="time"
                            min="08:00"
                            max="23:00"
                            value={startTime}
                            onChange={e => { setError(false); setStartTime(e.target.value) }}
                        />

                        <h3>End Time</h3>
                        <input
                            type="time"
                            min="08:00"
                            max="23:00"
                            value={endTime}
                            onChange={e => { setError(false); setEndTime(e.target.value) }}
                        />
                        <h3>Location</h3>
                        <p>{studySession.location ? studySession.location.name : null}</p>
                        <p>{studySession.location ? studySession.location.street + " ," + studySession.location.postal_code + " ," + studySession.location.city : null}</p>
                        <h3>Spots</h3>
                        <p>{studySession.taken_spots + " taken from " + studySession.available_spots}</p>
                        <h3>Description</h3>
                        <textarea
                            onKeyUp={(e) => 500 - e.target.value.length > 0 ? setWordCountdown(500 - e.target.value.length) : setWordCountdown(0)}
                            rows="10" cols="30"
                            placeholder="Tell the students what the class will be about"
                            maxlength="500"
                            value={description}
                            onChange={e => { setError(false); setDescription(e.target.value) }}
                        />
                        {userType === "staff" && studySessionParticipants && studySessionParticipants.length > 0 ?
                            <>
                                <h3>Participants</h3>
                                {studySessionParticipants.map(participant => <p>{participant.user.first_name + " " + participant.user.last_name}</p>)}
                            </>
                            : null}
                    </div>
                    <button onClick={handleUpdate}>Update</button>
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
    handleEdit: props.handleEdit,
    subjects: state.auth.subjects,
    languages: state.auth.languages,
});

export default connect(mapStateToProps, { load_subjects, load_languages, edit_study_session })(StudySessionEdit);