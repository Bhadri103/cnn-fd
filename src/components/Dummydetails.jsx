import React, { useRef } from "react";
import { Container, Row, Col, Card, CardBody, Table, Button } from "reactstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import logo from "../images/cnnmLogo.png";
// Placeholder for profile image - replace with your actual image source/import
const profilePlaceholder =
  "https://static.toiimg.com/imagenext/toiblogs/photo/readersblog/wp-content/uploads/2020/04/Indian-Bride-Feature-Image.jpg";

const BioDataField = ({ label, value }) => {
  const labelStyle = {
    fontWeight: "e00211",  
    color: "greem",
    paddingRight: "10px",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
  };
  const valueStyle = {
    color: "#555",
    fontSize: "0.9rem",
  };
  const rowStyle = {
    borderBottom: "1px solid #eee", // Subtle separator line
    padding: "6px 0", // Adjust vertical padding
    display: "flex",
    alignItems: "center",
  };

  return (
    <div style={rowStyle}>
    <div style={{ width: "45%", ...labelStyle, fontWeight:"500", color: "#e00211" }}>{label} : </div>
      <div style={{ width: "55%", ...valueStyle }}>{value || "-"}</div>
    </div>
  );
};

const BioDataSection = ({ children }) => {
  const sectionStyle = {
    marginBottom: "1rem", // Space between sections
    paddingBottom: "0.5rem",
    // Removed borderBottom here, handled by BioDataField
  };
  return <div style={sectionStyle}>{children}</div>;
};

