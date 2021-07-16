import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import './FindTeachers.css';

const FindTeachers = ({ teachers }) => {
    const teachersList = teachers.map((teacher) =>
        <TeacherCard first_name={teacher.user.first_name} last_name={teacher.user.last_name} />
    );

    return (
        <div >
            <Navbar />
            <div>
                <h2>Find a teacher</h2>
                <ul className="teacher-options"><li className="active">All</li> <li>Bookmarked</li></ul>
                <div>Filter</div>
                <div className="teachers-list">
                    {teachersList}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    teachers: state.data.teachers
});

export default connect(mapStateToProps, null)(FindTeachers);