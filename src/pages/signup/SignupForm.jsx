import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import validationSchema from "./validationSchema";
import { registerUser } from "../../redux/auth/authThunks/registerUser";
import HoralLogo from "../../assets/logos/horal-logo-black.png";
import SignupStepper from "./SignupStepper";
import PasswordChecklist from "./PasswordChecklist";
import GoogleAuthButton from "../../components/auth/GoogleAuthButton";

import FormHeader from "./FormHeader";
import InputField from "./InputField";
import TermsCheckbox from "./TermsCheckbox";
import SubmitButton from "./SubmitButton";
import SigninPrompt from "./SigninPrompt";

const SignupForm = () => {
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
        const userData = { full_name, email, phone_number, password };
        await dispatch(registerUser({ userData, navigate }));
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
      <FormHeader logo={HoralLogo} />

      <SignupStepper currentStep={1} />

      <div className="my-10 text-center">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Welcome to Horal
        </h1>
        <p className="text-base text-zinc-700">
          Horal is a trusted e-commerce platform...
        </p>
      </div>

      <InputField
        label="Full Name"
        name="full_name"
        type="text"
        placeholder="Stanley"
        icon="envelope"
        formik={formik}
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        placeholder="e.g. adebisistanley@gmail.com"
        icon="envelope"
        formik={formik}
      />

      <InputField
        label="Phone Number"
        name="phone_number"
        type="tel"
        placeholder="e.g. 07033417291"
        icon="phone"
        formik={formik}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        icon="lock"
        formik={formik}
      />

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

      <TermsCheckbox formik={formik} />

      <SubmitButton loading={loading} />

      <div className="mb-10">
        <GoogleAuthButton />
      </div>

      <SigninPrompt />
    </form>
  );
};

export default SignupForm;
