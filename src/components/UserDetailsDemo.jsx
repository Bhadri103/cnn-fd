import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from '../config'

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        // axios.get('http://localhost/cnnmandram/getUserDetails.php')
        axios.get(`${BASE_URL}/getUserDetails.php`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user details!', error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {userDetails.map(user => (
                    <div className="col-md-4 mb-4" key={user.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{user.userName}</h5>
                                <p className="card-text">
                                    <strong>Gender:</strong> {user.gender}<br />
                                    <strong>Date of Birth:</strong> {user.dob}<br />
                                    <strong>Place:</strong> {user.place}<br />
                                    <strong>Location:</strong> {user.location}<br />
                                    <strong>Assets:</strong> {user.assets}<br />
                                    <strong>Star:</strong> {user.star}<br />
                                    <strong>Zodiac:</strong> {user.zodiac}<br />
                                    <strong>Address:</strong> {user.address}<br />
                                    <strong>Phone Number:</strong> {user.phoneNumber}<br />
                                    <strong>Agree:</strong> {user.agree ? 'Yes' : 'No'}<br />
                                    <strong>Created At:</strong> {user.created_at}<br />
                                </p>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDetails;
