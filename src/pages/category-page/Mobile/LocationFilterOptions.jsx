import React from "react";
import { getLocations } from "../../../data/mockProducts";

const LocationFilterOptions = ({ activeFilters, onFilterChange }) => {
  const locations = getLocations();
  return (
    <div className="space-y-3">
      {locations.map((location) => (
        <div key={location.name} className="flex items-center">
          <input
            type="checkbox"
            id={`m-location-${location.name}`}
            checked={activeFilters.location.includes(location.name)}
            onChange={() => onFilterChange("location", location.name)}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label
            htmlFor={`m-location-${location.name}`}
            className="ml-2 text-sm text-gray-700"
          >
            {location.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default LocationFilterOptions;
