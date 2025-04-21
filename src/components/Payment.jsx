import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import cnnqr from '../images/cnn-qr.jpg';

const Payment = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    profilePhoto: null,
    communityCertificate: null,
    aadharId: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
        if (!value) error = 'Full Name is required';
        else if (!/^[a-zA-Z\s]{2,}$/.test(value)) error = 'Only letters and spaces, min 2 characters';
        break;

      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;

      case 'mobileNumber':
        if (!value) error = 'Mobile Number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Must be exactly 10 digits';
        break;

      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 8) error = 'Minimum 8 characters';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value))
          error = 'Must include upper, lower, number, special char';
        break;

      default:
        break;
    }
    return error;
  };

  const validateFile = (name, file) => {
    const allowedImageTypes = ['image/jpeg', 'image/png'];
    const allowedPdfTypes = ['application/pdf'];
    const maxSize = name === 'profilePhoto' ? 5 * 1024 * 1024 : 10 * 1024 * 1024;

    if (!file) return `${name} is required`;

    const isValidType =
      name === 'profilePhoto'
        ? allowedImageTypes.includes(file.type)
        : allowedPdfTypes.includes(file.type);

    if (!isValidType) {
      return `${name === 'profilePhoto' ? 'Image' : 'PDF'} file only`;
    }

    if (file.size > maxSize) {
      return `${name} exceeds size limit (${maxSize / 1024 / 1024}MB)`;
    }

    return '';
  };

  const validateForm = () => {
    const errors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      mobileNumber: validateField('mobileNumber', formData.mobileNumber),
      password: validateField('password', formData.password),
      profilePhoto: validateFile('profilePhoto', formData.profilePhoto),
      communityCertificate: validateFile('communityCertificate', formData.communityCertificate),
      aadharId: validateFile('aadharId', formData.aadharId),
    };

    setFormErrors(errors);
    return Object.values(errors).every((err) => err === '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));
    setFormErrors((prev) => ({ ...prev, [name]: validateFile(name, file) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fix errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post(`${BASE_URL}/paymentDetails.php`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 'success') {
        alert(`Submitted! Your ID: ${response.data.unique_id}`);
        navigate('/verify-payment');
        setFormData({
          fullName: '',
          email: '',
          mobileNumber: '',
          password: '',
          profilePhoto: null,
          communityCertificate: null,
          aadharId: null,
        });
        setFormErrors({});
      } else {
        alert('Submission failed: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Submission error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container payment">
      <h3>Verification Form</h3>
      <form onSubmit={handleSubmit} noValidate>
        <b>
          Note:{' '}
          <span className="text-danger">
            Name, Email, Mobile Number must match Registration Form
          </span>
        </b>
        <br /><br />

        {[
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Email ID', name: 'email', type: 'email' },
          { label: 'Mobile Number', name: 'mobileNumber', type: 'tel' },
          { label: 'Password', name: 'password', type: 'password' },
        ].map(({ label, name, type }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className={`form-control ${formErrors[name] ? 'is-invalid' : ''}`}
              disabled={isSubmitting}
            />
            {formErrors[name] && <div className="invalid-feedback">{formErrors[name]}</div>}
          </div>
        ))}

        {[
          { label: 'Profile Photo', name: 'profilePhoto', accept: 'image/jpeg,image/png' },
          { label: 'Community Certificate (PDF)', name: 'communityCertificate', accept: 'application/pdf' },
          { label: 'Aadhar ID (PDF)', name: 'aadharId', accept: 'application/pdf' },
        ].map(({ label, name, accept }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            <input
              type="file"
              name={name}
              onChange={handleFileChange}
              className={`form-control-file ${formErrors[name] ? 'is-invalid' : ''}`}
              accept={accept}
              disabled={isSubmitting}
            />
            {formErrors[name] && <div className="invalid-feedback d-block">{formErrors[name]}</div>}
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Payment;
