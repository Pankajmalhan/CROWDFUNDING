import React from "react";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;
  const containerStyles = {
    height: "2rem",
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: "2rem",
    marginBottom: 20,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;