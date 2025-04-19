import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import BlogDetail from "./components/BlogDetail";
import ProfileDetails from "./components/ProfileDetails";
import Wedding from "./components/Wedding";
import AllProfile from "./components/AllProfile";
import CommingSoon from "./components/CommingSoon";
import UserPlan from "./components/UserPlan";
import PageNotFound from "./components/PageNotFound";
import PhotoGallery_1 from "./components/PhotoGallery_1";
import PhotoGallery from "./components/PhotoGallery";
import Plans from "./components/Plans";
import UserProfile from "./components/UserProfile";
import UserInterests from "./components/UserInterests";
import UserDashBoard from "./components/UserDashBoard";
import Services from "./components/Services";
import Enquiry from "./components/Enquiry";
import UserChat from "./components/UserChat";
import WeddingVideo from "./components/WeddingVideo";
import UserSetting from "./components/UserSetting";
import UserProfileEdit from "./components/UserProfileEdit";
import History from "./components/History.jsx";
import Memories from "./components/Memories.jsx";
import Motives from "./components/Motives.jsx";
import UserDetails from "./components/UserDetails.jsx";
import UpdateUserForm from "./components/UpdateUser.jsx";
import OtpVerification from "./components/OtpVerification.jsx";
import UserFullDetails from "./components/UserFullDetails.jsx";
import Dummydetails from "./components/Dummydetails.jsx";
import Whatsapp from "./components/Whatsapp.jsx";
import TermsAndConditions from "./components/Terms&Condition.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../node_modules/popper.js/dist/popper.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "../node_modules/jquery/dist/jquery.js";
import "select2";
import "slick-carousel";
import RegisterFormMain from "./components/RegisterFormMain";
import Payment from "./components/Payment.jsx";
import Biodataform from "./components/Biodataform.jsx";
import Payments from "./components/payments/Payments.jsx";
import Verify from "./components/verify/Verify.jsx";

function App() {
  return (
    <Router basename="/">
      <Header />
      <Whatsapp />
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Payment" element={<Payment />} />
          <Route path="/UserDetails" element={<UserDetails />} />
          <Route path="/SignUp" element={<RegisterFormMain />} />
          <Route path="/about" element={<About />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Motives" element={<Motives />} />
          <Route path="/History" element={<History />} />
          <Route path="/Memories" element={<Memories />} />
          <Route path="/BlogDetail" element={<BlogDetail />} />
          <Route path="/user-details/:id" element={<UserFullDetails />} />
          <Route path="/user-detailsdummy" element={<Dummydetails />} />
          <Route path="/ProfileDetails" element={<ProfileDetails />} />
          <Route path="/Wedding" element={<Wedding />} />
          <Route path="/WeddingVideo" element={<WeddingVideo />} />
          <Route path="/AllProfile" element={<AllProfile />} />
          <Route path="/CommingSoon" element={<CommingSoon />} />
          <Route path="/OtpVerification" element={<OtpVerification />} />
          <Route path="/UserPlan" element={<UserPlan />} />
          <Route path="/PhotoGallery_1" element={<PhotoGallery_1 />} />
          <Route path="/PhotoGallery" element={<PhotoGallery />} />
          <Route path="/Plans" element={<Plans />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UserInterests" element={<UserInterests />} />
          <Route path="/UserDashBoard" element={<UserDashBoard />} />
          <Route path="/terms&condition" element={<TermsAndConditions />} />
          <Route path="/UserChat" element={<UserChat />} />
          <Route path="/UserSetting" element={<UserSetting />} />
          <Route path="/update-user-form/:id" element={<UpdateUserForm />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Enquiry" element={<Enquiry />} />
          <Route path="/UserProfileEdit" element={<UserProfileEdit />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/bio-data" element={<Biodataform />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/verify-payment" element={<Verify />} />
  
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
