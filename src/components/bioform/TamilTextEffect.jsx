import React from "react";

const TamilTextEffect = ({ text = "சென்னை நண்பர்கள் நல மன்றம்" }) => {
  const styles = {
    fontFamily: "'Latha', 'Bamini', 'Arial Unicode MS', sans-serif",
    fontSize: "30px",
    fontWeight: "bold",
    color: "red",
    textShadow: `
      -1px 3px 0 orange,
       1px -1px 0 orange,
      -1px  1px 0 orange,
       1px  1px 0 orange,
       2px  2px 2px orange
    `,
    padding: "20px",
    display: "inline-block",
  };

  return <div style={styles}>{text}</div>;
};

export default TamilTextEffect;
