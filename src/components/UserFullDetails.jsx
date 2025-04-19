import React, { useRef, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Spinner,
  Alert,
} from "reactstrap"; // Added Spinner, Alert
import { useParams } from "react-router";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../images/cnnmLogo.png";
import { BASE_URL } from "../config";
import dummyImg from "./images/profile-dummy.png";
import Biodataform from "./Biodataform";
const profilePlaceholder =
  "https://static.toiimg.com/imagenext/toiblogs/photo/readersblog/wp-content/uploads/2020/04/Indian-Bride-Feature-Image.jpg"; // Default placeholder

const calculateAge = (dobString) => {
  if (!dobString) return "-";
  try {
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : "-";
  } catch (e) {
    console.error("Error calculating age:", e);
    return "-";
  }
};

const formatDOB = (dobString) => {
  if (!dobString) return "-";
  try {
    const date = new Date(dobString);
    if (isNaN(date.getTime())) {
      console.warn("Invalid date provided for formatting:", dobString);
      return dobString;
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error formatting DOB:", e);
    return dobString;
  }
};

const BioDataField = ({ label, value }) => {
  const labelStyle = {
    fontWeight: "500",
    color: "#e00211",
    paddingRight: "10px",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
  };
  const valueStyle = {
    color: "#555",
    fontSize: "0.9rem",
    wordBreak: "break-word",
  };
  const rowStyle = {
    borderBottom: "1px solid #eee",
    padding: "6px 0",
    display: "flex",
    alignItems: "flex-start",
    minHeight: "30px",
  };

  return (
    <div style={rowStyle}>
      <div style={{ width: "45%", ...labelStyle, flexShrink: 0 }}>
        {label} :{" "}
      </div>{" "}
      {/* Prevent label shrinking */}
      <div style={{ width: "55%", ...valueStyle }}>{value || "-"}</div>
    </div>
  );
};

const BioDataSection = ({ children }) => {
  const sectionStyle = {
    marginBottom: "1rem",
    paddingBottom: "0.5rem",
  };
  return <div style={sectionStyle}>{children}</div>;
};

const Dummydetails = () => {
  const pdfRef = useRef();
  const [userData, setUserData] = useState(null);
  const [apiRawData, setApiRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/getUserById.php?id=${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "success" && result.data) {
          const apiData = result.data;
          setApiRawData(apiData); // Store raw data
          const mappedUser = {
            id: apiData.id,
            regNo: `CNNM${String(apiData.id).padStart(5, "0")}`, // Example format, adjust if needed
            fullname: apiData.fullname,
            marital_status: apiData.marital_status,
            gender: apiData.gender,
            dob: formatDOB(apiData.dob),
            age: calculateAge(apiData.dob),
            dob_time: apiData.dob_time || "-",
            birth_place: apiData.birth_place || "-",
            order_of_birth: apiData.birth_order || "-",
            gothram: "-",
            mother_tongue: apiData.mother_tongue || "-",
            rashi: apiData.rashi || "-",
            star: apiData.star || "-",
            paadham: apiData.paadham || "-",
            laknam: "-",
            dossam: `Sevvai: ${apiData.sevaai_dhosam || "No"}, Sarpa: ${
              apiData.sarpam_dhosam || "No"
            }, Raagu/Kethu: ${apiData.raagu_dhosam || "No"}`,
            caste: `${apiData.caste || ""}${
              apiData.sub_caste ? ` (${apiData.sub_caste})` : ""
            }`,
            height: apiData.height ? `${apiData.height} (units?)` : "-",
            complexion: "-",
            body_type: "-",
            education: apiData.education || "-",
            job_type: apiData.job_type || "-",
            company_name:
              apiData.company_name === "NIL" || !apiData.company_name
                ? "-"
                : apiData.company_name,
            salary:
              apiData.salary === "NIL" || !apiData.salary
                ? "N/A"
                : `₹ ${apiData.salary}`,
            work_place:
              apiData.work_place === "NIL" || !apiData.work_place
                ? "-"
                : apiData.work_place,
            diet: "-",
            physical_status: "Normal",
            parents_alive:
              apiData.father === "Alive" && apiData.mother === "Alive"
                ? "Both Alive"
                : apiData.father === "Alive"
                ? "Father Alive Only"
                : apiData.mother === "Alive"
                ? "Mother Alive Only"
                : apiData.father &&
                  apiData.mother &&
                  apiData.father !== "Alive" &&
                  apiData.mother !== "Alive"
                ? "Both Not Alive" // Check if both exist and are not 'Alive'
                : "Status Unknown",
            father_job: apiData.father_desigination || "-",
            mother_job: apiData.mother_desigination || "-",
            // Individual dosham fields might be useful too
            sevaai_dhosam: apiData.sevaai_dhosam || "Not Specified",
            sarpam_dhosam: apiData.sarpam_dhosam || "Not Specified",
            raagu_dhosam: apiData.raagu_dhosam || "Not Specified",
            mobile_1: `${apiData.mobile_1 || "-"}${
              apiData.mobile_2 ? ` / ${apiData.mobile_2}` : ""
            }`,
            whatsapp: apiData.whatsapp || "-",
            email: apiData.email || "-",
            address:
              `${apiData.address || ""} ${apiData.living_place || ""}, ${
                apiData.state || ""
              } - ${apiData.pin_code || ""}, ${apiData.country || ""}`
                .replace(/ ,/g, ",")
                .replace(/ - ,/g, ",")
                .replace(/ , $/, "")
                .trim() || "-", // Clean up potential extra commas/spaces
            living_place: apiData.living_place || "-",
            pin_code: apiData.pin_code || "-",
            country: apiData.country || "-",
            expectations: apiData.expectations || "-",
            // Expectation fields not present in API response
            exp_qualification: "-",
            exp_job: "-",
            exp_income: "-",
            exp_diet: "-",
            exp_marital_status: "-",
            exp_other: "-",
            registration_date: apiData.registration_date
              ? apiData.registration_date.split(" ")[0]
              : "-",
            father: apiData.father_name || "-",
            mother: apiData.mother_name || "-",
            // Sibling Counts
            brother_total: parseInt(
              apiData.brother === "-" ? 0 : apiData.brother || 0,
              10
            ),
            brother_married: parseInt(
              apiData.brother_married === "-"
                ? 0
                : apiData.brother_married || 0,
              10
            ),
            sister_total: parseInt(
              apiData.sister === "-" ? 0 : apiData.sister || 0,
              10
            ),
            sister_married: parseInt(
              apiData.sister_married === "-" ? 0 : apiData.sister_married || 0,
              10
            ),
            brother_elder: "-",
            brother_younger: "-",
            sister_elder: "-",
            sister_younger: "-",
            profile_photo1: `${BASE_URL}/uploads/profile_photo1/${apiData.profile_photo1}`,
            // profile_photo1: apiData.profile_photo1
            //     ? `${BASE_URL}/uploads/profile/${apiData.profile_photo1}`
            //     : profilePlaceholder,
            nativity: apiData.birth_place || "-", // Using birth place as nativity
            any_other_details: "-", // Field not present in API response
            contact_person: apiData.father_name || "Parent", // Default contact
          };

          mappedUser.brother_unmarried = Math.max(
            0,
            mappedUser.brother_total - mappedUser.brother_married
          );
          mappedUser.sister_unmarried = Math.max(
            0,
            mappedUser.sister_total - mappedUser.sister_married
          );

          setUserData(mappedUser);
        } else {
          throw new Error(
            result.message || "API returned success:false or data missing."
          );
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError(
          err.message ||
            "Failed to fetch data. Please check the network connection or API endpoint."
        );
        setUserData(null);
        setApiRawData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDownloadPdf = () => {
    if (!userData) {
      alert("User data not available to generate PDF.");
      return;
    }
    const input = pdfRef.current;
    if (!input) {
      console.error("PDF reference is not available.");
      return;
    }

    const originalBorderStyle = input.style.border;
    input.style.border = "none";

    html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })
      .then((canvas) => {
        input.style.border = originalBorderStyle;
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        const margin = 10;
        const availableWidth = pdfWidth - 2 * margin;
        const availableHeight = pdfHeight - 2 * margin;
        const ratio = Math.min(
          availableWidth / imgWidth,
          availableHeight / imgHeight
        );

        const effectiveImgWidth = imgWidth * ratio;
        const effectiveImgHeight = imgHeight * ratio;

        const imgX = (pdfWidth - effectiveImgWidth) / 2;
        const imgY = margin;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          effectiveImgWidth,
          effectiveImgHeight
        );
        pdf.save(
          `${userData.regNo || "biodata"}_${userData.fullname || "user"}.pdf`
        );
      })
      .catch((error) => {
        input.style.border = originalBorderStyle;
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Check the console for details.");
      });
  };

  if (loading) {
    return (
      <Container className="userfullList-details my-4 text-center">
        <Spinner color="primary" style={{ width: "3rem", height: "3rem" }} />
        <p>Loading User Data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="userfullList-details my-4">
        <Alert color="danger">
          <strong>Error:</strong> {error}
        </Alert>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container className="userfullList-details my-4">
        <Alert color="warning">No user data available.</Alert>
      </Container>
    );
  }

  return (
    <Container className="userfullList-details my-4">
      <Row className="justify-content-center">
        <Col md={12} lg={10} xl={9}>
          {" "}
          <Card className="shadow-sm">
            <CardBody>
              <Biodataform userData={userData} ref={pdfRef} />
              {/* // old dev code  */}
              {/* End of pdfRef div */}
              {/* Download Button (Outside the PDF content area) */}
              {/* <div className="text-center mt-4">
                <Button
                  color="success"
                  onClick={handleDownloadPdf}
                  disabled={!userData}
                >
                  <i className="bi bi-download me-2"></i> Download as PDF
                </Button>
              </div> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dummydetails;

// <div
// ref={pdfRef}
// style={{
//   border: "2px solid rgb(255 9 9)",
//   padding: "20px",
//   backgroundColor: "#FFFFFF",
// }}
// >
// <div
//   className="row user-top-bg p-3 align-items-center"
//   style={{
//     borderBottom: "1px solid #eee",
//     marginBottom: "15px",
//   }}
// >
//   <div className="col-3 text-center">
//     <img
//       src={logo}
//       alt="CNNM Logo"
//       style={{ maxHeight: "70px", width: "auto" }}
//     />
//   </div>
//   <div className="col-9 text-start">
//     <p
//       className="detail-title"
//       style={{
//         fontWeight: "bold",
//         fontSize: "1.2rem",
//         color: "#e00211",
//         marginBottom: "5px",
//       }}
//     >
//       Chennai Nanbargal Nala Mandram
//     </p>
//     <p
//       style={{
//         fontSize: "0.8rem",
//         color: "#333",
//         lineHeight: "1.3",
//       }}
//     >
//       Mobile : +91 044 2432 28581 | Email : admin@cnnmandram.com{" "}
//       <br />
//       Website : https://cnnmandram.com
//     </p>
//   </div>
// </div>

// {/* Title / Sub-header */}
// <div
//   style={{
//     textAlign: "center",
//     marginBottom: "20px",
//     marginTop: "10px",
//     paddingBottom: "10px",
//     borderBottom: "1px solid #eee",
//   }}
// >
//   <h4
//     style={{
//       color: "#e00211",
//       marginBottom: "5px",
//       fontWeight: "bold",
//     }}
//   >
//     Bio Data
//   </h4>
//   <div style={{ fontSize: "0.9rem", color: "#555" }}>
//     <span>Reg. No.: {userData.regNo || "-"}</span> |&nbsp;
//     <span>Name: {userData.fullname || "-"}</span> |&nbsp;
//     <span>Caste: {userData.caste || "-"}</span>
//   </div>
// </div>

// <Row>
//   {/* Left Column */}
//   <Col md={8} lg={9}>
//     {" "}
//     {/* Adjusted column ratio */}
//     <BioDataSection>
//       <BioDataField
//         label="Gender - Marital Status"
//         value={`${
//           userData.gender === "F"
//             ? "Female"
//             : userData.gender === "M"
//             ? "Male"
//             : userData.gender
//         } - ${userData.marital_status}`}
//       />
//       <BioDataField
//         label="DOB - Age - Time - Place"
//         value={`${userData.dob} - ${userData.age} Yrs - ${userData.dob_time} - ${userData.birth_place}`}
//       />
//       <BioDataField
//         label="Order of Birth"
//         value={userData.order_of_birth}
//       />
//     </BioDataSection>
//     <BioDataSection>
//       <BioDataField
//         label="Gothram - Star - Rasi"
//         value={`${userData.gothram} - ${userData.star} - ${userData.rashi}`}
//       />
//       <BioDataField
//         label="Paadham - Dossam"
//         value={`${userData.paadham} - ${userData.dossam}`}
//       />
//     </BioDataSection>
//     <BioDataSection>
//       <BioDataField
//         label="Qualification - Job - Place"
//         value={`${userData.education} - ${
//           userData.job_type === "Unemployed"
//             ? "Unemployed"
//             : userData.company_name || userData.job_type
//         } - ${userData.work_place}`}
//       />
//       <BioDataField
//         label="Income / month - Height"
//         value={`${userData.salary} - ${userData.height}`}
//       />
//       <BioDataField
//         label="Mother Tongue"
//         value={userData.mother_tongue}
//       />
//       <BioDataField
//         label="Physical Status"
//         value={userData.physical_status}
//       />
//     </BioDataSection>
//     <BioDataSection>
//       <BioDataField
//         label="Parents - Father's Job - Mother's Job"
//         value={`${userData.parents_alive} - ${userData.father_job} - ${userData.mother_job}`}
//       />
//       {/* Sibling Table */}
//       <Table
//         bordered
//         size="sm"
//         responsive
//         className="mt-2"
//         style={{ fontSize: "0.85rem", textAlign: "center" }}
//       >
//         <thead>
//           <tr
//             style={{
//               backgroundColor: "#f2f2f2",
//               fontWeight: "bold",
//             }}
//           >
//             <th>Relationship</th>
//             <th>Brother(s)</th>
//             <th>Sister(s)</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Total</td>
//             <td>
//               {userData.brother_total > 0
//                 ? userData.brother_total
//                 : "-"}
//             </td>
//             <td>
//               {userData.sister_total > 0
//                 ? userData.sister_total
//                 : "-"}
//             </td>
//           </tr>
//           <tr>
//             <td>Married</td>
//             <td>
//               {userData.brother_married > 0
//                 ? userData.brother_married
//                 : "-"}
//             </td>
//             <td>
//               {userData.sister_married > 0
//                 ? userData.sister_married
//                 : "-"}
//             </td>
//           </tr>
//           <tr>
//             <td>Unmarried</td>
//             <td>
//               {userData.brother_unmarried > 0
//                 ? userData.brother_unmarried
//                 : "-"}
//             </td>
//             <td>
//               {userData.sister_unmarried > 0
//                 ? userData.sister_unmarried
//                 : "-"}
//             </td>
//           </tr>
//         </tbody>
//       </Table>
//       <BioDataField
//         label="Nativity"
//         value={userData.nativity}
//       />
//       <BioDataField
//         label="Any Other Details"
//         value={userData.any_other_details}
//       />
//     </BioDataSection>
//   </Col>

//   {/* Right Column */}
//   <Col md={4} lg={3} className="text-center align-self-start">
//     {" "}
//     {/* Adjusted column ratio */}
//     <img
//       src={userData.profile_photo1}
//       alt="Profile"
//       className="img-fluid"
//       style={{
//         border: "1px solid #ccc",
//         padding: "3px",
//         maxHeight: "200px",
//         width: "100%", // Make width responsive
//         objectFit: "contain",
//         marginBottom: "15px",
//       }}
//       onError={(e) => {
//         e.target.onerror = null;
//         // e.target.src = profilePlaceholder;
//         e.target.style.objectFit = "cover";
//       }}
//     />
//     {/* {apiRawData?.horoscope && (
//       <Button
//         size="sm"
//         color="success"
//         outline
//         block
//         href={`https://cnnmandram.com/cnn-backend/uploads/horoscope/${apiRawData.horoscope}`} // ** Adjust base URL if needed **
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-2"
//       >
//         View Horoscope
//       </Button>
//     )} */}
//     {/* Add ID proof link similarly if apiRawData.id_proof exists */}
//   </Col>
// </Row>

// {/* Expectations Section */}
// <div
//   style={{
//     borderTop: "1px solid #eee",
//     paddingTop: "10px",
//     marginTop: "15px",
//   }}
// >
//   <h5
//     style={{
//       color: "#e00211",
//       marginBottom: "10px",
//       fontWeight: "bold",
//     }}
//   >
//     Life Partner Expectations ( வாழ்க்கை துணை பற்றிய
//     எதிர்பார்ப்பு )
//   </h5>
//   <Row>
//     <Col md={12}>
//       <BioDataField
//         label="Expectations"
//         value={userData.expectations}
//       />
//     </Col>
//     {/* Add placeholders or actual fields if available */}
//   </Row>
// </div>

// {/* Contact Details Section */}
// <div
//   style={{
//     borderTop: "1px solid #eee",
//     paddingTop: "10px",
//     marginTop: "15px",
//   }}
// >
//   <h5
//     style={{
//       color: "#e00211",
//       marginBottom: "10px",
//       fontWeight: "bold",
//     }}
//   >
//     Contact Details
//   </h5>
//   <Row>
//     <Col md={6}>
//       <BioDataField
//         label="Contact Person"
//         value={userData.contact_person}
//       />
//     </Col>
//     <Col md={6}>
//       <BioDataField
//         label="Contact No."
//         value={userData.mobile_1}
//       />
//     </Col>
//     <Col md={6}>
//       <BioDataField
//         label="Whatsapp"
//         value={userData.whatsapp}
//       />
//     </Col>
//     <Col md={6}>
//       <BioDataField label="Email ID" value={userData.email} />
//     </Col>
//     <Col md={12}>
//       <BioDataField label="Address" value={userData.address} />
//     </Col>
//   </Row>
// </div>

// {/* Footer Section */}
// <div
//   style={{
//     borderTop: "1px solid #ccc",
//     paddingTop: "10px",
//     marginTop: "15px",
//     textAlign: "center",
//     fontSize: "0.8rem",
//     color: "#777",
//   }}
// >
//   Website : https://cnnmandram.com | Mobile : +91 044 2432 28581
//   | Email : admin@cnnmandram.com
// </div>
// </div>
