import React, { useEffect, useState } from 'react';
import { load_subjects, load_languages } from '../../actions/auth';
import { create_study_session } from '../../actions/data';
import { connect } from 'react-redux';
import './StudySessionForm.css';
import { validateYear } from '../SignUpForms/utils';


const StudySessionForm = ({ props, load_subjects, load_languages, subjects, languages, create_study_session }) => {
    const [date, setDate] = useState();
    const [language, setLanguage] = useState();
    const [subject, setSubject] = useState();
    const [spots, setSpots] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [error, setError] = useState(false);
    const [description, setDescription] = useState("");
    const [dataIsChecked, setDataIsChecked] = useState(false);
    const [wordCountdown, setWordCountdown] = useState(500);


    useEffect(() => {
        load_subjects();
        load_languages();
    }, []);

    useEffect(() => {
        console.log("EFEFCT", dataIsChecked)
        if (dataIsChecked) {

            console.log("SUBMIT", date, language, subject, spots, startTime, endTime, error)
            if (!error && date && language && subject && spots && startTime && endTime) {
                create_study_session(date, language, subject, spots, startTime, endTime, description)
                props.selectedCallback();
            } else {
                setError(true);
            }
        }
    }, [dataIsChecked]);

    const handleSubmit = () => {
        let dataCheck = checkData();
        if (dataCheck) {
            setDataIsChecked(true); console.log("data was checked")
        }
    }

    const checkData = () => {

        if (!language) {
            console.log("set lang", languages[0].language)
            setLanguage(languages[0].language)
        }

        if (!subject) {
            console.log("set sub", subjects[0].name)
            setSubject(subjects[0].name)
        }

        if (date) {
            if (!validateYear(date)) {
                console.log("year not validated")
                setError(true);
            }

        }

        if (startTime > endTime || startTime == endTime) {
            console.log("start before end")
            setError(true);
        }

        if (spots <= 0) {
            console.log("too little spots")
            setError(true);
        }

        return true;
    }
    return (
        <div>
            <h2>Add a study session</h2>
            {error ? <div className="error-message">Oops, something went wrong. Please check all the fields again</div> : null}
            <div>
                <h3>Subject</h3>
                <select onChange={e => { setError(false); setSubject(e.target.value) }}>{subjects && subjects.map((subject, index) => <option key={index} value={subject.name}>{subject.name}</option>)}</select>
                <h3>Language</h3>
                <select onChange={e => { setError(false); setLanguage(e.target.value) }}>{languages && languages.map((languages, index) => <option key={index} value={languages.language}>{languages.language}</option>)}</select>
                <h3>Start Time</h3>
                <input
                    type="time"
                    min="08:00"
                    max="23:00"
                    onChange={e => { setError(false); setStartTime(e.target.value) }}
                />
                <h3>End Time</h3>
                <input
                    type="time"
                    min="08:00"
                    max="23:00"
                    onChange={e => { setError(false); setEndTime(e.target.value) }}
                />
                <h3>Date</h3>
                <input
                    placeholder="DD.MM.YYYY"
                    type="text"
                    value={date}
                    onChange={e => {
                        setError(false);
                        let changedDate = e.target.value;
                        changedDate = changedDate
                            .replace(/^(\d\d)(\d)$/g, "$1/$2")
                            .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
                            .replace(/[^\d\/]/g, "");
                        setDate(changedDate);
                    }}
                />
                <h3>Location</h3>
                <p>Dug SA facility</p>
                <h3>Available Spots</h3>
                <input
                    type="number"
                    min="1"
                    onChange={e => { setError(false); setSpots(e.target.value) }}
                />
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                    <h3 style={{ marginRight: "20px" }}>Description</h3>
                    <span>Words left: {wordCountdown}</span>
                </div>

                <textarea
                    onKeyUp={(e) => 500 - e.target.value.length > 0 ? setWordCountdown(500 - e.target.value.length) : setWordCountdown(0)}
                    rows="10" cols="30"
                    placeholder="Tell the students what the class will be about"
                    maxlength="500"
                    onChange={e => { setError(false); setDescription(e.target.value) }}
                />
            </div>
            <button onClick={handleSubmit}>Add</button>
        </div>
    );
};



const mapStateToProps = (state, props) => ({
    props: props,
    subjects: state.auth.subjects,
    languages: state.auth.languages,
});

export default connect(mapStateToProps, { load_subjects, load_languages, create_study_session })(StudySessionForm);