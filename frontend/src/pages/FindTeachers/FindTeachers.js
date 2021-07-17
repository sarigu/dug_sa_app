import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import BackButton from '../../components/Buttons/BackButton';
import { load_teachers, load_bookmarked_teachers } from '../../actions/data';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import './FindTeachers.css';

const FindTeachers = ({ load_teachers, teachers }) => {
    const [isLoadingData, setIsLoadingData] = useState(false);


    useEffect(() => {
        load_teachers().then(res => {
            if (res) {
                setIsLoadingData(true);
            }
        })
    }, []);

    return (
        <div className="find-teacher-wrapper">
            <BackButton buttonWidth={"70px"} />
            <h2>Find a teacher</h2>
            <div className="teacher-options"><div className="active">All</div> <div>Bookmarked</div></div>
            <section >
                <div className="filter-container">
                    <FilterComponent title={"Subjects"} filterBy={"subjects"} />
                    <FilterComponent title={"Languages"} filterBy={"languages"} />
                    <FilterComponent title={"Area"} />
                </div>
            </section>
            <section className="teachers-list">
                {console.log(teachers.user)}
                {teachers && teachers.length > 0 ?
                    teachers.map((teacher, index) =>
                        <TeacherCard
                            key={index}
                            user={teacher.user}
                            profileImage={teacher.profile_image}
                            city={teacher.city}
                            subjects={teacher.subjects}
                            languages={teacher.languages}
                            isBookmarked={teacher.isBookmarked}
                        />
                    )
                    : isLoadingData ? <p >Loading</p> :
                        <p>No teachers</p>}
            </section>
        </div>
    );
};

const mapStateToProps = state => ({
    teachers: state.data.teachers,
    user: state.auth.user,
    bookmarkedTeachers: state.data.bookmarkedTeachers,
});

export default connect(mapStateToProps, { load_teachers, load_bookmarked_teachers })(FindTeachers);