import * as Yup from "yup";

const signupValidationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
    .required("Phone is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain a special character")
    .required("Password is required"),
  agreed: Yup.boolean().oneOf([true], "You must accept terms"),
});

export default signupValidationSchema;
