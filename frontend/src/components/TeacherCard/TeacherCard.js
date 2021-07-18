import React, { useEffect, useState } from 'react';
import './TeacherCard.css';
import Heart from '../../icons/Heart';
import FilledHeart from '../../icons/FilledHeart';
import { connect } from 'react-redux';
import { create_bookmark, load_bookmarked_teachers } from '../../actions/data';


const TeacherCard = ({ create_bookmark, user, profileImage, city, subjects, languages, isBookmarked, view, sortByBookmarks }) => {
    const [bookmarkIsSet, setBookmarkIsSet] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState()


    useEffect(() => {
        if (profileImage.startsWith("http://localhost:8000")) {
            setBackgroundImage(profileImage)
        } else {
            setBackgroundImage("http://localhost:8000" + profileImage);
        }
    }, [profileImage]);

    const handleBookmark = () => {
        create_bookmark(user.id);
        setBookmarkIsSet(!bookmarkIsSet);
    }
    return (
        <div>
            <div> {view === "overview" ?

                <div className="teacher-card small" >
                    <div className="teacher-information-container small-container">
                        <div className="teacher-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                        <div className="teacher-details">
                            <h4>{user.first_name} {user.last_name}</h4>
                        </div>
                    </div>
                </div>

                :

                <div className="teacher-card big" >
                    <div className="teacher-information-container big-container">
                        <div className="teacher-image" style={{ backgroundImage: `url( ${backgroundImage})` }}></div>
                        <div className="teacher-details">
                            <h4>{user.first_name} {user.last_name}</h4>
                            <h5>Subjects</h5>
                            {subjects ? subjects.map((subject, index) => <h5 key={index} className="subtext">{subject.name}</h5>) : <h5>No subjects</h5>}
                            <h5>Languages</h5>
                            {languages ? languages.map((language, index) => <h5 key={index} className="subtext">{language.language}</h5>) : <h5>No languages</h5>}
                            <h5>Area</h5>
                            <h5 className="subtext">{city}</h5>
                            <button className="availibility-button">Check availibility</button>
                        </div>
                        <div onClick={handleBookmark} style={{ alignSelf: "flex-start", marginRight: "10px" }}>{bookmarkIsSet ? <FilledHeart /> : isBookmarked ? <FilledHeart /> : <Heart />}</div>
                    </div>
                </div>


            }
            </div>
        </div>

    );
};

const mapStateToProps = (state, props) => ({
    subjects: props.subjects,
    city: props.city,
    languages: props.languages,
    profileImage: props.profileImage,
    isBookmarked: props.isBookmarked,
    view: props.view,
    user: props.user,
    sortByBookmarks: props.sortByBookmarks,
});

export default connect(mapStateToProps, { create_bookmark, load_bookmarked_teachers })(TeacherCard);