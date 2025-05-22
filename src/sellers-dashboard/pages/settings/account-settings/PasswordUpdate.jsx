import { FiLock } from "react-icons/fi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoInformationCircle } from "react-icons/io5";

const PasswordUpdate = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-neutral-900">
          Set a New Password
        </h2>
        <p className="text-base text-zinc-800">
          Create a strong password to keep your account secure.
        </p>
      </div>

      {/* Current Password */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Current Password
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>{" "}
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <HiOutlineLockClosed className="text-primary text-xl" />
          </div>
          <input
            type="password"
            placeholder="Enter current password"
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* New Password */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          New Password
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>{" "}
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <HiOutlineLockClosed className="text-primary text-xl" />
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Confirm New Password */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1 text-sm font-bold text-neutral-900 mb-2">
          Confirm New Password
          <IoInformationCircle className="text-gray-400 text-xl" />
        </label>
        <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
          <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
            <HiOutlineLockClosed className="text-primary text-xl" />
          </div>
          <input
            type="password"
            placeholder="Confirm new password"
            className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
          />
        </div>
        <p className="text-xs text-neutral-900">
          Password must have 8 characters, including a number, uppercase letter,
          and symbol.
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <button className="w-full max-w-md px-4 py-2 bg-secondary text-white text-sm font-bold rounded cursor-pointer hover:opacity-90 transition">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdate;
