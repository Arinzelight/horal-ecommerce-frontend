import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const InputField = ({ icon: Icon, placeholder, type = "text", name }) => (
  <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
    <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
      <Icon className="text-primary text-xl" />
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
    />
  </div>
);

const ProofOfAddress = () => {
  const [selectedOption, setSelectedOption] = useState("utility-bill");

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

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              icon={FaUser}
              placeholder="First Name"
              name="first_name"
            />
            <InputField
              icon={FaUser}
              placeholder="Last Name"
              name="last_name"
            />
            <InputField
              icon={FaPhoneAlt}
              placeholder="Phone Number"
              name="phone"
              type="tel"
            />
            <InputField
              icon={FaBirthdayCake}
              placeholder="Date of Birth"
              name="dob"
              type="date"
            />
            <InputField icon={FaVenusMars} placeholder="Gender" name="gender" />
            <InputField
              icon={FaBusinessTime}
              placeholder="Business Name"
              name="business_name"
            />
            <InputField
              icon={FaMapMarkerAlt}
              placeholder="Street Address"
              name="street_address"
            />
            <InputField
              icon={FaLocationArrow}
              placeholder="Landmark"
              name="landmark"
            />
            <InputField icon={FaCity} placeholder="LGA" name="lga" />
            <InputField icon={FaGlobeAfrica} placeholder="State" name="state" />
          </div>

          {/* Next Button */}
          <Link
            to="/social-links-upload"
            className="w-full px-4 sm:px-28 py-3.5 text-white text-base sm:text-xl font-bold bg-secondary hover:opacity-90 cursor-pointer rounded-lg flex justify-center items-center"
          >
            Next Step
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProofOfAddress;
