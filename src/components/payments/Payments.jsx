import React from "react";
import paymentQR from "../images/payment/paymentQR.jpg";

const Payments = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <img
        src={paymentQR}
        style={{
          width: "400px",
          justifyItems: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default Payments;
