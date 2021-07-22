import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import BackButton from '../../components/Buttons/BackButton';
import { load_teachers, load_bookmarked_teachers, teachers_are_updated, filter_teachers } from '../../actions/data';
import { load_languages, load_subjects } from '../../actions/auth';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import NextButton from '../../components/Buttons/NextButton';
import PrevButton from '../../components/Buttons/PrevButton';
import './FindTeachers.css';

const FindTeachers = ({ load_teachers, teachers, bookmarksUpdated, teachers_are_updated, load_bookmarked_teachers, bookmarkedTeachers, totalTeacherPages, load_languages, load_subjects, subjects, languages, filter_teachers, filteredTeachers, totalFilterPages }) => {
    const [sortByAll, setSortByAll] = useState(true);
    const [sortByBookmarks, setSortByBookmarks] = useState(false);
    const [activeFilter, setActiveFilter] = useState(false);
    const [allTeachers, setAllTeachers] = useState([]);
    const [allBookmarkTeachers, setAllBookmarkTeachers] = useState([]);
    const [index, setIndex] = useState(1);
    const [filterIndex, setFilterIndex] = useState(1);
    const [filterOptions, setFilterOptions] = useState();
    const [filteredBy, setFilteredBy] = useState();

    useEffect(() => {
        load_teachers(index)
        load_bookmarked_teachers();
        load_languages();
        load_subjects();
    }, []);

    useEffect(() => {
        if (sortByAll) {
            setIndex(1)
            load_teachers(1)
        }
    }, [sortByAll]);

    useEffect(() => {
        if (sortByBookmarks) {
            load_bookmarked_teachers();
        }
    }, [sortByBookmarks]);

    useEffect(() => {
        if (bookmarksUpdated) {
            load_bookmarked_teachers()
            teachers_are_updated()
        }
    }, [bookmarksUpdated]);

    useEffect(() => {
        setAllBookmarkTeachers(bookmarkedTeachers)
    }, [bookmarkedTeachers]);

    useEffect(() => {
        setAllTeachers(teachers)
    }, [teachers]);

    useEffect(() => {
        setAllTeachers(filteredTeachers)
    }, [filteredTeachers]);

    const handleBookmarks = () => {
        setSortByAll(false);
        setSortByBookmarks(true);
        setActiveFilter(false);
    }

    const handleSortByAll = () => {
        setSortByAll(true);
        setSortByBookmarks(false);
    }

    const handleNextPage = () => {
        if (index + 1 <= totalTeacherPages) {
            load_teachers(index + 1);
            setIndex(index + 1);
        }
    }

    const handlePrevPage = () => {
        if (index - 1 > 0) {
            load_teachers(index - 1);
            setIndex(index - 1);
        } else {
            load_teachers(1);
            setIndex(1);
        }
    }

    const handleNextFilterPage = () => {
        if (filterIndex + 1 <= totalFilterPages) {
            filter_teachers(filterOptions, filteredBy, filterIndex + 1);
            setFilterIndex(filterIndex + 1);
        }
    }

    const handlePrevFilterPage = () => {
        if (filterIndex - 1 > 0) {
            filter_teachers(filterOptions, filteredBy, filterIndex - 1);
            setFilterIndex(filterIndex - 1);
        } else {
            filter_teachers(filterOptions, filteredBy, 1);
            setFilterIndex(1);
        }
    }

    const handleFilter = (selectedOptions, filterBy) => {
        console.log("-------------------")
        console.log("in FIND", selectedOptions, filterBy)
        setFilterOptions(selectedOptions);
        setFilteredBy(filterBy);
        setActiveFilter(true);
        if (selectedOptions.length > 0 && filterBy) {
            console.log("get filtered teacher")
            filter_teachers(selectedOptions, filterBy, filterIndex);
        } else {
            setAllTeachers(teachers)
            setActiveFilter(false);
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
                {sortByBookmarks ? null :
                    <div className="filter-container">
                        <FilterComponent title={"Subjects"} filterBy={"subjects"} options={subjects} onSelectedFilter={(selectedOptions, filterBy) => { handleFilter(selectedOptions, filterBy) }} />
                        <FilterComponent title={"Languages"} filterBy={"languages"} options={languages} onSelectedFilter={(selectedOptions, filterBy) => { handleFilter(selectedOptions, filterBy) }} />
                        <FilterComponent title={"Area"} />
                    </div>
                }
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
                    <div>
                        {allTeachers && allTeachers.length > 0 ?
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
                            <p>No teachers</p>
                        }
                        <div className="bottom-navigation">
                            {sortByAll && !activeFilter ?
                                <>
                                    {index <= 1 ? null :
                                        <div onClick={handlePrevPage}><PrevButton /></div>
                                    }
                                    <p> {index <= totalTeacherPages && index > 0 ? index : index <= 0 ? 1 : totalTeacherPages}</p>
                                    {index >= totalTeacherPages ? null :
                                        <div onClick={handleNextPage}><NextButton /></div>
                                    }
                                </>
                                : <>
                                    {filterIndex <= 1 ? null :
                                        <div onClick={handlePrevFilterPage}><PrevButton /></div>
                                    }
                                    <p> {filterIndex <= totalFilterPages && filterIndex > 0 ? filterIndex : filterIndex <= 0 ? 1 : totalFilterPages}</p>
                                    {filterIndex >= totalFilterPages ? null :
                                        <div onClick={handleNextFilterPage}><NextButton /></div>
                                    }
                                </>}
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
    filteredTeachers: state.data.filteredTeachers,
    totalFilterPages: state.data.totalFilterPages
});

export default connect(mapStateToProps, { load_teachers, load_bookmarked_teachers, teachers_are_updated, load_languages, load_subjects, filter_teachers })(FindTeachers);