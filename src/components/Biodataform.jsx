import React, { useState, useRef } from "react";

import { Modal } from "bootstrap";

import "./styles/biodataShowcase.css"; // We'll create this CSS file next
import TamilTextEffect from "./bioform/TamilTextEffect";
import cnnmLogo from "../images/cnnmLogo.png"; // Import the logo image
import callLogo from "../images/social/call.png";
import whatappLogo from "../images/social/6.png";
import mailLogo from "../images/contact/email.png";
import webLogo from "../images/contact/web.png";
import ChartGrid from "./bioform/ChartGrid";
import "./bio.css";

const Biodataform = React.forwardRef(({ userData }, ref) => {
  console.log(userData, "this is user data");
  const modalRef = useRef(null);

  const handleImageClick = () => {
    const modal = new Modal(modalRef.current);
    modal.show();
  };
  const defaultChartData = {
    rasi: {
      1: ["பு", "சு"],
      2: ["சு"],
      3: ["சனி"],
      4: ["செ"],
      5: ["சூ", "பு", "சு"],
      6: ["கு"],
      7: ["கே", "மா", "வ"],
      8: ["ல"],
      9: ["ரா", "மா"],
      10: ["வ"],
      11: ["கே"],
      12: ["சந்"],
    },
    navamsam: {
      1: ["பு"],
      2: ["சு"],
      3: ["சனி"],
      4: ["செ"],
      5: ["சூ", "சு"],
      6: ["கு"],
      7: ["மா", "வ"],
      8: ["ல"],
      9: ["மா"],
      10: ["வ"],
      11: ["செ"],
      12: ["சந்"],
    },
  };

  // Use userData for charts if available, otherwise use sample data
  const rasiChartData = userData?.rasi ? userData.rasi : defaultChartData.rasi;

  const navamsamChartData = userData?.navamsam
    ? userData.navamsam
    : defaultChartData.navamsam;

  console.log("🔮 Rasi Chart Data:", JSON.stringify(rasiChartData, null, 2));
  console.log(
    "🌙 Navamsam Chart Data:",
    JSON.stringify(navamsamChartData, null, 2)
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    // Attach the ref to the main container div
    <>
      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="profilePhotoModal"
        tabIndex="-1"
        aria-labelledby="profilePhotoModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="profilePhotoModalLabel">
                Profile Photo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <img
                src={userData?.profile_photo1}
                alt="Profile Enlarged"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="biodata-showcase" ref={ref}>
        <div className="biodata-watermark"></div>

        <div className="showcase-header">
          <div className="header-content">
            <img src={cnnmLogo} alt="CNNM Logo" className="header-logo" />

            <div className="header-info">
              <TamilTextEffect />
              <span className="registerNo">பதிவு எண் : 317/2017</span>
              <span className="registerNo">
                தலைமை அலுவலகம் :39/22, பிள்ளையார் கோவில் தெரு, சைதாப்பேட்டை
                சென்னை - 600 015.
              </span>
              <span className="registerNo">
                கிளை அலுவலகம்: எண்.32/23 சிவன் கோவில் தெரு, கோயம்பேடு சென்னை -
                600 107.
              </span>

              <div className="contact-row">
                <span className="contact-label">Customer Support:</span>
                <img src={callLogo} alt="Call" className="contact-icon" />
                <span className="contact-value">044 - 2432 2858,</span>
                <img
                  src={whatappLogo}
                  alt="Whatsapp"
                  className="contact-icon whatsapp-icon"
                />
                <span className="contact-value">94459 43929</span>
              </div>
              <div className="contact-row">
                <img src={mailLogo} alt="Email" className="contact-icon" />
                <span className="contact-value email-value">
                  Support: admin@cnnmandram.com
                </span>
                <img
                  src={webLogo}
                  alt="Website"
                  className="contact-icon web-icon"
                />
                <span className="contact-label">Website:</span>
                <span className="contact-value">
                  https://www.cnnmandram.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <span className="form-title main-title">Matrimonial Bio-Data</span>

        <div className="form-section-title">
          <span className="form-title">1. Personal Details</span>
        </div>

        {/* Personal Details Section */}
        <div className="showcase-section">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">
                Name: <span> {userData?.fullname}</span>
              </span>
              <span className="detail-label">
                Gender:{" "}
                <span>{userData?.gender === "M" ? "Male" : "Female"}</span>
              </span>
              <span className="detail-label">
                Date of Birth:<span> {userData?.dob}</span>
              </span>
              <span className="detail-label">
                Place of Birth:<span> {userData?.birth_place}</span>
              </span>
              {/* <span className="detail-label">
              Complexion: <span>{userData?.complexion}</span>
            </span> */}
              <span className="detail-label">
                Qualification:<span> {userData?.education}</span>
              </span>
              {/* <span className="detail-label">Employment Status:</span> */}
              <span className="detail-label">
                Profession: <span> {userData?.job_type} </span>
              </span>
              <span className="detail-label">
                Organization Name: <span>{userData?.company_name}</span>
              </span>
              <span className="detail-label">
                Income : <span>{userData?.salary}</span>
              </span>
              <span className="detail-label">
                Owns House: <span>Yes</span>
              </span>
              <span className="detail-label full-width">
                Expectations: <span>{userData?.expectations} </span>
              </span>
            </div>

            {/* Grouping for Marital Status, Age, Time, Height, Place, Native Place */}
            <div className="detail-group">
              <span className="detail-label">
                Marital Status :<span>Unmarried</span>{" "}
              </span>
              <div className="detail-inline-group">
                <span className="detail-label">
                  Time : <span>{userData?.dob_time}</span>
                </span>
                <span className="detail-label">
                  Age : <span>{userData?.age}</span>
                </span>
              </div>
              <span className="detail-label">Birth Order :</span>{" "}
              {/* Add actual data if available */}
              <span className="detail-label">
                Height:{" "}
                <span>{userData?.height?.replace(/\s*\(.*?\)/, "")}</span>
              </span>
              <span className="detail-label">
                Place : <span>{userData?.living_place}</span>
              </span>
              <span className="detail-label">
                Native Place : <span>{userData?.nativity}</span>
              </span>
            </div>

            {/* Photo and Reg No */}
            <div className="photo-section">
              <span className="reg-no">Reg No: {userData?.regNo}</span>
              <div className="profile-photo-container">
                <img
                  src={userData?.profile_photo1}
                  onClick={handleImageClick}
                  alt="Profile"
                  className="profile-photo"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Family details */}
        <div className="form-section-title">
          <span className="form-title">2. Family Details</span>
        </div>

        <div className="showcase-section">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label capitalize">
                Father's Name: <span>{userData?.father}</span>
              </span>

              <span className="detail-label capitalize">
                Mother's Name: <span>{userData?.mother}</span>
              </span>
              <span className="detail-label capitalize">
                Father Edu Qualification :{" "}
                <span>{userData?.father_qualification}</span>
              </span>

              <span className="detail-label">
                No. of Brothers: {userData?.brother_total}
              </span>
              <span className="detail-label">
                No. of Sisters: {userData?.sister_total}{" "}
              </span>

              <span className="detail-label">
                Mobile No : <span>{userData?.mobile_1}</span>{" "}
              </span>
              <span className="detail-label">
                Whatsapp No: <span>{userData?.whatsapp}</span>
              </span>
              <span className="detail-label  ">Correspondence Address:</span>
              <span className="detail-value address-value  ">
                {userData?.address}
              </span>
              <span className="detail-label  ">Complexion:</span>
              <span className="detail-value address-value  ">
                {userData?.complexion}
              </span>
            </div>

            <div className="detail-group">
              <span className="detail-label capitalize">
                Profession : <span>{userData?.father_job} </span>
              </span>
              <span className="detail-label capitalize">
                Profession: <span> {userData?.mother_job}</span>
              </span>
              <span className="detail-label">
                Living Status: <span> {userData?.parents_alive}</span>
              </span>
              <span className="detail-label">
                Brother Marital Status:{" "}
                <span>{userData?.brother_married} </span>
              </span>
              <span className="detail-label capitalize">
                Mother Edu Qualification :{" "}
                <span>{userData?.mother_qualification}</span>
              </span>

              <span className="detail-label">
                Sister Marital Status: <span>{userData?.sister_married} </span>
              </span>
              <span className="detail-label">
                Email ID: <span>{userData?.email}</span>{" "}
              </span>
              <span className="detail-label">
                Contact Person Name & Relation :{" "}
                <span>{userData?.contact_person} | Father</span>{" "}
              </span>
            </div>
          </div>
        </div>

        {/* 3.Religious & Astrological Details */}
        <div className="form-section-title">
          <span className="form-title">
            3. Religious & Astrological Details
          </span>
        </div>

        <div className="showcase-section">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">
                Religion & Caste:<span>Hindu -வன்னியகுல சத்ரியர்</span>{" "}
                {/* Use userData?.religion and userData?.caste? */}
              </span>
              <span className="detail-label">
                Star: <span>{userData?.star}</span>{" "}
              </span>
              <span className="detail-label">
                Rasi: <span>{userData?.rashi}</span>
              </span>
              <span className="detail-label capitalize">
                Sevvai Dosham: <span>{userData?.sevaai_dhosam}</span>
              </span>
            </div>

            <div className="detail-group">
              <span className="detail-label">
                Sub Caste: <span>{userData?.caste}</span>{" "}
              </span>
              <span className="detail-label">
                Paadham: {userData?.paadham}{" "}
              </span>
              <span className="detail-label">Lagnam: {userData?.lagnam} </span>
              <span className="detail-label capitalize">
                Rahu-Ketu Dosham: <span>{userData?.raagu_dhosam}</span>
              </span>
            </div>
            <div className="chart-container">
              <ChartGrid
                centerText="இராசி"
                chartType="rasi"
                userData={{ rasi: JSON.parse(rasiChartData) }}
              />
              <ChartGrid
                centerText="நவாம்சம்"
                chartType="navamsam"
                userData={{ rasi: JSON.parse(navamsamChartData) }}
              />
            </div>

            <span className="detail-label full-width dasa-iruppu">
              Dasa Iruppu: {userData?.dasa_iruppu_dasa}
              {/* Dasa,{" "}
              {userData?.dasa_iruppu_years} Years,{" "}
              {userData?.dasa_iruppu_months} Months,{" "}
              {userData?.dasa_iruppu_days} Days{" "} */}
            </span>
          </div>
        </div>
      </div>
    </>
  );
});

export default Biodataform;
