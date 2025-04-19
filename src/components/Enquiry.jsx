import React from 'react'

const Enquiry = () => {
    return (
        <>
        {/* REGISTER */}
        <section>
          <div className="login">
            <div className="container">
              <div className="row">
                <div className="inn">
                  <div className="lhs">
                    <div className="tit">
                      <h2>
                        Now{" "}
                        <b>
                          Find <br /> your life partner
                        </b>{" "}
                        Easy and fast.
                      </h2>
                    </div>
                    <div className="im">
                      <img src="images/login-couple.png" alt="" />
                    </div>
                    <div className="log-bg">&nbsp;</div>
                  </div>
                  <div className="rhs">
                    <div>
                      <div className="form-tit">
                        <h4>Send and enquiry</h4>
                        <h1>Ask your doubts</h1>
                        <p>
                          Already a member? <a href="login.html">Login</a>
                        </p>
                      </div>
                      <div className="form-login">
                        <form
                          className="cform fvali"
                          method="post"
                          action="mail/mail-contact.php"
                        >
                          <div
                            className="alert alert-success cmessage"
                            style={{ display: "none" }}
                            role="alert"
                          >
                            Your message was sent successfully.
                          </div>
                          <div className="form-group">
                            <label className="lb">Name:</label>
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Enter your full name"
                              name="name"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <label className="lb">Email:</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter email"
                              name="email"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <label className="lb">Phone:</label>
                            <input
                              type="number"
                              className="form-control"
                              id="phone"
                              placeholder="Enter phone number"
                              name="phone"
                              required=""
                            />
                          </div>
                          <div className="form-group">
                            <label className="lb">Message:</label>
                            <textarea
                              name="message"
                              className="form-control"
                              id="message"
                              placeholder="Enter message"
                              required=""
                              defaultValue={""}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary">
                            Send Enquiry
                          </button>
                        </form>
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

export default Enquiry