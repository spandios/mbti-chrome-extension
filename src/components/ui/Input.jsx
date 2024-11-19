import React from "react";

const Input = ({ onChange, value, ...props }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
      {...props}
    />
  );
};

export default Input;
