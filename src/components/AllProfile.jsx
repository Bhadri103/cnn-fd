import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "../config";
import dummyImg from "./images/profile-dummy.png";

const AllProfile = () => {
    const [users, setUsers] = useState([]); // Original fetched users
    const [filteredUsers, setFilteredUsers] = useState([]); // Users displayed after filtering
    const [filterGender, setFilterGender] = useState("");
    const [filterAgeRange, setFilterAgeRange] = useState("");
    const [filterDistrict, setFilterDistrict] = useState(""); // For Location Search
    const [searchId, setSearchId] = useState(""); // For ID Search
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4); // Or your desired number
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/fetchRegisteredUsers.php`);
            const data = Array.isArray(response.data?.data)
                ? response.data.data
                : Array.isArray(response.data)
                    ? response.data
                    : [];

            console.log("API Response Data:", data); // Keep for debugging

            if (data.length > 0) {
                // *** CRITICAL DEBUGGING STEP ***
                // Check your browser's console for this log.
                // Verify the exact field name(s) containing the user IDs you want to search by.
                console.log("Available user fields (check for your ID field!):", Object.keys(data[0]));
            } else {
                console.log("No user data received or data is not an array.");
            }

            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
            setFilteredUsers([]);
            setTotalPages(1);
        }
    }, []); // Add BASE_URL if it can change, otherwise empty is fine

    const calculateAge = useCallback((dateOfBirth) => {
      if (!dateOfBirth) return null;
      try {
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          if (isNaN(birthDate.getTime())) {
              console.warn("Invalid date format for age calculation:", dateOfBirth);
              return null;
          }
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
          }
          return age >= 0 ? age : null;
      } catch (error) {
          console.error("Error calculating age for:", dateOfBirth, error);
          return null;
      }
  }, []);

    const applyFilters = useCallback(() => {
        console.log("applyFilters triggered. Current searchId:", searchId); // Log searchId at start
        let filteredData = [...users];

        // Apply other filters (Gender, Age, Location) - KEEP THIS LOGIC AS IS

        if (filterGender) {
            filteredData = filteredData.filter(user => user.gender === filterGender);
        }

        if (filterAgeRange) {
            const [minAgeStr, maxAgeStr] = filterAgeRange.split('-');
            if (minAgeStr && maxAgeStr) {
                const minAge = Number(minAgeStr);
                const maxAge = Number(maxAgeStr);
                filteredData = filteredData.filter(user => {
                    const userAge = calculateAge(user.dob);
                    return userAge !== null && userAge >= minAge && userAge <= maxAge;
                });
            }
        }

        const districtQuery = filterDistrict.trim().toLowerCase();
        if (districtQuery) {
            const locationFields = ["living_place", "district", "location", "city", "state", "address"];
            filteredData = filteredData.filter((user) => {
                return locationFields.some(field =>
                    user?.[field] && typeof user[field] === 'string' &&
                    user[field].toLowerCase().includes(districtQuery)
                );
            });
        }

        // ---> Filter by ID <---
        const idQuery = searchId.trim().toLowerCase();
        if (idQuery) {
            const idFields = [
                "id",
                "regNo",
                "user_id",
                "payment_unique_id", // Ensure this is correct
                "registration_id"
            ];
            console.log(`Filtering by ID: Query='${idQuery}'`);

            filteredData = filteredData.filter((user) => {
                return idFields.some((field) => {
                    const userValue = user?.[field];
                    if (userValue !== null && userValue !== undefined) {
                        const userValueStr = userValue.toString().toLowerCase();
                        const match = userValueStr.includes(idQuery);
                        console.log(`Checking field '${field}': User Value='${userValueStr}', Includes Query='${idQuery}', Match=${match}`);
                        return match;
                    }
                    return false;
                });
            });
            console.log("Users remaining after ID filter:", filteredData.length);
        }
        // <--- End ID Filter --->

        setFilteredUsers(filteredData);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
        setCurrentPage(1); // Reset to the first page after applying new filters
    }, [users, filterGender, filterAgeRange, filterDistrict, searchId, itemsPerPage, calculateAge]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        console.log("useEffect detected change, calling applyFilters...");
        applyFilters();
    }, [applyFilters]);

    const handleFilterButtonClick = () => {
        console.log("Filter button clicked manually, calling applyFilters...");
        applyFilters();
    };

    const currentItems = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCardClick = (e, id) => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
          e.preventDefault();
          navigate('/SignUp');
        } else if (id) {
          localStorage.setItem('selectedUserId', id);
          navigate(`/user-details/${id}`);
        }
      };
    const handleClickNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleClickPrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container mt-5">
            <div className="row mb-4 justify-content-center">
                <div className="col-12 mb-4">
                    <h1 className="mb-0 text-center fw-bold">FIND YOUR MATCH HERE</h1>
                </div>
                <div className="col-12">
                    <div
                        className="d-flex flex-wrap justify-content-center align-items-center gap-3 p-3 text-white rounded"
                        style={{ backgroundColor: "#c86a00" }}
                    >
                        <div>
                            <select
                                className="form-select"
                                value={filterGender}
                                onChange={(e) => setFilterGender(e.target.value)}
                                style={{ minWidth: "150px" }}
                            >
                                <option value="">I'm looking for</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div>
                            <select
                                className="form-select"
                                value={filterAgeRange}
                                onChange={(e) => setFilterAgeRange(e.target.value)}
                                style={{ minWidth: "150px" }}
                            >
                                <option value="">Age</option>
                                <option value="18-25">18-25</option>
                                <option value="26-35">26-35</option>
                                <option value="36-45">36-45</option>
                                <option value="46-60">46-60</option>
                            </select>
                        </div>

                        <div>
                            <select
                                className="form-select"
                                value={filterDistrict}
                                onChange={(e) => setFilterDistrict(e.target.value)}
                                style={{ minWidth: "150px" }}
                            >
                                <option value="">Select District</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Unnao">Unnao</option>
                                <option value="Varanasi">Varanasi</option>
                                {/* Add more district options as needed */}
                            </select>
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Search by ID"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                style={{ minWidth: '150px' }}
                            />
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={handleFilterButtonClick}
                            style={{ backgroundColor: "#2d4f07", borderColor: "#2d4f07" }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="row profilecard-box">
                        {currentItems.length > 0 ? (
                            currentItems.map((user) => (
                                <div key={user.id} className="col-md-3 mb-4">
                                    <div
                                        className="profile-card shadow-sm h-100"
                                        onClick={(e) => handleCardClick(e, user.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <div className="card-image-wrapper">
                                            <img
                                                src={
                                                    user.profile_photo1 && user.profile_photo1.trim() !== ""
                                                        ? `${BASE_URL}/uploads/profile_photo1/${user.profile_photo1}`
                                                        : dummyImg
                                                }
                                                alt="Profile"
                                                className="card-img-top"
                                                onError={(e) => (e.target.src = dummyImg)}
                                            />
                                            <div className="image-overlay">
                                                <span className="view-profile">View Profile</span>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{user.fullname}</h5>
                                            <p className="card-text text-start">
                                                <span>User ID: </span>
                                                <b>{user.payment_unique_id || "Free User"}</b>
                                                <br />
                                                <span>Birth Place: </span> {user.birth_place} <br />
                                                <span>Job: </span> {user.job_type} <br />
                                                <span>Age: </span> {calculateAge(user.dob)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No profiles found.</p>
                        )}
                    </div>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleClickPrev}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="align-self-center">
                        {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn btn-primary ms-2"
                        onClick={handleClickNext}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AllProfile;