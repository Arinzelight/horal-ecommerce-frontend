import React from "react";
import { nigerianStates } from "../../../layouts/header/StateDropdown";

const LocationFilterOptions = ({ activeFilters, onFilterChange }) => {
      const locations = nigerianStates;
  
  return (
    <div className="space-y-3">
      {locations?.map((location) => (
        <div key={location} className="flex items-center">
          <input
            type="checkbox"
            id={`location-${location}`}
            checked={activeFilters.location.includes(location)}
            onChange={() => onFilterChange("location", location)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label
            htmlFor={`location-${location}`}
            className="ml-2 text-sm text-gray-700"
          >
            {location}
          </label>
        </div>
      ))}
    </div>
  );
};

export default LocationFilterOptions;
