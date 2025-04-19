import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../config'

const UserDetails = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        userName: '',
        gender: '',
        dob: '',
        place: '',
        location: '',
        assets: '',
        star: '',
        zodiac: '',
        address: '',
        phoneNumber: '',
        agree: false,
    });

    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!data.userName) newErrors.userName = 'User Name is required';
        if (!data.gender) newErrors.gender = 'Gender is required';
        if (!data.dob) newErrors.dob = 'Date of Birth is required';
        if (!data.place) newErrors.place = 'Place is required';
        if (!data.location) newErrors.location = 'Location is required';
        if (!data.assets) newErrors.assets = 'Assets is required';
        if (!data.star) newErrors.star = 'Star is required';
        if (!data.zodiac) newErrors.zodiac = 'Zodiac is required';
        if (!data.address) newErrors.address = 'Address is required';
        if (!data.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
        if (!data.agree) newErrors.agree = 'You must agree to the terms';

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                // const response = await axios.post('http://localhost/cnnmandram/userDetails.php', data);
                const response = await axios.post(`${BASE_URL}/userDetails.php`, data);
                setSubmissionStatus(response.data.data.status === 'valid' ? 'Form submitted successfully!' : 'Form submission failed!');
            } catch (error) {
                setSubmissionStatus('Form submission failed!');
                console.error('There was an error!', error);
            }
        } else {
            setSubmissionStatus('');
            navigate('/UploadDocument');
        }
    };
    return (
        <div className="userDetails">


            <div className="container py-4 ">
                <h1 className='py-3 text-center'>User Details </h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text" className="form-control" name="userName" value={data.userName} onChange={handleChange} />
                                {errors.userName && <p className="text-danger">{errors.userName}</p>}
                            </div>

                            <div className="form-group">
                                <label>Gender</label>
                                <select className="form-control" name="gender" value={data.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors.gender && <p className="text-danger">{errors.gender}</p>}
                            </div>

                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input type="date" className="form-control" name="dob" value={data.dob} onChange={handleChange} />
                                {errors.dob && <p className="text-danger">{errors.dob}</p>}
                            </div>

                            <div className="form-group">
                                <label>Place</label>
                                <input type="text" className="form-control" name="place" value={data.place} onChange={handleChange} />
                                {errors.place && <p className="text-danger">{errors.place}</p>}
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                <input type="text" className="form-control" name="location" value={data.location} onChange={handleChange} />
                                {errors.location && <p className="text-danger">{errors.location}</p>}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Assets</label>
                                <input type="text" className="form-control" name="assets" value={data.assets} onChange={handleChange} />
                                {errors.assets && <p className="text-danger">{errors.assets}</p>}
                            </div>

                            <div className="form-group">
                                <label>Star</label>
                                <input type="text" className="form-control" name="star" value={data.star} onChange={handleChange} />
                                {errors.star && <p className="text-danger">{errors.star}</p>}
                            </div>

                            <div className="form-group">
                                <label>Zodiac</label>
                                <input type="text" className="form-control" name="zodiac" value={data.zodiac} onChange={handleChange} />
                                {errors.zodiac && <p className="text-danger">{errors.zodiac}</p>}
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" name="address" value={data.address} onChange={handleChange} />
                                {errors.address && <p className="text-danger">{errors.address}</p>}
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control" name="phoneNumber" value={data.phoneNumber} onChange={handleChange} />
                                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
                            </div>

                        </div>
                        <div className="col-12">

                            <div className="form-group">

                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="agree" checked={data.agree} onChange={handleChange} />
                                    <label className="form-check-label">I agree to the terms</label>
                                </div>
                                {errors.agree && <p className="text-danger">{errors.agree}</p>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    {submissionStatus && <h3>{submissionStatus}</h3>}
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
