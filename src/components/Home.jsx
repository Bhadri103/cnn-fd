import { Link } from "react-router-dom";
import introImg from "./images/introBg.jpg";

import ReviewImages1 from "./images/home/banner/images1.jpeg";
import ReviewImages2 from "./images/home/banner/images2.jpg";
import ReviewImages3 from "./images/home/banner/images3.jpg";

import React, { useEffect, useState } from "react";
import $ from "jquery";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoCaretDown } from "react-icons/io5";
import "../../node_modules/popper.js/dist/popper.js";

import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";

import "select2";
import "slick-carousel";
// import { IoCaretDown } from "react-icons/io5";
import HomeCarosole from "./HomeCarosole";
import MomentsSec from "./MomentsSec.jsx";

import BannerSlider from "./BannerSlider.jsx";
const Home = () => {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    // backgroundColor: "#f9f9f9",
    padding: "20px",

    marginTop: -50,
  };

  const boxStyle = {
    maxWidth: "800px",
    margin: "auto",
    // backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    fontSize: "24px",
    color: "#ba1f1f",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const sectionStyle = {
    marginBottom: "15px",
  };

  const headingStyle = {
    fontWeight: "bold",
    color: "#444",
  };

  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("sessionToken");

    if (storedUser && storedToken) {
      setUserExists(true); // User exists, set state to hide button
      // You can add your validateSession function call here if needed
      // validateSession(storedUser, storedToken);
    }

    const handleTabFocus = () => {
      // Your tab focus logic here if needed.
    };

    window.addEventListener("focus", handleTabFocus);

    return () => window.removeEventListener("focus", handleTabFocus);
  }, []);
  useEffect(() => {
    const initializeSliders = () => {
      // Initialize sliders if there are elements with class 'slid-inn'
      var $lis = $(".slid-inn");
      if ($lis.length > 0) {
        // COMMON SLIDER
        $(".slider3").slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
              },
            },
          ],
        });

        // HOME PAGE WRECENT COUPLES
        $(".couple-sli").slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 769,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
              },
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
              },
            },
          ],
        });

        // HOME PAGE BANNER SLIDER
        $(".ban-sli").slick({
          infinite: true,
          fade: true,
          cssEase: "linear",
          autoplay: true,
          autoplaySpeed: 6000,
        });

        // HOME PAGE WRECENT COUPLES
        $(".hom-qui-acc-sli").slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerMode: false,
              },
            },
            {
              breakpoint: 550,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: false,
                arrows: false,
              },
            },
          ],
        });
      }
    };

    // Call the initialization function when the component mounts
    initializeSliders();

    // Clean up the sliders when the component unmounts
    return () => {
      $(".slider3, .couple-sli, .ban-sli, .hom-qui-acc-sli").slick("unslick");
    };
  }, []);
  return (
    <div className="container ">
      <div className="introSecMain">
        <div className="row">
          <div className="col-lg-8">
            <BannerSlider />
          </div>
          <div className="col-lg-4  px-2 d-flex justify-content-center pt-5">
            <div className="introHeading">
              <h1>Welcome to CNNMM,</h1>
              <h4
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 18,
                  fontWeight: "normal",
                }}
              >
                A Community Rooted in Values. A Platform Committed to
                Relationships
              </h4>
              {/* <p>
                <b> Chennai Nanbargal Nala Mandram Matrimony </b>—also known as
                CNNMandram, CNNM Matrimony, or simply CNNMM—is the official
                matrimonial initiative of Chennai Nanbargal Nala Mandram, a
                respected welfare organization dedicated to education, social
                upliftment, and the empowerment of underprivileged members of
                the Vanniyar community.
              </p> */}
              Welcome to <b> CNNM Matrimony</b>, where love finds its way! Our
              platform is dedicated to helping you find your perfect match with
              ease and confidence.
              {!userExists && ( // Conditionally render the button
                <>
                  {" "}
                  <p>
                    Unlimited Profile View @<b> ₹3000</b> only
                  </p>
                  <Link to="/SignUp">
                    <button className="btn btn-primary btn-sm">
                      Register Now
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="str home-acces-main">
          <div className="container">
            <div className="row">
              {/* BACKGROUND SHAPE */}
              <div className="wedd-shap">
                {/* <span className="abo-shap-1" /> */}
                <span className="abo-shap-4" />
              </div>
              {/* END BACKGROUND SHAPE */}
              <div className="home-tit">
                <p>Quick Access</p>
                <h2>
                  <span>Our Services</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>

              <span
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                }}
              >
                <b>Chennai Nanbargal Nala Mandram Matrimony</b>—also known as
                <b>CNNMandram, CNNM Matrimony,</b> or simply <b>CNNMM</b>—is the
                official matrimonial initiative of{" "}
                <b>Chennai Nanbargal Nala Mandram</b>, a respected welfare
                organization dedicated to{" "}
                <b>
                  education, social upliftment, and the empowerment of
                  underprivileged members of the Vanniyar community
                </b>
                .
              </span>

              <div className="home-acces">
                <ul className="hom-qui-acc-sli">
                  <li>
                    <div
                      className="wow fadeInUp hacc hacc1"
                      data-wow-delay="0.1s"
                    >
                      <div className="con">
                        <img src="images/icon/user.png" alt="" loading="lazy" />
                        <h4>Browse Profiles</h4>
                        <p>1200+ Profiles</p>
                        <a href="all-profiles.html" className="getStarted">
                          View more
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      className="wow fadeInUp hacc hacc2"
                      data-wow-delay="0.2s"
                    >
                      <div className="con">
                        <img src="images/icon/gate.png" alt="" loading="lazy" />
                        <h4>Wedding</h4>
                        <p>1200+ Profiles</p>
                        <a href="wedding-video.html" className="getStarted">
                          View more
                        </a>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div
                      className="wow fadeInUp hacc hacc4"
                      data-wow-delay="0.4s"
                    >
                      <div className="con">
                        <img src="images/icon/hall.png" alt="" loading="lazy" />
                        <h4>Join Now</h4>
                        <p>Start for free</p>
                        <a href="plans.html" className="getStarted">
                          Get started
                        </a>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div
                      className="wow fadeInUp hacc hacc1"
                      data-wow-delay="0.1s"
                    >
                      <div className="con">
                        <img src="images/icon/user.png" alt="" loading="lazy" />
                        <h4>Browse Profiles</h4>
                        <p>1200+ Profiles</p>
                        <a href="all-profiles.html" className="getStarted">
                          View more
                        </a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div
                      className="wow fadeInUp hacc hacc2"
                      data-wow-delay="0.2s"
                    >
                      <div className="con">
                        <img src="images/icon/gate.png" alt="" loading="lazy" />
                        <h4>Wedding</h4>
                        <p>1200+ Profiles</p>
                        <a href="wedding-video.html" className="getStarted">
                          View more
                        </a>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div
                      className="wow fadeInUp hacc hacc4"
                      data-wow-delay="0.4s"
                    >
                      <div className="con">
                        <img src="images/icon/hall.png" alt="" loading="lazy" />
                        <h4>Join Now</h4>
                        <p>Start for free</p>
                        <a href="plans.html" className="getStarted">
                          Get started
                        </a>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div
                      className="wow fadeInUp hacc hacc3"
                      data-wow-delay="0.3s"
                    >
                      <div className="con">
                        <img
                          src="images/icon/photo-camera.png"
                          alt=""
                          loading="lazy"
                        />
                        <h4>Photo gallery</h4>
                        <p>1200+ Profiles</p>
                        <a href="photo-gallery.html" className="getStarted">
                          View more
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <span
                style={{
                  marginTop: -80,
                  marginBottom: 30,
                }}
              >
                Since <b>1982</b>, our organization has carried forward a proud
                legacy of <b>selfless service</b>. Today, we extend that mission
                into the realm of matrimonial services—{" "}
                <b>fostering meaningful connections</b>
                in a <b>safe</b>, <b>respectful</b>, and{" "}
                <b>culturally rooted environment</b> .
              </span>
              <span
                style={{
                  marginTop: -10,
                  marginBottom: 30,
                }}
              >
                We believe that marriage is more than a personal bond—it is a
                <b> partnership that strengthens families</b> and nurtures{" "}
                <b>unity within the Vanniyar community</b>. CNNMM stands firm on
                the pillars of
                <b>trust</b>, <b>transparency</b>, and <b>tradition</b> in every
                match we help create
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* TRUST BRANDS */}
      {/* <section>
            <div className="hom-cus-revi">
                <div className="container">
                    <div className="row">
                        <div className="home-tit">
                            <p>trusted brand</p>
                            <h2>
                                <span>
                                    Trust by <b className="num">1500</b>+ Couples
                                </span>
                            </h2>
                            <span className="leaf1" />
                            <span className="tit-ani-" />
                        </div>
                        <div className="slid-inn cus-revi">
                            <ul className="slider3">
                                <li>
                                    <div className="cus-revi-box">
                                        <div className="revi-im">
                                            <img src="./images/cardTop.jpg" alt="" loading="lazy" className='img-fluid' />
                                            <i className="cir-com cir-1" />
                                            <i className="cir-com cir-2" />
                                            <i className="cir-com cir-3" />
                                        </div>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. Lorem Ipsum has been the industry's
                                            standard dummy text ever since the 1500s,{" "}
                                        </p>
                                        <h5>Jack danial</h5>
                                        <span>New york</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="cus-revi-box">
                                        <div className="revi-im">
                                            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.postoast.com%2Fsouth-indian-bridal-look%2F&psig=AOvVaw28GoPd_VmCZctC8L1YpX9Y&ust=1713522800314000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqGAoTCLjcqoHIy4UDFQAAAAAdAAAAABCAAQ" alt="" loading="lazy" />
                                            <i className="cir-com cir-1" />
                                            <i className="cir-com cir-2" />
                                            <i className="cir-com cir-3" />
                                        </div>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. Lorem Ipsum has been the industry's
                                            standard dummy text ever since the 1500s,{" "}
                                        </p>
                                        <h5>Jack danial</h5>
                                        <span>New york</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="cus-revi-box">
                                        <div className="revi-im">
                                            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.postoast.com%2Fsouth-indian-bridal-look%2F&psig=AOvVaw28GoPd_VmCZctC8L1YpX9Y&ust=1713522800314000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqGAoTCLjcqoHIy4UDFQAAAAAdAAAAABCAAQ" alt="" loading="lazy" />
                                            <i className="cir-com cir-1" />
                                            <i className="cir-com cir-2" />
                                            <i className="cir-com cir-3" />
                                        </div>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. Lorem Ipsum has been the industry's
                                            standard dummy text ever since the 1500s,{" "}
                                        </p>
                                        <h5>Jack danial</h5>
                                        <span>New york</span>
                                    </div>
                                </li>
                                <li>
                                    <div className="cus-revi-box">
                                        <div className="revi-im">
                                            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.postoast.com%2Fsouth-indian-bridal-look%2F&psig=AOvVaw28GoPd_VmCZctC8L1YpX9Y&ust=1713522800314000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqGAoTCLjcqoHIy4UDFQAAAAAdAAAAABCAAQ" alt="" loading="lazy" />
                                            <i className="cir-com cir-1" />
                                            <i className="cir-com cir-2" />
                                            <i className="cir-com cir-3" />
                                        </div>
                                        <p>
                                            Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. Lorem Ipsum has been the industry's
                                            standard dummy text ever since the 1500s,{" "}
                                        </p>
                                        <h5>Jack danial</h5>
                                        <span>New york</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="cta-full-wid">
                            <a href="#!" className="cta-dark">
                                More customer reviews
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}

      <section>
        <div className="hom-cus-revi">
          <div className="container trustedBrandSec">
            {/* <div className=""> */}

            <div className="row">
              <div className="home-tit">
                <p>Trusted Matchmaking for the Vanniyar Community</p>
                <h2>
                  <span>
                    Trust by <b className="num">9999+</b>Couples
                  </span>
                </h2>
                <span
                  style={{
                    marginTop: 30,
                    display: "flex",
                    marginBottom: 20,
                  }}
                >
                  For over four decades, Chennai Nanbargal Nala Mandram has been
                  a force for good in society. As part of this continuing
                  commitment, we proudly present our official online matrimonial
                  platform—a safe, affordable, and community-centric service
                  created exclusively for the Vanniyar community.
                </span>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
              <div className="slid-inn cus-revi">
                <div className="slider3">
                  <div className="carosolePadd">
                    <div className="cus-revi-box">
                      {/* <div className="imgDiv mb-0"> */}
                      {/* <img src="https://www.postoast.com/wp-content/uploads/2023/12/South-Indian-wedding-look.jpg" alt=""
      class="img-fluid"> */}
                      {/* <i className="cir-com cir-1" />
                                        <i className="cir-com cir-2" />
                                        <i className="cir-com cir-3" /> */}
                      {/* </div> */}
                      <img
                        src={ReviewImages1}
                        style={{
                          marginTop: 10,
                        }}
                        className="imgDiv mb-0"
                      />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </div>
                  <div className="carosolePadd">
                    <div className="cus-revi-box">
                      <img
                        src={ReviewImages2}
                        style={{
                          marginTop: 10,
                        }}
                        className="imgDiv mb-0"
                      />

                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </div>
                  <div className="carosolePadd">
                    <div className="cus-revi-box">
                      <img
                        src={ReviewImages3}
                        style={{
                          marginTop: 10,
                        }}
                        className="imgDiv mb-0"
                      />
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </div>
                  <div className="carosolePadd">
                    <div className="cus-revi-box">
                      <div className="imgDiv mb-0"></div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </div>
                  <div className="carosolePadd">
                    <div className="cus-revi-box">
                      <div className="imgDiv mb-0"></div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </div>
                  <div className="carosolePadd">
                    <div className="cus-revi-box">
                      <div className="imgDiv mb-0"></div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cta-full-wid">
                <a href="#!" className="btn-pink">
                  More customer reviews
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      {/* END */}
      {/* BANNER */}
      <section>
        <div className="str">
          <div className="ban-inn ban-home">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    {/* <span>
                                            <i className="no1">#1</i> Wedding Website
                                        </span>
                                        <h2>Why choose us</h2> */}
                    <p>
                      Our Vision - Most Trusted and premium Matrimony Service in
                      the World.
                    </p>
                    <p>
                      To unite hearts and families through meaningful
                      connections, while upholding cultural values and fostering
                      social harmony
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div data-dely="0.1">
                    <img src="images/icon/prize.png" alt="" loading="lazy" />
                    <h4>Genuine profiles</h4>
                    <p>Contact genuine profiles with 100% verified mobile</p>
                  </div>
                </li>
                <li>
                  <div className="" data-ani="" data-dely="0.3">
                    <img src="images/icon/trust.png" alt="" loading="lazy" />
                    <h4>Most trusted</h4>
                    <p>The most trusted wedding matrimony brand lorem</p>
                  </div>
                </li>
                <li>
                  <div className="" data-ani="" data-dely="0.6">
                    <img src="images/icon/rings.png" alt="" loading="lazy" />
                    <h4>2000+ weddings</h4>
                    <p>Lakhs of peoples have found their life partner</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* ABOUT START */}
      <section>
        <div className="ab-wel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3" />
                  <img
                    src="https://wevaphotography.com/wp-content/uploads/2021/10/Traditional-South-Indian-Wedding-Ceremony-1024x576.jpg"
                    alt=""
                    loading="lazy"
                    className="ab-wel-1"
                  />
                  <img
                    src="https://cdn0.weddingwire.in/article/9117/3_2/1280/jpg/47119-south-indian-brides-the-wedding-salad-lead.webp"
                    alt=""
                    loading="lazy"
                    className="ab-wel-2"
                  />
                  <span className="ab-wel-4" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Why Choose <em>CNNMM?</em>
                    </h2>
                    <div style={containerStyle}>
                      <div style={boxStyle}>
                        <div style={titleStyle}>Why Choose Us?</div>

                        <div style={sectionStyle}>
                          <div style={headingStyle}>Community-Centered:</div>
                          <div>
                            Exclusively for the Vanniyar community—ensuring
                            shared values, traditions, and understanding.
                          </div>
                        </div>

                        <div style={sectionStyle}>
                          <div style={headingStyle}>
                            Simple & Transparent Pricing:
                          </div>
                          <div>
                            ₹3000 one-time registration fee—valid for one full
                            year. No hidden charges. No renewal pressure.
                          </div>
                        </div>

                        <div style={sectionStyle}>
                          <div style={headingStyle}>
                            Online Convenience with Offline Support:
                          </div>
                          <div>
                            Our long-standing and trusted offline service is now
                            online, supported by a dedicated and compassionate
                            team.
                          </div>
                        </div>

                        <div style={sectionStyle}>
                          <div style={headingStyle}>Verified Profiles:</div>
                          <div>
                            Every profile is thoroughly verified for
                            authenticity and safety.
                          </div>
                        </div>

                        <div style={sectionStyle}>
                          <div style={headingStyle}>
                            Privacy & Respect Guaranteed:
                          </div>
                          <div>
                            Your information remains secure. All interactions
                            are handled with discretion, care, and respect.
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <p>
                      Welcome to Wedding Matrimony, your premier destination for
                      finding love and companionship. Here, we understand that
                      marriage is a sacred bond, and we are dedicated to helping
                      you find the perfect partner to share your life's journey.
                      Our platform offers a diverse and inclusive community
                      where you can connect with individuals who share your
                      values and dreams.{" "}
                    </p> */}
                    {/* <p>
                      {" "}
                      At Wedding Matrimony, we pride ourselves on our
                      user-friendly interface and advanced matchmaking
                      algorithms, designed to bring you closer to your ideal
                      match. Whether you're looking for someone with shared
                      interests, cultural background, or specific personal
                      values, we are here to make your search effortless and
                      enjoyable.
                    </p> */}
                    <p>
                      {" "}
                      Join us today and embark on a beautiful journey towards a
                      happy and fulfilling marriage. With Wedding Matrimony,
                      your happily ever after begins here.
                    </p>
                  </div>
                  <div className="ab-wel-tit-1">
                    {/* <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p> */}
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true" />
                          <h4>
                            Enquiry <em> +91 044 2432 2858</em>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div>
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          <h4>
                            Get Support <em> admin@cnnmandram.com</em>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* COUNTS START */}
      {/* <section>
                <div className="ab-cont">
                    <div className="container">
                        <div className="row">
                            <ul>
                                <li>
                                    <div className="ab-cont-po">
                                        <i className="fa fa-heart-o" aria-hidden="true" />
                                        <div>
                                            <h4>20K</h4>
                                            <span>Couples pared</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="ab-cont-po">
                                        <i className="fa fa-users" aria-hidden="true" />
                                        <div>
                                            <h4>99999+</h4>
                                            <span>Registered users</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="ab-cont-po">
                                        <i className="fa fa-male" aria-hidden="true" />
                                        <div>
                                            <h4>40000+</h4>
                                            <span>Mens</span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="ab-cont-po">
                                        <i className="fa fa-female" aria-hidden="true" />
                                        <div>
                                            <h4>40000+</h4>
                                            <span>Womens</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section> */}
      {/* END */}
      {/* MOMENTS START */}

      <section>
        <div className="hom-cus-revi">
          <div className="container trustedBrandSec">
            {/* <div className=""> */}

            <div className="row">
              <div className="home-tit">
                <p>
                  Monthly “கலந்துரையாடல் நிகழ்ச்சி” – <span style={titleStyle} ></span> In-Person Matchmaking
                  Meetups
                </p>

                <span
                  style={{
                    marginTop: 30,
                    display: "flex",
                    marginBottom: 20,
                  }}
                >
                  At CNNMM, we go beyond digital matchmaking. <br />
                  <br />
                  Each month, CNNMM organize the “கலந்துரையாடல் நிகழ்ச்சி”-a
                  special opportunity for registered families to meet in person,
                  introduce their sons or daughters, and discuss expectations in
                  a respectful and culturally appropriate setting
                </span>
                <ul style={{listStyleType:'circle'}}>
                <h4  style={titleStyle} >Event Highlights:</h4>
                  <li>Face-to-Face Family Interactions</li>
                  <li>Organized by CNNMM Community Volunteers</li>
                  <li>Friendly Support and Guidance from Our Team</li>
                </ul>

                <span>
                  These monthly meetups foster <b>trust</b>, <b>transparency</b>
                  , and tradition-making the matchmaking experience{" "}
                  <b>personal</b>, <b>warm</b>, and <b>deeply human</b>.
                </span>
                <br />
                <br />
                <h4  style={titleStyle} >Join Us Today</h4>
                <span>
                  Be part of a trusted platform where values matter, matches are
                  meaningful, and community comes first.
                </span>
                <span>
                  Let’s build <b>strong families</b> and a{" "}
                  <b>unified Vanniyar society-together</b>.
                </span>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      <section>
        <div className="wedd-tline">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p>Moments</p>
                <h2>
                  <span>How it works</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
              <MomentsSec />
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* RECENT COUPLES */}
      <section>
        <div className="container">
          <div className="hom-couples-all">
            <div className="row">
              <div className="home-tit">
                <p>trusted brand</p>
                <h2>
                  <span>Recent Couples</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
            </div>
          </div>
          <div className="hom-coup-test">
            <ul className="couple-sli">
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://www.brides.com/thmb/phFLfofOAS5QwbvIjmNwd1hhfLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/justina-jordan-wedding-sq-b9f66d2a153349e186d1048ddb44f93a.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://i.pinimg.com/736x/e5/fc/5c/e5fc5c681f7a191f26f8f9babd6c1caa.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://i.pinimg.com/736x/f3/09/73/f309735cf0fda58fcaff7d9f8fe1379a.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://i.pinimg.com/736x/49/63/17/496317d5d0ded3faa44a3b3f275aa13c.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBuWbrrOTKfpqcufkCuemfr9KLrQR1alTU1luDSB03fg&s"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://camrinfilms.com/photos/Hindu-wedding-photos-varun-and-sindhuja%209.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://cdn0.weddingwire.in/article-gallery-o/00000/3_2/1280/jpg/articulos-india/2019/non-troncales/wedding-couple-dresses/coolbluez-coupleweddingdress-16coupleweddingdress.webp"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding-video.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="https://www.kalkifashion.com/blogs/wp-content/uploads/2023/02/An_Ultimate_Guide_To_Gujarati_Wedding_Traditions_Rituals__More.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="wedding.html" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* END */}

      <section>
        <div className="str count">
          <div className="container">
            <div className="row">
              <div className="fot-ban-inn">
                <div className="lhs">
                  <h2>Find your perfect Match now</h2>
                  <p>
                    Connect with individuals who share your interests, values,
                    and aspirations. Sign up today and take the first step
                    toward meeting the love of your life. Your perfect match is
                    just a click away!
                  </p>
                  <button className="btn-pink">
                    <Link to="/Register">Register Now</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
