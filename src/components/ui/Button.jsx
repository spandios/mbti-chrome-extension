import React from "react";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      className={`${className} hover:scale-105 p-2 rounded-md font-semibold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
