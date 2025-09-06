import { useState, useEffect } from "react";
import useSupport from "../../../../hooks/useSupport";
import { FaTimes } from "react-icons/fa";

const AddTeamModal = ({ isOpen, onClose, onSuccess }) => {
  const { fetchStaffs, addTeamMember, loading, error, staffs } = useSupport();
  const [selectedStaffId, setSelectedStaffId] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isOpen && staffs.length === 0) {
      fetchStaffs();
    }
    if (isOpen) {
      setSelectedStaffId("");
      setFormError("");
    }
  }, [isOpen]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!selectedStaffId) {
      setFormError("Please select a staff member");
      return;
    }

    try {
      const result = await addTeamMember({
        team: selectedStaffId,
      });

      if (result) {
        onSuccess && onSuccess(result);
        onClose();
        setSelectedStaffId("");
      }
    } catch (err) {

      const errorData = err.response?.data;
      let errorMessage = "Failed to add team member";

      if (errorData?.team && Array.isArray(errorData.team)) {
        errorMessage = errorData.team[0]; 
      } else if (errorData?.message) {
        errorMessage = errorData.message;
      } else if (err.message) {
        errorMessage = err.message; 
      }
      setSelectedStaffId("");

      setFormError(errorMessage);
    }
  };

  const handleClose = () => {
    setSelectedStaffId("");
    setFormError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Team Member</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="staff-select"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Staff Member
            </label>
            <select
              id="staff-select"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              required
            >
              <option value="">Select a staff member...</option>
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.full_name} ({staff.email})
                </option>
              ))}
            </select>
          </div>

          {/* Display errors */}
          {(formError || error) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formError || error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !selectedStaffId}
            >
              {loading ? "Adding..." : "Add Team Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamModal;
