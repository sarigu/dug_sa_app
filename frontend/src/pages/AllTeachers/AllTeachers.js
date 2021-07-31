import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Accordion from '../../components/Accordion/Accordion';
import CloseButton from '../../components/Buttons/CloseButton'
import BackButton from '../../components/Buttons/BackButton';
import TeacherCard from '../../components/TeacherCard/TeacherCard';
import NextButton from '../../components/Buttons/NextButton';
import PrevButton from '../../components/Buttons/PrevButton';
import TeacherDetails from '../../components/TeacherDetails/TeacherDetails';
import PopUp from '../../components/PopUp/PopUp';
import { useHistory } from "react-router-dom";
import { load_teachers, load_teacher_details } from '../../actions/data';
import './AllTeachers.css';

const AllTeachers = ({ load_teachers, teachers, load_teacher_details, totalTeacherPages }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [index, setIndex] = useState(1);

    const history = useHistory();

    useEffect(() => {
        load_teachers(index);
    }, []);

    useEffect(() => {
        setIsLoaded(true);
        console.log("in use effect", teachers)
    }, [teachers]);

    const handleSelectedTeacher = (teacherId) => {
        console.log(teacherId, "ID TEAHCER")
        load_teacher_details(teacherId);
        setShowPopup(true);
        setShowDetails(true);
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

    const handleNextPage = () => {
        if (index + 1 <= totalTeacherPages) {
            load_teachers(index + 1);
            setIsLoaded(false);
            setIndex(index + 1);
        }
    }
    return (
        <div className="all-teachers-wrapper" >
            <BackButton buttonWidth={"70px"} selectedCallback={() => history.push("/dashboard")} />
            <div>
                <h2 style={{ marginTop: "40px" }}>All teachers</h2>
                {isLoaded && teachers ?
                    <div>
                        {teachers && teachers.length > 0 ?
                            teachers.map((teacher, index) =>
                                <TeacherCard
                                    key={index}
                                    view={"overview"}
                                    user={teacher.user}
                                    profileImage={teacher.profile_image}
                                    selectedCallback={(teacherId) => { handleSelectedTeacher(teacherId) }}
                                />
                            ) :
                            <p>No teachers</p>
                        }

                        <div className="bottom-navigation">
                            {teachers && teachers.length > 0 ?
                                <>
                                    {index <= 1 ? null :
                                        <div onClick={handlePrevPage}><PrevButton /></div>
                                    }
                                    <p> {index <= totalTeacherPages && index > 0 ? index : index <= 0 ? 1 : totalTeacherPages}</p>
                                    {index >= totalTeacherPages ? null :
                                        <div onClick={handleNextPage}><NextButton /></div>
                                    }
                                </>
                                : null}
                        </div>
                    </div> : <LoadingIcon />}
            </div>

            {showPopup ?
                <PopUp selectedCallback={() => setShowPopup(false)}>
                    {showDetails ? <TeacherDetails selectedCallback={() => { setShowFeedback(true); setShowDetails(false) }} />
                        : null}
                </PopUp>
                : null
            }
        </div>
    );
};

const mapStateToProps = (state, props) => ({
    teachers: state.data.teachers,
    totalTeacherPages: state.data.totalTeacherPages,
});

export default connect(mapStateToProps, { load_teachers, load_teacher_details })(AllTeachers);