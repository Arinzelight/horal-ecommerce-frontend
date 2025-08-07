import React from "react";
import { Link } from "react-router-dom";

const SigninPrompt = () => (
  <p className="text-center text-base text-neutral-800 font-normal">
    Already have an account?{" "}
    <Link to="/signin" className="text-primary hover:underline font-medium">
      Sign In
    </Link>
  </p>
);

export default SigninPrompt;
