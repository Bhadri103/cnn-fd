import React from "react";

const gridStyles = {
  wrapper: {
    position: "relative",
    width: "202px",
    height: "202px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 50px)",
    gridTemplateRows: "repeat(4, 50px)",
    gap: "1px",
    border: "2px solid red",
    backgroundColor: "white",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid red",
    fontSize: "7px",
    fontWeight: "bold",
    textAlign: "center",
    height: "50px",
    width: "50px",
    padding: "2px",
    overflow: "hidden",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1px",
    width: "100%",
  },
  centerText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "deeppink",
    fontSize: "16px",
    fontWeight: "bold",
    backgroundColor: "white",
    padding: "2px 8px",
    zIndex: 1,
  },
};

// Clockwise Rasi layout from top-left
const rasiGridMap = {
  0: 12,
  1: 1,
  2: 2,
  3: 3,
  7: 4,
  11: 5,
  15: 6,
  14: 7,
  13: 8,
  12: 9,
  8: 10,
  4: 11,
  5: null,
  6: null,
  9: null,
  10: null,
};

const ChartGrid = ({ centerText = "இராசி", userData = {} }) => {
  const getColor = (index) => {
    const centerIndices = [5, 6, 9, 10];
    return centerIndices.includes(index) ? "white" : "#fffecf";
  };

  return (
    <div style={gridStyles.wrapper}>
      <div style={gridStyles.centerText}>{centerText}</div>
      <div style={gridStyles.container}>
        {[...Array(16)].map((_, index) => {
          const rasiNo = rasiGridMap[index];
          const values = (rasiNo && userData?.rasi?.[rasiNo]) || [];

          return (
            <div
              key={index}
              style={{
                ...gridStyles.box,
                backgroundColor: getColor(index),
              }}
            >
              {rasiNo ? (
                <>
                  <div style={gridStyles.row}>
                    {values.slice(0, 3).map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                  </div>
                  <div style={gridStyles.row}>
                    {values.slice(3, 6).map((v, i) => (
                      <span key={i}>{v}</span>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartGrid;
