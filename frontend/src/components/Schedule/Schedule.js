import React, { useState, useEffect } from 'react';
import './Schedule.css';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux';
import { load_study_sessions } from '../../actions/data';

const localizer = momentLocalizer(moment)

function Event({ event }) {

    return (
        <span className="event-card" >
            <div style={{ width: "70%" }} className="event-card-content">
                <div style={{ fontWeight: 600 }}>{event.title}</div>
                {event.type == "booked-study-session" ? <div>{event.description}</div> : null}
                <div>{event.location}</div>
                {event.type == "study-session" ? <div>{event.taken_spots + " taken from "} {event.available_spots + " spots"} </div> : null}
            </div>
            <div style={{ width: "30%", alignSelf: "center" }}> {event.type == "study-session" ? <button>Book</button> : <span style={{ fontSize: "30px" }}>&#128161;</span>}</div>
        </span>
    )
}

function EventAgenda({ event }) {
    return (
        <span>
            <strong>{event.title}</strong>
        </span>
    )
}

const StudySessionCalendar = props => (
    <div style={{ width: "100%", margin: "50px auto 50px auto" }}>
        <Calendar
            localizer={localizer}
            events={props.list}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
            defaultView={Views.DAY}
            defaultDate={moment().toDate()}
            views={{ month: true, day: true }}
            eventPropGetter={event => {
                const eventData = props.list.find(ot => ot.id === event.id);
                const type = eventData.type;
                return { className: type };
            }}
            onSelectEvent={event => props.selectedCallback(event.id, event.type)}
            components={{
                event: EventAgenda,
                day: { event: Event },
            }}

        //onView={event => { console.log("VIEW", event, event === "day") }}
        />
    </div>
)

const Schedule = ({ props, studySessions, bookedStudySessions }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        console.log("FINALLY", studySessions, bookedStudySessions)
        if (studySessions && bookedStudySessions) {
            const allStudySessionSlots = []
            studySessions.forEach((studySession) => {
                let start = (moment(studySession.date + " " + studySession.start_time).toDate())
                let end = (moment(studySession.date + " " + studySession.end_time).toDate())
                //let start_at = (new Date(date + " " + studySession));
                //let end_at
                console.log("DATE", start)
                allStudySessionSlots.push({ id: studySession.id, title: studySession.subject.name + " with " + studySession.teacher.first_name + " " + studySession.teacher.last_name, start: start, end: end, type: "study-session", location: "at " + studySession.location.name, available_spots: studySession.available_spots, taken_spots: studySession.taken_spots })
            })

            bookedStudySessions.forEach((studySession) => {
                let start = (moment(studySession.date + " " + studySession.start_time).toDate())
                let end = (moment(studySession.date + " " + studySession.end_time).toDate())
                //let start_at = (new Date(date + " " + studySession));
                //let end_at
                console.log("DATE", start)
                allStudySessionSlots.push({ id: studySession.id, title: "You have a class here", start: start, end: end, type: "booked-study-session", description: studySession.subject.name + " with " + studySession.teacher.first_name + " " + studySession.teacher.last_name, location: "at " + studySession.location.name, available_spots: studySession.available_spots, taken_spots: studySession.taken_spots })
            })
            console.log("studySession", allStudySessionSlots)
            setList(allStudySessionSlots, bookedStudySessions)
        }

    }, [studySessions, bookedStudySessions]);

    return (
        <div >
            <StudySessionCalendar list={list} selectedCallback={(studySessionId, sessionType) => { props.selectedCallback(studySessionId, sessionType) }} />
        </div>
    );
};


const mapStateToProps = (state, props) => ({
    props: props,
    studySessions: state.data.studySessions,
    bookedStudySessions: state.data.bookedStudySessions,
});

export default connect(mapStateToProps, null)(Schedule);

