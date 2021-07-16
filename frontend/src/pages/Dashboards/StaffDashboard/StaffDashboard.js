import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Card from '../../../components/Cards/Cards'
import '../Dashboard.css';
import TeacherCard from '../../../components/TeacherCard/TeacherCard'
import { load_new_teachers } from '../../../actions/data';

const StaffDashboard = ({ load_new_teachers }) => {
    const [teachersListShortened, setTeachersListShortened] = useState();
    const [teachersList, setTeachersList] = useState();
    const [index, setIndex] = useState(5);
    const [hideShowMore, setHideShowMore] = useState(false);

    useEffect(() => {
        load_new_teachers().then((res) => {
            if (res.length > 0) {
                setTeachersListShortened(res.slice(0, 5));
                setTeachersList(res)

                if (res.length <= index) {
                    setHideShowMore(true);
                }

            } else {
                setHideShowMore(true)
            }
        }
        )
    }, []);

    const loadMoreTeacher = () => {
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
                        firstName={teacher.first_name}
                        lastName={teacher.last_name}
                        profileImage={teacher.profile_image}
                    />) : <p>No new teachers applied</p>}
                {hideShowMore ? null : <p onClick={loadMoreTeacher} style={{ cursor: "pointer" }}>Show more</p>}
            </section>
            <section className="cards-container">
                <Card emoji={<span>&#128198;</span>} title={"Schedule"} link={"/find-teachers"} />
                <Card emoji={<span>&#128587;&#127998;</span>} title={"Add staff"} />
                <Card emoji={<span>&#128172;</span>} title={"Add motivational quote"} />
                <Card emoji={<span>&#128272;</span>} title={"Edit access codes"} />
            </section>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { load_new_teachers })(StaffDashboard);