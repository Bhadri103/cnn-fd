import React from "react";
import { Typography, Card, Row, Col, Image } from "antd";
import PaymentProofImg from "../images/paymentproof.png";
const { Title, Paragraph } = Typography;

const Verify = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <Title level={3} style={{ textAlign: "center", marginBottom: "30px" }}>
        Profile Verification In Progress
      </Title>

      <Paragraph
        style={{ textAlign: "center", fontSize: "16px", marginBottom: "40px" }}
      >
        Your profile is currently under verification. Kindly contact customer
        support for any assistance. Once we verify your Aadhar ID, Community
        Certificate, and Payment, your profile will be activated and shown under
        the "CNN Members" section.
      </Paragraph>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card title="Aadhar ID" bordered style={{ textAlign: "center" }}>
            <Image
              src="https://cdn.zeebiz.com/hindi/sites/default/files/2024/02/10/169906-aadhaar.png?im=FitAndFill=(1200,900)"
              alt="Aadhar ID"
              width="100%"
              height={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              preview
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title="Payment Receipt"
            bordered
            style={{ textAlign: "center" }}
          >
            <Image
              src={PaymentProofImg}
              alt="Payment Receipt"
              width="100%"
              height={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              preview
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title="Community Certificate"
            bordered
            style={{ textAlign: "center" }}
          >
            <Image
              src="https://imgv2-1-f.scribdassets.com/img/document/319231794/original/55ce6f2a42/1?v=1"
              alt="Community Certificate"
              width="100%"
              height={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              preview
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Verify;
