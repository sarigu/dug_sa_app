import React, { useState } from 'react';
import { connect } from 'react-redux';
import { update_teacher } from '../../../actions/auth';
import Carousel, { CarouselItem } from "../../Carousel/Carousel";
import './TeacherSignUpFlow.css';


const TeacherSignUpFlow = ({ update_teacher, user }) => {
    const [formData, setFormData] = useState({
        degree: '',
        university: '',
        last_position: '',
        last_school: '',
        street: '',
        postal_code: '',
        city: '',
    });

    const { degree, university, last_position, last_school, street, postal_code, city } = formData;

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        update_teacher(user.id, degree, university, last_position, last_school, street, postal_code, city, true);
    }

    return (
        <div className="signup-flow-wrapper" >
            <h2>Great to have you onboard</h2>
            <p>We need some more information to make sure ..</p>
            <Carousel onSubmit={handleSubmit}>
                <CarouselItem>
                    <div>
                        <h3>Your education</h3>
                        <input
                            placeholder="Your degree"
                            type="text"
                            name='degree'
                            value={degree}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <input
                            placeholder="University"
                            type="text"
                            name='university'
                            value={university}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <h3>Your teaching experience</h3>
                        <input
                            placeholder="Last position"
                            type="text"
                            name='last_position'
                            value={last_position}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <input
                            placeholder="Last school"
                            type="text"
                            name='last_school'
                            value={last_school}
                            onChange={e => handleChange(e)}
                            required
                        />
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div>
                        <h3>Address and proof of identity</h3>
                        <input
                            placeholder="Street"
                            type="text"
                            name='street'
                            value={street}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <input
                            placeholder="Postal Code"
                            type="text"
                            pattern="[0-9]*"
                            name='postal_code'
                            value={postal_code}
                            onChange={e => handleChange(e)}
                            required
                        />
                        <input
                            placeholder="City"
                            type="text"
                            name='city'
                            value={city}
                            onChange={e => handleChange(e)}
                            required
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