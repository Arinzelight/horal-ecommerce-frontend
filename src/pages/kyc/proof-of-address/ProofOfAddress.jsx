import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KYCStepper from "../upload-id/KYCStepper";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAfrica,
  FaLocationArrow,
  FaBusinessTime,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";
import { useSellerKyc } from "../../../hooks/useSellerKyc";
import * as nigerianStates from "nigerian-states-and-lgas";

const allStatesAndLGAs = nigerianStates.all();

const InputField = ({
  icon: Icon,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
}) => (
  <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
    <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
      <Icon className="text-primary text-xl" />
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
      required
    />
  </div>
);

const SelectField = ({
  icon: Icon,
  placeholder,
  name,
  value,
  onChange,
  options,
  disabled = false,
}) => (
  <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
    <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
      <Icon className="text-primary text-xl" />
    </div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="flex-1 h-14 px-4 bg-transparent focus:outline-none disabled:opacity-50"
      required
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const ProofOfAddress = () => {
  const navigate = useNavigate();
  const { submitAddressKyc, loading, error, success } = useSellerKyc();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    gender: "",
    mobile: "",
    street: "",
    landmark: "",
    lga: "",
    state: "",
    business_name: "",
  });

  // Get available states
  const stateOptions = allStatesAndLGAs.map((state) => ({
    value: state.state,
    label: state.state,
  }));

  // Get LGAs for selected state
  const getLGAOptions = (selectedState) => {
    if (!selectedState) return [];
    const stateData = allStatesAndLGAs.find(
      (state) => state.state === selectedState
    );
    return stateData
      ? stateData.lgas.map((lga) => ({
          value: lga,
          label: lga,
        }))
      : [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If state changes, reset LGA
    if (name === "state") {
      setFormData({
        ...formData,
        [name]: value,
        lga: "", 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    const result = await submitAddressKyc(formData);

    if (result?.status === "success") {
      navigate("/social-links-upload");
    }
  };

  const lgaOptions = getLGAOptions(formData.state);

  return (
    <div className="w-full py-10 flex items-center pb-15 justify-center px-4">
      <div className="w-full flex flex-col items-center gap-5">
        <KYCStepper activeStep={0} />

        <div className="w-full flex flex-col gap-12">
          <div className="flex flex-col gap-1 text-start sm:text-left">
            <h2 className="text-xl sm:text-3xl font-bold text-black">
              Address Information
            </h2>
            <p className="text-sm sm:text-xl text-zinc-800">
              Provide your accurate Address Information to build trust with
              customers
            </p>
          </div>

          <form onSubmit={handleNext} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                icon={FaUser}
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <InputField
                icon={FaUser}
                placeholder="Middle Name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
              />
              <InputField
                icon={FaUser}
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <InputField
                icon={FaPhoneAlt}
                placeholder="Phone Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
              />
              <InputField
                icon={FaBirthdayCake}
                placeholder="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
              />

              {/* Gender Select */}
              <SelectField
                icon={FaVenusMars}
                placeholder="Select Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
              />

              <InputField
                icon={FaBusinessTime}
                placeholder="Business Name"
                name="business_name"
                value={formData.business_name}
                onChange={handleChange}
              />
              <InputField
                icon={FaMapMarkerAlt}
                placeholder="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
              <InputField
                icon={FaLocationArrow}
                placeholder="Landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />

              <SelectField
                icon={FaGlobeAfrica}
                placeholder="Select State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                options={stateOptions}
              />

              <SelectField
                icon={FaCity}
                placeholder="Select LGA"
                name="lga"
                value={formData.lga}
                onChange={handleChange}
                options={lgaOptions}
                disabled={!formData.state}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 sm:px-28 py-3.5 text-white text-base sm:text-xl font-bold bg-secondary hover:opacity-90 cursor-pointer rounded-lg flex justify-center items-center"
            >
              {loading ? "Submitting..." : "Next Step"}
            </button>

            {/* Feedback */}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && (
              <p className="text-green-600 text-center">
                Submitted successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProofOfAddress;
