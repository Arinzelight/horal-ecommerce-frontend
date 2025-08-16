import { FaChevronDown } from "react-icons/fa";

export const BankDropdown = ({
  banks,
  selectedBankName,
  showDropdown,
  setShowDropdown,
  handleBankSelect,
  disabled,
  error,
}) => (
  <div className="relative">
    <button
      type="button"
      onClick={() => !disabled && setShowDropdown(!showDropdown)}
      disabled={disabled}
      className={`w-full p-3 bg-neutral-200 rounded-lg text-left flex items-center justify-between ${
        error ? "border border-red-500" : ""
      } ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:border-gray-400"
      }`}
    >
      <span
        className={
          selectedBankName !== "Select your bank"
            ? "text-gray-900"
            : "text-gray-500"
        }
      >
        {selectedBankName}
      </span>
      <FaChevronDown
        className={`h-4 w-4 text-gray-400 transition-transform ${
          showDropdown ? "rotate-180" : ""
        }`}
      />
    </button>

    {showDropdown && !disabled && (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
        {banks.map((bank) => (
          <button
            key={bank.slug}
            type="button"
            onClick={() => handleBankSelect(bank)}
            className="w-full p-3 text-left hover:bg-gray-50 transition-colors"
          >
            {bank.name}
          </button>
        ))}
      </div>
    )}

    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);
