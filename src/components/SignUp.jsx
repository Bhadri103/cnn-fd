import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        aadharNo: "",
        agree: false,
        profile_photo: null
    });

    const [otpData, setOtpData] = useState({
        otp: "",
        otpSent: false
    });

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setData({ ...data, [name]: files[0] });
        } else {
            setData({ ...data, [name]: type === 'checkbox' ? checked : value });
        }
    };

    const handleOtpChange = (e) => {
        const { value } = e.target;
        setOtpData({ ...otpData, otp: value });
    };

    const validate = () => {
        let errors = {};
        if (!data.name) errors.name = "Name is required";
        if (!data.email) errors.email = "Email is required";
        if (!data.phone) errors.phone = "Phone number is required";
        if (!data.password) errors.password = "Password is required";
        if (!data.aadharNo) errors.aadharNo = "Aadhar number is required";
        if (!data.agree) errors.agree = "You must agree to the terms and conditions";
        if (!data.profile_photo) errors.profile_photo = "Profile photo is required";
        return errors;
    };

    const validateOtp = () => {
        let errors = {};
        if (!otpData.otp) errors.otp = "OTP is required";
        return errors;
    };

    const submitForm = (e) => {
        e.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('phone', data.phone);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('aadharNo', data.aadharNo);
        formData.append('profile_photo', data.profile_photo);

        // Mock implementation for sending OTP via email (replace with actual implementation)
        // For demo purposes, OTP is assumed to be sent to the provided email immediately
        sendOTP(data.email);

        setOtpData({ ...otpData, otpSent: true });
    };

    const sendOTP = (email) => {
        // Replace with your API endpoint or email sending logic
        // Example: axios.post('http://localhost/cnnmandram/send_otp.php', { email });
        console.log(`Sending OTP to ${email}`);
    };

    const validateAndSubmitOTP = (e) => {
        e.preventDefault();

        const errors = validateOtp();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Mock implementation for verifying OTP (replace with actual implementation)
        const enteredOTP = otpData.otp;
        const expectedOTP = "123456"; // Replace with actual OTP validation logic

        if (enteredOTP === expectedOTP) {
            navigate('/UserDetails'); // Redirect to UserDetails page on successful OTP verification
        } else {
            setErrors({ otp: "Invalid OTP, please try again" });
        }
    }


    return (
        <section>
            <div className="login">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-10">

                            {!otpData.otpSent ? (
                                <div className="inn">
                                    <div className="lhs">
                                        <div className="tit">
                                            <h2>Now <b>Find your life partner</b> Easy and fast.</h2>
                                        </div>
                                        <div className="im">
                                            <img src="images/login-couple.png" alt="Couple" />
                                        </div>
                                        <div className="log-bg">&nbsp;</div>
                                    </div>
                                    <div className="rhs">
                                        <div>
                                            <div className="form-tit">
                                                <h4>Start for free</h4>
                                                <h1>Sign up to Matrimony</h1>
                                                <p>Already a member? <Link to='/Login'>Login </Link></p>
                                            </div>
                                            <div className="form-login">
                                                <div className="form-login">
                                                    <form onSubmit={submitForm}>
                                                        <div className="form-group">
                                                            <label className="lb">Name:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter your full name"
                                                                name="name"
                                                                onChange={handleChange}
                                                                value={data.name}
                                                            />
                                                            {errors.name && <small className="text-danger">{errors.name}</small>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="lb">Email:</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Enter email"
                                                                name="email"
                                                                onChange={handleChange}
                                                                value={data.email}
                                                            />
                                                            {errors.email && <small className="text-danger">{errors.email}</small>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="lb">Phone:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter phone number"
                                                                name="phone"
                                                                onChange={handleChange}
                                                                value={data.phone}
                                                            />
                                                            {errors.phone && <small className="text-danger">{errors.phone}</small>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="lb">Password:</label>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="Enter password"
                                                                name="password"
                                                                onChange={handleChange}
                                                                value={data.password}
                                                            />
                                                            {errors.password && <small className="text-danger">{errors.password}</small>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="lb">Aadhar Card Number:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Aadhar No"
                                                                name="aadharNo"
                                                                onChange={handleChange}
                                                                value={data.aadharNo}
                                                            />
                                                            {errors.aadharNo && <small className="text-danger">{errors.aadharNo}</small>}
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="lb">Profile Photo:</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                name="profile_photo"
                                                                onChange={handleChange}
                                                            />
                                                            {errors.profile_photo && <small className="text-danger">{errors.profile_photo}</small>}
                                                        </div>
                                                        <div className="form-check">
                                                            <div className="row">
                                                                <div className="col-12 px-0 mx-0">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        name="agree"
                                                                        onChange={handleChange}
                                                                        checked={data.agree}
                                                                    />
                                                                    <label className="form-check-label ms-0">Creating an account means you’re okay with our{" "}
                                                                        <a href="#!">Terms of Service</a>, Privacy Policy, and our default Notification Settings.
                                                                    </label>
                                                                    {errors.agree && <small className="text-danger">{errors.agree}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {submitError && <div className="alert alert-danger mt-3">{submitError}</div>}
                                                        <button type="submit" className="btn btn-primary mt-3">Create Account</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ) : (
                                <form onSubmit={validateAndSubmitOTP}>
                                    {/* OTP input */}
                                    <p>OTP has sent to the registered Email . Please Check it  </p>
                                    <div className="form-group">
                                        <label className="lb">Enter OTP:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter OTP"
                                            name="otp"
                                            onChange={handleOtpChange}
                                            value={otpData.otp}
                                        />
                                        {errors.otp && <small className="text-danger">{errors.otp}</small>}
                                    </div>
                                    {submitError && <div className="alert alert-danger mt-3">{submitError}</div>}
                                    <button type="submit" className="btn btn-primary mt-3">Verify OTP</button>
                                </form>
                            )}



                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default SignUp;
