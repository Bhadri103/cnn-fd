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
            regNo: `CNNM${String(apiData.id).padStart(5, "0")}`,
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
            lagnam: apiData.lagnam || "-",
            dossam: `Sevvai: ${apiData.sevaai_dhosam || "No"}, Sarpa: ${apiData.sarpam_dhosam || "No"}, Raagu/Kethu: ${apiData.raagu_dhosam || "No"}`,
            caste: `${apiData.caste || ""}${apiData.sub_caste ? ` (${apiData.sub_caste})` : ""}`,
            height: apiData.height ? `${apiData.height} (units?)` : "-",
            complexion: apiData.complexion || "-",
            body_type: "-",
            education: apiData.education || "-",
            job_type: apiData.job_type || "-",
            company_name: apiData.company_name === "NIL" || !apiData.company_name ? "-" : apiData.company_name,
            salary: apiData.salary === "NIL" || !apiData.salary ? "N/A" : `₹ ${apiData.salary}`,
            work_place: apiData.work_place === "NIL" || !apiData.work_place ? "-" : apiData.work_place,
            diet: "-",
            physical_status: "Normal",
            parents_alive: apiData.father === "Alive" && apiData.mother === "Alive" ? "Both Alive" : apiData.father === "Alive" ? "Father Alive Only" : apiData.mother === "Alive" ? "Mother Alive Only" : apiData.father && apiData.mother && apiData.father !== "Alive" && apiData.mother !== "Alive" ? "Both Not Alive" : "Status Unknown",
            father_job: apiData.father_desigination || "-",
            mother_job: apiData.mother_desigination || "-",
            sevaai_dhosam: apiData.sevaai_dhosam || "Not Specified",
            sarpam_dhosam: apiData.sarpam_dhosam || "Not Specified",
            raagu_dhosam: apiData.raagu_dhosam || "Not Specified",
            mobile_1: `${apiData.mobile_1 || "-"}${apiData.mobile_2 ? ` / ${apiData.mobile_2}` : ""}`,
            whatsapp: apiData.whatsapp || "-",
            email: apiData.email || "-",
            address: `${apiData.address || ""} ${apiData.living_place || ""}, ${apiData.state || ""} - ${apiData.pin_code || ""}, ${apiData.country || ""}`.replace(/ ,/g, ",").replace(/ - ,/g, ",").replace(/ , $/, "").trim() || "-",
            living_place: apiData.living_place || "-",
            pin_code: apiData.pin_code || "-",
            country: apiData.country || "-",
            expectations: apiData.expectations || "-",
            exp_qualification: "-",
            exp_job: "-",
            exp_income: "-",
            exp_diet: "-",
            exp_marital_status: "-",
            exp_other: "-",
            registration_date: apiData.registration_date ? apiData.registration_date.split(" ")[0] : "-",
            father: apiData.father_name || "-",
            mother: apiData.mother_name || "-",
            brother_total: parseInt(apiData.brother === "-" ? 0 : apiData.brother || 0, 10),
            brother_married: parseInt(apiData.brother_married === "-" ? 0 : apiData.brother_married || 0, 10),
            sister_total: parseInt(apiData.sister === "-" ? 0 : apiData.sister || 0, 10),
            sister_married: parseInt(apiData.sister_married === "-" ? 0 : apiData.sister_married || 0, 10),
            brother_elder: "-",
            brother_younger: "-",
            sister_elder: "-",
            sister_younger: "-",
            profile_photo1: `${BASE_URL}/uploads/profile_photo1/${apiData.profile_photo1}`,
            nativity: apiData.birth_place || "-",
            any_other_details: "-",
            contact_person: apiData.father_name || "Parent",
            brother_unmarried: Math.max(0, parseInt(apiData.brother === "-" ? 0 : apiData.brother || 0, 10) - parseInt(apiData.brother_married === "-" ? 0 : apiData.brother_married || 0, 10)),
            sister_unmarried: Math.max(0, parseInt(apiData.sister === "-" ? 0 : apiData.sister || 0, 10) - parseInt(apiData.sister_married === "-" ? 0 : apiData.sister_married || 0, 10)),
            brother_count: apiData.brother_count,
            brother_married_count: apiData.brother_married_count,
            children: apiData.children,
            contact_person_mobile: apiData.contact_person_mobile,
            contact_person_name: apiData.contact_person_name,
            contact_person_relation: apiData.contact_person_relation,
            created_at: apiData.created_at,
            dasa: apiData.dasa,
            dasa_days: apiData.dasa_days,
            dasa_months: apiData.dasa_months,
            dasa_years: apiData.dasa_years,
            dasa_years: apiData.dasa_years,
            days: apiData.days,
            father_qualification: apiData.father_qualification,
            father_status: apiData.father_status,
            has_children: apiData.has_children,
            horoscope: apiData.horoscope,
            id_proof: apiData.id_proof,
            months: apiData.months,
            mother_qualification: apiData.mother_qualification,
            mother_status: apiData.mother_status,
            navamsam: apiData.navamsam,
            other_property: apiData.other_property,
            own_house: apiData.own_house,
            profile_photo2: apiData.profile_photo2,
            rasi: apiData.rasi,
            reg_name: apiData.reg_name,
            reg_phone: apiData.reg_phone,
            registering_for_someone: apiData.registering_for_someone,
            relation: apiData.relation,
            sister_count: apiData.sister_count,
            sister_married_count: apiData.sister_married_count,
            state: apiData.state,
            status: apiData.status,
            sub_caste: apiData.sub_caste,
            years: apiData.years,
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
            
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dummydetails;
 