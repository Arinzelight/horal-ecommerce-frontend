import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FiPhone } from "react-icons/fi";
import { useFormik } from "formik";
import HoralLogo from "../../assets/logos/horal-logo-black.png";
import SignupStepper from "./SignupStepper";
import PasswordChecklist from "./PasswordChecklist";
import { registerUser } from "../../redux/auth/registerUser";
import { useDispatch } from "react-redux";
import validationSchema from "./validationSchema";
import { PulseLoader } from "react-spinners";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

const SignupForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      agreed: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { full_name, email, phone_number, password } = values;
        const resultAction = await dispatch(
          registerUser({ full_name, email, phone_number, password })
        );

        if (registerUser.fulfilled.match(resultAction)) {
          navigate("/verify-email");
        } else {
          throw new Error(resultAction.payload || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        alert(error.message || "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full max-w-[597.5px] mx-auto rounded-lg md:pt-8 pt-0"
    >
      <Link to="/" className="block mb-6">
        <img src={HoralLogo} alt="Horal Logo" className="h-10" />
      </Link>

      <SignupStepper currentStep={currentStep} />

      <div className="my-10 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Welcome to Horal
        </h1>
        <p className="text-base text-zinc-700">
          Horal is a trusted e-commerce platform...
        </p>
      </div>

      {/* Full Name */}
      <div className="mb-5">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Full Name <span className="text-error">*</span>
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <FaRegEnvelope className="text-primary text-xl" />
          </div>
          <input
            type="text"
            name="full_name"
            placeholder="Stanley"
            value={formik.values.full_name}
            onChange={formik.handleChange}
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
        {formik.touched.full_name && formik.errors.full_name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.full_name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Email Address <span className="text-error">*</span>
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <FaRegEnvelope className="text-primary text-xl" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="e.g. adebisistanley@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Phone Number <span className="text-error">*</span>
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <FiPhone className="text-primary text-xl" />
          </div>
          <input
            type="tel"
            name="phone_number"
            placeholder="e.g. 07033417291"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
        {formik.touched.phone_number && formik.errors.phone_number && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.phone_number}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-5">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Password <IoInformationCircle className="text-gray-400 text-xl" />
        </label>
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <HiOutlineLockClosed className="text-primary text-xl" />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Password Checklist */}
      <PasswordChecklist
        rules={["minLength", "specialChar", "number", "capital"]}
        minLength={8}
        password={formik.values.password}
        onChange={() => {}}
        className="text-sm mb-6 text-gray-700"
        messages={{
          minLength: "At least 8 characters",
          specialChar: "At least one special character",
          number: "At least one number",
          capital: "At least one capital letter",
        }}
      />

      {/* Terms */}
      <label className="flex items-center gap-2 my-6 sm:text-sm text-[10px] text-neutral-900">
        <input
          type="checkbox"
          name="agreed"
          checked={formik.values.agreed}
          onChange={formik.handleChange}
        />
        I agree to Horal’s{" "}
        <Link to="/" className="text-primary">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link to="/" className="text-primary">
          Privacy Policy
        </Link>
      </label>
      {formik.touched.agreed && formik.errors.agreed && (
        <p className="text-red-500 text-sm my-4">{formik.errors.agreed}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full mb-6 h-14 bg-secondary rounded-lg text-white sm:text-xl text-lg font-semibold hover:opacity-85 transition flex items-center justify-center ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Registering" : "Continue to Register"}
        <span>{loading ? <PulseLoader color="white" size={8} /> : null}</span>
      </button>

      {/* Google Login Button */}
      <div className="mb-10">
        <GoogleAuthButton />
      </div>

      {/* Sign In Prompt */}
      <p className="text-center text-base text-neutral-800 font-normal">
        Already have an account?{" "}
        <Link to="/signin" className="text-primary hover:underline font-medium">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
