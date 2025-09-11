import { useNavigate } from "react-router-dom";

export const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export default function StateDropdown({ onStateSelect }) {
  const navigate = useNavigate();

  const handleStateClick = (state) => {
    // Navigate to the state filter page
    // Convert state name to URL-friendly format (lowercase, replace spaces with hyphens)
    const stateParam = state.toLowerCase().replace(/\s+/g, "-");
    navigate(`/state/${stateParam}`);

    // Call the onStateSelect callback if provided (to close dropdown)
    if (onStateSelect) {
      onStateSelect(state);
    }
  };

  return (
    <div className="absolute z-50 mt-1 w-[133.7px] h-[172.39px] overflow-y-auto bg-white border-[1px] border-gray-100 rounded-[4px] shadow-lg">
      <ul className="py-1">
        {nigerianStates.map((state) => (
          <li
            key={state}
            onClick={() => handleStateClick(state)}
            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-150"
          >
            {state}
          </li>
        ))}
      </ul>
    </div>
  );
}
