import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user from localStorage and sessionStorage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

        // Clear React state if user is stored in a state
        window.location.href = '/'; // Ensure a hard reload after logout
    };


    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
