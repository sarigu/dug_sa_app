import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import BackButton from '../../components/Buttons/BackButton';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import NextButton from '../../components/Buttons/NextButton';
import PrevButton from '../../components/Buttons/PrevButton';
import TeacherDetails from '../../components/TeacherDetails/TeacherDetails';
import PopUp from '../../components/PopUp/PopUp';
import { useHistory } from "react-router-dom";
import { load_teachers, load_teacher_details, load_rejected_teachers } from '../../actions/data';
import './AllTeachers.css';

const AllTeachers = ({ load_teachers, teachers, load_teacher_details, totalTeacherPages, load_rejected_teachers, rejectedTeachers, totalRejectedTeacherPages }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [index, setIndex] = useState(1);
    const [sortByRejected, setSortByRejected] = useState(false);
    const [sortByAll, setSortByAll] = useState(true);

    const history = useHistory();

    useEffect(() => {
        load_teachers(index);
    }, []);

    useEffect(() => {
        if (sortByAll) {
            setIsLoaded(true);
        }
        console.log("in use effect", teachers)
    }, [teachers]);


    useEffect(() => {
        console.log("REJECTED", rejectedTeachers)
        if (sortByRejected) {
            setIsLoaded(true)
        }
    }, [rejectedTeachers]);

    useEffect(() => {
        if (sortByAll) {
            setIsLoaded(false)
            setIndex(1)
            load_teachers(1)
        }
    }, [sortByAll]);

    useEffect(() => {
        if (sortByRejected) {
            setIsLoaded(false)
            setIndex(1)
            load_rejected_teachers(1);
        }
    }, [sortByRejected]);

    const handleSelectedTeacher = (teacherId) => {
        console.log(teacherId, "ID TEAHCER")
        load_teacher_details(teacherId);
        setShowPopup(true);
        setShowDetails(true);
    }

    const handlePrevPage = () => {
        if (index - 1 > 0) {
            if (sortByAll) {
                load_teachers(index - 1);
            } else {
                load_rejected_teachers(index - 1);
            }
            setIsLoaded(false);
            setIndex(index - 1);
        } else {

            if (sortByAll) {
                load_teachers(1);
            } else {
                load_rejected_teachers(1);
            }

            setIsLoaded(false);
            setIndex(1);
        }
    }

    const handleNextPage = () => {
        if (index + 1 <= totalTeacherPages) {
            if (sortByAll) {
                load_teachers(index + 1);
            } else {
                load_rejected_teachers(index + 1);
            }
            setIsLoaded(false);
            setIndex(index + 1);
        }
    }

    return (
        <div className="all-teachers-wrapper" >
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <div>
                <h2 style={{ marginTop: "40px" }}>All teachers</h2>
                <div className="teacher-options">
                    <div className={sortByAll ? "active" : null} onClick={() => { setSortByAll(true); setSortByRejected(false) }} >All</div>
                    <div className={sortByRejected ? "active" : null} onClick={() => { setSortByAll(false); setSortByRejected(true) }}>Rejected</div>
                </div>

                {!isLoaded ? <LoadingIcon /> :
                    <div>
                        {sortByAll ?
                            <div>
                                {teachers && teachers.length > 0 ?
                                    teachers.map((teacher, index) =>
                                        <TeacherCard
                                            key={index}
                                            view={"overview"}
                                            user={teacher}
                                            profileImage={teacher.profile_image}
                                            selectedCallback={(teacherId) => { handleSelectedTeacher(teacherId) }}
                                        />
                                    ) :
                                    <p>No teachers</p>
                                }
                            </div>
                            :
                            <div>
                                {rejectedTeachers && rejectedTeachers.length > 0 ?
                                    rejectedTeachers.map((teacher, index) =>
                                        <TeacherCard
                                            key={index}
                                            view={"overview"}
                                            user={teacher}
                                            profileImage={teacher.profile_image}
                                            selectedCallback={(teacherId) => { handleSelectedTeacher(teacherId) }}
                                        />
                                    ) :
                                    <p>No rejected teachers</p>
                                }
                            </div>
                        }
                    </div>
                }


                <div className="bottom-navigation">
                    {sortByAll && teachers && teachers.length > 0 ?
                        <>
                            {index <= 1 ? null :
                                <div onClick={handlePrevPage}><PrevButton /></div>
                            }
                            <p> {index <= totalTeacherPages && index > 0 ? index : index <= 0 ? 1 : totalTeacherPages}</p>
                            {index >= totalTeacherPages ? null :
                                <div onClick={handleNextPage}><NextButton /></div>
                            }
                        </>
                        : sortByRejected && rejectedTeachers && rejectedTeachers.length > 0 ?
                            <>
                                {index <= 1 ? null :
                                    <div onClick={handlePrevPage}><PrevButton /></div>
                                }
                                <p> {index <= totalRejectedTeacherPages && index > 0 ? index : index <= 0 ? 1 : totalRejectedTeacherPages}</p>
                                {index >= totalRejectedTeacherPages ? null :
                                    <div onClick={handleNextPage}><NextButton /></div>
                                }
                            </>
                            : null}
                </div>
            </div>

            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)}>
                    {showDetails ? <TeacherDetails selectedCallback={() => { setShowDetails(false) }} />
                        : null}
                </PopUp>
                : null
            }
        </div >
    );
};

const mapStateToProps = (state, props) => ({
    teachers: state.data.teachers,
    totalTeacherPages: state.data.totalTeacherPages,
    rejectedTeachers: state.data.rejectedTeachers,
    totalRejectedTeacherPages: state.data.totalRejectedTeacherPages,
});

export default connect(mapStateToProps, { load_teachers, load_teacher_details, load_rejected_teachers })(AllTeachers);