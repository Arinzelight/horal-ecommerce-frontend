
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
  "FCT",
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

// Your dropdown component
export default function StateDropdown() {
  return (
    <div className="absolute z-50 mt-1 w-[133.7px] h-[172.39px] overflow-y-auto bg-white border-[1px] border-gray-100 rounded-[4px] shadow-lg">
      <ul className="py-1">
        {nigerianStates.map((state) => (
          <li
            key={state}
            className="px-3 py-1 hover:bg-gray-100 cursor-pointer text-sm"
          >
            {state}
          </li>
        ))}
      </ul>
    </div>
  );
}
