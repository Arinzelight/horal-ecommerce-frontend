import React, { useState } from "react";
import InputField from "./common/InputField";
import SelectField from "./common/SelectField";
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
import * as nigerianStates from "nigerian-states-and-lgas";

const allStatesAndLGAs = nigerianStates.all();

const ProofOfAddressForm = ({ onSubmit, loading, error, success }) => {
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

  const [phoneError, setPhoneError] = useState("");

  const stateOptions = allStatesAndLGAs.map((state) => ({
    value: state.state,
    label: state.state,
  }));

  const getLGAOptions = (selectedState) => {
    if (!selectedState) return [];
    const stateData = allStatesAndLGAs.find(
      (state) => state.state === selectedState
    );
    return stateData
      ? stateData.lgas.map((lga) => ({ value: lga, label: lga }))
      : [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, [name]: digitsOnly });

      if (digitsOnly.length !== 11) {
        setPhoneError("Phone number must be exactly 11 digits");
      } else {
        setPhoneError("");
      }
    } else if (name === "state") {
      setFormData({
        ...formData,
        [name]: value,
        lga: "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 11) {
      setPhoneError("Phone number must be exactly 11 digits");
      return;
    }
    onSubmit(formData);
  };

  const lgaOptions = getLGAOptions(formData.state);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Names */}
        <InputField
          icon={FaUser}
          label="First Name"
          placeholder="Enter First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
        <InputField
          icon={FaUser}
          label="Middle Name"
          placeholder="Enter Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          required={false}
        />
        <InputField
          icon={FaUser}
          label="Last Name"
          placeholder="Enter Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <InputField
            icon={FaPhoneAlt}
            label="Phone Number"
            placeholder="Enter 11-digit Phone Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            type="tel"
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
        </div>

        {/* DOB & Gender */}
        <InputField
          icon={FaBirthdayCake}
          label="Date of Birth"
          placeholder="Select Date of Birth"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          type="date"
        />
        <SelectField
          icon={FaVenusMars}
          label="Gender"
          placeholder="Select Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />

        {/* Business */}
        <InputField
          icon={FaBusinessTime}
          label="Business Name"
          placeholder="Enter Business Name"
          name="business_name"
          value={formData.business_name}
          onChange={handleChange}
        />

        {/* Address */}
        <InputField
          icon={FaMapMarkerAlt}
          label="Street Address"
          placeholder="Enter Street Address"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        <InputField
          icon={FaLocationArrow}
          label="Landmark"
          placeholder="Enter Landmark"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
        />

        {/* State & LGA */}
        <SelectField
          icon={FaGlobeAfrica}
          label="State"
          placeholder="Select State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          options={stateOptions}
        />
        <SelectField
          icon={FaCity}
          label="LGA"
          placeholder="Select LGA"
          name="lga"
          value={formData.lga}
          onChange={handleChange}
          options={lgaOptions}
          disabled={!formData.state}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 sm:px-28 py-3.5 text-white text-base sm:text-xl font-bold bg-secondary hover:opacity-90 cursor-pointer rounded-lg flex justify-center items-center"
      >
        {loading ? "Submitting..." : "Next Step"}
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && (
        <p className="text-green-600 text-center">Submitted successfully!</p>
      )}
    </form>
  );
};

export default ProofOfAddressForm;
