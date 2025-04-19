import React, { useState } from 'react';

import axios from 'axios';
import { BASE_URL } from '../config'
import { useNavigate } from 'react-router-dom';
const Payment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        membershipAmount: 2000,
        // totalAmount: '',
        profilePhoto: null,
        paymentScreenshot: null,
        password: '',
        // Add password field
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];
        setFormData({ ...formData, [name]: file });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            // Append each key-value pair from formData to formDataToSubmit
            Object.keys(formData).forEach((key) => {
                formDataToSubmit.append(key, formData[key]);
            });

            // Make POST request using axios
            // const response = await axios.post('https://cnnmandram.com/paymentDetails.php', formDataToSubmit, {
            const response = await axios.post(`${BASE_URL}/paymentDetails.php`, formDataToSubmit, {
                // const response = await axios.post('http://localhost/cnnmandram/paymentDetails.php', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Log response from server

            if (response.data.status === 'success') {
                alert(`Form submitted successfully! Your unique ID is: ${ response.data.unique_id }`);
                navigate('/');
                // Reset form fields after successful submission
                setFormData({
                    fullName: '',
                    email: '',
                    mobileNumber: '',
                    membershipAmount: 2000,
                    // totalAmount: '', // Consider resetting totalAmount if needed
                    paymentScreenshot: null,
                    password: '', // Reset password field if present
                });
            } else {
                alert('Form submission failed.');
            }
        } catch (error) {
            alert('Error submitting form: ' + error.message);
        }
    };

    return (
        <div>
            <div className="container payment">
                <h3>Membership Form</h3>
                <form onSubmit={handleSubmit}>
                    <b>Note: <span className='text-end text-danger'>Name, Email, Mobile Number must be same as entered in registration Form </span></b>
                    <br />
                    <br />
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email ID:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile Number:</label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label> {/* Add password field */}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
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
                        <label>Total Amount:</label>
                        <input
                            type="text"
                            name="totalAmount"
                            value={formData.totalAmount}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div> */}
                    <div className="form-group">
                        <label>Profile Photo</label>
                        <input
                            type="file"
                            name="profilePhoto"
                            onChange={handleFileChange}
                            className="form-control-file"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Payment Screenshot:</label>
                        <input
                            type="file"
                            name="paymentScreenshot"
                            onChange={handleFileChange}
                            className="form-control-file"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <h2 className="mb-4">Account Details</h2>
                <div className="row">
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
                        <img src="https://pbs.twimg.com/media/FLGeJ5GVkAEZ9bT.jpg" alt="" className="img-fluid" style={{ height: '500px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
