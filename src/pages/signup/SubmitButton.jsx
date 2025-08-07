import React from "react";
import { PulseLoader } from "react-spinners";

const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full mb-6 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition flex items-center justify-center ${
      loading ? "opacity-70 cursor-not-allowed" : ""
    }`}
  >
    {loading ? "Registering" : "Continue to Register"}
    <span>{loading && <PulseLoader color="white" size={8} />}</span>
  </button>
);

export default SubmitButton;
