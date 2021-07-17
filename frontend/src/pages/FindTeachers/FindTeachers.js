import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import BackButton from '../../components/Buttons/BackButton';
import { load_teachers } from '../../actions/data';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import './FindTeachers.css';

const FindTeachers = ({ load_teachers }) => {
    const [teachers, setTeachers] = useState();

    useEffect(() => {
        load_teachers().then((res) => {
            console.log(res, "RESPOND");
            setTeachers(res);
        })
    }, []);


    return (
        <div className="find-teacher-wrapper">
            <BackButton buttonWidth={"70px"} />
            <h2>Find a teacher</h2>
            <div className="teacher-options"><div className="active">All</div> <div>Bookmarked</div></div>
            <section >
                <div className="filter-container">
                    <FilterComponent title={"Subjects"} />
                    <FilterComponent title={"Languages"} />
                    <FilterComponent title={"Area"} />
                </div>
            </section>
            <section className="teachers-list">
                {teachers && teachers.length > 0 ?
                    teachers.map((teacher, index) =>
                        <TeacherCard
                            key={index}
                            firstName={teacher.first_name}
                            lastName={teacher.last_name}
                            profileImage={teacher.profile_image}
                            city={teacher.city}
                            subjects={teacher.subjects}
                        />
                    )
                    :
                    <p>No teachers</p>}
            </section>
        </div>
    );
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { load_teachers })(FindTeachers);