import React from "react";

const HealthBar = ({ health }) => {
  const barStyle = {
    width: `${health}%`,
    backgroundColor: health > 50 ? "green" : health > 20 ? "orange" : "red",
  };

  return (
    <div>
      <div className="health-bar" style={barStyle}></div>
      <p>Health: {health}</p>
    </div>
  );
};

export default HealthBar;
