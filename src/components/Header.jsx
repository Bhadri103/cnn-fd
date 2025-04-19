import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, Modal, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "../images/cnnmLogo.png";
import { FaChevronDown } from "react-icons/fa";
import { BASE_URL } from "../config";

const Header = ({ siteTitle }) => {
  const [data, setData] = useState({ email: "", password: "", otp: "" });
  const [user, setUser] = useState(null); // Initially null, no localStorage check
  const [sessionToken, setSessionToken] = useState(null); // In-memory session token
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null); // Time remaining in seconds

  const navigate = useNavigate();
  const SESSION_DURATION = 3600; // 1 hour in seconds

  // Check session validity on mount and tab focus
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("sessionToken");
    if (storedUser && storedToken) {
      validateSession(storedUser, storedToken);
    }

    // Listen for tab focus to invalidate session if copied
    window.addEventListener("focus", handleTabFocus);
    return () => window.removeEventListener("focus", handleTabFocus);
  }, []);

  // Session timer
  useEffect(() => {
    let timer;
    if (user && sessionToken && timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [user, sessionToken, timeLeft]);

  const validateSession = async (storedUser, token) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/validate_session.php`,
        {
          user_id: storedUser.user_id,
          token,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.status === "valid") {
        setUser(storedUser);
        setSessionToken(token);
        setTimeLeft(SESSION_DURATION); // Start timer
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error("Session validation error:", error);
      handleLogout();
    }
  };

  const handleTabFocus = () => {
    if (user && sessionToken) {
      // Invalidate session if opened in a new tab/browser
      const storedToken = localStorage.getItem("sessionToken");
      if (storedToken !== sessionToken) {
        handleLogout();
      }
    }
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    setOtpSent(false);
    setData({ email: "", password: "", otp: "" });
  };
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotOtpSent(false);
    setForgotPasswordData({
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const handleShowForgotPassword = () => setShowForgotPassword(true);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const handleForgotPasswordChange = (e) =>
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value,
    });

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert("Please enter both email and password first");
      return;
    }

    const sendData = { email: data.email, password: data.password };
    axios
      .post(`${BASE_URL}/login.php`, sendData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        console.log("Send OTP Response (Login):", result.data);
        if (result.data.status === "otp_required") {
          setOtpSent(true);
          alert(result.data.message);
        } else if (result.data.status === "invalid") {
          alert(result.data.message);
        } else if (result.data.status === "inactive") {
          alert(result.data.message);
        } else if (result.data.status === "error") {
          alert(`Server error: ${result.data.message}`);
        } else {
          console.warn("Unexpected Send OTP response:", result.data);
          alert(
            "Unexpected response from server during OTP request: " +
              JSON.stringify(result.data)
          );
        }
      })
      .catch((error) => {
        console.error(
          "Error sending OTP (Login):",
          error.response?.data || error
        );
        alert(
          "Error sending OTP: " +
            (error.response?.data?.message ||
              "Please check your network and try again")
        );
      });
  };

  const handleSendForgotOtp = (e) => {
    e.preventDefault();
    if (!forgotPasswordData.email) {
      alert("Please enter your email first");
      return;
    }

    const sendData = { email: forgotPasswordData.email };
    axios
      .post(`${BASE_URL}/reset_password.php`, sendData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        console.log("Send OTP Response (Forgot Password):", result.data);
        if (result.data.status === "otp_required") {
          setForgotOtpSent(true);
          alert(result.data.message);
        } else if (result.data.status === "invalid") {
          alert(result.data.message);
        } else if (result.data.status === "error") {
          alert(`Server error: ${result.data.message}`);
        } else {
          console.warn(
            "Unexpected Send OTP response (Forgot Password):",
            result.data
          );
          alert(
            "Unexpected response from server during OTP request: " +
              JSON.stringify(result.data)
          );
        }
      })
      .catch((error) => {
        console.error(
          "Error sending OTP (Forgot Password):",
          error.response?.data || error
        );
        alert(
          "Error sending OTP: " +
            (error.response?.data?.message ||
              "Please check your network and try again")
        );
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!otpSent) {
      alert("Please send OTP first");
      return;
    }
    if (!data.otp) {
      alert("Please enter the OTP");
      return;
    }

    const sendData = {
      email: data.email,
      password: data.password,
      otp: data.otp,
    };
    axios
      .post(`${BASE_URL}/login.php`, sendData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        console.log("Login Response:", result.data);
        if (result.data.status === "success") {
          const newToken = Math.random().toString(36).substr(2); // Generate unique session token
          setUser(result.data.user);
          setSessionToken(newToken);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          localStorage.setItem("sessionToken", newToken);
          setTimeLeft(SESSION_DURATION); // Start 1-hour timer
          handleCloseLogin();
          navigate("/");
        } else if (result.data.status === "inactive") {
          alert(result.data.message);
        } else if (result.data.status === "invalid") {
          alert(result.data.message);
        } else if (result.data.status === "otp_required") {
          alert("Please enter the OTP sent to your email");
        } else if (result.data.status === "error") {
          alert(`Server error: ${result.data.message}`);
        } else {
          console.warn("Unexpected Login response:", result.data);
          alert(
            "Unexpected response from server during login: " +
              JSON.stringify(result.data)
          );
        }
      })
      .catch((error) => {
        console.error("Error during login:", error.response?.data || error);
        if (error.response && error.response.status === 401) {
          alert("Your account is not active. Please contact support.");
        } else {
          alert(
            "Error submitting form: " +
              (error.response?.data?.message || "Please try again later")
          );
        }
      });
  };

  const submitForgotPasswordForm = (e) => {
    e.preventDefault();
    if (!forgotOtpSent) {
      alert("Please send OTP first");
      return;
    }
    if (!forgotPasswordData.otp) {
      alert("Please enter the OTP");
      return;
    }
    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const sendData = {
      email: forgotPasswordData.email,
      otp: forgotPasswordData.otp,
      newPassword: forgotPasswordData.newPassword,
    };
    axios
      .post(`${BASE_URL}/reset_password.php`, sendData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((result) => {
        console.log("Forgot Password Response:", result.data);
        if (result.data.status === "success") {
          handleCloseForgotPassword();
          alert(
            "Password reset successfully. You can now log in with your new password."
          );
        } else if (result.data.status === "invalid") {
          alert(result.data.message);
        } else if (result.data.status === "error") {
          alert(`Server error: ${result.data.message}`);
        } else {
          console.warn("Unexpected Forgot Password response:", result.data);
          alert(
            "Unexpected response from server: " + JSON.stringify(result.data)
          );
        }
      })
      .catch((error) => {
        console.error(
          "Error during password reset:",
          error.response?.data || error
        );
        alert(
          "Error resetting password: " +
            (error.response?.data?.message || "Please try again later")
        );
      });
  };

  const handleLogout = () => {
    setUser(null);
    setSessionToken(null);
    setTimeLeft(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionToken");
    sessionStorage.clear();
    navigate("/");
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleMyProfile = () => {
    if (user?.user_id) {
      navigate(`/update-user-form/${user.user_id}`);
      setDropdownOpen(false);
    } else {
      alert("User ID not found. Please log in again.");
      navigate("/login");
    }
  };

  const handleProtectedNavClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      navigate("/SignUp");
    } else {
      navigate(path);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <div className="head-top">
        <div className="container">
          <div className="row">
            <div className="topBar">
              <ul className="topBarList mb-0">
                <li>
                  <Link to="/About">About</Link>
                </li>
                <li>
                  <Link to="/Contact">Contact</Link>
                </li>
              </ul>
              <ul className="topRightList mb-0">
                <li>
                  <a href="tel:+91 044 2432 2858">
                    <i className="fa fa-phone" aria-hidden="true" /> +91 044
                    2432 2858
                  </a>
                </li>
                <li>
                  <a href="mailto:cnnm1985@gmail.com">
                    <i className="fa fa-envelope-o" aria-hidden="true" />{" "}
                    cnnm1985@gmail.com
                  </a>
                </li>
                <li className="topbaricon">
                  <i className="fa fa-facebook" aria-hidden="true" />
                </li>
                <li className="topbaricon">
                  <i className="fa fa-twitter" aria-hidden="true" />
                </li>
                <li className="topbaricon">
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="hom-top">
        <Navbar expand="md" className="bg-body">
          <Container fluid>
            <Navbar.Brand href="#">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  loading="lazy"
                  className="ic-logo img-fluid"
                  style={{ maxWidth: "60px" }}
                />
                <br />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                <Nav.Link className="smenu-pare">
                  <span>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                    >
                      HOME
                    </NavLink>
                  </span>
                </Nav.Link>
                <Nav.Link className="smenu-pare">
                  <span>
                    <span className="aboutMemuHover">
                      <NavLink
                        to="/About"
                        className={({ isActive }) =>
                          isActive ? "active-link" : ""
                        }
                      >
                        About{" "}
                        <span className="aboutIcon">
                          <FaChevronDown />
                        </span>
                      </NavLink>
                    </span>
                    <ul className="aboutInnerList">
                      <li>
                        <Link to="/History">History</Link>
                      </li>
                      <li>
                        <Link to="/Memories">Memories</Link>
                      </li>
                      <li>
                        <Link to="/Motives">Motives</Link>
                      </li>
                    </ul>
                  </span>
                </Nav.Link>
                <Nav.Link className="smenu-pare">
                  <span className="smeu">
                    <NavLink
                      to="/AllProfile"
                      className={({ isActive }) =>
                        isActive ? "active-link" : ""
                      }
                    >
                      All profiles
                    </NavLink>
                  </span>
                </Nav.Link>
                {!user ? (
                  <>
                    <Nav.Link className="smenu-pare">
                      <span className="smeu">
                        <NavLink to="/Plans">Plans</NavLink>
                      </span>
                    </Nav.Link>
                    <Nav.Link className="smenu-pare">
                      <span className="smeu">
                        <NavLink
                          to="/SignUp"
                          className={({ isActive }) =>
                            isActive ? "active-link" : ""
                          }
                        >
                          Register
                        </NavLink>
                        <NavLink
                          to="/payments"
                          style={{
                            marginLeft: "20px",
                          }}
                          className={({ isActive }) =>
                            isActive ? "active-link" : ""
                          }
                        >
                          Payments
                        </NavLink>
{/* 
                        <NavLink
                          to="/bio-data"
                          style={{
                            marginLeft: "20px",
                          }}
                          className={({ isActive }) =>
                            isActive ? "active-link" : ""
                          }
                        >Bio Data
                        </NavLink> */}
                      </span>
                    </Nav.Link>
                  </>
                ) : null}
              </Nav>

              <div className="d-flex align-items-center ms-auto">
                {user ? (
                  <div className="text-center position-relative">
                    <div className="dropdown">
                      <img
                        src={`${BASE_URL}/uploads/profiles/${
                          user?.profilePhoto || "default.jpg"
                        }`}
                        alt="Profile"
                        className="rounded-circle me-2 dropdown-toggle"
                        style={{
                          width: "40px",
                          height: "40px",
                          cursor: "pointer",
                        }}
                        onClick={toggleDropdown}
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded={dropdownOpen}
                      />
                      <ul
                        className={`dropdown-menu ${
                          dropdownOpen ? "show" : ""
                        }`}
                        aria-labelledby="profileDropdown"
                        style={{
                          position: "absolute",
                          top: "50px",
                          right: "0",
                          transform: "none",
                        }}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleMyProfile}
                          >
                            My Profile
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                    <small className="d-block text-center">
                      <b>{user?.fullName}</b> <br />
                      {user?.unique_id}
                    </small>
                    <small className="d-block text-center mt-1 text-danger">
                      Time Left:{" "}
                      {timeLeft !== null ? formatTime(timeLeft) : "N/A"}
                    </small>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-login shadow-none me-lg-3"
                      onClick={handleShowLogin}
                    >
                      Login
                    </button>

                    <Modal show={showLogin} onHide={handleCloseLogin}>
                      <Modal.Header closeButton>
                        <Modal.Title>User Login</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={submitForm}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              name="email"
                              value={data.email}
                              onChange={handleChange}
                              required
                              disabled={otpSent}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <div className="d-flex align-items-center">
                              <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                                disabled={otpSent}
                              />
                              <Button
                                variant="outline-primary"
                                onClick={handleSendOtp}
                                className="ms-2 text-nowrap"
                                disabled={otpSent}
                              >
                                {otpSent ? "OTP Sent" : "Send OTP"}
                              </Button>
                            </div>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicOtp">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter OTP"
                              name="otp"
                              value={data.otp}
                              onChange={handleChange}
                              disabled={!otpSent}
                              required={otpSent}
                            />
                          </Form.Group>
                          <div className="row">
                            <div className="col-4">
                              <Button
                                variant="primary"
                                type="submit"
                                className=" text-nowrap"
                                disabled={!otpSent}
                              >
                                Verify OTP & Login
                              </Button>
                            </div>
                            <div className="col-8 text-end">
                              <p className="mt-2">
                                <span
                                  onClick={() => {
                                    handleCloseLogin();
                                    handleShowForgotPassword();
                                  }}
                                  style={{ cursor: "pointer", color: "blue" }}
                                >
                                  Forget Password?
                                </span>
                              </p>
                            </div>
                          </div>
                        </Form>
                      </Modal.Body>
                    </Modal>

                    <Modal
                      show={showForgotPassword}
                      onHide={handleCloseForgotPassword}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Forgot Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={submitForgotPasswordForm}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <div className="d-flex">
                              <Form.Control
                                type="email"
                                name="email"
                                required
                                onChange={handleForgotPasswordChange}
                                value={forgotPasswordData.email}
                                autoComplete="off"
                                disabled={forgotOtpSent}
                              />
                              <Button
                                variant="outline-primary"
                                onClick={handleSendForgotOtp}
                                className="ms-2 text-nowrap"
                                disabled={forgotOtpSent}
                              >
                                {forgotOtpSent ? "OTP Sent" : "Send OTP"}
                              </Button>
                            </div>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                              type="text"
                              name="otp"
                              placeholder="Enter OTP"
                              onChange={handleForgotPasswordChange}
                              value={forgotPasswordData.otp}
                              disabled={!forgotOtpSent}
                              required={forgotOtpSent}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="newPassword"
                              required
                              onChange={handleForgotPasswordChange}
                              value={forgotPasswordData.newPassword}
                              autoComplete="off"
                              disabled={!forgotOtpSent}
                            />
                          </Form.Group>
                          <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              required
                              onChange={handleForgotPasswordChange}
                              value={forgotPasswordData.confirmPassword}
                              autoComplete="off"
                              disabled={!forgotOtpSent}
                            />
                          </Form.Group>
                          <Button
                            type="submit"
                            variant="primary"
                            disabled={!forgotOtpSent}
                          >
                            Verify OTP & Reset Password
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  </>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
