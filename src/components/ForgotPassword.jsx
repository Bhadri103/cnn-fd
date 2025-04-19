import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [resetPasswordData, setResetPasswordData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setResetPasswordData({
            ...resetPasswordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!resetPasswordData.email) {
            toast.error("Please enter your email");
            return;
        }

        const sendData = {
            email: resetPasswordData.email,
        };

        setLoading(true);

        try {
            const result = await axios.post(`${BASE_URL}/reset_password.php`, sendData, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Send OTP Response:', result.data);

            if (result.data.status === 'otp_required') {
                setOtpSent(true);
                toast.success(result.data.message);
            } else if (result.data.status === 'invalid') {
                toast.error(result.data.message);
            } else if (result.data.status === 'error') {
                toast.error(`Server error: ${result.data.message}`);
            } else {
                toast.error('Unexpected response from server: ' + JSON.stringify(result.data));
            }
        } catch (error) {
            console.error('Error sending OTP:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Error sending OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            toast.error("Please send OTP first");
            return;
        }

        if (!resetPasswordData.otp) {
            toast.error("Please enter the OTP");
            return;
        }

        if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const sendData = {
            email: resetPasswordData.email,
            otp: resetPasswordData.otp,
            newPassword: resetPasswordData.newPassword,
        };

        setLoading(true);

        try {
            const result = await axios.post(`${BASE_URL}/reset_password.php`, sendData, {
                headers: { 'Content-Type': 'application/json' },
            });

            console.log('Reset Password Response:', result.data);

            if (result.data.status === 'success') {
                toast.success('Password reset successful');
                navigate('/');
            } else if (result.data.status === 'invalid') {
                toast.error(result.data.message);
            } else if (result.data.status === 'error') {
                toast.error(`Server error: ${result.data.message}`);
            } else {
                toast.error('Unexpected response from server: ' + JSON.stringify(result.data));
            }
        } catch (error) {
            console.error('Error resetting password:', error.response?.data || error);
            toast.error(error.response?.data?.message || 'Error resetting password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <Container className="forgotPasswordPage">
                        <h1>Forgot Password</h1>
                        <Form onSubmit={submitForm}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        required
                                        onChange={handleChange}
                                        value={resetPasswordData.email}
                                        autoComplete="off"
                                        disabled={otpSent}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={handleSendOtp}
                                        className="ms-2"
                                        disabled={otpSent || loading}
                                    >
                                        {loading && !otpSent ? (
                                            <Spinner animation="border" size="sm" />
                                        ) : otpSent ? (
                                            'OTP Sent'
                                        ) : (
                                            'Send OTP'
                                        )}
                                    </Button>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>OTP</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    onChange={handleChange}
                                    value={resetPasswordData.otp}
                                    disabled={!otpSent}
                                    required={otpSent}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    required
                                    onChange={handleChange}
                                    value={resetPasswordData.newPassword}
                                    autoComplete="off"
                                    disabled={!otpSent}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    onChange={handleChange}
                                    value={resetPasswordData.confirmPassword}
                                    autoComplete="off"
                                    disabled={!otpSent}
                                />
                            </Form.Group>
                            <Button type="submit" variant="dark" disabled={loading || !otpSent}>
                                {loading && otpSent ? (
                                    <>
                                        <Spinner animation="border" size="sm" /> Verifying...
                                    </>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </Form>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;