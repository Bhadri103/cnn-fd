import React from 'react'

const UserProfileEdit = () => {
    return (
        <>
            <title>Wedding Matrimony</title>
            {/*== META TAGS ==*/}
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
            />
            <meta name="theme-color" content="#f6af04" />
            <meta name="description" content="" />
            <meta name="keyword" content="" />
            {/*== FAV ICON(BROWSER TAB ICON) ==*/}
            <link rel="shortcut icon" href="images/fav.ico" type="image/x-icon" />
            {/*== CSS FILES ==*/}
            <link rel="stylesheet" href="css/bootstrap.css" />
            <link rel="stylesheet" href="css/font-awesome.min.css" />
            <link rel="stylesheet" href="css/animate.min.css" />
            <link rel="stylesheet" href="css/style.css" />
            {/* HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries */}
            {/* WARNING: Respond.js doesn't work if you view the page via file:// */}
            {/*[if lt IE 9]>


<![endif]*/}
            {/* PRELOADER */}
            <div id="preloader">
                <div className="plod">
                    <span className="lod1">
                        <img src="images/loder/1.png" alt="" loading="lazy" />
                    </span>
                    <span className="lod2">
                        <img src="images/loder/2.png" alt="" loading="lazy" />
                    </span>
                    <span className="lod3">
                        <img src="images/loder/3.png" alt="" loading="lazy" />
                    </span>
                </div>
            </div>
            <div className="pop-bg" />
            {/* END PRELOADER */}
            {/* SEARCH */}
            <div className="pop-search">
                <span className="ser-clo">+</span>
                <div className="inn">
                    <form>
                        <input type="text" placeholder="Search here..." />
                    </form>
                    <div className="rel-sear">
                        <h4>Top searches:</h4>
                        <a href="all-profiles.html">Browse all profiles</a>
                        <a href="all-profiles.html">Mens profile</a>
                        <a href="all-profiles.html">Female profile</a>
                        <a href="all-profiles.html">New profiles</a>
                    </div>
                </div>
            </div>
            {/* END PRELOADER */}

            {/* END HEADER & MENU */}
            {/* HEADER & MENU */}

            {/* END HEADER & MENU */}
            {/* HEADER & MENU */}

            {/* END HEADER & MENU */}
            {/* HEADER & MENU */}

            {/* END HEADER & MENU */}
            {/* MOBILE MENU POPUP */}

            {/* END MOBILE MENU POPUP */}
            {/* MOBILE USER PROFILE MENU POPUP */}

            {/* END USER PROFILE MENU POPUP */}
            {/* LOGIN */}
            <section>
                <div className="db">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <div className="db-nav">
                                    <div className="db-nav-pro">
                                        <img
                                            src="images/profiles/12.jpg"
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div className="db-nav-list">
                                        <ul>
                                            <li>
                                                <a href="user-dashboard.html">
                                                    <i className="fa fa-tachometer" aria-hidden="true" />
                                                    Dashboard
                                                </a>
                                            </li>
                                            <li>
                                                <a href="user-profile.html">
                                                    <i className="fa fa-male" aria-hidden="true" />
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a href="user-interests.html">
                                                    <i className="fa fa-handshake-o" aria-hidden="true" />
                                                    Interests
                                                </a>
                                            </li>
                                            <li>
                                                <a href="user-chat.html">
                                                    <i className="fa fa-commenting-o" aria-hidden="true" />
                                                    Chat list
                                                </a>
                                            </li>
                                            <li>
                                                <a href="user-plan.html" className="act">
                                                    <i className="fa fa-money" aria-hidden="true" />
                                                    Plan
                                                </a>
                                            </li>
                                            <li>
                                                <a href="user-setting.html">
                                                    <i className="fa fa-cog" aria-hidden="true" />
                                                    Setting
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-sign-out" aria-hidden="true" />
                                                    Log out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-9">
                                <div className="row">
                                    <div className="col-md-4 db-sec-com">
                                        <h2 className="db-tit">Plan details</h2>
                                        <div className="db-pro-stat">
                                            <h6 className="tit-top-curv">Current plan</h6>
                                            <div className="db-plan-card">
                                                <img src="images/icon/plan.png" alt="" />
                                            </div>
                                            <div className="db-plan-detil">
                                                <ul>
                                                    <li>
                                                        Plan name: <strong>Standard</strong>
                                                    </li>
                                                    <li>
                                                        Validity: <strong>6 Months</strong>
                                                    </li>
                                                    <li>
                                                        Valid till <strong>24 June 2024</strong>
                                                    </li>
                                                    <li>
                                                        <a href="" className="cta-3">
                                                            Upgrade now
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8 db-sec-com">
                                        <h2 className="db-tit">All invoice</h2>
                                        <div className="db-invoice">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Plan type</th>
                                                        <th>Duration</th>
                                                        <th>Cost</th>
                                                        <th>Invoice</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Platinum</td>
                                                        <td>12 Months(May 2023 - June 2024)</td>
                                                        <td>$500</td>
                                                        <td>
                                                            <a href="#" className="cta-dark cta-sml" download="">
                                                                <span>Download</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Standard</td>
                                                        <td>6 Months(Aug 2021 - Jan 2022)</td>
                                                        <td>$250</td>
                                                        <td>
                                                            <a href="#" className="cta-dark cta-sml" download="">
                                                                <span>Download</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Standard</td>
                                                        <td>6 Months(Jan 2021 - July 2021)</td>
                                                        <td>$250</td>
                                                        <td>
                                                            <a href="#" className="cta-dark cta-sml" download="">
                                                                <span>Download</span>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 db-sec-com">
                                        <div className="alert alert-warning db-plan-canc">
                                            <p>
                                                <strong>Plan cancellation:</strong>{" "}
                                                <a
                                                    href="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#plancancel"
                                                >
                                                    Click here
                                                </a>{" "}
                                                to cancell the current plan.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-12 db-sec-com">
                                        <div className="alert alert-warning db-plan-canc db-plan-canc-app">
                                            <p>
                                                Your plan cancellation request has been successfully
                                                received by the admin. Once the admin approves your
                                                cancellation, the cost will be sent to you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}
            {/* FOOTER */}
            <section className="wed-hom-footer">
                <div className="container">
                    <div className="row foot-supp">
                        <h2>
                            <span>Free support:</span> +92 (8800) 68 - 8960
                            &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span>
                            info@example.com
                        </h2>
                    </div>
                    <div className="row wed-foot-link wed-foot-link-1">
                        <div className="col-md-4">
                            <h4>Get In Touch</h4>
                            <p>Address: 3812 Lena Lane City Jackson Mississippi</p>
                            <p>
                                Phone: <a href="tel:+917904462944">+92 (8800) 68 - 8960</a>
                            </p>
                            <p>
                                Email: <a href="mailto:info@example.com">info@example.com</a>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h4>HELP &amp; SUPPORT</h4>
                            <ul>
                                <li>
                                    <a href="about-us.html">About company</a>
                                </li>
                                <li>
                                    <a href="#!">Contact us</a>
                                </li>
                                <li>
                                    <a href="#!">Feedback</a>
                                </li>
                                <li>
                                    <a href="about-us.html#faq">FAQs</a>
                                </li>
                                <li>
                                    <a href="about-us.html#testimonials">Testimonials</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 fot-soc">
                            <h4>SOCIAL MEDIA</h4>
                            <ul>
                                <li>
                                    <a href="#!">
                                        <img src="images/social/1.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <img src="images/social/2.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <img src="images/social/3.png" alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <img src="images/social/5.png" alt="" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row foot-count">
                        <p>
                            Company name Site - Trusted by over thousands of Boys &amp; Girls for
                            successfull marriage.{" "}
                            <a href="sign-up.html" className="btn btn-primary btn-sm">
                                Join us today !
                            </a>
                        </p>
                    </div>
                </div>
            </section>
            {/* END */}
            {/* COPYRIGHTS */}
            <section>
                <div className="cr">
                    <div className="container">
                        <div className="row">
                            <p>
                                Copyright © <span id="cry">2017-2020</span>{" "}
                                <a href="#!" target="_blank">
                                    Company.com
                                </a>{" "}
                                All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}
            {/* INTEREST POPUP */}
            <div className="modal fade plncanl-pop" id="plancancel">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title seninter-tit">Plan cancellation</h4>
                            <button type="button" className="close" data-bs-dismiss="modal">
                                ×
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body seninter chosenini">
                            <div className="row">
                                <div className="col-md-6 lhs-poli">
                                    <h5>Cancellation policy</h5>
                                    <ul>
                                        <li>Your refund amount calculated day basis</li>
                                        <li>As per your plan, your perday cost:10$</li>
                                        <li>After 3 months only you can able to join</li>
                                        <li>Fair ipsum dummy content ipsum jenuane ai</li>
                                        <li>Rairt ipsum dummy content ipsum jenuane ai</li>
                                    </ul>
                                </div>
                                <div className="col-md-6 rhs-form">
                                    <div className="form-login">
                                        <form>
                                            <div className="form-group">
                                                <label className="lb">Reason for the cancellation: *</label>
                                                <select className="chosen-select">
                                                    <option value="">I joint my pare</option>
                                                    <option value="">Profile match not good</option>
                                                    <option value="">Support not good</option>
                                                    <option value="">My reason not in the list</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="lb">Message: *</label>
                                                <textarea
                                                    placeholder="Enter your message"
                                                    className="form-control"
                                                    id=""
                                                    cols={20}
                                                    rows={5}
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <table className="table table-bordered table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Plan type</th>
                                                <th>Duration</th>
                                                <th>Cost paid</th>
                                                <th>Perday cost</th>
                                                <th>Plan active days</th>
                                                <th>Remaining days</th>
                                                <th>Cancellation charges</th>
                                                <th>Cost saved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Platinum</td>
                                                <td>365 days(12 months)</td>
                                                <td>$1000</td>
                                                <td>$2.73</td>
                                                <td>190 days</td>
                                                <td>175 days</td>
                                                <td>$100</td>
                                                <td>$377.75</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* END INTEREST POPUP */}
            {/* Optional JavaScript */}
            {/* jQuery first, then Popper.js, then Bootstrap JS */}
        </>

    )
}

export default UserProfileEdit