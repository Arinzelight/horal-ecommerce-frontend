import React from "react";
import { Link } from "react-router-dom";

const FormHeader = ({ logo }) => (
  <Link to="/" className="block mb-6">
    <img src={logo} alt="Horal Logo" className="h-10" />
  </Link>
);

export default FormHeader;
