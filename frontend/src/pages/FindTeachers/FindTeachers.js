import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import BackButton from '../../components/Buttons/BackButton';
import { load_teachers, load_bookmarked_teachers, teachersAreUpdated } from '../../actions/data';
import { load_languages, load_subjects } from '../../actions/auth';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import './FindTeachers.css';

const FindTeachers = ({ load_teachers, teachers, bookmarksUpdated, teachersAreUpdated, totalTeacherPages }) => {
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [sortByAll, setSortByAll] = useState(true);
    const [sortByBookmarks, setSortByBookmarks] = useState(false);
    const [allTeachers, setAllTeachers] = useState(false);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        load_teachers(index).then(res => {
            if (res) {
                setIsLoadingData(true);
            }
        })
    }, []);

    useEffect(() => {
        console.log("bookmarksUpdated----->", bookmarksUpdated, index)
        if (bookmarksUpdated) {
            console.log("load teachers again")
            load_teachers(index)
            teachersAreUpdated()
        }
    }, [bookmarksUpdated]);

    useEffect(() => {
        setAllTeachers(teachers);
        if (sortByBookmarks) {
            handleSortByBookmarks();
        }
    }, [teachers]);

    const handleSortByBookmarks = () => {
        setSortByAll(false);
        setSortByBookmarks(true);
        let allBookmarkedTeachers = teachers.filter(teacher => teacher.isBookmarked === true);
        setAllTeachers(allBookmarkedTeachers)
    }

    const handleSortByAll = () => {
        setSortByAll(true);
        setSortByBookmarks(false);
        setAllTeachers(teachers);
    }

    const handleAdditionalDataLoad = () => {
        setIndex(index + 1);
        load_teachers(index + 1)
    }

    return (
        <div className="find-teacher-wrapper">
            <BackButton buttonWidth={"70px"} />
            <h2>Find a teacher</h2>
            <div className="teacher-options">
                <div className={sortByAll ? "active" : null} onClick={handleSortByAll}>All</div>
                <div className={sortByBookmarks ? "active" : null} onClick={handleSortByBookmarks}>Bookmarked</div>
            </div>
            <section >
                <div className="filter-container">
                    <FilterComponent title={"Subjects"} filterBy={"subjects"} />
                    <FilterComponent title={"Languages"} filterBy={"languages"} />
                    <FilterComponent title={"Area"} />
                </div>
            </section>
            <section className="teachers-list">
                {allTeachers && allTeachers.length > 0 ?
                    allTeachers.map((teacher, index) =>
                        <TeacherCard
                            key={index}
                            user={teacher.user}
                            profileImage={teacher.profile_image}
                            city={teacher.city}
                            subjects={teacher.subjects}
                            languages={teacher.languages}
                        />
                    )
                    : isLoadingData ? <p >Loading</p> :
                        <p>No teachers</p>}
                {allTeachers.length > 0 ? <p onClick={handleAdditionalDataLoad}>Show More</p> : null}
            </section>
        </div>
    );
};

const mapStateToProps = state => ({
    teachers: state.data.teachers,
    user: state.auth.user,
    bookmarkedTeachers: state.data.bookmarkedTeachers,
    bookmarksUpdated: state.data.bookmarksUpdated,
    languages: state.auth.languages,
    subjects: state.auth.subjects,
    totalTeacherPages: state.data.totalTeacherPages,
});

export default connect(mapStateToProps, { load_teachers, load_bookmarked_teachers, teachersAreUpdated, load_languages, load_subjects })(FindTeachers);