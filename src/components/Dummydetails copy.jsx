import React, { useRef } from 'react';
import { Container, Row, Col, Card, CardBody, Table, Button } from 'reactstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Placeholder for profile image - replace with your actual image source/import
const profilePlaceholder = 'https://placehold.co/150x180/EBF5FB/333?text=Photo';
const mainBorderColor = '#006400'; // Darker Green for border & titles
const lightBgColor = '#F0FFF0'; // Honeydew (light green/white) background
const tableHeaderBgColor = '#D0F0C0'; // Tea Green (lighter green for table header)
const separatorColor = '#D3D3D3'; // Light Gray for separators

const BioDataField = ({ label, value }) => {
    const labelStyle = {
        fontWeight: '500',
        color: '#333',
        paddingRight: '10px',
        fontSize: '0.85rem', // Slightly smaller font
        whiteSpace: 'nowrap',
        width: '40%', // Fixed width for label column
    };
    const valueStyle = {
        color: '#444', // Slightly darker value color
        fontSize: '0.85rem', // Slightly smaller font
        width: '60%', // Fixed width for value column
    };
    const rowStyle = {
        borderBottom: `1px solid ${separatorColor}`, // Use defined separator color
        padding: '4px 0', // Reduced vertical padding
        display: 'flex',
        alignItems: 'center',
        minHeight: '28px', // Ensure consistent row height
    };

    return (
        <div style={rowStyle}>
            <div style={labelStyle}>{label}</div>
            <div style={valueStyle}>{value || '-'}</div>
        </div>
    );
};

const BioDataSection = ({ children }) => {
     const sectionStyle = {
        marginBottom: '0.75rem', // Reduced space between sections
        paddingBottom: '0.25rem',
     };
     return <div style={sectionStyle}>{children}</div>;
};


