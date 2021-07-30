import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Accordion from '../../components/Accordion/Accordion';
import './TeacherDetails.css';

const TeacherDetails = ({ teacher }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        if (teacher) {
            setIsLoaded(true);
            if (teacher.year_of_graduation) {
                let [year, month, day] = teacher.year_of_graduation.split('-');
                let date = day + "." + month + "." + year;
                setFormattedDate(date);
            }
        }
    }, [teacher]);

    return (
        <div className="teacher-details-container">
            {isLoaded && teacher ?
                <div className="details-wrapper">
                    <div className="image-container">
                        <div>
                            <div className="profile-image" style={{ backgroundImage: `url(${"http://localhost:8000" + teacher.profile_image})` }}></div>
                            <h3>Proof of address</h3>
                            <div className="address-proof" style={{ backgroundImage: `url( ${"http://localhost:8000" + teacher.proof_of_address})` }}></div>
                        </div>
                        <button style={{ backgroundColor: "red" }}>Reject</button>
                    </div>
                    <div className="info-container">
                        <div>
                            <h2 style={{ marginBottom: "30px" }}>New Teacher</h2>
                            <Accordion title="Contact info">
                                <div>
                                    <h3>Name</h3>
                                    <p>{teacher.first_name + " " + teacher.last_name}</p>
                                    <h3>Email</h3>
                                    <p>{teacher.email}</p>
                                    <h3>Phone</h3>
                                    <p>{teacher.phone}</p>
                                    <h3>Address</h3>
                                    <p>{teacher.street}</p>
                                    <p>{teacher.postal_code + ", " + teacher.city}</p>
                                </div>
                            </Accordion>
                            <Accordion title="Education">
                                <div>
                                    <h3>Degree</h3>
                                    <p>{teacher.degree}</p>
                                    <h3>University</h3>
                                    <p>{teacher.university}</p>
                                    <h3>Year of graduation</h3>
                                    <p>{formattedDate}</p>
                                </div>
                            </Accordion>
                            <Accordion title="Teaching experience">
                                <div>
                                    <h3>Last workplace</h3>
                                    <p>{teacher.last_workplace}</p>
                                    <h3>Last position</h3>
                                    <p>{teacher.last_position}</p>
                                    <h3>Years of experience</h3>
                                    <p>{teacher.years_of_experience + " years"}</p>
                                </div>
                            </Accordion>
                        </div>

                        <button>Approve</button>
                    </div>
                </div>
                : <LoadingIcon />
            }
        </div>
    );
};

const mapStateToProps = state => ({
    teacher: state.data.teacher
});

export default connect(mapStateToProps, null)(TeacherDetails);