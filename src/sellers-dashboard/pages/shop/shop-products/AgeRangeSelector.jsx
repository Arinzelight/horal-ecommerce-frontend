

const ageRanges = [
  "0-3 months",
  "3-6 months",
  "6-9 months",
  "9-12 months",
  "1-2 years",
  "2-3 years",
  "3-5 years",
  "5-7 years",
  "7-9 years",
  "9-12 years",
];

const AgeRangeSelector = ({ selectedAgeRange, onAgeRangeChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-2">Age Group</h3>
      <p className="text-sm text-gray-500 mb-3">Select age group</p>

      <select
        value={selectedAgeRange || ""}
        onChange={(e) => onAgeRangeChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Age group 
        </option>
        {ageRanges.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AgeRangeSelector;