const Dummydetails = () => {
  const dummyUser = {
    id: 123,
    regNo: "VF00468", // Added from image
    fullname: "R. Devi, M.COM, BED", // Updated from image (assuming R. is initial)
    marital_status: "Unmarried", // Updated from image
    gender: "F", // Updated from image ('Female')
    dob: "04/02/1991", // Updated from image
    age: 34, // Added from image
    dob_time: "8:55 AM", // Updated from image
    birth_place: "Vazhapadi", // Updated from image (வந்தவாசி -> Vazhapadi, requires confirmation)
    order_of_birth: "2nd", // Added from image (2 வது பிறப்பு வரிசை)
    gothram: "Jambu Maharishi", // Added from image (ஜம்பு மகரிஷி)
    mother_tongue: "Tamil", // Updated from image
    rashi: "KANNI ( கன்னி )", // Updated from image
    star: "CHITRAI ( சித்திரை )", // Updated from image
    paadham: "-", // Not specified in image, keep existing or remove
    laknam: "-", // Not specified in image
    dossam: "-", // Not specified in image
    caste: "VANNIA KULA KSHATRIYAR", // Added from image
    height: 165, // Updated from image (5ft 5in -> 165cm)
    complexion: "Wheatish", // Added from image
    body_type: "Average", // Added from image
    education: "M.COM, BED", // Updated from image
    job_type: "-", // Job description seems merged in image
    company_name: "HASHINY PRIVATE SCHOOL", // Updated from image
    salary: 15000, // Updated from image
    work_place: "Vazhapadi", // Updated from image (வந்தவாசி -> Vazhapadi, requires confirmation)
    diet: "-", // Not specified in image
    physical_status: "Normal", // Added from image
    parents_alive: "Both Not Alive", // Added from image
    father_job: "-", // Added from image (implied from parents_alive)
    mother_job: "-", // Added from image (implied from parents_alive)
    sevaai_dhosam: "No", // Kept existing, not in image explicitly
    sarpam_dhosam: "Yes", // Kept existing, not in image explicitly
    raagu_dhosam: "No", // Kept existing, not in image explicitly
    mobile_1: "9688864097 (W) / 8760370354 (W)", // Updated from image
    whatsapp: "9688864097 (W) / 8760370354 (W)", // Updated from image
    email: "VF00468", // Updated from image (seems to be ID)
    address: "123 Main St, Anytown", // Kept existing, not in image
    living_place: "Sunnyvale", // Kept existing, not in image
    pin_code: "94086", // Kept existing, not in image
    country: "USA", // Kept existing, not in image
    expectations: "நல்ல பழக்கவழக்கமுள்ள மணமகன் தேவை", // Updated from image
    exp_qualification: "ANY DEGREE", // Added from image
    exp_job: "Must", // Added from image
    exp_income: "-", // Added from image (Doesn't Matter)
    exp_diet: "-", // Added from image (Doesn't Matter)
    exp_marital_status: "UnMarried", // Added from image
    exp_other: "-", // Added from image
    registration_date: "2024-01-20", // Kept existing, not in image
    father: "Robert Doe", // Kept existing, not in image
    mother: "Jane Doe", // Kept existing, not in image
    brother_elder: 0, // Added from image table
    brother_younger: 0, // Added from image table
    brother_married: 0, // Updated based on image table (Unmarried=0)
    sister_elder: 0, // Added from image table
    sister_younger: 1, // Added from image table
    sister_married: 0, // Updated based on image table (Unmarried=1)
    birth_order: "2nd", // Updated from image (2 வது பிறப்பு வரிசை)
    profile_photo1: profilePlaceholder, // Use placeholder
    nativity: "-", // Added from image
    any_other_details: "சொந்த வீடு", // Added from image
    contact_person: "பல்ராம் - மாமா", // Added from image
  };

  const pdfRef = useRef();

  const handleDownloadPdf = () => {
    const input = pdfRef.current;
    if (!input) {
      console.error("PDF reference is not available.");
      return;
    }
    // Temporarily remove border before capture
    const originalBorderStyle = input.style.border;
    input.style.border = "none";

    html2canvas(input, {
      scale: 2, // Increase scale for better resolution
      useCORS: true, // Important for external images if any
      logging: false,
    })
      .then((canvas) => {
        // Restore border after capture
        input.style.border = originalBorderStyle;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // Calculate image position (centered with margin)
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 10; // Top margin
        const effectiveImgHeight = imgHeight * ratio;

        // Check if image height exceeds page height minus margin
        if (imgY + effectiveImgHeight > pdfHeight - 10) {
          console.warn("Content might be too tall for a single PDF page.");
          // Basic handling: Add image scaled to fit width, allow overflow
          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imgWidth * ratio,
            effectiveImgHeight
          );
        } else {
          pdf.addImage(
            imgData,
            "PNG",
            imgX,
            imgY,
            imgWidth * ratio,
            effectiveImgHeight
          );
        }

        pdf.save(`${dummyUser.regNo || "biodata"}_${dummyUser.fullname}.pdf`);
      })
      .catch((error) => {
        // Restore border even if there's an error
        input.style.border = originalBorderStyle;
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <Container className="userfullList-details my-4">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow-sm">
            <CardBody>
              <div
                ref={pdfRef}
                style={{
                  border: "2px solid rgb(255 9 9)",
                  padding: "15px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div className="row user-top-bg p-3">
                  <div className="col-3">
                    <img src={logo} alt="" height="100px" />
                  </div>
                  <div className="col-9 text-start">
                    <p className="detail-title">
                      Chennai Nanbargal Nala Mandram  
                    </p>
                    <p>  Mobile : +91 044 2432 28581 | Email : admin@cnnmandram.com <br />
                    Website : https://cnnmandram.com </p>
                  </div>
 
                </div>

                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "15px",
                    marginTop: "15px",
                    paddingBottom: "10px",
                  }}
                >
                  <h4
                    style={{
                      color: "rgb(46, 139, 87) !important",
                      marginBottom: "5px",
                    }}
                  >
                    Bio Data
                  </h4>
                  <div style={{ fontSize: "0.9rem", color: "#555" }}>
                    <span>Reg. No.: {dummyUser.regNo || "-"}</span> |&nbsp;
                    <span>Name: {dummyUser.fullname || "-"}</span> |&nbsp;
                    <span>Caste: {dummyUser.caste || "-"}</span>
                  </div>
                </div>

                <Row>
                  {/* Left Column */}
                  <Col md={9}>
                    <BioDataSection>
                      <BioDataField className='label-userlist'
                        label="Gender - Marital Status"
                        value={`${
                          dummyUser.gender === "F" ? "Female" : "Male"
                        } - ${dummyUser.marital_status}`}
                      />
                      <BioDataField className='label-userlist'
                        label="DOB - Age - Time - Place"
                        value={`${dummyUser.dob} - ${dummyUser.age} Age - ${dummyUser.dob_time} - ${dummyUser.birth_place}`}
                      />
                      <BioDataField className='label-userlist '
                        label="Order of Birth"
                        value={dummyUser.order_of_birth}
                      />
                    </BioDataSection>

                    <BioDataSection>
                      <BioDataField className='label-userlist'
                        label="Gothram - Star - Rasi"
                        value={`${dummyUser.gothram} - ${dummyUser.star} - ${dummyUser.rashi}`}
                      />
                      <BioDataField className='label-userlist'
                        label="Padam  - Dossam"
                        value={`${dummyUser.paadham}  - ${dummyUser.dossam}`}
                      />
                    </BioDataSection>

                    <BioDataSection>
                      <BioDataField className='label-userlist'
                        label="Qualification - Job - Place of Job"
                        value={`${dummyUser.education} - ${dummyUser.company_name} - ${dummyUser.work_place}`}
                      />
                      <BioDataField className='label-userlist'
                        label="Income / month - Height  "
                        value={`₹${dummyUser.salary}/- - ${dummyUser.height}cm`}
                      />
                      <BioDataField className='label-userlist'
                        label="Mother Tongue"
                        value={`${dummyUser.mother_tongue} `}
                      />
                      <BioDataField className='label-userlist'
                        label="Physical Status"
                        value={dummyUser.physical_status}
                      />
                    </BioDataSection>

                    <BioDataSection>
                      <BioDataField className='label-userlist'
                        label="Parents Alive - Father's Job - Mother's Job"
                        value={`${dummyUser.parents_alive} - ${dummyUser.father_job} - ${dummyUser.mother_job}`}
                      />
                      {/* Family Table */}
                      <Table
                        bordered
                        size="sm"
                        responsive
                        className="mt-2"
                        style={{ fontSize: "0.85rem" }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: "#E8F8F5" }}>
                            <th>Relationship</th>
                            <th>Elder Brother</th>
                            <th>Younger Brother</th>
                            <th>Elder Sister</th>
                            <th>Younger Sister</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Married</td>
                            <td>
                              {dummyUser.brother_elder > 0 &&
                              dummyUser.brother_married >=
                                dummyUser.brother_elder
                                ? dummyUser.brother_elder
                                : "-"}
                            </td>
                            <td>
                              {dummyUser.brother_younger > 0 &&
                              dummyUser.brother_married -
                                dummyUser.brother_elder >=
                                dummyUser.brother_younger
                                ? dummyUser.brother_younger
                                : "-"}
                            </td>
                            <td>
                              {dummyUser.sister_elder > 0 &&
                              dummyUser.sister_married >= dummyUser.sister_elder
                                ? dummyUser.sister_elder
                                : "-"}
                            </td>
                            <td>
                              {dummyUser.sister_younger > 0 &&
                              dummyUser.sister_married -
                                dummyUser.sister_elder >=
                                dummyUser.sister_younger
                                ? dummyUser.sister_younger
                                : "1"}
                            </td>
                          </tr>
                          <tr>
                            <td>Unmarried</td>
                            <td>
                              {dummyUser.brother_elder > 0 &&
                              dummyUser.brother_married <
                                dummyUser.brother_elder
                                ? dummyUser.brother_elder -
                                  dummyUser.brother_married
                                : "-"}
                            </td>
                            <td>
                              {dummyUser.brother_younger > 0 &&
                              dummyUser.brother_married -
                                dummyUser.brother_elder <
                                dummyUser.brother_younger
                                ? dummyUser.brother_younger -
                                  Math.max(
                                    0,
                                    dummyUser.brother_married -
                                      dummyUser.brother_elder
                                  )
                                : "-"}
                            </td>
                            <td>
                              {dummyUser.sister_elder > 0 &&
                              dummyUser.sister_married < dummyUser.sister_elder
                                ? dummyUser.sister_elder -
                                  dummyUser.sister_married
                                : "-"}
                            </td>
                            <td>
                              {dummyUser.sister_younger > 0 &&
                              dummyUser.sister_married -
                                dummyUser.sister_elder <
                                dummyUser.sister_younger
                                ? dummyUser.sister_younger -
                                  Math.max(
                                    0,
                                    dummyUser.sister_married -
                                      dummyUser.sister_elder
                                  )
                                : "-"}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <BioDataField className='label-userlist'
                        label="Nativity"
                        value={dummyUser.nativity}
                      />
                      <BioDataField className='label-userlist'
                        label="Any Other Details"
                        value={dummyUser.any_other_details}
                      />
                    </BioDataSection>
                  </Col>

                  {/* Right Column */}
                  <Col md={3} className="text-center">
                    <img
                      src={dummyUser.profile_photo1}
                      alt="Profile"
                      className="img-fluid"
                      style={{
                        border: "1px solid #ccc",
                        padding: "3px",
                        maxHeight: "200px",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = profilePlaceholder;
                      }} // Fallback placeholder
                    />
                  </Col>
                </Row>

                {/* Expectations Section */}
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    paddingTop: "10px",
                    marginTop: "15px",
                  }}
                >
                  <h5 style={{ color: "#2E8B57", marginBottom: "10px" }}>
                    Life Partner Expectations ( வாழ்க்கை துணை பற்றிய
                    எதிர்பார்ப்பு )
                  </h5>
                  <Row>
                    <Col md={6}>
                      <BioDataField className='label-userlist'
                        label="Qualification"
                        value={dummyUser.exp_qualification}
                      />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist' label="Job" value={dummyUser.exp_job} />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist'
                        label="Job - Income / month"
                        value={dummyUser.exp_income}
                      />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist' label="Diet" value={dummyUser.exp_diet} />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist'
                        label="Marital Status"
                        value={dummyUser.exp_marital_status}
                      />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist'
                        label="Any Other Expectation"
                        value={dummyUser.expectations}
                      />
                    </Col>
                  </Row>
                </div>

                {/* Contact Details Section */}
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    paddingTop: "10px",
                    marginTop: "15px",
                  }}
                >
                  <h5 style={{ color: "#2E8B57", marginBottom: "10px" }}>
                    Contact Details
                  </h5>
                  <Row>
                    <Col md={6}>
                      <BioDataField className='label-userlist'
                        label="Contact Person"
                        value={dummyUser.contact_person}
                      />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist'
                        label="Contact No."
                        value={dummyUser.mobile_1}
                      />
                    </Col>
                    <Col md={6}>
                      <BioDataField className='label-userlist' label="Email ID" value={dummyUser.email} />
                    </Col>
                  </Row>
                </div>

                {/* Footer Section (Optional) */}
                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    paddingTop: "10px",
                    marginTop: "15px",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "#777",
                  }}
                >
                  Website : https://cnnmandram.com | Mobile : +91 044 2432 28581
                  | Email : admin@cnnmandram.com
                  {/* Dasa Balance Table would go here if data was available */}
                </div>
              </div>

              <div className="text-center mt-4">
                <Button color="success" onClick={handleDownloadPdf}>
                  <i className="bi bi-download me-2"></i> Download as PDF
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dummydetails;
