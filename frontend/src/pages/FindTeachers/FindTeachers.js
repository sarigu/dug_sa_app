import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import BackButton from '../../components/Buttons/BackButton';
import { load_teachers, load_bookmarked_teachers, teachersAreUpdated } from '../../actions/data';
import { load_languages, load_subjects } from '../../actions/auth';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import NextButton from '../../components/Buttons/NextButton';
import PrevButton from '../../components/Buttons/PrevButton';
import './FindTeachers.css';

const FindTeachers = ({ load_teachers, teachers, bookmarksUpdated, teachersAreUpdated, load_bookmarked_teachers, bookmarkedTeachers, totalTeacherPages }) => {
    const [sortByAll, setSortByAll] = useState(true);
    const [sortByBookmarks, setSortByBookmarks] = useState(false);
    const [allTeachers, setAllTeachers] = useState([]);
    const [allBookmarkTeachers, setAllBookmarkTeachers] = useState([]);
    const [index, setIndex] = useState(1);

    useEffect(() => {
        load_teachers(index)
        load_bookmarked_teachers();
    }, []);

    useEffect(() => {
        if (sortByAll) {
            setIndex(1)
            load_teachers(1)
        }
    }, [sortByAll]);

    useEffect(() => {
        if (sortByBookmarks) {
            console.log("get updated bookmarks")
            load_bookmarked_teachers();
        }
    }, [sortByBookmarks]);

    useEffect(() => {
        if (bookmarksUpdated) {
            load_bookmarked_teachers()
            teachersAreUpdated()
        }
    }, [bookmarksUpdated]);

    useEffect(() => {
        setAllBookmarkTeachers(bookmarkedTeachers)
    }, [bookmarkedTeachers]);

    useEffect(() => {
        setAllTeachers(teachers)
    }, [teachers]);

    const handleBookmarks = () => {
        setSortByAll(false);
        setSortByBookmarks(true);
    }

    const handleSortByAll = () => {
        setSortByAll(true);
        setSortByBookmarks(false);
    }

    const handleNextPage = () => {
        console.log("next", index, "t0tal", totalTeacherPages)
        if (index + 1 <= totalTeacherPages) {
            load_teachers(index + 1);
            setIndex(index + 1);
        }
    }

    const handlePrevPage = () => {
        console.log("prev")
        if (index - 1 > 0) {
            load_teachers(index - 1);
            setIndex(index - 1);
        } else {
            console.log("0000")
            load_teachers(1);
            setIndex(1);
        }
    }

    return (
        <div className="find-teacher-wrapper">
            <BackButton buttonWidth={"70px"} />
            <h2>Find a teacher</h2>
            <div className="teacher-options">
                <div className={sortByAll ? "active" : null} onClick={handleSortByAll}>All</div>
                <div className={sortByBookmarks ? "active" : null} onClick={handleBookmarks}>Bookmarked</div>
            </div>
            <section >
                <div className="filter-container">
                    <FilterComponent title={"Subjects"} filterBy={"subjects"} />
                    <FilterComponent title={"Languages"} filterBy={"languages"} />
                    <FilterComponent title={"Area"} />
                </div>
            </section>
            <section className="teachers-list">
                <div>{sortByBookmarks ?
                    <div> {allBookmarkTeachers && allBookmarkTeachers.length > 0 ?
                        allBookmarkTeachers.map((teacher, index) =>
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
                        :
                        <p>No teachers</p>}

                    </div>
                    :
                    <div> {allTeachers && allTeachers.length > 0 ?
                        allTeachers.map((teacher, index) =>
                            <TeacherCard
                                key={index}
                                user={teacher.user}
                                profileImage={teacher.profile_image}
                                city={teacher.city}
                                subjects={teacher.subjects}
                                languages={teacher.languages}
                                isBookmarked={teacher.isBookmarked}
                                sortByBookmarks={sortByBookmarks}
                            />
                        )
                        :
                        <p>No teachers</p>}
                        <div className="bottom-navigation">
                            <div onClick={handlePrevPage}><PrevButton /></div>
                            <p> {index <= totalTeacherPages && index > 0 ? index : index <= 0 ? 1 : totalTeacherPages}</p>
                            <div onClick={handleNextPage}><NextButton /></div>
                        </div>
                    </div>

                }
                </div>
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
    bookmarkedTeachers: state.data.bookmarkedTeachers,
    totalTeacherPages: state.data.totalTeacherPages,
});

export default connect(mapStateToProps, { load_teachers, load_bookmarked_teachers, teachersAreUpdated, load_languages, load_subjects })(FindTeachers);