const Dummydetails = () => {
    // Data remains the same as the previous version
    const dummyUser = {
        id: 123, regNo: 'VF00468', fullname: 'R. Devi, M.COM, BED', marital_status: 'Unmarried', gender: 'F', dob: '04/02/1991', age: 34, dob_time: '8:55 AM', birth_place: 'Vazhapadi', order_of_birth: '2nd', gothram: 'Jambu Maharishi', mother_tongue: 'Tamil', rashi: 'KANNI ( கன்னி )', star: 'CHITRAI ( சித்திரை )', paadham: '-', laknam: '-', dossam: '-', caste: 'VANNIA KULA KSHATRIYAR', height: 165, complexion: 'Wheatish', body_type: 'Average', education: 'M.COM, BED', job_type: '-', company_name: 'HASHINY PRIVATE SCHOOL', salary: 15000, work_place: 'Vazhapadi', diet: '-', physical_status: 'Normal', parents_alive: 'Both Not Alive', father_job: '-', mother_job: '-', sevaai_dhosam: 'No', sarpam_dhosam: 'Yes', raagu_dhosam: 'No', mobile_1: '9688864097 (W) / 8760370354 (W)', whatsapp: '9688864097 (W) / 8760370354 (W)', email: 'VF00468', address: '123 Main St, Anytown', living_place: 'Sunnyvale', pin_code: '94086', country: 'USA', expectations: 'நல்ல பழக்கவழக்கமுள்ள மணமகன் தேவை', exp_qualification: 'ANY DEGREE', exp_job: 'Must', exp_income: '-', exp_diet: '-', exp_marital_status: 'UnMarried', exp_other: '-', registration_date: '2024-01-20', father: 'Robert Doe', mother: 'Jane Doe', brother_elder: 0, brother_younger: 0, brother_married: 0, sister_elder: 0, sister_younger: 1, sister_married: 0, birth_order: '2nd', profile_photo1: profilePlaceholder, nativity: '-', any_other_details: 'சொந்த வீடு', contact_person: 'பல்ராம் - மாமா',
    };

    const pdfRef = useRef();

    const handleDownloadPdf = () => {
        const input = pdfRef.current;
        if (!input) {
            console.error("PDF reference is not available.");
            return;
        }
        const originalBorderStyle = input.style.border;
        const originalBg = input.style.backgroundColor; // Store original background
        input.style.border = 'none'; // Remove border for capture
        input.style.backgroundColor = '#FFFFFF'; // Use white background for PDF for better printing

        html2canvas(input, {
             scale: 2.5, // Increased scale further
             useCORS: true,
             logging: false,
             backgroundColor: null // Use element background for canvas
        })
        .then((canvas) => {
            input.style.border = originalBorderStyle; // Restore border
            input.style.backgroundColor = originalBg; // Restore background

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 10; // mm margin
            const availableWidth = pdfWidth - 2 * margin;
            const availableHeight = pdfHeight - 2 * margin;

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);

            const finalImgWidth = imgWidth * ratio;
            const finalImgHeight = imgHeight * ratio;
            const imgX = margin + (availableWidth - finalImgWidth) / 2; // Center horizontally
            const imgY = margin; // Top margin

            pdf.addImage(imgData, 'PNG', imgX, imgY, finalImgWidth, finalImgHeight);
            pdf.save(`${dummyUser.regNo || 'biodata'}_${dummyUser.fullname}.pdf`);
        })
        .catch(error => {
            input.style.border = originalBorderStyle; // Restore border on error
            input.style.backgroundColor = originalBg; // Restore background on error
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the PDF."); // User feedback
        });
    };

    const sectionTitleStyle = {
        color: mainBorderColor,
        marginBottom: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        borderBottom: `1px solid ${separatorColor}`,
        paddingBottom: '5px',
    };

    const footerStyle = {
        borderTop: `1px solid ${separatorColor}`,
        paddingTop: '10px',
        marginTop: '15px',
        textAlign: 'center',
        fontSize: '0.75rem', // Smaller font for footer
        color: '#555', // Darker gray for footer
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '15px',
        borderBottom: `1px solid ${separatorColor}`,
        paddingBottom: '10px'
    };

    const headerTitleStyle = {
         color: mainBorderColor,
         marginBottom: '5px',
         fontWeight: 'bold',
         fontSize: '1.3rem',
    };

    const headerInfoStyle = {
        fontSize: '0.85rem',
        color: '#555',
    };

    const familyTableStyle = {
        fontSize: '0.8rem', // Smaller font for table
        color: '#333',
    };
    const familyTableHeaderStyle = {
        backgroundColor: tableHeaderBgColor, // Use defined color
        fontWeight: 'bold',
    };

    return (
        <Container className='userfullList my-4'>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-sm" style={{ border: 'none' }}>
                        <CardBody style={{ padding: '0.5rem' }}>
                            <div ref={pdfRef} style={{ border: `2px solid ${mainBorderColor}`, padding: '20px', backgroundColor: lightBgColor }}>
                                <div style={headerStyle}>
                                    <h4 style={headerTitleStyle}>Bio Data</h4>
                                    <div style={headerInfoStyle}>
                                        <span>Reg. No.: {dummyUser.regNo || '-'}</span> |&nbsp;
                                        <span>Name: {dummyUser.fullname || '-'}</span> |&nbsp;
                                        <span>Caste: {dummyUser.caste || '-'}</span>
                                    </div>
                                </div>

                                <Row>
                                    <Col md={8}>
                                        <BioDataSection>
                                            <BioDataField label="Gender - Marital Status" value={`${dummyUser.gender === 'F' ? 'Female' : 'Male'} - ${dummyUser.marital_status}`} />
                                            <BioDataField label="DOB - Age - Time - Place" value={`${dummyUser.dob} - ${dummyUser.age} Age - ${dummyUser.dob_time} - ${dummyUser.birth_place}`} />
                                            <BioDataField label="Order of Birth" value={dummyUser.order_of_birth} />
                                        </BioDataSection>

                                        <BioDataSection>
                                             <BioDataField label="Gothram - Star - Rasi" value={`${dummyUser.gothram} - ${dummyUser.star} - ${dummyUser.rashi}`} />
                                             <BioDataField label="Padam - Laknam - Dossam" value={`${dummyUser.paadham} - ${dummyUser.laknam} - ${dummyUser.dossam}`} />
                                        </BioDataSection>

                                         <BioDataSection>
                                            <BioDataField label="Qualification - Job - Place of Job" value={`${dummyUser.education} - ${dummyUser.company_name} - ${dummyUser.work_place}`} />
                                            <BioDataField label="Income / month - Height - Complexion - Body Type" value={`₹${dummyUser.salary}/- - ${dummyUser.height}cm - ${dummyUser.complexion} - ${dummyUser.body_type}`} />
                                            <BioDataField label="Mother Tongue - Diet" value={`${dummyUser.mother_tongue} - ${dummyUser.diet}`} />
                                            <BioDataField label="Physical Status" value={dummyUser.physical_status} />
                                        </BioDataSection>

                                         <BioDataSection>
                                             <BioDataField label="Parents Alive - Father's Job - Mother's Job" value={`${dummyUser.parents_alive} - ${dummyUser.father_job} - ${dummyUser.mother_job}`} />
                                             <Table bordered size="sm" responsive className="mt-2" style={familyTableStyle}>
                                                 <thead>
                                                     <tr style={familyTableHeaderStyle}>
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
                                                         <td>{dummyUser.brother_married > 0 ? dummyUser.brother_married : '-'}</td>
                                                         <td>-</td>
                                                         <td>{dummyUser.sister_married > 0 ? dummyUser.sister_married : '-'}</td>
                                                         <td>-</td>
                                                     </tr>
                                                      <tr>
                                                         <td>Unmarried</td>
                                                         <td>{dummyUser.brother_elder + dummyUser.brother_younger - dummyUser.brother_married > 0 ? dummyUser.brother_elder + dummyUser.brother_younger - dummyUser.brother_married : '-'}</td>
                                                         <td>-</td>
                                                         <td>{dummyUser.sister_elder + dummyUser.sister_younger - dummyUser.sister_married > 0 ? dummyUser.sister_elder + dummyUser.sister_younger - dummyUser.sister_married : '-'}</td>
                                                         <td>-</td>
                                                     </tr>
                                                 </tbody>
                                             </Table>
                                             <BioDataField label="Nativity" value={dummyUser.nativity} />
                                             <BioDataField label="Any Other Details" value={dummyUser.any_other_details} />
                                        </BioDataSection>
                                    </Col>

                                    <Col md={4} className="text-center align-self-start pt-2">
                                        <img
                                            src={dummyUser.profile_photo1}
                                            alt="Profile"
                                            className="img-fluid"
                                            style={{ border: `1px solid ${separatorColor}`, padding: '3px', maxHeight: '180px', objectFit: 'contain' }}
                                            onError={(e) => { e.target.onerror = null; e.target.src = profilePlaceholder; }}
                                        />
                                    </Col>
                                </Row>

                                 <div style={{ borderTop: `1px solid ${separatorColor}`, paddingTop: '10px', marginTop: '5px' }}>
                                     <h5 style={sectionTitleStyle}>Life Partner Expectations ( வாழ்க்கை துணை பற்றிய எதிர்பார்ப்பு )</h5>
                                     <Row>
                                         <Col md={6}><BioDataField label="Qualification" value={dummyUser.exp_qualification} /></Col>
                                         <Col md={6}><BioDataField label="Job" value={dummyUser.exp_job} /></Col>
                                         <Col md={6}><BioDataField label="Job - Income / month" value={dummyUser.exp_income} /></Col>
                                         <Col md={6}><BioDataField label="Diet" value={dummyUser.exp_diet} /></Col>
                                         <Col md={6}><BioDataField label="Marital Status" value={dummyUser.exp_marital_status} /></Col>
                                         <Col md={6}><BioDataField label="Any Other Expectation" value={dummyUser.expectations} /></Col>
                                     </Row>
                                 </div>

                                 <div style={{ borderTop: `1px solid ${separatorColor}`, paddingTop: '10px', marginTop: '15px' }}>
                                     <h5 style={sectionTitleStyle}>Contact Details</h5>
                                     <Row>
                                          <Col md={6}><BioDataField label="Contact Person" value={dummyUser.contact_person} /></Col>
                                          <Col md={6}><BioDataField label="Contact No." value={dummyUser.mobile_1} /></Col>
                                          <Col md={6}><BioDataField label="Email ID" value={dummyUser.email} /></Col>
                                     </Row>
                                 </div>

                                 <div style={footerStyle}>
                                     Website : www.jambumaharishimatrimony.org | Mobile : +91-81440 63335 , 96005 19391 | Email : jambumaharishimatrimony@gmail.com
                                 </div>
                            </div>

                            <div className="text-center mt-4 mb-3">
                                <Button style={{ backgroundColor: mainBorderColor, borderColor: mainBorderColor }} onClick={handleDownloadPdf}>
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
