import React from 'react'
import { Link } from 'react-router-dom';
const Plans = () => {
    return (
        <>

            <section className='mt-4'>
                <div className="plans-ban mt-5">
                    <div className="container">
                        <div className="row">
                            <span className="pri">Pricing</span>
                            <h1>
                                Get Started <br /> Pick your Plan Now
                            </h1>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry.{" "}
                            </p>
                            <span className="nocre">No credit card required</span>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}
            {/* PRICING PLANS */}
            <section>
                <div className="plans-main">
                    <div className="container">
                        <div className="row">
                            <ul className='d-flex justify-content-center 5' >

                                <li>
                                    <div className="pri-box pri-box-pop">
                                        <span className="pop-pln">Most popular plan</span>
                                        <h2>Premium Plan</h2>
                                        <br />
                                        {/* <p>Printer took a type and scrambled </p> */}
                                        <Link to='/SignUp' className="btn-pink">
                                            {/* <a href="sign-up.html" className="cta"> */}
                                            Get Started
                                            {/* </a> */}
                                        </Link>
                                        <br />
                                        <br />
                                        <span className="pri-cou">
                                            <b>Rs.3000</b>/mo
                                        </span>
                                        <ol>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />Unlimited Premium Profiles view /Yr
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                Free user profile can view
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                View contact details
                                            </li>
                                            {/* <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                Send interest
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                Start Chat
                                            </li> */}
                                        </ol>
                                    </div>
                                </li>
                                {/* <li>
                                    <div className="pri-box">
                                        <h2>Platinum</h2>
                                        <p>Printer took a type and scrambled </p>
                                        <a href="sign-up.html" className="cta">
                                            Get Started
                                        </a>
                                        <span className="pri-cou">
                                            <b>$549</b>/mo
                                        </span>
                                        <ol>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" /> 50 Premium
                                                Profiles view /mo
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                Free user profile can view
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                View contact details
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                Send interest
                                            </li>
                                            <li>
                                                <i className="fa fa-check" aria-hidden="true" />
                                                Start Chat
                                            </li>
                                        </ol>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}

        </>

    )
}

export default Plans