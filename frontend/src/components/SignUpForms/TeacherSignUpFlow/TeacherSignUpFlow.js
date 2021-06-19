import React, { useState } from 'react';
import { connect } from 'react-redux';
import { update_teacher } from '../../../actions/auth';
import Carousel, { CarouselItem } from "../../Carousel/Carousel";
import '../SignUpForms.css';
import { validateYear, validateExperince, validatePhone } from '../utils';


const TeacherSignUpFlow = ({ update_teacher, user }) => {

    const [degreeError, setDegreeError] = useState(false);
    const [universityError, setUniversityError] = useState(false);
    const [graduationDateError, setGraduationDateError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [schoolError, setSchoolError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [streetError, setStreetError] = useState(false);
    const [poastalCodeError, setPoastalCodeError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [addressProofError, setAddressProofError] = useState(false);
    const [profileImageError, setProfileImageError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState();
    const [errors, setErrors] = useState(false);

    const [formData, setFormData] = useState({
        degree: '',
        university: '',
        year_of_graduation: undefined,
        last_position: '',
        last_school: '',
        years_of_experience: null,
        street: '',
        postal_code: '',
        city: '',
        proof_of_address: undefined,
        profile_image: undefined,
        phone_number: null
    });

    const hiddenFileInputAddress = React.useRef(null);
    const hiddenFileInputProfileImage = React.useRef(null);

    const { degree, university, year_of_graduation, last_position, last_school, years_of_experience, street, postal_code, city, proof_of_address, profile_image, phone_number } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }


    const handleSubmit = () => {
        setErrors(false);

        if (!phone_number) {
            setPhoneNumberError(true);
            setErrors(true);
            setCarouselIndex(4);
        } else {
            const isValidated = validatePhone(phone_number);
            console.log("---adter phone", isValidated);
            if (!isValidated) {
                setPhoneNumberError(true);
                setErrors(true);
            }
        }

        if (!profile_image) {
            setProfileImageError(true);
            setErrors(true);
            setCarouselIndex(4);
        }

        if (!proof_of_address) {
            setAddressProofError(true);
            setErrors(true);
            setCarouselIndex(3);
        }


        if (!street) {
            setStreetError(true);
            setErrors(true);
            setCarouselIndex(3);
        }

        if (!postal_code) {
            setPoastalCodeError(true);
            setErrors(true);
            setCarouselIndex(3);
        }

        if (!city) {
            setCityError(true);
            setErrors(true);
            setCarouselIndex(3);
        }

        if (!last_position) {
            setPositionError(true);
            setErrors(true);
            setCarouselIndex(1);
        }

        if (!last_school) {
            setSchoolError(true);
            setErrors(true);
            setCarouselIndex(1);
        }

        if (!years_of_experience) {
            setExperienceError(true);
            setErrors(true);
            setCarouselIndex(1);
        } else {
            const isValidated = validateExperince(years_of_experience);
            if (!isValidated) {
                setExperienceError(true);
                setErrors(true);
            }
        }

        if (!degree) {
            setDegreeError(true);
            setErrors(true);
            setCarouselIndex(5);
        }

        if (!university) {
            setUniversityError(true);
            setErrors(true);
            setCarouselIndex(5);
        }

        if (!year_of_graduation) {
            setGraduationDateError(true);
            setErrors(true);
            setCarouselIndex(5);
        } else {
            const isValidated = validateYear(year_of_graduation);
            if (!isValidated) {
                setGraduationDateError(true);
                setErrors(true);
            }
        }

        if (!errors) {
            console.log(formData, "NO ERR");
            update_teacher(user.id, degree, university, year_of_graduation, last_position, last_school, years_of_experience, street, postal_code, city, proof_of_address, profile_image, phone_number, true);
        }
    }

    return (
        <div className="signup-flow-wrapper" >
            <h2>Great to have you onboard</h2>
            <p>We need some more information to make sure ..</p>
            <Carousel onSubmit={handleSubmit} backToIndex={carouselIndex}>
                <CarouselItem>
                    <div>
                        <h3>Your education</h3>
                        <input
                            className={degreeError ? "notValidated" : null}
                            placeholder="Your degree"
                            type="text"
                            name='degree'
                            value={degree}
                            onChange={e => { setDegreeError(false); handleChange(e) }}
                        />
                        <input
                            className={universityError ? "notValidated" : null}
                            placeholder="University"
                            type="text"
                            name='university'
                            value={university}
                            onChange={e => { setUniversityError(false); handleChange(e) }}

                        />

                        <input
                            className={graduationDateError ? "notValidated" : null}
                            placeholder="Graduation Date"
                            type="number"
                            name='year_of_graduation'
                            value={year_of_graduation}
                            onChange={e => { setGraduationDateError(false); handleChange(e) }}

                        />
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <h3>Your teaching experience</h3>
                        <input
                            className={positionError ? "notValidated" : null}
                            placeholder="Last position"
                            type="text"
                            name='last_position'
                            value={last_position}
                            onChange={e => { setPositionError(false); handleChange(e) }}

                        />
                        <input
                            className={schoolError ? "notValidated" : null}
                            placeholder="Last school"
                            type="text"
                            name='last_school'
                            value={last_school}
                            onChange={e => { setSchoolError(false); handleChange(e) }}

                        />
                        <input
                            className={experienceError ? "notValidated" : null}
                            placeholder="Years of experience"
                            type="number"
                            name='years_of_experience'
                            value={years_of_experience}
                            onChange={e => { setExperienceError(false); handleChange(e) }}
                        />
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <h3>Subjects you want to teach</h3>

                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <h3>Address and proof of identity</h3>
                        <input
                            className={streetError ? "notValidated" : null}
                            placeholder="Street"
                            type="text"
                            name='street'
                            value={street}
                            onChange={e => { setStreetError(false); handleChange(e) }}

                        />
                        <input
                            className={poastalCodeError ? "notValidated" : null}
                            placeholder="Postal Code"
                            type="text"
                            name='postal_code'
                            value={postal_code}
                            onChange={e => { setPoastalCodeError(false); handleChange(e) }}

                        />
                        <input
                            className={cityError ? "notValidated" : null}
                            placeholder="City"
                            type="text"
                            name='city'
                            value={city}
                            onChange={e => { setCityError(false); handleChange(e) }}
                        />
                        {addressProofError ? <p className="errorMsg">Please upload a proof of address</p> : null}
                        <img id="proof-of-address" src="" width="100" height="100"></img>
                        <button onClick={() => { setAddressProofError(false); hiddenFileInputAddress.current.click() }} style={{ width: "250px", margin: "1rem 0 2rem 0" }}>Upload a proof of address</button>
                        <input type="file" ref={hiddenFileInputAddress} style={{ display: "none" }} placeholder="Proof of Address" name="proof_of_address" accept="image/*" onChange={e => { handleImageChange(e); document.getElementById('proof-of-address').src = window.URL.createObjectURL(e.target.files[0]) }} />

                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <h3>Details about you</h3>
                        {profileImageError ? <p className="errorMsg">Please upload a profile image</p> : null}
                        <img id="profile-image" src="" width="300" height="300"></img>
                        <button onClick={() => { setProfileImageError(false); hiddenFileInputProfileImage.current.click() }} style={{ width: "250px", margin: "1rem 0 2rem 0" }}>Upload a proof of address</button>
                        <input type="file" ref={hiddenFileInputProfileImage} style={{ display: "none" }} placeholder="Profile Image" name="profile_image" accept="image/*" onChange={e => { handleImageChange(e); document.getElementById('profile-image').src = window.URL.createObjectURL(e.target.files[0]) }} />
                        <input
                            className={phoneNumberError ? "notValidated" : null}
                            placeholder="Phone number"
                            type="tel"
                            name='phone_number'
                            value={phone_number}
                            onChange={e => { setPhoneNumberError(false); handleChange(e) }}
                        />
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, { update_teacher })(TeacherSignUpFlow);