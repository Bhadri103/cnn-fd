import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config'
const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        let errors = {};
        if (!data.email) errors.email = "Email is required";
        if (!data.password) errors.password = "Password is required";
        return errors;
    };

    const submitForm = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const sendData = {
            email: data.email,
            password: data.password
        };

        // axios.post('https://cnnmandram.com/cnnmandram/login.php', sendData, {
        // axios.post('https://localhost/cnnmandram/login.php', sendData, {
        axios.post(`${BASE_URL}/login.php`, sendData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((result) => {
                console.log('Result:', result);
                if (result.data.status === 'invalid') {
                    alert('Invalid Email or Password');
                } else {
                    navigate('/UploadDocument');
                }
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    };

    return (
        <>
            <section>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="inn">
                                <div className="lhs">
                                    <div className="tit">
                                        <h3>
                                            Now{" "}
                                            <b>
                                                Find <br /> your life partner
                                            </b>{" "}
                                            Easy and fast.
                                        </h3>
                                    </div>
                                    <div className="im">
                                        <img src="images/login-couple.png" alt="" />
                                    </div>
                                    <div className="log-bg">&nbsp;</div>
                                </div>
                                <div className="rhs">
                                    <div>
                                        <div className="form-tit">
                                            <h4>Start for free</h4>
                                            <h1>Sign in to Matrimony</h1>
                                            <p>
                                                Not a member? <Link to='/SignUp'>Sign up now</Link>
                                            </p>
                                        </div>
                                        <div className="form-login">
                                            <form onSubmit={submitForm} id="login-form">
                                                <div className="modal-header">
                                                    <h5 className="modal-title d-flex align-items-center">
                                                        <i className="bi bi-person-circle fs-3 me-2"></i> User Login
                                                    </h5>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="mb-3">
                                                        <label className="form-label">Email </label>
                                                        <input type="email" name="email" className='form-control' required onChange={handleChange} value={data.email} autoComplete="off" />
                                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="form-label">Password</label>
                                                        <input type="password" name="password" className='form-control' required onChange={handleChange} value={data.password} autoComplete="off" />
                                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                                        <button type="submit" className="btn btn-dark shadow-none">LOGIN</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
