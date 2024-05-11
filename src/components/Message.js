import React from "react";

export const Alert = ({ type = "success", message }) => {
  return (
    <Alert variant={type}>
        {message}
    </Alert> 
  );
};