import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../index.css'
function HomeCarosole() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>
                <div id="box">
                    <div className="cus-revi-box">
                        <div className="revi-im">
                            <img src="images/user/1.jpg" alt="" loading="lazy" />
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
                </div>



            </Slider>
        </div>
    );
}

export default HomeCarosole;
