import { useState } from 'react';
import AddTeamModal from './AddTeamModal';
import { toast } from '../../../../components/toast';

const TicketFilters = ({
    filters,
    onFiltersChange,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = (e) => {
        onFiltersChange({ status: e.target.value });
    };

    const handleTypeChange = (e) => {
        onFiltersChange({ type: e.target.value });
    };

    const handleDateChange = (e) => {
        onFiltersChange({ date: e.target.value });
    };

    const handleStateChange = (e) => {
        onFiltersChange({ state: e.target.value });
    };

    const handleAddTeamClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTeamMemberAdded = () => {
        toast.success("Team member added successfully");
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex flex-wrap gap-[8px]">
                    <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
                        <select
                            value={filters.status}
                            onChange={handleStatusChange}
                            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
                        >
                            <option value="all">Status: All</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
                        <select
                            value={filters.type}
                            onChange={handleTypeChange}
                            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
                        >
                            <option value="all">Type: All</option>
                            <option value="support">Support</option>
                            <option value="returns">Returns</option>
                        </select>
                    </div>

                    <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
                        <select
                            value={filters.state}
                            onChange={handleStateChange}
                            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
                        >
                            <option value="all">State: All</option>
                            <option value="assigned">Assigned</option>
                            <option value="unassign">Unassigned</option>
                        </select>
                    </div>

                    <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
                        <input
                            type="month"
                            value={filters.date}
                            onChange={handleDateChange}
                            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
                            placeholder="YYYY-MM"
                        />
                    </div>
                </div>

                <div className="sm:-mt-12 lg:-mt-4">
                    <button
                        onClick={handleAddTeamClick}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors whitespace-nowrap"
                    >
                        Add Team
                    </button>
                </div>
            </div>

            {/* Add Team Modal */}
            <AddTeamModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSuccess={handleTeamMemberAdded}
            />
        </>
    );
};

export default TicketFilters;