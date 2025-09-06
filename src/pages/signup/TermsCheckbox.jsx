import React from "react";
import { Link } from "react-router-dom";

const TermsCheckbox = ({ formik }) => (
  <>
    <label className="flex items-center gap-2 my-6 sm:text-sm text-[10px] text-neutral-900">
      <input
        type="checkbox"
        name="agreed"
        checked={formik.values.agreed}
        onChange={formik.handleChange}
      />
      I agree to Horal’s{" "}
      <Link to="/terms-and-conditions" className="text-primary">
        Terms & Conditions
      </Link>{" "}
      and{" "}
      <Link to="/privacy-policy" className="text-primary">
        Privacy Policy
      </Link>
    </label>
    {formik.touched.agreed && formik.errors.agreed && (
      <p className="text-red-500 text-sm my-4">{formik.errors.agreed}</p>
    )}
  </>
);

export default TermsCheckbox;
