import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";

const icons = {
  envelope: <FaRegEnvelope className="text-primary text-xl" />,
  phone: <FiPhone className="text-primary text-xl" />,
  lock: <HiOutlineLockClosed className="text-primary text-xl" />,
};

const InputField = ({ label, name, type, placeholder, icon, formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="mb-5">
      <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
        {label} <span className="text-error">*</span>
        <IoInformationCircle className="text-gray-400 text-xl" />
      </label>
      <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded relative">
        <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
          {icons[icon]}
        </div>
        <input
          type={isPassword && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={formik.values[name]}
          onChange={formik.handleChange}
          className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
