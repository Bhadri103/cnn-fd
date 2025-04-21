import React from "react";
import { Select, Typography, Row, Col } from "antd";

const { Title } = Typography;
const { Option } = Select;

const tamilValues = [
  "சந்",
  "சூ",
  "பு",
  "செ",
  "சு",
  "கு",
  "சனி",
  "ரா",
  "கே",
  "மா",
  "வ",
  "ல"
];

const BOX_KEYS = {
  இராசி: "rasi",
  நவாம்சம்: "navamsam",
};

const initializeBox = () => {
  const obj = {};
  for (let i = 1; i <= 12; i++) {
    obj[i] = [];
  }
  return obj;
};

const JothidamBox = ({ setFormData, formData }) => {
  const handleChange = (boxKey, index, selected) => {
    setFormData((prev) => {
      const updatedBox = { ...prev[boxKey], [index]: selected };
      return {
        ...prev,
        [boxKey]: updatedBox,
      };
    });
  };

  return (
    <div className="container mt-4">
      {Object.entries(BOX_KEYS).map(([label, key]) => (
        <div
          key={key}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "30px",
            width: "210%",
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Title level={4} className="text-primary text-uppercase">
            {label}
          </Title>
          <Row gutter={[16, 16]}>
            {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
              const index = i.toString();
              return (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  key={`${key}-${index}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      {label} - {index}
                    </label>
                    <Select
                      mode="multiple"
                      allowClear
                      placeholder="Select Tamil Values"
                      style={{
                        marginLeft: 20,
                        minWidth: "100px",
                        maxWidth: "100%",
                      }}
                      value={formData?.[key]?.[index] || []}
                      onChange={(selected) =>
                        handleChange(key, index, selected)
                      }
                    >
                      {tamilValues.map((val) => (
                        <Option key={val} value={val}>
                          {val}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      ))}
    </div>
  );
};

export { initializeBox };
export default JothidamBox;