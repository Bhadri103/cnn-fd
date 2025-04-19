import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import cnnqr from '../images/cnn-qr.jpg'
const Payment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        membershipAmount: 3000,
        profilePhoto: null,
        paymentScreenshot: null,
        password: '',
        communityCertificate: null,
        aadharId: null,
    });

    const [formErrors, setFormErrors] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        profilePhoto: '',
        paymentScreenshot: '',
        communityCertificate: '',
        aadharId: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Validation functions
    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'fullName':
                if (!value) {
                    error = 'Full Name is required';
                } else if (!/^[a-zA-Z\s]{2,}$/.test(value)) {
                    error = 'Full Name must contain only letters and spaces, minimum 2 characters';
                }
                break;

            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address';
                }
                break;

            case 'mobileNumber':
                if (!value) {
                    error = 'Mobile Number is required';
                } else if (!/^\d{10}$/.test(value)) {
                    error = 'Mobile Number must be exactly 10 digits';
                }
                break;

            case 'password':
                if (!value) {
                    error = 'Password is required';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters long';
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) {
                    error = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
                }
                break;

            default:
                break;
        }

        return error;
    };

    const validateFile = (name, file) => {
        let error = '';

        if (!file) {
            return `${name === 'profilePhoto' ? 'Profile Photo' : name === 'paymentScreenshot' ? 'Payment Screenshot' : name === 'communityCertificate' ? 'Community Certificate' : 'Aadhar ID'} is required`;
        }

        const maxSize = name === 'profilePhoto' || name === 'paymentScreenshot' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB for images, 10MB for PDFs
        const allowedImageTypes = ['image/jpeg', 'image/png'];
        const allowedPdfType = 'application/pdf';

        if (name === 'profilePhoto' || name === 'paymentScreenshot') {
            if (!allowedImageTypes.includes(file.type)) {
                error = `${name === 'profilePhoto' ? 'Profile Photo' : 'Payment Screenshot'} must be a JPEG or PNG image`;
            } else if (file.size > maxSize) {
                error = `${name === 'profilePhoto' ? 'Profile Photo' : 'Payment Screenshot'} must be less than 5MB`;
            }
        } else if (name === 'communityCertificate' || name === 'aadharId') {
            if (file.type !== allowedPdfType) {
                error = `${name === 'communityCertificate' ? 'Community Certificate' : 'Aadhar ID'} must be a PDF file`;
            } else if (file.size > maxSize) {
                error = `${name === 'communityCertificate' ? 'Community Certificate' : 'Aadhar ID'} must be less than 10MB`;
            }
        }

        return error;
    };

    const validateForm = () => {
        const errors = {
            fullName: validateField('fullName', formData.fullName),
            email: validateField('email', formData.email),
            mobileNumber: validateField('mobileNumber', formData.mobileNumber),
            password: validateField('password', formData.password),
            profilePhoto: validateFile('profilePhoto', formData.profilePhoto),
            paymentScreenshot: validateFile('paymentScreenshot', formData.paymentScreenshot),
            communityCertificate: validateFile('communityCertificate', formData.communityCertificate),
            aadharId: validateFile('aadharId', formData.aadharId),
        };

        setFormErrors(errors);

        return Object.values(errors).every((error) => error === '');
    };

    // Handle input changes with validation
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Validate the field on change
        const error = validateField(name, value);
        setFormErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        setFormData({ ...formData, [name]: file });

        // Validate the file on change
        const error = validateFile(name, file);
        setFormErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate the entire form
        const isValid = validateForm();

        if (!isValid) {
            alert('Please fix the errors in the form before submitting.');
            return;
        }

        setIsSubmitting(true);
        try {
            const formDataToSubmit = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataToSubmit.append(key, formData[key]);
            });

            const response = await axios.post(`${BASE_URL}/paymentDetails.php`, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // console.log(response.data);

            if (response.data.status === 'success') {
                alert(`Form submitted successfully! Your unique ID is: ${response.data.unique_id}`);
                navigate('/verify-payment');
                setFormData({
                    fullName: '',
                    email: '',
                    mobileNumber: '',
                    membershipAmount: 3000,
                    profilePhoto: null,
                    paymentScreenshot: null,
                    password: '',
                    communityCertificate: null,
                    aadharId: null,
                });
                setFormErrors({
                    fullName: '',
                    email: '',
                    mobileNumber: '',
                    password: '',
                    profilePhoto: '',
                    paymentScreenshot: '',
                    communityCertificate: '',
                    aadharId: '',
                });
            } else {
                alert('Form submission failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('Error submitting form: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div className="container payment">
                <h3>Membership Form</h3>
                <form onSubmit={handleSubmit} noValidate>
                    <b>
                        Note: <span className="text-end text-danger">Name, Email, Mobile Number must be same as entered in registration Form</span>
                    </b>
                    <br />
                    <br />
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`form-control ${formErrors.fullName ? 'is-invalid' : ''}`}
                            disabled={isSubmitting}
                        />
                        {formErrors.fullName && <div className="invalid-feedback">{formErrors.fullName}</div>}
                    </div>
                    <div className="form-group">
                        <label>Email ID:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            disabled={isSubmitting}
                        />
                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label>Mobile Number:</label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            className={`form-control ${formErrors.mobileNumber ? 'is-invalid' : ''}`}
                            maxLength="10"
                            disabled={isSubmitting}
                        />
                        {formErrors.mobileNumber && <div className="invalid-feedback">{formErrors.mobileNumber}</div>}
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                            disabled={isSubmitting}
                        />
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                    </div>
                    <div className="form-group">
                        <label>Membership Amount:</label>
                        <input
                            type="text"
                            name="membershipAmount"
                            value={formData.membershipAmount}
                            className="form-control"
                            readOnly
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Profile Photo:</label>
                        <input
                            type="file"
                            name="profilePhoto"
                            onChange={handleFileChange}
                            className={`form-control-file ${formErrors.profilePhoto ? 'is-invalid' : ''}`}
                            accept="image/jpeg,image/png"
                            disabled={isSubmitting}
                        />
                        {formErrors.profilePhoto && <div className="invalid-feedback d-block">{formErrors.profilePhoto}</div>}
                    </div> */}
                    {/* <div className="form-group">
                        <label>Payment Screenshot:</label>
                        <input
                            type="file"
                            name="paymentScreenshot"
                            onChange={handleFileChange}
                            className={`form-control-file ${formErrors.paymentScreenshot ? 'is-invalid' : ''}`}
                            accept="image/jpeg,image/png"
                            disabled={isSubmitting}
                        />
                        {formErrors.paymentScreenshot && <div className="invalid-feedback d-block">{formErrors.paymentScreenshot}</div>}
                    </div> */}
                    <div className="form-group">
                        <label>Community Certificate (PDF):</label>
                        <input
                            type="file"
                            name="communityCertificate"
                            onChange={handleFileChange}
                            className={`form-control-file ${formErrors.communityCertificate ? 'is-invalid' : ''}`}
                            accept="application/pdf"
                            disabled={isSubmitting}
                        />
                        {formErrors.communityCertificate && <div className="invalid-feedback d-block">{formErrors.communityCertificate}</div>}
                    </div>
                    <div className="form-group">
                        <label>Aadhar ID (PDF):</label>
                        <input
                            type="file"
                            name="aadharId"
                            onChange={handleFileChange}
                            className={`form-control-file ${formErrors.aadharId ? 'is-invalid' : ''}`}
                            accept="application/pdf"
                            disabled={isSubmitting}
                        />
                        {formErrors.aadharId && <div className="invalid-feedback d-block">{formErrors.aadharId}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                <div className="row d-flex justify-content-center">
                    {/* <div className="col-md-6">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th scope="row">Account Name</th>
                                    <td>CNNM Matrimony</td>
                                </tr>
                                <tr>
                                    <th scope="row">Account Number</th>
                                    <td>12345678</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bank</th>
                                    <td>abc Bank</td>
                                </tr>
                                <tr>
                                    <th scope="row">Branch</th>
                                    <td>xyz</td>
                                </tr>
                                <tr>
                                    <th scope="row">IFSC Code</th>
                                    <td>69txc</td>
                                </tr>
                                <tr>
                                    <th scope="row">MICR Code</th>
                                    <td>46777</td>
                                </tr>
                                <tr>
                                    <th scope="row">Branch Code</th>
                                    <td>4566</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>xyz,Tamilnadu</td>
                                </tr>
                                <tr>
                                    <th scope="row">District</th>
                                    <td>abc</td>
                                </tr>
                                <tr>
                                    <th scope="row">State</th>
                                    <td>Tamil Nadu</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}
                    {/* <div className="col-md-6 d-flex justify-content-center">  <div>
                        <h2 className="my-4 text-center">Account Details</h2>
                        <img src={cnnqr} alt="" className="img-fluid" style={{ height: '500px' }} />
                    </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Payment;