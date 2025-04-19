import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import JothidamBox from "./formBox/JothidamBox";
import jothidamBox1Img from "./images/jothidambox/1.png";
import jothidamBox2Img from "./images/jothidambox/2.png";

const RegisterFormMain = () => {
  const initialFormData = {
    fullname: "",
    marital_status: "",
    gender: "",
    dob: "",
    dob_time: "",
    birth_place: "",
    mother_tongue: "",
    rashi: "",
    star: "",
    paadham: "",
    caste: "",
    sub_caste: "",
    height: "",
    father_name: "",
    mother_name: "",
    father_desigination: "",
    mother_desigination: "",
    father: "",
    mother: "",
    brother: "",
    brother_married: "",
    sister: "",
    sister_married: "",
    birth_order: "",
    education: "",
    job_type: "",
    company_name: "",
    salary: "",
    work_place: "",
    sevaai_dhosam: "",

    raagu_dhosam: "",
    mobile_1: "",
    mobile_2: "",
    whatsapp: "",
    email: "",
    living_place: "",
    state: "",
    pin_code: "",
    country: "",
    address: "",
    expectations: "",
    profile_photo1: null,
    profile_photo2: null,
    horoscope: null,

    has_children: "",
    children: [],
  };

  const initialFormErrors = {
    ...Object.keys(initialFormData).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    ),
    children: [],
  };

  const [districts, setDistricts] = useState([]);

  const [formData, setFormData] = useState(initialFormData);

  console.log(formData, "formData");

  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileNames, setFileNames] = useState({
    profile_photo1: "",
    profile_photo2: "",
    horoscope: "",
  });

  const [enableOtherMotherTongue, setEnableOtherMotherTongue] = useState(false);
  const navigate = useNavigate();
  const formRefs = useRef({});
  const fileInputRefs = useRef({
    profile_photo1: null,
    profile_photo2: null,
    horoscope: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      caste: "Vanniya Kula Kshatriya",
    }));
  }, []); // empty dependency = run only on mount

  const validateField = (fieldName, value) => {
    if (!value || value.toString().trim() === "")
      return "This field is required";

    switch (fieldName) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
      case "mobile_1":
      case "mobile_2":
      case "whatsapp":
        return value.length === 0 || /^\d{10}$/.test(value)
          ? ""
          : "Enter a valid 10-digit mobile number";
      case "pin_code":
        return value.length === 0 || /^\d{6}$/.test(value)
          ? ""
          : "Enter a valid 6-digit PIN code";
      default:
        return "";
    }
  };

  const validateImageFile = (file) => {
    if (!file) return "Please upload a file";
    const validImageTypes = ["image/jpeg", "image/png"];
    const maxSizeInMb = 2;
    if (!validImageTypes.includes(file.type))
      return "Please upload JPG or PNG file";
    if (file.size > maxSizeInMb * 1024 * 1024)
      return `File should be below ${maxSizeInMb}MB`;
    return "";
  };

  const validatePdfFile = (file) => {
    if (!file) return "Please upload a file";
    const maxSizeInMb = 2;
    if (file.type !== "application/pdf") return "Please upload a PDF file";
    if (file.size > maxSizeInMb * 1024 * 1024)
      return `File should be below ${maxSizeInMb}MB`;
    return "";
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    let errorMessage = "";

    if (!file) {
      errorMessage = "Please upload a file";
      setFormData((prev) => ({ ...prev, [name]: null }));
    } else if (name === "profile_photo1" || name === "profile_photo2") {
      errorMessage = validateImageFile(file);
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else if (name === "horoscope" || name === "id_proof") {
      errorMessage = validatePdfFile(file);
      setFormData((prev) => ({ ...prev, [name]: file }));
    }

    setFormErrors((prev) => ({ ...prev, [name]: errorMessage }));
    setFileNames((prev) => ({ ...prev, [name]: file ? file.name : "" }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //handle salary input

    if (name === "salary") {
      // Remove any non-numeric characters (except for the decimal point)
      const cleanedValue = value.replace(/[^0-9.]/g, "");

      // Format the number using toLocaleString to display in INR format
      const formattedSalary = Number(cleanedValue).toLocaleString("en-IN");

      setFormData((prev) => ({
        ...prev,
        [name]: formattedSalary,
      }));
    }

    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Reset has_children and children when marital_status changes
      if (name === "marital_status" && value === "Unmarried") {
        newData.has_children = "";
        newData.children = [];
      }
      return newData;
    });
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };
  const handleCasteChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      caste: value,
      sub_caste: "", // Reset sub_caste when Caste changes
    });
  };
  const handleAddChild = () => {
    setFormData((prev) => ({
      ...prev,
      children: [...prev.children, { name: "", age: "" }],
    }));
    setFormErrors((prev) => ({
      ...prev,
      children: [...prev.children, { name: "", age: "" }],
    }));
  };

  const handleRemoveChild = (index) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
    setFormErrors((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  };

  const handleChildChange = (index, key, value) => {
    const updatedChildren = [...formData.children];
    updatedChildren[index][key] = value;
    setFormData((prev) => ({ ...prev, children: updatedChildren }));

    // Only validate if has_children is Yes and marital status is Divorce or Widow
    if (
      (formData.marital_status === "Divorce" ||
        formData.marital_status === "Widow") &&
      formData.has_children === "Yes"
    ) {
      const updatedErrors = [...formErrors.children];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [key]:
          value.trim() === ""
            ? `${key === "name" ? "Child Gender" : "Age"} is required`
            : "",
      };
      setFormErrors((prev) => ({ ...prev, children: updatedErrors }));
    }
  };

  const districtsByState = {
    "Tamil Nadu": [
      "Ariyalur",
      "Chengalpattu",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kallakurichi",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Mayiladuthurai",
      "Nagapattinam",
      "Namakkal",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Ranipet",
      "Salem",
      "Sivaganga",
      "Tenkasi",
      "Thanjavur",
      "Theni",
      "Thiruvallur",
      "Thiruvarur",
      "Thiruvannamalai",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tirupathur",
      "Tiruppur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    Karnataka: [
      "Bagalkot",
      "Bangalore Rural",
      "Bangalore Urban",
      "Belagavi",
      "Ballari",
      "Bidar",
      "Chamarajanagar",
      "Chikkaballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Hassan",
      "Haveri",
      "Kalaburagi",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysuru",
      "Raichur",
      "Ramanagara",
      "Shivamogga",
      "Tumakuru",
      "Udupi",
      "Uttara Kannada",
      "Vijayapura",
      "Yadgir",
    ],
    "Andhra Pradesh": [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Kadapa",
      "Krishna",
      "Kurnool",
      "Nellore",
      "Prakasam",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
    ],
    "Arunachal Pradesh": [
      "Tawang",
      "West Kameng",
      "East Kameng",
      "Papum Pare",
      "Kurung Kumey",
      "Kra Daadi",
      "Lower Subansiri",
      "Upper Subansiri",
      "West Siang",
      "East Siang",
      "Upper Siang",
      "Lower Dibang Valley",
      "Anjaw",
      "Dibang Valley",
      "Lohit",
      "Namsai",
      "Changlang",
      "Tirap",
      "Longding",
    ],
    Assam: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup Metropolitan",
      "Kamrup Rural",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara-Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
    Bihar: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
    Chhattisgarh: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Gaurela-Pendra-Marwahi",
      "Janjgir-Champa",
      "Jashpur",
      "Kabirdham",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],
    Goa: ["North Goa", "South Goa"],
    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhumi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kachchh",
      "Kheda",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Mewat",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    "Himachal Pradesh": [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul and Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahibganj",
      "Seraikela-Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
    "Madhya Pradesh": [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
    Meghalaya: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri-Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
    Mizoram: [
      "Aizawl",
      "Champhai",
      "Hnahthial",
      "Khawzawl",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Saitual",
      "Serchhip",
    ],
    Nagaland: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Deogarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur",
      "Sundergarh",
    ],
    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Ferozepur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "S.A.S. Nagar",
      "Sangrur",
      "Shahid Bhagat Singh Nagar",
      "Tarn Taran",
    ],
    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Sri Ganganagar",
      "Tonk",
      "Udaipur",
    ],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagitial",
      "Jangaon",
      "Jayashankar Bhupalpally",
      "Jogulamba Gadwal",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem Asifabad",
      "Mahabubabad",
      "Mahbubnagar",
      "Mancherial",
      "Medak",
      "Medchal–Malkajgiri",
      "Mulugu",
      "Nagarkurnool",
      "Nalgonda",
      "Narayanpet",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Ranga Reddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal Rural",
      "Warangal Urban",
      "Yadadri Bhuvanagiri",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    "Uttar Pradesh": [
      "Agra",
      "Aligarh",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Ayodhya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddh Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kheri",
      "Kushinagar",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Prayagraj",
      "Rae Bareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    Uttarakhand: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri Garhwal",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri Garhwal",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
    "West Bengal": [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Bardhaman",
      "Paschim Medinipur",
      "Purba Bardhaman",
      "Purba Medinipur",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur",
    ],
    "Andaman and Nicobar Islands": [
      "North and Middle Andaman",
      "South Andaman",
      "Nicobar",
    ],
    Chandigarh: ["Chandigarh"],
    "Daman and Diu": ["Daman", "Diu"],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    "Jammu and Kashmir": [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
    Ladakh: ["Kargil", "Leh"],
    Puducherry: ["Karaikal", "Puducherry", "Yanam", "Mahe"],
  };

  useEffect(() => {
    if (formData.state) {
      setDistricts(districtsByState[formData.state] || []);
      // Reset district when state changes
      setFormData((prevData) => ({ ...prevData, living_place: "" }));
    } else {
      setDistricts([]);
      setFormData((prevData) => ({ ...prevData, living_place: "" }));
    }
  }, [formData.state]);

  const validateForm = () => {
    const errors = { ...initialFormErrors };
    let isValid = true;
    const missingFields = [];

    const isEmpty = (value) => value == null || value.toString().trim() === "";

    Object.entries(formData).forEach(([fieldName, value]) => {
      let errorMessage = "";

      if (
        fieldName !== "children" &&
        fieldName !== "whatsapp" &&
        fieldName !== "expectations" &&
        !(
          fieldName === "has_children" &&
          formData.marital_status === "Unmarried"
        )
      ) {
        if (isEmpty(value)) {
          errorMessage = "This field is required";
          if (!missingFields.includes(fieldName)) missingFields.push(fieldName);
          isValid = false;
        } else {
          errorMessage = validateField(fieldName, value);
          if (errorMessage) {
            if (!missingFields.includes(fieldName))
              missingFields.push(fieldName);
            isValid = false;
          }
        }
      } else if (
        fieldName === "father_name" ||
        fieldName === "mother_name" ||
        fieldName === "father_desigination" ||
        fieldName === "mother_desigination"
      ) {
        if (isEmpty(value)) {
          errorMessage = "This field is required";
          if (!missingFields.includes(fieldName)) missingFields.push(fieldName);
          isValid = false;
        } else {
          errorMessage = validateField(fieldName, value);
          if (errorMessage) {
            if (!missingFields.includes(fieldName))
              missingFields.push(fieldName);
            isValid = false;
          }
        }
      } else if (
        fieldName === "profile_photo1" ||
        fieldName === "profile_photo2"
      ) {
        errorMessage = validateImageFile(value);
        if (errorMessage && errorMessage.startsWith("Please upload")) {
          if (!missingFields.includes(fieldName)) missingFields.push(fieldName);
          isValid = false;
        } else if (errorMessage) isValid = false;
      } else if (fieldName === "horoscope" || fieldName === "id_proof") {
        errorMessage = validatePdfFile(value);
        if (errorMessage && errorMessage.startsWith("Please upload")) {
          if (!missingFields.includes(fieldName)) missingFields.push(fieldName);
          isValid = false;
        } else if (errorMessage) isValid = false;
      }

      errors[fieldName] = errorMessage;
    });

    // Validate children (as before)
    if (
      (formData.marital_status === "Divorce" ||
        formData.marital_status === "Widow") &&
      formData.has_children === "Yes"
    ) {
      // ... (rest of your children validation)
    } else {
      errors.children = formData.children.map(() => ({ name: "", age: "" }));
      if (formData.marital_status === "Unmarried") errors.has_children = "";
    }

    setFormErrors(errors);

    if (!isValid && missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      alert("Please fill in all the required fields.");
      const firstMissingField = missingFields[0];
      if (formRefs.current[firstMissingField]) {
        formRefs.current[firstMissingField].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else if (!isValid) {
      alert("Please fix the validation errors and try again.");
      const allErrors = Object.entries(errors).filter(
        ([, error]) => error !== ""
      );
      if (allErrors.length > 0) {
        console.log("Validation errors:", Object.fromEntries(allErrors));
      }
    }

    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert("Please fix the validation errors and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "children") {
          formDataToSubmit.append(key, JSON.stringify(value));
        } else {
          formDataToSubmit.append(key, value);
        }
      });

      const response = await axios.post(
        `${BASE_URL}/registeredUsers.php`,
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const responseData = response.data.data;
      if (responseData?.status === "valid") {
        alert("Registration successful!");
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
        setFileNames({
          profile_photo1: "",
          profile_photo2: "",
          horoscope: "",
        });
        Object.values(fileInputRefs.current).forEach((ref) => {
          if (ref) ref.value = "";
        });
        navigate("/payment");
      } else {
        alert(
          "Registration failed: " + (responseData?.error || "Unknown error")
        );
      }
    } catch (error) {
      alert("An error occurred during registration: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   setEnableOtherMotherTongue(false);
  // }, []);

  return (
    <div className="container userRegisterationForm">
      <div className="register-title">
        <h3>REGISTRATION FORM</h3>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Full Name<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Your Full Name"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.fullname = el)}
              />
              {formErrors.fullname && (
                <span className="text-danger">{formErrors.fullname}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Marital Status<span className="text-danger">*</span>:
              </label>
              <select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.marital_status = el)}
              >
                <option value="">Select</option>
                <option value="Unmarried">Unmarried</option>
                <option value="Divorce">Divorce</option>
                <option value="Widow">Widow</option>
              </select>
              {formErrors.marital_status && (
                <span className="text-danger">{formErrors.marital_status}</span>
              )}
            </div>
          </div>

          {(formData.marital_status === "Divorce" ||
            formData.marital_status === "Widow") && (
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Do you have children?<span className="text-danger">*</span>
                </label>
                <select
                  name="has_children"
                  value={formData.has_children}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={isSubmitting}
                  ref={(el) => (formRefs.current.has_children = el)}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {formErrors.has_children && (
                  <span className="text-danger">{formErrors.has_children}</span>
                )}

                {formData.has_children === "Yes" && (
                  <div className="children-section mt-3">
                    <button
                      type="button"
                      onClick={handleAddChild}
                      className="btn btn-primary mb-3"
                      disabled={isSubmitting}
                    >
                      + Add Child
                    </button>
                    {formData.children.map((child, index) => (
                      <div key={index} className="child-entry mb-3">
                        <div className="row">
                          <div className="col-md-5">
                            <input
                              type="text"
                              value={child.name}
                              onChange={(e) =>
                                handleChildChange(index, "name", e.target.value)
                              }
                              placeholder={`Child ${index + 1} Gender`}
                              className="form-control"
                              disabled={isSubmitting}
                              ref={(el) =>
                                (formRefs.current[`child_name_${index}`] = el)
                              }
                            />
                            {formErrors.children[index]?.name && (
                              <span className="text-danger">
                                {formErrors.children[index].name}
                              </span>
                            )}
                          </div>
                          <div className="col-md-4">
                            <input
                              type="number"
                              value={child.age}
                              onChange={(e) =>
                                handleChildChange(index, "age", e.target.value)
                              }
                              placeholder={`Child ${index + 1} Age`}
                              className="form-control"
                              min="0"
                              max="100"
                              disabled={isSubmitting}
                              ref={(el) =>
                                (formRefs.current[`child_age_${index}`] = el)
                              }
                            />
                            {formErrors.children[index]?.age && (
                              <span className="text-danger">
                                {formErrors.children[index].age}
                              </span>
                            )}
                          </div>
                          <div className="col-md-3">
                            <button
                              type="button"
                              className="btn btn-danger w-100"
                              onClick={() => handleRemoveChild(index)}
                              disabled={isSubmitting}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Rest of the form fields remain unchanged */}
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Gender<span className="text-danger">*</span>:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.gender = el)}
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              {formErrors.gender && (
                <span className="text-danger">{formErrors.gender}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Date of Birth<span className="text-danger">*</span>:
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="form-control"
                max={new Date().toISOString().split("T")[0]}
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.dob = el)}
              />
              {formErrors.dob && (
                <span className="text-danger">{formErrors.dob}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            {/* <div className="form-group">
              <label>
                Birth Time<span className="text-danger">*</span>:
              </label>
              <input
                type="time"
                name="dob_time"
                value={formData.dob_time}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.dob_time = el)}
              />
              {formErrors.dob_time && (
                <span className="text-danger">{formErrors.dob_time}</span>
              )}
            </div> */}
            <div className="form-group">
              <label>
                Birth Time<span className="text-danger">*</span>:
              </label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  name="dob_time"
                  placeholder="hh:mm"
                  value={formData.dob_time}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={isSubmitting}
                  ref={(el) => (formRefs.current.dob_time = el)}
                  pattern="(0[1-9]|1[0-2]):[0-5][0-9]"
                  title="Enter time in hh:mm format (e.g. 02:30)"
                />
                <select
                  name="dob_ampm"
                  value={formData.dob_ampm}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={isSubmitting}
                >
                  <option value="">AM/PM</option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>

              {formErrors.dob_time && (
                <span className="text-danger">{formErrors.dob_time}</span>
              )}
              {formErrors.dob_ampm && (
                <span className="text-danger">{formErrors.dob_ampm}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Birth Place<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="birth_place"
                value={formData.birth_place}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Birth Place"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.birth_place = el)}
              />
              {formErrors.birth_place && (
                <span className="text-danger">{formErrors.birth_place}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            {/* <div className="form-group">
              <label>
                Mother Tongue<span className="text-danger">*</span>:
              </label>
              <select
                name="mother_tongue"
                value={formData.mother_tongue}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mother_tongue = el)}
              >
                <option value="">Select</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="English">English</option>
                <option value="Others">Others</option>
              </select>
              {formErrors.mother_tongue && (
                <span className="text-danger">{formErrors.mother_tongue}</span>
              )}
            </div> */}

            <div className="form-group">
              <label>
                Mother Tongue<span className="text-danger">*</span>:
              </label>

              <select
                name="mother_tongue"
                value={
                  formData.mother_tongue === "Others"
                    ? "Others"
                    : formData.mother_tongue
                }
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "Others") {
                    // Keep "Others" selected to show the input
                    setEnableOtherMotherTongue(true);
                    setFormData((prev) => ({
                      ...prev,
                      mother_tongue: "Others",
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, mother_tongue: value }));
                    setEnableOtherMotherTongue(false);
                  }
                }}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mother_tongue = el)}
              >
                <option value="">Select</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="English">English</option>
                <option value="Others">Others</option>
              </select>

              {enableOtherMotherTongue === true && (
                <input
                  type="text"
                  name="custom_mother_tongue"
                  placeholder="Enter your mother tongue"
                  className="form-control mt-4"
                  value={formData.custom_mother_tongue || ""}
                  onChange={(e) => {
                    const typedValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      mother_tongue: typedValue, // Overwrite dropdown value with typed value
                      custom_mother_tongue: typedValue,
                    }));
                  }}
                  disabled={isSubmitting}
                />
              )}

              {/* {formErrors.mother_tongue && (
                <span className="text-danger">{formErrors.mother_tongue}</span>
              )} */}
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label>
                  Lagnam<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  name="lagnam"
                  value={formData.lagnam}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={isSubmitting}
                  ref={(el) => (formRefs.current.lagnam = el)}
                />
                {formErrors.lagnam && (
                  <span className="text-danger">{formErrors.lagnam}</span>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Rasi<span className="text-danger">*</span>:
              </label>
              <select
                name="rashi"
                value={formData.rashi}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.rashi = el)}
              >
                <option value="0">-- Select Rasi --</option>
                <option value="MESHAM (மேஷம்)">MESHAM (மேஷம்)</option>
                <option value="RISHABAM (ரிஷபம்)">RISHABAM (ரிஷபம்)</option>
                <option value="MITHUNAM (மிதுனம்)">MITHUNAM (மிதுனம்)</option>
                <option value="KATAKAM (கடகம்)">KATAKAM (கடகம்)</option>
                <option value="SIMMAM (சிம்மம்)">SIMMAM (சிம்மம்)</option>
                <option value="KANNI (கன்னி)">KANNI (கன்னி)</option>
                <option value="VRICHIKA (விருச்சிகம்)">
                  VRICHIKA (விருச்சிகம்)
                </option>
                <option value="THULAM (துலாம்)">THULAM (துலாம்)</option>
                <option value="MAGARAM (மகரம்)">MAGARAM (மகரம்)</option>
                <option value="KUMBHAM (கும்பம்)">KUMBHAM (கும்பம்)</option>
                <option value="MEENAM (மீனம்)">MEENAM (மீனம்)</option>
                <option value="DHANUSU (தனுசு)">DHANUSU (தனுசு)</option>
              </select>
              {formErrors.rashi && (
                <span className="text-danger">{formErrors.rashi}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Natchathiram<span className="text-danger">*</span>:
              </label>
              <select
                name="star"
                value={formData.star}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.star = el)}
              >
                <option value="">Select</option>
                <option value="ANUSHAM (அனுஷம்)">ANUSHAM (அனுஷம்)</option>
                <option value="ASTHAM (அஸ்தம்)">ASTHAM (அஸ்தம்)</option>
                <option value="ASTHAM (அஸ்தம்)">ASWINI (அஸ்வினி)</option>
                <option value="ASTHAM (அஸ்தம்)">AVITTAM (அவிட்டம்)</option>
                <option value="AYILYAM (ஆயில்யம்)">AYILYAM (ஆயில்யம்)</option>
                <option value="BARANI (பரணி)">BARANI (பரணி)</option>
                <option value="CHITRAI சித்திரை">CHITRAI சித்திரை </option>
                <option value="HASTHAM (அஸ்தம்)">HASTHAM (அஸ்தம்)</option>
                <option value="KETTAI (கேட்டை)">KETTAI (கேட்டை)</option>
                <option value="KRITHIGAI (கிருத்திகை)">
                  KRITHIGAI (கிருத்திகை)
                </option>
                <option value="MAGAM (மகம்)">MAGAM (மகம்)</option>
                <option value="MIRUGASIRISHAM (மிருகசிரீஷம்)">
                  MIRUGASIRISHAM (மிருகசிரீஷம்)
                </option>
                <option value="MOOLAM (மூலம்)">MOOLAM (மூலம்)</option>
                <option value="POORADAM (பூராடம்)">POORADAM (பூராடம்)</option>
                <option value="POORADAM (பூராடம்)">POORAM (பூரம்)</option>
                <option value="POOSAM (பூசம்)">POOSAM (பூசம்)</option>
                <option value="PUNARPOOSAM (புனர்பூசம்)">
                  PUNARPOOSAM (புனர்பூசம்)
                </option>
                <option value="POORATTATHI (பூரட்டாதி)">
                  POORATTATHI (பூரட்டாதி)
                </option>
                <option value="REVATHI (ரேவதி)">REVATHI (ரேவதி)</option>
                <option value="ROHINI (ரோகினி)">ROHINI (ரோகினி)</option>
                <option value="SADAYAM (சதயம்)">SADAYAM (சதயம்)</option>
                <option value="SWATHI (சுவாதி)">SWATHI (சுவாதி)</option>
                <option value="THIRUVADIRAI (திருவாதிரை)">
                  THIRUVADIRAI (திருவாதிரை)
                </option>
                <option value="THIRUVONAM (திருவோணம்)">
                  THIRUVONAM (திருவோணம்)
                </option>
                <option value="UTHIRADAM (உத்திராடம்)">
                  UTHIRADAM (உத்திராடம்)
                </option>
                <option value="UTHIRAM (உத்திரம்)">UTHIRAM (உத்திரம்)</option>
                <option value="UTTHIRATTATHI (உத்திரட்டாதி)">
                  UTTHIRATTATHI (உத்திரட்டாதி)
                </option>
                <option value="VISAGAM (விசாகம்)">VISAGAM (விசாகம்)</option>
              </select>
              {formErrors.star && (
                <span className="text-danger">{formErrors.star}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Paadham<span className="text-danger">*</span>:
              </label>
              <select
                name="paadham"
                value={formData.paadham}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.paadham = el)}
              >
                <option value="">Select</option>
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {formErrors.paadham && (
                <span className="text-danger">{formErrors.paadham}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Caste<span className="text-danger">*</span>:
              </label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleCasteChange} // Changed to a specific handler
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.caste = el)}
              >
                <option value="">Select</option>
                <option value="Vanniya Kula Kshatriya">
                  Vanniya Kula Kshatriya
                </option>
                {/* Add other initial caste options here if needed */}
              </select>
              {formErrors.caste && (
                <span className="text-danger">{formErrors.caste}</span>
              )}
            </div>
          </div>

          {formData.caste === "Vanniya Kula Kshatriya" && (
            <div className="col-md-6">
              <div className="form-group">
                <label>
                  Sub-Caste<span className="text-danger">*</span>:
                </label>
                <select
                  name="sub_caste"
                  value={formData.sub_caste}
                  onChange={handleInputChange}
                  className="form-control"
                  disabled={isSubmitting}
                  ref={(el) => (formRefs.current.sub_caste = el)}
                >
                  <option value="">Select</option>
                  <option value="நாயக்கர்">நாயக்கர் (Naicker)</option>
                  <option value="கவுண்டர்">கவுண்டர் (Gounder)</option>
                  <option value="கண்டர்">கண்டர் (Kandar)</option>
                  <option value="பள்ளி">பள்ளி (Palli)</option>
                  <option value="படையாட்சி">படையாட்சி (Padayachi)</option>
                  <option value="சம்புவராயர்">
                    சம்புவராயர் (Sambuvarayar)
                  </option>
                  <option value="மழவராயர்">மழவராயர் (Mazhavarayar)</option>
                  <option value="ரெட்டியார்">ரெட்டியார் (Reddiar)</option>
                </select>
                {formErrors.sub_caste && (
                  <span className="text-danger">{formErrors.sub_caste}</span>
                )}
              </div>
            </div>
          )}

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Height (cm)<span className="text-danger">*</span>:
              </label>

              <select
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.height = el)}
              >
                <option value="1">-Select-</option>
                <option value="2">4ft - 121 cm</option>
                <option value="3">4ft 1in - 124cm</option>
                <option value="4">4ft 2in - 127cm</option>
                <option value="5">4ft 3in - 129cm</option>
                <option value="6">4ft 4in - 132cm</option>
                <option value="7">4ft 5in - 134cm</option>
                <option value="8">4ft 6in - 137cm</option>
                <option value="9">4ft 7in - 139cm</option>
                <option value="10">4ft 8in - 142cm</option>
                <option value="11">4ft 9in - 144cm</option>
                <option value="12">4ft 10in - 147cm</option>
                <option value="13">4ft 11in - 149cm</option>
                <option value="14">5ft - 152cm</option>
                <option value="15">5ft 1in - 154cm</option>
                <option value="16">5ft 2in - 157cm</option>
                <option value="17">5ft 3in - 160cm</option>
                <option value="18">5ft 4in - 162cm</option>
                <option value="19">5ft 5in - 165cm</option>
                <option value="20">5ft 6in - 167cm</option>
                <option value="21">5ft 7in - 170cm</option>
                <option value="22">5ft 8in - 172cm</option>
                <option value="23">5ft 9in - 175cm</option>
                <option value="24">5ft 10in - 177cm</option>
                <option value="25">5ft 11in - 180cm</option>
                <option value="26">6ft - 182cm</option>
                <option value="27">6ft 1in - 185cm</option>
                <option value="28">6ft 2in - 187cm</option>
                <option value="29">6ft 3in - 190cm</option>
                <option value="30">6ft 4in - 193cm</option>
                <option value="31">6ft 5in - 195cm</option>
                <option value="32">6ft 6in - 198cm</option>
              </select>

              {formErrors.height && (
                <span className="text-danger">{formErrors.height}</span>
              )}
            </div>
          </div>

          {/* // complexion */}
          <div className="col-md-12">
            <div className="form-group">
              <label>
                Complexion<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="complexion"
                value={formData.complexion}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.complexion = el)}
              />
              {formErrors.complexion && (
                <span className="text-danger">{formErrors.complexion}</span>
              )}
            </div>
          </div>

          <h5>Family Details</h5>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Father's Name<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.father_name = el)}
              />
              {formErrors.father_name && (
                <span className="text-danger">{formErrors.father_name}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Father's Profession:</label>
              <input
                type="text"
                name="father_desigination"
                value={formData.father_desigination}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.father_desigination = el)}
              />
              {formErrors.father_desigination && (
                <span className="text-danger">
                  {formErrors.father_desigination}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Mother's Name<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mother_name = el)}
              />
              {formErrors.mother_name && (
                <span className="text-danger">{formErrors.mother_name}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Mother's Profession:</label>
              <input
                type="text"
                name="mother_desigination"
                value={formData.mother_desigination}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mother_desigination = el)}
              />
              {formErrors.mother_desigination && (
                <span className="text-danger">
                  {formErrors.mother_desigination}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Father<span className="text-danger">*</span>:
              </label>
              <select
                name="father"
                value={formData.father}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.father = el)}
              >
                <option value="">Select</option>
                <option value="Alive">Alive</option>
                <option value="Late">Late</option>
              </select>
              {formErrors.father && (
                <span className="text-danger">{formErrors.father}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Mother<span className="text-danger">*</span>:
              </label>
              <select
                name="mother"
                value={formData.mother}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mother = el)}
              >
                <option value="">Select</option>
                <option value="Alive">Alive</option>
                <option value="Late">Late</option>
              </select>
              {formErrors.mother && (
                <span className="text-danger">{formErrors.mother}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Brothers<span className="text-danger">*</span>:
              </label>
              <select
                name="brother"
                value={formData.brother}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.brother = el)}
              >
                <option value="">Select</option>
                <option value="-">-</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {formErrors.brother && (
                <span className="text-danger">{formErrors.brother}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Brothers Married<span className="text-danger">*</span>:
              </label>
              <select
                name="brother_married"
                value={formData.brother_married}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.brother_married = el)}
              >
                <option value="">Select</option>
                <option value="-">-</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {formErrors.brother_married && (
                <span className="text-danger">
                  {formErrors.brother_married}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Sisters<span className="text-danger">*</span>:
              </label>
              <select
                name="sister"
                value={formData.sister}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.sister = el)}
              >
                <option value="">Select</option>
                <option value="-">-</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {formErrors.sister && (
                <span className="text-danger">{formErrors.sister}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Sisters Married<span className="text-danger">*</span>:
              </label>
              <select
                name="sister_married"
                value={formData.sister_married}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.sister_married = el)}
              >
                <option value="">Select</option>
                <option value="-">-</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              {formErrors.sister_married && (
                <span className="text-danger">{formErrors.sister_married}</span>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label>
                Birth Order<span className="text-danger">*</span>:
              </label>
              <select
                name="birth_order"
                value={formData.birth_order}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.birth_order = el)}
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              {formErrors.birth_order && (
                <span className="text-danger">{formErrors.birth_order}</span>
              )}
            </div>
          </div>

          <h5>Education & Job Details</h5>
          <div className="col-md-12">
            <div className="form-group">
              <label>
                Qualification<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.education = el)}
              />
              {formErrors.education && (
                <span className="text-danger">{formErrors.education}</span>
              )}
            </div>
          </div>

          {/* lagnam  */}

          {/* // own house  */}

          <div className="col-md-4">
            <div className="form-group">
              <label>
                Own House<span className="text-danger">*</span>:
              </label>
              <select
                name="own_house"
                value={formData.own_house}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.own_house = el)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {formErrors.own_house && (
                <span className="text-danger">{formErrors.own_house}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            {/* <div className="form-group">
              <label>
                Job Type<span className="text-danger">*</span>:
              </label>

              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.job_type = el)}
              >
                <option value="">Select</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Doctor">Doctor</option>
                <option value="Business">Business</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Unemployed">Unemployed</option>
              </select>
              {formErrors.job_type && (
                <span className="text-danger">{formErrors.job_type}</span>
              )}
            </div> */}
            <div className="form-group">
              <label>
                Job Type<span className="text-danger">*</span>:
              </label>

              <input
                type="text"
                name="job_type"
                placeholder="Enter your job type"
                className="form-control"
                value={formData.job_type || ""}
                onChange={(e) => {
                  const typedValue = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    job_type: typedValue, // Update job_type with typed value
                  }));
                }}
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.job_type = el)}
              />

              {formErrors.job_type && (
                <span className="text-danger">{formErrors.job_type}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                ORGANIZATION NAME / DEPARTMENT
                <span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter ORGANIZATION NAME / DEPARTMENT"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.company_name = el)}
              />
              {formErrors.company_name && (
                <span className="text-danger">{formErrors.company_name}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Monthly Salary<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Monthly Salary"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.salary = el)}
              />
              {formErrors.salary && (
                <span className="text-danger">{formErrors.salary}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Work Place<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="work_place"
                value={formData.work_place}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Work Place"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.work_place = el)}
              />
              {formErrors.work_place && (
                <span className="text-danger">{formErrors.work_place}</span>
              )}
            </div>
          </div>

          <h5>Dosham</h5>
          <div className="col-md-4">
            <div className="form-group">
              <label>
                Sevaai Dosham<span className="text-danger">*</span>:
              </label>
              <select
                name="sevaai_dhosam"
                value={formData.sevaai_dhosam}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.sevaai_dhosam = el)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {formErrors.sevaai_dhosam && (
                <span className="text-danger">{formErrors.sevaai_dhosam}</span>
              )}
            </div>
          </div>

          {/* <div className="col-md-4">
    <div className="form-group">
        <label>
            Sarpa Dosham<span className="text-danger">*</span>:
        </label>
        <select
            name="sarpam_dhosam"
            value={formData.sarpam_dhosam}
            onChange={handleInputChange}
            className="form-control"
            disabled={isSubmitting}
            ref={(el) => (formRefs.current.sarpam_dhosam = el)}
        >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
        {formErrors.sarpam_dhosam && (
            <span className="text-danger">{formErrors.sarpam_dhosam}</span>
        )}
    </div>
</div> */}

          <div className="col-md-4">
            <div className="form-group">
              <label>
                Raagu-ketu Dosham<span className="text-danger">*</span>:
              </label>
              <select
                name="raagu_dhosam"
                value={formData.raagu_dhosam}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.raagu_dhosam = el)}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {formErrors.raagu_dhosam && (
                <span className="text-danger">{formErrors.raagu_dhosam}</span>
              )}
            </div>
          </div>

          <h5>Contact Details</h5>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Mobile 1<span className="text-danger">*</span>:
              </label>
              <input
                type="tel"
                name="mobile_1"
                value={formData.mobile_1}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter 10-digit Mobile Number"
                maxLength="10"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mobile_1 = el)}
              />
              {formErrors.mobile_1 && (
                <span className="text-danger">{formErrors.mobile_1}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Mobile 2<span className="text-danger">*</span>:
              </label>
              <input
                type="tel"
                name="mobile_2"
                value={formData.mobile_2}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter 10-digit Mobile Number"
                maxLength="10"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.mobile_2 = el)}
              />
              {formErrors.mobile_2 && (
                <span className="text-danger">{formErrors.mobile_2}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>WhatsApp:</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter 10-digit WhatsApp Number"
                maxLength="10"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.whatsapp = el)}
              />
              {formErrors.whatsapp && (
                <span className="text-danger">{formErrors.whatsapp}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Email<span className="text-danger">*</span>:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Email ID"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.email = el)}
              />
              {formErrors.email && (
                <span className="text-danger">{formErrors.email}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                State<span className="text-danger">*</span>:
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.state = el)}
              >
                <option value="">Select State</option>
                {Object.keys(districtsByState).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {formErrors.state && (
                <span className="text-danger">{formErrors.state}</span>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                District<span className="text-danger">*</span>:
              </label>
              <select
                name="living_place"
                value={formData.living_place}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.living_place = el)}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {formErrors.living_place && (
                <span className="text-danger">{formErrors.living_place}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                PIN Code<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                name="pin_code"
                value={formData.pin_code}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter 6-digit PIN Code"
                maxLength="6"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.pin_code = el)}
              />
              {formErrors.pin_code && (
                <span className="text-danger">{formErrors.pin_code}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Country<span className="text-danger">*</span>:
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="form-control"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.country = el)}
              >
                <option value="">Select</option>
                <option value="India">India</option>
                <option value="NRI">NRI</option>
              </select>
              {formErrors.country && (
                <span className="text-danger">{formErrors.country}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                Address<span className="text-danger">*</span>:
              </label>
              <textarea
                style={{
                  textTransform: "uppercase",
                }}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Address"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.address = el)}
              />
              {formErrors.address && (
                <span className="text-danger">{formErrors.address}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Expectations:</label>
              <textarea
                style={{
                  textTransform: "uppercase",
                }}
                name="expectations"
                value={formData.expectations}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter Partner Expectations"
                disabled={isSubmitting}
                ref={(el) => (formRefs.current.expectations = el)}
              />
              {formErrors.expectations && (
                <span className="text-danger">{formErrors.expectations}</span>
              )}
            </div>
          </div>

          {/* // Jothidam Box  */}
          <h5>Jothidam Box </h5>
          <p>Kindly fill the correct box value refrence value show on image </p>

          <div>
            <img
              src={jothidamBox1Img}
              style={{
                width: 400,
              }}
            />
            <img
              src={jothidamBox2Img}
              style={{
                width: 400,
              }}
            />
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <JothidamBox formData={formData} setFormData={setFormData} />
            </div>
          </div>

          <div className="row uploadscont">
            <div className="col-12">
              <hr />
            </div>
            <div className="col-12 mb-4">
              <h4>Upload the following Details</h4>
            </div>

            <div className="form-group col-md-3">
              <label>
                Profile Photo (Passport Size )
                <span className="text-danger">*</span>
              </label>
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="profile_photo1"
                  name="profile_photo1"
                  onChange={handleFileChange}
                  className="file-input text-white"
                  accept="image/jpeg,image/png"
                  disabled={isSubmitting}
                  ref={(el) => {
                    formRefs.current.profile_photo1 = el;
                    fileInputRefs.current.profile_photo1 = el;
                  }}
                />
                <label htmlFor="profile_photo1" className="file-upload-btn">
                  {fileNames.profile_photo1 || "Profile Photo"}
                </label>
              </div>
              {formErrors.profile_photo1 && (
                <span className="text-danger">{formErrors.profile_photo1}</span>
              )}
            </div>

            <div className="form-group col-md-3">
              <label>
                Profile Photo (Full Size )<span className="text-danger">*</span>
              </label>
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="profile_photo2"
                  name="profile_photo2"
                  onChange={handleFileChange}
                  className="file-input  text-white"
                  accept="image/jpeg,image/png"
                  disabled={isSubmitting}
                  ref={(el) => {
                    formRefs.current.profile_photo2 = el;
                    fileInputRefs.current.profile_photo2 = el;
                  }}
                />
                <label htmlFor="profile_photo2" className="file-upload-btn">
                  {fileNames.profile_photo2 || "Additional Photo"}
                </label>
              </div>
              {formErrors.profile_photo2 && (
                <span className="text-danger">{formErrors.profile_photo2}</span>
              )}
            </div>

            <div className="form-group col-md-3">
              <label>
                Horoscope<span className="text-danger">*</span>
              </label>
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="horoscope"
                  name="horoscope"
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="file-input  text-white"
                  disabled={isSubmitting}
                  ref={(el) => {
                    formRefs.current.horoscope = el;
                    fileInputRefs.current.horoscope = el;
                  }}
                />
                <label htmlFor="horoscope" className="file-upload-btn">
                  {fileNames.horoscope || "Horoscope (PDF)"}
                </label>
              </div>
              {formErrors.horoscope && (
                <span className="text-danger">{formErrors.horoscope}</span>
              )}
            </div>

            {/* <div className="form-group col-md-3">
                            <label>
                                Jathagam<span className="text-danger">*</span>
                            </label>
                            <div className="custom-file-upload">
                                <input
                                    type="file"
                                    id="id_proof"
                                    name="id_proof"
                                    onChange={handleFileChange}
                                    accept="application/pdf"
                                    className="file-input  text-white"
                                    disabled={isSubmitting}
                                    ref={(el) => {
                                        formRefs.current.id_proof = el;
                                        fileInputRefs.current.id_proof = el;
                                    }}
                                />
                                <label htmlFor="id_proof" className="file-upload-btn">
                                    {fileNames.id_proof || 'Jathagam (PDF)'}
                                </label>
                            </div>
                            {formErrors.id_proof && <span className="text-danger">{formErrors.id_proof}</span>}
                        </div> */}

            <div className="col-12">
              <hr />
            </div>
          </div>

          <div className="col-md-12 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterFormMain;
