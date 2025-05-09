import React from 'react'

const UserProfile = () => {
    return (
        <>

            {/* LOGIN */}
            <section>
                <div className="db">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-lg-3">
                                <div className="db-nav">
                                    <div className="db-nav-pro">
                                        <img
                                            src="https://i.pinimg.com/736x/d5/59/bd/d559bd5ffda47d35f8d5ce8de8d6f325.jpg"
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
                                                <a href="user-profile.html" className="act">
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
                                                <a href="user-plan.html">
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
                                    <div className="col-md-12 col-lg-6 col-xl-8 db-sec-com">
                                        <h2 className="db-tit">Profiles status</h2>
                                        <div className="db-profile">
                                            <div className="img">
                                                <img src="https://i.pinimg.com/736x/d5/59/bd/d559bd5ffda47d35f8d5ce8de8d6f325.jpg" loading="lazy" alt="" />
                                            </div>
                                            <div className="edit">
                                                <a
                                                    href="user-profile-edit.html"
                                                    className="cta-dark"
                                                    target="_blank"
                                                >
                                                    Edit profile
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
                                        <h2 className="db-tit">Profiles status</h2>
                                        <div className="db-pro-stat">
                                            <h6>Profile completion</h6>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="fa fa-ellipsis-h" aria-hidden="true" />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Edid profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            View profile
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Profile visibility settings
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="db-pro-pgog">
                                                <span>
                                                    <b className="count">90</b>%
                                                </span>
                                            </div>
                                            <ul className="pro-stat-ic">
                                                <li>
                                                    <span>
                                                        <i className="fa fa-heart-o like" aria-hidden="true" />
                                                        <b>12</b>Likes
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i className="fa fa-eye view" aria-hidden="true" />
                                                        <b>12</b>Views
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i
                                                            className="fa fa-handshake-o inte"
                                                            aria-hidden="true"
                                                        />
                                                        <b>12</b>Interests
                                                    </span>
                                                </li>
                                                <li>
                                                    <span>
                                                        <i
                                                            className="fa fa-hand-pointer-o clic"
                                                            aria-hidden="true"
                                                        />
                                                        <b>12</b>Clicks
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 db-sec-com db-pro-stat-pg">
                                        <h2 className="db-tit">Profiles views</h2>
                                        <div className="db-pro-stat-view-filter cho-round-cor chosenini">
                                            <div>
                                                <select className="chosen-select">
                                                    <option value="">Current month</option>
                                                    <option value="">Jan 2024</option>
                                                    <option value="">Fan 2024</option>
                                                    <option value="">Mar 2024</option>
                                                    <option value="">Apr 2024</option>
                                                    <option value="">May 2024</option>
                                                    <option value="">Jun 2024</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="chartin">
                                            <canvas id="Chart_leads" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* END */}



        </>

    )
}

export default UserProfile