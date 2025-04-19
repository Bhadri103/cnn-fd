import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container px-0 d-flex  justify-content-evenly">
          {/* <div className="row foot-supp"> */}

          <div className="row">
            <div className="col-lg-6 ">
              {/* <b>   <p>Address: chennai </p>
                               </b> */}
              <b>
                {/* Phone:  */}
                <a href="tel: +91 044 2432 2858"> +91 044 2432 2858</a>
              </b>
            </div>
            <div className="col-lg-6">
              <b>
                {/* Email:  */}
                <a href="mailto:admin@cnnmandram.com">admin@cnnmandram.com</a>
              </b>
            </div>
          </div>
        </div>

        <hr />

        <div className="row mt-4">
          <p className="text-center">
            Copyright © <span id="cry">2025</span>{" "}
            <a href="#!" target="_blank">
              cnnmandram
            </a>{" "}
            All rights reserved.
            <Link
              to="/terms&condition"
              style={{
                marginLeft: "20px",
              }}
            >
              {" "}
              Terms & Conditions
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
