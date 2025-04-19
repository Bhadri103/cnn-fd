import React, { useEffect } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IoCaretDown } from "react-icons/io5";
// import HomeCarosole from './HomeCarosole';
// import $ from 'jquery';
// import '../../node_modules/popper.js/dist/popper.js';
// @ts-ignore
import '../../node_modules/popper.js/dist/popper.js';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';


import 'select2';
import 'slick-carousel';
// import { IoCaretDown } from "react-icons/io5";
import HomeCarosole from './HomeCarosole';
const BlogDetail = () => {

    useEffect(() => {
        const initializeSliders = () => {
            // Initialize sliders if there are elements with class 'slid-inn'
            var $lis = $('.slid-inn');
            if ($lis.length > 0) {
                // COMMON SLIDER
                $('.slider3').slick({
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false
                        }
                    }]
                });

                // HOME PAGE WRECENT COUPLES
                $('.couple-sli').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false
                        }
                    }
                    ]
                });

                // HOME PAGE BANNER SLIDER
                $('.ban-sli').slick({
                    infinite: true,
                    fade: true,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 6000
                });

                // HOME PAGE WRECENT COUPLES
                $('.hom-qui-acc-sli').slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    dots: true,
                    autoplaySpeed: 3000,
                    responsive: [{
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            centerMode: false
                        }
                    },
                    {
                        breakpoint: 550,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false,
                            arrows: false
                        }
                    }
                    ]
                });
            }
        };

        // Call the initialization function when the component mounts
        initializeSliders();

        // Clean up the sliders when the component unmounts
        return () => {
            $('.slider3, .couple-sli, .ban-sli, .hom-qui-acc-sli').slick('unslick');
        };
    }, []);


    return (
        <>

            <section>
                <div className="inn-ban">
                    <div className="container">
                        <div className="row">
                            <h1>Prepare For Your Wedding Day</h1>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="blog.html">All Posts</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="blog.html">Wedding</a>
                                </li>
                                <li className="breadcrumb-item active">
                                    Prepare For Your Wedding Day
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}
            {/* START */}
            <section>
                <div className="blog-main blog-detail">
                    <div className="container">
                        <div className="row">
                            <div className="inn">
                                <div className="lhs">
                                    {/*BIG POST START*/}

                                    <div className="blog-home-box">
                                        <div className="im">
                                            <img src="images/couples/9.jpg" alt="" loading="lazy" />
                                            <span className="blog-date">22, Jan 2023</span>
                                            <div className="shar-1">
                                                <i className="fa fa-share-alt" aria-hidden="true" />
                                                <ul>
                                                    <li>
                                                        <a href="#!">
                                                            <i className="fa fa-facebook" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!">
                                                            <i className="fa fa-twitter" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!">
                                                            <i className="fa fa-whatsapp" aria-hidden="true" />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i
                                                                className="fa fa-link"
                                                                aria-hidden="true"
                                                                data-toggle="modal"
                                                                data-target="#sharepop"
                                                            />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="txt">
                                            <span className="blog-cate">Wedding</span>
                                            <span className="blog-cate">Events</span>
                                            <span className="blog-cate">Decoration</span>
                                            <h2>The Ultimate Wedding Planning Checklist</h2>
                                            <p>
                                                It is a long established fact that a reader will be
                                                distracted by the readable content of a page when looking at
                                                its layout. The point of using Lorem Ipsum is that it has a
                                                more-or-less normal distribution of letters, as opposed to
                                                using 'Content here, content here', making it look like
                                                readable English. Many desktop publishing packages and web
                                                page editors now use Lorem Ipsum as their default model
                                                text, and a search for 'lorem ipsum' will uncover many web
                                                sites still in their infancy. Various versions have evolved
                                                over the years, sometimes by accident, sometimes on purpose
                                                (injected humour and the like).
                                            </p>
                                            <h3>Where does it come from?</h3>
                                            <p>
                                                Contrary to popular belief, Lorem Ipsum is not simply random
                                                text. It has roots in a piece of classical Latin literature
                                                from 45 BC, making it over 2000 years old. Richard
                                                McClintock, a Latin professor at Hampden-Sydney College in
                                                Virginia, looked up one of the more obscure Latin words,
                                                consectetur, from a Lorem Ipsum passage, and going through
                                                the cites of the word in classical literature, discovered
                                                the undoubtable source. Lorem Ipsum comes from sections
                                                1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                                                Extremes of Good and Evil) by Cicero, written in 45 BC. This
                                                book is a treatise on the theory of ethics, very popular
                                                during the Renaissance. The first line of Lorem Ipsum,
                                                "Lorem ipsum dolor sit amet..", comes from a line in section
                                                1.10.32.
                                            </p>
                                            <p>
                                                The standard chunk of Lorem Ipsum used since the 1500s is
                                                reproduced below for those interested. Sections 1.10.32 and
                                                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                                                also reproduced in their exact original form, accompanied by
                                                English versions from the 1914 translation by H. Rackham.
                                            </p>
                                            <h4>Why do we use it?</h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and
                                                typesetting industry. Lorem Ipsum has been the industry's
                                                standard dummy text ever since the 1500s, when an unknown
                                                printer took a galley of type and scrambled it to make a
                                                type specimen book. It has survived not only five centuries,
                                                but also the leap into electronic typesetting, remaining
                                                essentially unchanged. It was popularised in the 1960s with
                                                the release of Letraset sheets containing Lorem Ipsum
                                                passages, and more recently with desktop publishing software
                                                like Aldus PageMaker including versions of Lorem Ipsum.
                                            </p>
                                            <h3>Where does it come from?</h3>
                                            <p>
                                                Contrary to popular belief, Lorem Ipsum is not simply random
                                                text. It has roots in a piece of classical Latin literature
                                                from 45 BC, making it over 2000 years old. Richard
                                                McClintock, a Latin professor at Hampden-Sydney College in
                                                Virginia, looked up one of the more obscure Latin words,
                                                consectetur, from a Lorem Ipsum passage, and going through
                                                the cites of the word in classical literature, discovered
                                                the undoubtable source. Lorem Ipsum comes from sections
                                                1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                                                Extremes of Good and Evil) by Cicero, written in 45 BC. This
                                                book is a treatise on the theory of ethics, very popular
                                                during the Renaissance. The first line of Lorem Ipsum,
                                                "Lorem ipsum dolor sit amet..", comes from a line in section
                                                1.10.32.
                                            </p>
                                            <div className="blog-info">
                                                <div className="blog-pro-info">
                                                    <img src="images/user/3.jpg" alt="" loading="lazy" />
                                                    <h5>
                                                        Steefan Ann <span>Author</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*END BIG POST START*/}
                                    {/*START*/}
                                    <div className="blog-nav">
                                        <div className="com lhs">
                                            <span>
                                                <i className="fa fa-long-arrow-left" aria-hidden="true" />{" "}
                                                Previous post
                                            </span>
                                            <h4>The Wedding Food</h4>
                                            <a href="#!" className="fclick" />
                                        </div>
                                        <div className="com rhs">
                                            <span>
                                                Next post{" "}
                                                <i className="fa fa-long-arrow-right" aria-hidden="true" />
                                            </span>
                                            <h4>Drinks and Music</h4>
                                            <a href="#!" className="fclick" />
                                        </div>
                                    </div>
                                    {/*END*/}
                                </div>
                                <div className="rhs">
                                    <div className="blog-com-rhs">
                                        {/* SOCIAL MEDIA START*/}
                                        <div className="blog-soci">
                                            <h4>Social media</h4>
                                            <ul>
                                                <li>
                                                    <a target="_blank" href="#!" className="sm-fb-big">
                                                        <b>3k</b> Facebook
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#!" className="sm-tw-big">
                                                        <b>10K</b> Twitter
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#!" className="sm-li-big">
                                                        <b>1k</b> Linkedin
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="#!" className="sm-yt-big">
                                                        <b>100K</b> Youtube
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* SOCIAL MEDIA END*/}
                                        {/* ADS START*/}
                                        <div className="blog-rhs-cate">
                                            <h4>Category</h4>
                                            <ul>
                                                <li>
                                                    <a href="#!">
                                                        <span>1</span>
                                                        <b>Wedding Planning</b>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!">
                                                        <span>2</span>
                                                        <b>Lifestyle</b>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!">
                                                        <span>3</span>
                                                        <b>Catering services</b>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!">
                                                        <span>4</span>
                                                        <b>Wedding Decorations</b>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!">
                                                        <span>5</span>
                                                        <b>Wedding Halls</b>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!">
                                                        <span>6</span>
                                                        <b>The Ceremony</b>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#!">
                                                        <span>7</span>
                                                        <b>Photography </b>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* ADS END*/}
                                        {/*TOP POSTS*/}
                                        <div className="hot-page2-hom-pre blog-rhs-trends">
                                            <h4>Trending Posts</h4>
                                            <ul>
                                                <li>
                                                    <div className="hot-page2-hom-pre-1">
                                                        <img src="images/couples/8.jpg" alt="" loading="lazy" />
                                                    </div>
                                                    <div className="hot-page2-hom-pre-2">
                                                        <h5>Simply dummy and typesetting</h5>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </li>
                                                <li>
                                                    <div className="hot-page2-hom-pre-1">
                                                        <img src="images/couples/4.jpg" alt="" loading="lazy" />
                                                    </div>
                                                    <div className="hot-page2-hom-pre-2">
                                                        <h5>Wedding make a type specimen book</h5>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </li>
                                                <li>
                                                    <div className="hot-page2-hom-pre-1">
                                                        <img src="images/couples/9.jpg" alt="" loading="lazy" />
                                                    </div>
                                                    <div className="hot-page2-hom-pre-2">
                                                        <h5>Halls Letraset sheets containing</h5>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </li>
                                                <li>
                                                    <div className="hot-page2-hom-pre-1">
                                                        <img src="images/couples/6.jpg" alt="" loading="lazy" />
                                                    </div>
                                                    <div className="hot-page2-hom-pre-2">
                                                        <h5>Where can I get some?</h5>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </li>
                                                <li>
                                                    <div className="hot-page2-hom-pre-1">
                                                        <img src="images/couples/4.jpg" alt="" loading="lazy" />
                                                    </div>
                                                    <div className="hot-page2-hom-pre-2">
                                                        <h5>The standard chunk of Lorem Ipsum</h5>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </li>
                                            </ul>
                                        </div>
                                        {/*TOP POSTS*/}
                                        {/* SUBSCRIBE START*/}
                                        <div className="blog-subsc">
                                            <div className="ud-rhs-poin1">
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/6349/6349282.png"
                                                    alt=""
                                                    loading="lazy"
                                                />
                                                <h5>
                                                    Subscribe <b>Newsletter</b>
                                                </h5>
                                            </div>
                                            <form
                                                name="news_newsletter_subscribe_form"
                                                id="news_newsletter_subscribe_form"
                                            >
                                                <ul>
                                                    <li>
                                                        <input
                                                            type="text"
                                                            name="news_newsletter_subscribe_name"
                                                            placeholder="Enter Email Id*"
                                                            className="form-control"
                                                            required=""
                                                        />
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="submit"
                                                            id="news_newsletter_subscribe_submit"
                                                            name="news_newsletter_subscribe_submit"
                                                            className="form-control"
                                                        />
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                        {/* SUBSCRIBE END*/}
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
                <div className="blog-rel slid-inn">
                    <div className="container">
                        <div className="row">
                            <div className="home-tit">
                                <p>Blog &amp; Articles</p>
                                <h2>
                                    <span>Related posts</span>
                                </h2>
                                <span className="leaf1" />
                            </div>
                            <div className="cus-revi">
                                <ul className="slider3">
                                    <li>

                                        <div className="outerBoxCarosole">

                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <img src="images/couples/9.jpg" alt="" loading="lazy" />
                                                </div>
                                                <div className="txt">
                                                    <span className="blog-cate">Wedding</span>
                                                    <h2>6 Things You Need To Prepare For Your Wedding Day</h2>
                                                    <div className="blog-info">
                                                        <div className="blog-pro-info">
                                                            <img src="images/user/1.jpg" alt="" loading="lazy" />
                                                            <h5>
                                                                Steefan Ann <span>Author</span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                    <li>
                                        <div className="outerBoxCarosole">

                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <img src="images/couples/2.jpg" alt="" loading="lazy" />
                                                </div>
                                                <div className="txt">
                                                    <span className="blog-cate">Wedding</span>
                                                    <h2>6 Things You Need To Prepare For Your Wedding Day</h2>
                                                    <div className="blog-info">
                                                        <div className="blog-pro-info">
                                                            <img src="images/user/2.jpg" alt="" loading="lazy" />
                                                            <h5>
                                                                Steefan Ann <span>Author</span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="outerBoxCarosole">
                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <img src="images/couples/4.jpg" alt="" loading="lazy" />
                                                </div>
                                                <div className="txt">
                                                    <span className="blog-cate">Wedding</span>
                                                    <h2>What your wedding checklist should include?</h2>
                                                    <div className="blog-info">
                                                        <div className="blog-pro-info">
                                                            <img src="images/user/3.jpg" alt="" loading="lazy" />
                                                            <h5>
                                                                Jonhey deep <span>Author</span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="outerBoxCarosole">
                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <img src="images/couples/18.jpg" alt="" loading="lazy" />
                                                </div>
                                                <div className="txt">
                                                    <span className="blog-cate">bridal</span>
                                                    <h2>Wedding bridal hairstyle</h2>
                                                    <div className="blog-info">
                                                        <div className="blog-pro-info">
                                                            <img src="images/user/2.jpg" alt="" loading="lazy" />
                                                            <h5>
                                                                Julia saas<span>Author</span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="outerBoxCarosole">
                                            <div className="blog-home-box">
                                                <div className="im">
                                                    <img src="images/couples/5.jpg" alt="" loading="lazy" />
                                                </div>
                                                <div className="txt">
                                                    <span className="blog-cate">bridal</span>
                                                    <h2>Pre wedding photoshoot</h2>
                                                    <div className="blog-info">
                                                        <div className="blog-pro-info">
                                                            <img src="images/user/3.jpg" alt="" loading="lazy" />
                                                            <h5>
                                                                Julia saas<span>Author</span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <a href="blog-detail.html" className="fclick" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}

        </>

    )
}

export default BlogDetail