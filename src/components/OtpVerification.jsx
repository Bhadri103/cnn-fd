import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../config'

const OtpVerification = ({ siteTitle }) => {
    const [data, setData] = useState({ email: "", password: "" });
    const [showLogin, setShowLogin] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(false);

    const handleCloseLogin = () => {
        setShowLogin(false);
        setShowOtpInput(false);
        setShowLoginButton(false);
    };

    const handleShowLogin = () => setShowLogin(true);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleOtpChange = (e) => {
        setOtpCode(e.target.value);
    };

    const handleVerifyOtp = () => {
        // Perform OTP verification
        const sendData = { otp_code: otpCode };

        // axios.post('http://localhost/cnnmandram/verification.php', sendData, {
        axios.post(`${BASE_URL}/verification.php`, sendData, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setShowLoginButton(true);
                    setShowOtpInput(false);
                    alert('OTP verified successfully!');
                } else {
                    alert('Invalid OTP. Please try again.');
                }
            })
            .catch((error) => {
                console.error('Error verifying OTP:', error);
                alert('Error verifying OTP. Please try again.');
            });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const sendData = { email: data.email, password: data.password };

        axios.post(`${BASE_URL}/verification.php`, sendData, {
            // axios.post('http://localhost/cnnmandram/verification.php', sendData, {
            headers: { 'Content-Type': 'application/json' }
        })

            .then((result) => {
                if (result.data.status === 'success') {
                    setShowOtpInput(true);
                    setShowLoginButton(false);
                    alert('Registration Successful! Please check your email for OTP.');
                } else {
                    alert('Registration Failed: ' + result.data.message);
                }
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div>
            <button type="button" className="btn btn-outline-dark btn-login shadow-none me-lg-3" onClick={handleShowLogin}>
                Login
            </button>

            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showOtpInput ? (
                        <Form.Group className="mb-3" controlId="formBasicOTP">
                            <Form.Label>Enter OTP</Form.Label>
                            <Form.Control type="text" placeholder="Enter OTP" value={otpCode} onChange={handleOtpChange} required />
                        </Form.Group>
                    ) : (
                        <Form onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={data.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    )}
                    {showLoginButton && (
                        <Button variant="primary" onClick={handleVerifyOtp}>
                            Verify OTP
                        </Button>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default OtpVerification;
