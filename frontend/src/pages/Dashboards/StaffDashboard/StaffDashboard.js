import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import '../Dashboard.css';
import TeacherCard from '../../../components/TeacherCard/TeacherCard';
import PopUp from '../../../components/PopUp/PopUp';
import TeacherDetails from '../../../components/TeacherDetails/TeacherDetails';
import ApprovalFeedback from '../../../components/ApprovalFeedback/ApprovalFeedback';
import { load_new_teachers, load_teacher_details } from '../../../actions/data';

const StaffDashboard = ({ load_new_teachers, load_teacher_details }) => {
    const [teachersListShortened, setTeachersListShortened] = useState();
    const [teachersList, setTeachersList] = useState();
    const [index, setIndex] = useState(5);
    const [hideShowMore, setHideShowMore] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        load_new_teachers().then((res) => {
            if (res && res.length > 0) {
                setTeachersListShortened(res.slice(0, 5));
                setTeachersList(res)
                if (res.length <= index) {
                    setHideShowMore(true);
                }
            } else {
                setHideShowMore(true)
            }
        })
    }, []);

    const loadMoreTeachers = () => {
        const newIndex = index + 5;
        if (teachersList.length > newIndex - 1) {
            const newList = teachersListShortened.concat(teachersList.slice(index, newIndex));
            setIndex(newList);
            setTeachersListShortened(newList);
        }
        if (teachersList.length <= newIndex || teachersList.length <= index) {
            setHideShowMore(true);
        }
    }

    const handleSelectedTeacher = (teacherId) => {
        console.log("handleSelectedTeacher---", teacherId)
        load_teacher_details(teacherId);
        setShowPopup(true);
        setShowDetails(true);
    }

    return (
        <div>
            <section className="teachers-container">
                <div className="heading-wrapper" style={{ width: "300px" }}>
                    <h2>New teachers</h2>
                    <div>
                        <div className="numberCircle"><p>{teachersList ? teachersList.length : "0"}</p></div>
                    </div>
                </div>
                {teachersList ? teachersListShortened.map((teacher, index) =>
                    <TeacherCard
                        key={index}
                        view={"overview"}
                        user={teacher}
                        profileImage={teacher.profile_image}
                        selectedCallback={(teacherId) => { handleSelectedTeacher(teacherId) }}
                    />
                ) :
                    <p>No new teachers applied</p>
                }
                {hideShowMore ? null : <p onClick={loadMoreTeachers} style={{ cursor: "pointer" }}>Show more</p>}
            </section>
            <section className="cards-container">
                <Card emoji={<span>&#128198;</span>} title={"Schedule"} link={"/schedule"} />
                <Card emoji={<span>&#127891;</span>} title={"All teachers"} link={"/teachers"} />
                <Card emoji={<span>&#128587;&#127998;</span>} title={"Add staff"} />
                <Card emoji={<span>&#128172;</span>} title={"Add motivational quote"} />
                <Card emoji={<span>&#128272;</span>} title={"Edit access codes"} />
            </section>
            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)}>
                    {showDetails ? <TeacherDetails selectedCallback={() => { setShowFeedback(true); setShowDetails(false) }} /> :
                        showFeedback ? <ApprovalFeedback selectedCallback={() => setShowPopup(false)} />
                            : null}
                </PopUp>
                : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { load_new_teachers, load_teacher_details })(StaffDashboard);