import React from "react";
import "./styles/biodataShowcase.css"; // We'll create this CSS file next
import TamilTextEffect from "./bioform/TamilTextEffect";
import cnnmLogo from "../images/cnnmLogo.png"; // Import the logo image
import callLogo from "../images/social/call.png";
import whatappLogo from "../images/social/6.png";
import mailLogo from "../images/contact/email.png";
import webLogo from "../images/contact/web.png";
import ChartGrid from "./bioform/ChartGrid";
import BioFormPhoto from "./images/profile/bioformphoto.png";

const Biodataform = ({ userData, ref }) => {
  console.log(userData, "this is user data");
  const rasiCells = [
    "அ sss dd ss ss s s",
    "இ",
    "உ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "ஏ",
    "ஒ",
    "ஔ",
    "",
  ];

  const navamsamCells = [
    "ம",
    "ந",
    "த",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "ப",
    "ச",
    "ஜ",
    "",
  ];

  const userDataBoxValues = {
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

  // Sample data - in a real app this would come from props or state
  const biodata = {
    personalDetails: {
      name: "Priya Sharma",
      gender: "Female",
      dob: "15-08-1992",
      birthPlace: "Chennai",
      complexion: "Fair",
      qualification: "M.Sc. Nutrition",
      employmentStatus: "Employed",
      profession: "Nutritionist",
      organization: "HealthyLife Clinic",
      income: "₹45,000/month",
      ownsHouse: "Yes",
      // expectations: "Well-educated professional with similar values",
      maritalStatus: "Never Married",
      age: "30",
      birthOrder: "2nd",
      height: "5'4\"",
    },
    familyDetails: {
      fatherName: "Ramesh Sharma",
      fatherOccupation: "Bank Manager",
      fatherLivingStatus: "Alive",
      motherName: "Sunita Sharma",
      motherOccupation: "Teacher",
      motherLivingStatus: "Alive",
      brothers: 1,
      sisters: 0,
      contactPerson: "Ramesh Sharma (Father)",
      mobile1: "+91 98765 43210",
      mobile2: "+91 87654 32109",
      whatsapp: "+91 98765 43210",
      email: "priya.sharma@example.com",
      address: "12, Green Park, Chennai - 600028",
    },
    religiousDetails: {
      religion: "Hindu - Vanniyakula Kshatriya",
      subCaste: "",
      star: "Uttara Phalguni",
      paadham: "2nd",
      rasi: "Simha",
      lagnam: "Kanya",
      sevvaiDosham: "No",
      dasaIruppu: "",
      dasaPeriod: "3 Years, 5 Months, 10 Days",
    },
  };

  return (
    <div
      className="biodata-showcase"
      ref={ref}
      style={{
        border: "10px solid orange",
        width: "800px",
        padding: 20,
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "400px",
            left: 130,
            width: "450px",
            height: "450px",
            backgroundImage: `url(${cnnmLogo})`,
            backgroundSize: "cover", // or "contain" depending on your fit preference
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.07, // Adjust transparency here
          }}
        />
      </div>

      <div className="showcase-header">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={cnnmLogo}
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TamilTextEffect />
            <span
              style={{
                fontSize: "14px",
                marginTop: "-18px",
              }}
            >
              பதிவு எண் : 317/2017
            </span>
            <span className="registerNo">
              தலைமை அலுவலகம் :39/22, பிள்ளையார் கோவில் தெரு, சைதாப்பேட்டை சென்னை
              - 600 015.
            </span>
            <span className="registerNo">
              கிளை அலுவலகம்: எண்.32/23 சிவன் கோவில் தெரு, கோயம்பேடு சென்னை - 600
              107.
            </span>
            {/* // left and right side content start */}

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "-140px",
                }}
              >
                {" "}
                Customer Support:
              </span>

              <img
                src={callLogo}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "-5px",
                }}
              >
                044 - 2432 2858,
              </span>

              <img
                src={whatappLogo}
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "80px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "-5px",
                }}
              >
                94459 43929
              </span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={mailLogo}
                style={{
                  width: "16px",
                  height: "16px",
                  marginLeft: "-20px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "blue",
                }}
              >
                {" "}
                Support: admin@cnnmandram.com
              </span>

              <img
                src={webLogo}
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "60px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "-5px",
                }}
              >
                Website:
              </span>

              <span
                style={{
                  fontSize: "12px",
                  marginLeft: "-5px",
                }}
              >
                https://www.cnnmandram.com
              </span>
            </div>
          </div>
        </div>
      </div>

      <span
        className="formTitle"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          color: "red",
          marginTop: "-20px",
          marginBottom: "5px",
          fontWeight: "bold",
        }}
      >
        Matrimonial Bio-Data
      </span>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          className="formTitle"
          style={{
            color: "blue",
            border: "1px solid red",
            padding: "2px",
            width: "200px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          1.Personal Details
        </span>
      </div>

      {/* Personal Details Section */}
      <div className="showcase-section">
        {/* <h2>1. Personal Details</h2> */}
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
            <span className="detail-label">Organization Name: <span>{userData?.company_name}</span></span>
            <span className="detail-label">
              Income (Monthly/Annualy): <span>{userData?.salary}</span>
            </span>
            <span className="detail-label">
              Owns House: <span>Yes</span>
            </span>
            <span className="detail-label">
              Expectations: <span>{userData?.expectations}{" "}</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "80px" }}>
            <div
              className="detail-item"
              style={{
                display: "flex",
                marginLeft: "-60px",
              }}
            >
              <span className="detail-label">
                Marital Status :<span>Unmarried</span>{" "}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "100px",
                  alignItems: "center",
                }}
              >
                <span className="detail-label" style={{}}>
                  Time : <span>{userData?.dob_time}</span>
                </span>
                <span className="detail-label">
                  Age : <span>{userData?.age}</span>
                </span>
              </div>
              <span className="detail-label">Birth Order :</span>
              <span className="detail-label">
                Height: <span>{userData?.height}</span>{" "}
              </span>
              <span
                className="detail-label"
                style={{
                  marginTop: "50px",
                  marginLeft: "30px",
                }}
              >
                Place : <span>{userData?.living_place}</span>
              </span>

              <span
                className="detail-label"
                style={{
                  marginTop: "30px",
                  width: "200px",
                  marginLeft: "30px",
                }}
              >
                Native Place : <span>{userData?.nativity}</span>
              </span>
            </div>

            <div
              style={{
                marginLeft: "-40px",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                Reg No: {userData?.regNo}
              </span>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  border: "1px solid pink",
                  marginTop: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={userData?.profile_photo1}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className="showcase-header"
            style={{
              display: "flex",
              width: "740px",
              marginTop: "-20px",
            }}
          ></div>

          <div className="detail-item full-width">
            <span className="detail-value"></span>
          </div>
        </div>
      </div>

      {/* Family details  */}

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "-90px",
        }}
      >
        <span
          className="formTitle"
          style={{
            color: "blue",
            border: "1px solid red",
            padding: "2px",
            width: "200px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          2.Family Details
        </span>
      </div>

      {/* Personal Details Section */}
      <div className="showcase-section">
        {/* <h2>1. Personal Details</h2> */}
        <div className="details-grid">
          <div className="detail-item">
            <span
              className="detail-label"
              style={{
                textTransform: "capitalize",
              }}
            >
              Father's Name: <span>{userData?.father}</span>
            </span>
            {/* <span className="detail-label">Occupation:</span> */}
            <span
              className="detail-label"
              style={{
                textTransform: "capitalize",
              }}
            >
              Mother's Name: <span>{userData?.mother}</span>
            </span>
            {/* <span className="detail-label">Occupation:</span> */}
            <span className="detail-label">
              No. of Brothers: {userData?.brother_total}
            </span>
            <span className="detail-label">
              No. of Sisters: {userData?.sister_total}{" "}
            </span>
            <span className="detail-label">
              Contact Person Name & Relationship:
            </span>
            <span className="detail-label">
              Mobile No.(1): <span>{userData?.mobile_1}</span>{" "}
            </span>
            <span className="detail-label">
              Whatsapp No: <span>{userData?.whatsapp}</span>
            </span>
            <span className="detail-label">Correspondence Address:</span>
            <span
              className="detail-label"
              style={{
                fontSize: 12,
                width: "300px",
                fontWeight: "normal",
              }}
            >
              {userData?.address}
            </span>
          </div>

          <div style={{ display: "flex", gap: "80px" }}>
            <div
              className="detail-item"
              style={{
                display: "flex",
                marginLeft: "-60px",
              }}
            >
              <span
                className="detail-label"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Profession : <span>{userData?.father_job} </span>
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "100px",
                  alignItems: "center",
                }}
              >
                {/* <span className="detail-label">Living Status:Alive/Late</span> */}
              </div>
              <span
                className="detail-label"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Profession: <span> {userData?.mother_job}</span>
              </span>
              <span className="detail-label">
                Living Status: <span> {userData?.parents_alive}</span>
              </span>
              <span className="detail-label">
                Brother Marital Status:{" "}
                <span>{userData?.brother_married} </span>
              </span>
              <span className="detail-label">
                Sister Marital Status: <span>{userData?.sister_married} </span>
              </span>
              <span
                className="detail-label"
                style={{
                  marginTop: "50px",
                  // marginLeft: 30,
                }}
              >
                Mobile No.(2):
              </span>

              <span
                className="detail-label"
                style={
                  {
                    // marginLeft: 40,
                  }
                }
              >
                Email ID: <span>{userData?.email}</span>{" "}
              </span>
            </div>
          </div>

          <div
            className="showcase-header"
            style={{
              display: "flex",
              width: "740px",
              marginTop: "-20px",
            }}
          ></div>

          <div className="detail-item full-width">
            <span className="detail-value">
              {biodata.personalDetails.expectations}
            </span>
          </div>
        </div>
      </div>
      {/* 3.Religious & Astrological Details  */}

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          marginTop: "-90px",
        }}
      >
        <span
          className="formTitle"
          style={{
            color: "blue",
            border: "1px solid red",
            padding: "2px",
            width: "370px",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          3.Religious & Astrological Details
        </span>
      </div>

      {/* Personal Details Section */}
      <div className="showcase-section">
        {/* <h2>1. Personal Details</h2> */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">
              Religion & Caste:<span>Hindu -வன்னிய குல சத்ரியர்</span>
            </span>
            <span className="detail-label">
              Star: <span>{userData?.star}</span>{" "}
            </span>
            <span className="detail-label">
              Rasi: <span>{userData?.rashi}</span>
            </span>
            <span className="detail-label">
              Sevvai Dosham:{" "}
              <span
                style={{
                  textTransform: "capitalize",
                }}
              >
                {userData?.sevaai_dhosam}
              </span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "80px" }}>
            <div
              className="detail-item"
              style={{
                display: "flex",
                marginLeft: "-10px",
              }}
            >
              <span className="detail-label">
                Sub Caste: <span>{userData?.caste}</span>{" "}
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "100px",
                  alignItems: "center",
                }}
              >
                <span className="detail-label">
                  Paadham: {userData?.paadham}{" "}
                </span>
              </div>
              <span className="detail-label">Lagnam: {userData?.laknam}</span>
              <span className="detail-label">
                Rahu-Ketu Dosham:{" "}
                <span
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {userData?.raagu_dhosam}
                </span>
              </span>
            </div>
          </div>
          <span
            className="detail-label"
            style={{
              width: "800px",
              fontSize: "12px",
            }}
          >
            Dasa Iruppu:------------------ Dasa, --------- Years, ---------
            Months, --------- Days{" "}
          </span>
          <div
            style={{
              display: "flex",
              gap: "80px",
              marginLeft: "-450px",
              marginTop: 20,
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <ChartGrid
              centerText="இராசி"
              cells={rasiCells}
              userData={userData}
            />
            <ChartGrid centerText="நவாம்சம்" cells={navamsamCells} /> */}

            <ChartGrid
              centerText="இராசி"
              chartType="rasi"
              userData={userData?.rasi ? userData?.rasi : userDataBoxValues}
            />
            <ChartGrid
              centerText="நவாம்சம்"
              chartType="navamsam"
              userData={userData?.navamsam ? userData?.navamsam : userDataBoxValues}
            />
          </div>
          {/* 
          <div
            className="showcase-header"
            style={{
              display: "flex",
              width: "740px",
              marginTop: "-20px",
            }}
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Biodataform;
