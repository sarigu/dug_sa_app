import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import BackButton from '../../components/Buttons/BackButton';
import { load_teachers, load_bookmarked_teachers, filter_teachers } from '../../actions/data';
import { load_languages, load_subjects } from '../../actions/auth';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import NextButton from '../../components/Buttons/NextButton';
import PrevButton from '../../components/Buttons/PrevButton';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { useHistory } from "react-router-dom";
import './FindTeachers.css';

const FindTeachers = ({ load_teachers, teachers, load_bookmarked_teachers, bookmarkedTeachers, totalTeacherPages, load_languages, load_subjects, subjects, languages, filter_teachers, filteredTeachers, totalFilterPages }) => {
    const [sortByAll, setSortByAll] = useState(true);
    const [sortByBookmarks, setSortByBookmarks] = useState(false);
    const [activeFilter, setActiveFilter] = useState(false);
    const [allTeachers, setAllTeachers] = useState([]);
    const [allBookmarkTeachers, setAllBookmarkTeachers] = useState([]);
    const [index, setIndex] = useState(1);
    const [filterIndex, setFilterIndex] = useState(1);
    const [subjectsFilter, setSubjectsFilter] = useState([]);
    const [languageFilter, setLanguageFilter] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        setIsLoaded(false);
        load_teachers(index)
        load_languages();
        load_subjects();
    }, []);

    useEffect(() => {
        if (sortByAll) {
            setIsLoaded(false)
            setIndex(1)
            load_teachers(1)
        }
    }, [sortByAll]);

    useEffect(() => {
        if (sortByBookmarks) {
            setIsLoaded(false)
            load_bookmarked_teachers();
        }
    }, [sortByBookmarks]);

    useEffect(() => {
        if (sortByBookmarks) {
            setAllBookmarkTeachers(bookmarkedTeachers)
            setIsLoaded(true)
        }
    }, [bookmarkedTeachers]);

    useEffect(() => {
        setAllTeachers(teachers)
        setIsLoaded(true)
    }, [teachers]);

    useEffect(() => {
        if (activeFilter) {
            setAllTeachers(filteredTeachers)
            setIsLoaded(true)
        }
    }, [filteredTeachers]);

    const handleBookmarks = () => {
        setSortByAll(false);
        setSortByBookmarks(true);
        setActiveFilter(false);
    }

    const handleSortByAll = () => {
        setSortByAll(true);
        setSortByBookmarks(false);
        setActiveFilter(false);
    }

    const handleNextPage = () => {
        if (index + 1 <= totalTeacherPages) {
            load_teachers(index + 1);
            setIsLoaded(false);
            setIndex(index + 1);
        }
    }

    const handlePrevPage = () => {
        if (index - 1 > 0) {
            load_teachers(index - 1);
            setIsLoaded(false);
            setIndex(index - 1);
        } else {
            load_teachers(1);
            setIsLoaded(false);
            setIndex(1);
        }
    }

    const handleNextFilterPage = () => {
        if (filterIndex + 1 <= totalFilterPages) {
            filter_teachers(subjectsFilter, languageFilter, filterIndex + 1);
            setIsLoaded(false);
            setFilterIndex(filterIndex + 1);
        }
    }

    const handlePrevFilterPage = () => {
        if (filterIndex - 1 > 0) {
            filter_teachers(subjectsFilter, languageFilter, filterIndex - 1);
            setIsLoaded(false);
            setFilterIndex(filterIndex - 1);
        } else {
            filter_teachers(subjectsFilter, languageFilter, 1);
            setIsLoaded(false);
            setFilterIndex(1);
        }
    }

    const handleFilter = () => {
        setActiveFilter(true);
        setFilterIndex(1);
        if (subjectsFilter && subjectsFilter.length > 0 || languageFilter && languageFilter.length > 0) {
            filter_teachers(subjectsFilter, languageFilter, 1);
            setIsLoaded(false);
        } else {
            setAllTeachers(teachers)
            setActiveFilter(false);
        }
    }


    return (
        <div className="find-teacher-wrapper">
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <h2 style={{ marginTop: "40px" }}>Find a teacher</h2>
            <div className="teacher-options">
                <div className={sortByAll ? "active" : null} onClick={handleSortByAll}>All</div>
                <div className={sortByBookmarks ? "active" : null} onClick={handleBookmarks}>Bookmarked</div>
            </div>
            <section >
                {sortByBookmarks ? null :
                    <div className="filter-container">
                        <FilterComponent title={"Subjects"} filterBy={"subjects"} options={subjects} setSelectedFilter={setSubjectsFilter} selectedFilter={subjectsFilter} onApplyFilter={handleFilter} />
                        <FilterComponent title={"Languages"} filterBy={"languages"} options={languages} setSelectedFilter={setLanguageFilter} selectedFilter={languageFilter} onApplyFilter={handleFilter} />
                    </div>
                }
            </section>
            <section className="teachers-list">
                {!isLoaded ? <LoadingIcon /> :
                    <div>
                        {sortByBookmarks ?
                            <div> {allBookmarkTeachers && allBookmarkTeachers.length > 0 ?
                                allBookmarkTeachers.map((teacher, index) =>
                                    <TeacherCard
                                        key={index}
                                        user={teacher.user}
                                        profileImage={teacher.profile_image}
                                        subjects={teacher.subjects}
                                        languages={teacher.languages}
                                        isBookmarked={teacher.isBookmarked}
                                        teachingFacilities={teacher.facilities}
                                        sortByBookmarks={sortByBookmarks}
                                    />
                                )
                                :
                                <p>No teachers</p>
                            }

                            </div>
                            :
                            <div>
                                {allTeachers && allTeachers.length > 0 ?
                                    allTeachers.map((teacher, index) =>
                                        <TeacherCard
                                            key={index}
                                            user={teacher.user}
                                            profileImage={teacher.profile_image}
                                            subjects={teacher.subjects}
                                            languages={teacher.languages}
                                            isBookmarked={teacher.isBookmarked}
                                            experience={teacher.experience}
                                            teachingFacilities={teacher.facilities}
                                            sortByBookmarks={sortByBookmarks}
                                        />
                                    )
                                    :
                                    <p style={{ fontWeight: 600 }}>No teachers</p>
                                }
                                <div className="bottom-navigation">
                                    {sortByAll && !activeFilter && allTeachers && allTeachers.length > 0 ?
                                        <>
                                            {index <= 1 ? null :
                                                <div onClick={handlePrevPage}><PrevButton /></div>
                                            }
                                            <p> {index <= totalTeacherPages && index > 0 ? index : index <= 0 ? 1 : totalTeacherPages}</p>
                                            {index >= totalTeacherPages ? null :
                                                <div onClick={handleNextPage}><NextButton /></div>
                                            }
                                        </>
                                        : sortByAll && activeFilter && allTeachers && allTeachers.length > 0 ? <>
                                            {filterIndex <= 1 ? null :
                                                <div onClick={handlePrevFilterPage}><PrevButton /></div>
                                            }
                                            <p> {filterIndex <= totalFilterPages && filterIndex > 0 ? filterIndex : filterIndex <= 0 ? 1 : totalFilterPages}</p>
                                            {filterIndex >= totalFilterPages ? null :
                                                <div onClick={handleNextFilterPage}><NextButton /></div>
                                            }
                                        </> : null}
                                </div>
                            </div>
                        }
                    </div>
                }
            </section>
        </div>
    );
};

const mapStateToProps = state => ({
    teachers: state.data.teachers,
    user: state.auth.user,
    languages: state.auth.languages,
    subjects: state.auth.subjects,
    totalTeacherPages: state.data.totalTeacherPages,
    bookmarkedTeachers: state.data.bookmarkedTeachers,
    totalTeacherPages: state.data.totalTeacherPages,
    filteredTeachers: state.data.filteredTeachers,
    totalFilterPages: state.data.totalFilterPages
});

export default connect(mapStateToProps, { load_teachers, load_bookmarked_teachers, load_languages, load_subjects, filter_teachers })(FindTeachers);