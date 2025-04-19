import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../config';
  
const FILE_BASE_URL = 'http://localhost/uploads'; // URL for accessing files in the uploads folder

const UpdateUserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL

    // Initial form data structure
    const initialFormData = {
        fullname: '',
        marital_status: '',
        has_children: '',
        gender: '',
        dob: '',
        dob_time: '',
        birth_place: '',
        mother_tongue: '',
        rashi: '',
        star: '',
        paadham: '',
        caste: '',
        height: '',
        father: '',
        mother: '',
        brother: '',
        brother_married: '',
        sister: '',
        sister_married: '',
        birth_order: '',
        education: '',
        job_type: '',
        company_name: '',
        salary: '',
        work_place: '',
        sevaai_dhosam: '',
        sarpam_dhosam: '',
        raagu_dhosam: '',
        mobile_1: '',
        mobile_2: '',
        whatsapp: '',
        email: '',
        living_place: '',
        pin_code: '',
        country: '',
        address: '',
        expectations: '',
        profile_photo1: null,
        profile_photo2: null,
        horoscope: null,
        id_proof: null,
        children: [],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileNames, setFileNames] = useState({
        profile_photo1: '',
        profile_photo2: '',
        horoscope: '',
        id_proof: '',
    });
    const formRefs = useRef({});
    const fileInputRefs = useRef({
        profile_photo1: null,
        profile_photo2: null,
        horoscope: null,
        id_proof: null,
    });

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            if (!id || id === 'undefined') {
                console.error('Invalid user ID:', id);
                alert('Invalid user ID. Please try again.');
                navigate('/login');
                return;
            }

            console.log('Fetching user with ID:', id);

            try {
                const response = await axios.get(`${BASE_URL}/getUser.php?id=${id}`);
                console.log('Full Response:', response);
                console.log('Response Data:', response.data);

                console.log('Checking condition:', {
                    status: response.data.status,
                    hasData: !!response.data.data,
                });

                if (response.data.status === 'success' && response.data.data) {
                    const userData = response.data.data;
                    console.log('User Data:', userData);

                    let parsedChildren = [];
                    if (userData.children) {
                        try {
                            parsedChildren = JSON.parse(userData.children);
                            if (!Array.isArray(parsedChildren)) {
                                parsedChildren = [];
                            }
                        } catch (error) {
                            console.error('Error parsing children:', error);
                            parsedChildren = [];
                        }
                    }

                    console.log('Parsed Children:', parsedChildren);

                    const newFormData = {
                        ...initialFormData,
                        fullname: userData.fullname || '',
                        marital_status: userData.marital_status || '',
                        has_children: userData.has_children || '',
                        gender: userData.gender || '',
                        dob: userData.dob ? userData.dob.split(' ')[0] : '',
                        dob_time: userData.dob_time || '',
                        birth_place: userData.birth_place || '',
                        mother_tongue: userData.mother_tongue || '',
                        rashi: userData.rashi || '',
                        star: userData.star || '',
                        paadham: userData.paadham || '',
                        caste: userData.caste || '',
                        height: userData.height || '',
                        father: userData.father || '',
                        mother: userData.mother || '',
                        brother: userData.brother || '',
                        brother_married: userData.brother_married || '',
                        sister: userData.sister || '',
                        sister_married: userData.sister_married || '',
                        birth_order: userData.birth_order || '',
                        education: userData.education || '',
                        job_type: userData.job_type || '',
                        company_name: userData.company_name || '',
                        salary: userData.salary || '',
                        work_place: userData.work_place || '',
                        sevaai_dhosam: userData.sevaai_dhosam || '',
                        sarpam_dhosam: userData.sarpam_dhosam || '',
                        raagu_dhosam: userData.raagu_dhosam || '',
                        mobile_1: userData.mobile_1 || '',
                        mobile_2: userData.mobile_2 || '',
                        whatsapp: userData.whatsapp || '',
                        email: userData.email || '',
                        living_place: userData.living_place || '',
                        pin_code: userData.pin_code || '',
                        country: userData.country || '',
                        address: userData.address || '',
                        expectations: userData.expectations || '',
                        children: parsedChildren,
                    };

                    console.log('Setting formData:', newFormData);
                    setFormData(newFormData);

                    setFileNames({
                        profile_photo1: userData.profile_photo1 || '',
                        profile_photo2: userData.profile_photo2 || '',
                        horoscope: userData.horoscope || '',
                        id_proof: userData.id_proof || '',
                    });
                } else {
                    console.log('User not found in response:', response.data);
                    alert(response.data.message || 'User not found');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response) {
                    alert('Error fetching user data: ' + (error.response.data.message || error.message));
                } else if (error.request) {
                    alert('Error fetching user data: No response from server');
                } else {
                    alert('Error fetching user data: ' + error.message);
                }
                navigate('/');
            }
        };

        fetchUserData();
    }, [id, navigate]);

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (!file) {
            setFormData((prev) => ({ ...prev, [name]: null }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: file }));
        }

        setFileNames((prev) => ({ ...prev, [name]: file ? file.name : prev[name] }));
    };

    const handleAddChild = () => {
        setFormData((prev) => ({
            ...prev,
            children: [...prev.children, { name: '', age: '' }],
        }));
    };

    const handleRemoveChild = (index) => {
        setFormData((prev) => ({
            ...prev,
            children: prev.children.filter((_, i) => i !== index),
        }));
    };

    const handleChildChange = (index, key, value) => {
        const updatedChildren = [...formData.children];
        updatedChildren[index][key] = value;
        setFormData((prev) => ({ ...prev, children: updatedChildren }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append('id', id);
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'children') {
                    formDataToSubmit.append(key, JSON.stringify(value));
                } else if (value instanceof File) {
                    formDataToSubmit.append(key, value);
                } else {
                    formDataToSubmit.append(key, value);
                }
            });

            const response = await axios.post(`${BASE_URL}/updateUser.php`, formDataToSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.status === 'success') {
                alert('User details updated successfully!');
                // navigate('/user-list');
            } else {
                alert('Update failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            alert('An error occurred during update: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="userRegisterationForm mt-5">
            <div className="register-title text-center mb-4">
                <h3>UPDATE USER DETAILS</h3>
            </div>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleInputChange}
                                placeholder="Enter Your Full Name"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.fullname = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Marital Status:</Form.Label>
                            <Form.Control
                                type="text"
                                name="marital_status"
                                value={formData.marital_status}
                                onChange={handleInputChange}
                                placeholder="e.g., Unmarried, Divorce, Widow"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.marital_status = el)}
                            />
                        </Form.Group>
                    </Col>

                    {(formData.marital_status.toLowerCase() === 'divorce' || formData.marital_status.toLowerCase() === 'widow') && (
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Do you have children?</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="has_children"
                                    value={formData.has_children}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Yes, No"
                                    disabled={isSubmitting}
                                    ref={(el) => (formRefs.current.has_children = el)}
                                />

                                {formData.has_children.toLowerCase() === 'yes' && (
                                    <div className="children-section mt-3">
                                        <Button
                                            type="button"
                                            onClick={handleAddChild}
                                            className="mb-3"
                                            disabled={isSubmitting}
                                        >
                                            + Add Child
                                        </Button>
                                        {formData.children.map((child, index) => (
                                            <div key={index} className="child-entry mb-3">
                                                <Row>
                                                    <Col md={5}>
                                                        <Form.Control
                                                            type="text"
                                                            value={child.name}
                                                            onChange={(e) =>
                                                                handleChildChange(index, 'name', e.target.value)
                                                            }
                                                            placeholder={`Child ${index + 1} Name`}
                                                            disabled={isSubmitting}
                                                            ref={(el) =>
                                                                (formRefs.current[`child_name_${index}`] = el)
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Control
                                                            type="number"
                                                            value={child.age}
                                                            onChange={(e) =>
                                                                handleChildChange(index, 'age', e.target.value)
                                                            }
                                                            placeholder={`Child ${index + 1} Age`}
                                                            disabled={isSubmitting}
                                                            ref={(el) =>
                                                                (formRefs.current[`child_age_${index}`] = el)
                                                            }
                                                        />
                                                    </Col>
                                                    <Col md={3}>
                                                        <Button
                                                            variant="danger"
                                                            className="w-100"
                                                            onClick={() => handleRemoveChild(index)}
                                                            disabled={isSubmitting}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    )}

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender:</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                placeholder="e.g., M, F"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.gender = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Date of Birth:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                max={new Date().toISOString().split('T')[0]}
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.dob = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Time:</Form.Label>
                            <Form.Control
                                type="time"
                                name="dob_time"
                                value={formData.dob_time}
                                onChange={handleInputChange}
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.dob_time = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Place:</Form.Label>
                            <Form.Control
                                type="text"
                                name="birth_place"
                                value={formData.birth_place}
                                onChange={handleInputChange}
                                placeholder="Enter Birth Place"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.birth_place = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mother Tongue:</Form.Label>
                            <Form.Control
                                type="text"
                                name="mother_tongue"
                                value={formData.mother_tongue}
                                onChange={handleInputChange}
                                placeholder="e.g., Tamil, Telugu, English, Others"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.mother_tongue = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Rashi:</Form.Label>
                            <Form.Control
                                type="text"
                                name="rashi"
                                value={formData.rashi}
                                onChange={handleInputChange}
                                placeholder="e.g., மேஷம்"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.rashi = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Natchathiram:</Form.Label>
                            <Form.Control
                                type="text"
                                name="star"
                                value={formData.star}
                                onChange={handleInputChange}
                                placeholder="e.g., அஸ்வினி"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.star = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Paadham:</Form.Label>
                            <Form.Control
                                type="text"
                                name="paadham"
                                value={formData.paadham}
                                onChange={handleInputChange}
                                placeholder="e.g., 0, 1, 2, 3, 4"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.paadham = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Caste:</Form.Label>
                            <Form.Control
                                type="text"
                                name="caste"
                                value={formData.caste}
                                onChange={handleInputChange}
                                placeholder="e.g., கவுண்டர், நாயக்கர்/வன்னியர்"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.caste = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Height:</Form.Label>
                            <Form.Control
                                type="text"
                                name="height"
                                value={formData.height}
                                onChange={handleInputChange}
                                placeholder="e.g., 5'6"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.height = el)}
                            />
                        </Form.Group>
                    </Col>

                    <h5>Family Details</h5>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Father:</Form.Label>
                            <Form.Control
                                type="text"
                                name="father"
                                value={formData.father}
                                onChange={handleInputChange}
                                placeholder="e.g., yes, no"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.father = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mother:</Form.Label>
                            <Form.Control
                                type="text"
                                name="mother"
                                value={formData.mother}
                                onChange={handleInputChange}
                                placeholder="e.g., yes, no"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.mother = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Brothers:</Form.Label>
                            <Form.Control
                                type="text"
                                name="brother"
                                value={formData.brother}
                                onChange={handleInputChange}
                                placeholder="e.g., -, 1, 2, 3, etc."
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.brother = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Brothers Married:</Form.Label>
                            <Form.Control
                                type="text"
                                name="brother_married"
                                value={formData.brother_married}
                                onChange={handleInputChange}
                                placeholder="e.g., -, 1, 2, 3, etc."
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.brother_married = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sisters:</Form.Label>
                            <Form.Control
                                type="text"
                                name="sister"
                                value={formData.sister}
                                onChange={handleInputChange}
                                placeholder="e.g., -, 1, 2, 3, etc."
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.sister = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sisters Married:</Form.Label>
                            <Form.Control
                                type="text"
                                name="sister_married"
                                value={formData.sister_married}
                                onChange={handleInputChange}
                                placeholder="e.g., -, 1, 2, 3, etc."
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.sister_married = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Birth Order:</Form.Label>
                            <Form.Control
                                type="text"
                                name="birth_order"
                                value={formData.birth_order}
                                onChange={handleInputChange}
                                placeholder="e.g., Elder, Younger"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.birth_order = el)}
                            />
                        </Form.Group>
                    </Col>

                    <h5>Education & Job Details</h5>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Education:</Form.Label>
                            <Form.Control
                                type="text"
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                placeholder="e.g., PG/Engineers, UG/Diploma/SL, Professionals"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.education = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Job Type:</Form.Label>
                            <Form.Control
                                type="text"
                                name="job_type"
                                value={formData.job_type}
                                onChange={handleInputChange}
                                placeholder="e.g., Software Engineer, Doctor, Business, etc."
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.job_type = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleInputChange}
                                placeholder="Enter Company Name"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.company_name = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Monthly Salary:</Form.Label>
                            <Form.Control
                                type="text"
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                placeholder="Enter Monthly Salary"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.salary = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Work Place:</Form.Label>
                            <Form.Control
                                type="text"
                                name="work_place"
                                value={formData.work_place}
                                onChange={handleInputChange}
                                placeholder="Enter Work Place"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.work_place = el)}
                            />
                        </Form.Group>
                    </Col>

                    <h5>Dosham</h5>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sevaai Dosham:</Form.Label>
                            <Form.Control
                                type="text"
                                name="sevaai_dhosam"
                                value={formData.sevaai_dhosam}
                                onChange={handleInputChange}
                                placeholder="e.g., yes, no"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.sevaai_dhosam = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Sarpa Dosham:</Form.Label>
                            <Form.Control
                                type="text"
                                name="sarpam_dhosam"
                                value={formData.sarpam_dhosam}
                                onChange={handleInputChange}
                                placeholder="e.g., yes, no"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.sarpam_dhosam = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Raagu Dosham:</Form.Label>
                            <Form.Control
                                type="text"
                                name="raagu_dhosam"
                                value={formData.raagu_dhosam}
                                onChange={handleInputChange}
                                placeholder="e.g., yes, no"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.raagu_dhosam = el)}
                            />
                        </Form.Group>
                    </Col>

                    <h5>Contact Details</h5>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile 1:</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobile_1"
                                value={formData.mobile_1}
                                onChange={handleInputChange}
                                placeholder="Enter 10-digit Mobile Number"
                                maxLength="10"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.mobile_1 = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile 2:</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobile_2"
                                value={formData.mobile_2}
                                onChange={handleInputChange}
                                placeholder="Enter 10-digit Mobile Number"
                                maxLength="10"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.mobile_2 = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>WhatsApp:</Form.Label>
                            <Form.Control
                                type="tel"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                                placeholder="Enter 10-digit WhatsApp Number"
                                maxLength="10"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.whatsapp = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter Email ID"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.email = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Place:</Form.Label>
                            <Form.Control
                                type="text"
                                name="living_place"
                                value={formData.living_place}
                                onChange={handleInputChange}
                                placeholder="Enter Place"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.living_place = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>PIN Code:</Form.Label>
                            <Form.Control
                                type="text"
                                name="pin_code"
                                value={formData.pin_code}
                                onChange={handleInputChange}
                                placeholder="Enter 6-digit PIN Code"
                                maxLength="6"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.pin_code = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country:</Form.Label>
                            <Form.Control
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="e.g., India"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.country = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter Address"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.address = el)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Expectations:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="expectations"
                                value={formData.expectations}
                                onChange={handleInputChange}
                                placeholder="Enter Partner Expectations"
                                disabled={isSubmitting}
                                ref={(el) => (formRefs.current.expectations = el)}
                            />
                        </Form.Group>
                    </Col>

                    {/* <Row className="uploadscont">
                        <Col xs={12}>
                            <hr />
                        </Col>
                        <Col xs={12} className="mb-4">
                            <h4>Update the following Details (Leave blank to keep existing files)</h4>
                        </Col>

                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Photo</Form.Label>
                                <div className="custom-file-upload">
                                    <Form.Control
                                        type="file"
                                        id="profile_photo1"
                                        name="profile_photo1"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png"
                                        disabled={isSubmitting}
                                        ref={(el) => {
                                            formRefs.current.profile_photo1 = el;
                                            fileInputRefs.current.profile_photo1 = el;
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="profile_photo1" className="btn btn-outline-secondary w-100">
                                        {fileNames.profile_photo1 || 'Profile Photo'}
                                    </label>
                                </div>
                                {fileNames.profile_photo1 && (
                                    <div className="mt-2">
                                        <img
                                            src={`${FILE_BASE_URL}/${fileNames.profile_photo1}`}
                                            alt="Profile Photo 1"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            onError={(e) => (e.target.style.display = 'none')} // Hide the image if it fails to load
                                        />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>

                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Additional Photo</Form.Label>
                                <div className="custom-file-upload">
                                    <Form.Control
                                        type="file"
                                        id="profile_photo2"
                                        name="profile_photo2"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png"
                                        disabled={isSubmitting}
                                        ref={(el) => {
                                            formRefs.current.profile_photo2 = el;
                                            fileInputRefs.current.profile_photo2 = el;
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="profile_photo2" className="btn btn-outline-secondary w-100">
                                        {fileNames.profile_photo2 || 'Additional Photo'}
                                    </label>
                                </div>
                                {fileNames.profile_photo2 && (
                                    <div className="mt-2">
                                        <img
                                            src={`${FILE_BASE_URL}/${fileNames.profile_photo2}`}
                                            alt="Profile Photo 2"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            onError={(e) => (e.target.style.display = 'none')} // Hide the image if it fails to load
                                        />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>

                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Horoscope</Form.Label>
                                <div className="custom-file-upload">
                                    <Form.Control
                                        type="file"
                                        id="horoscope"
                                        name="horoscope"
                                        onChange={handleFileChange}
                                        accept="application/pdf"
                                        disabled={isSubmitting}
                                        ref={(el) => {
                                            formRefs.current.horoscope = el;
                                            fileInputRefs.current.horoscope = el;
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="horoscope" className="btn btn-outline-secondary w-100">
                                        {fileNames.horoscope || 'Horoscope'}
                                    </label>
                                </div>
                                {fileNames.horoscope && (
                                    <div className="mt-2">
                                        <a
                                            href={`${FILE_BASE_URL}/${fileNames.horoscope}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary w-100"
                                        >
                                            View Horoscope
                                        </a>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>

                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>ID Proof</Form.Label>
                                <div className="custom-file-upload">
                                    <Form.Control
                                        type="file"
                                        id="id_proof"
                                        name="id_proof"
                                        onChange={handleFileChange}
                                        accept="application/pdf"
                                        disabled={isSubmitting}
                                        ref={(el) => {
                                            formRefs.current.id_proof = el;
                                            fileInputRefs.current.id_proof = el;
                                        }}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="id_proof" className="btn btn-outline-secondary w-100">
                                        {fileNames.id_proof || 'ID Proof'}
                                    </label>
                                </div>
                                {fileNames.id_proof && (
                                    <div className="mt-2">
                                        <a
                                            href={`${FILE_BASE_URL}/${fileNames.id_proof}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary w-100"
                                        >
                                            View ID Proof
                                        </a>
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row> */}

                    <Col xs={12} className="text-center">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : 'Update User'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default UpdateUserForm;