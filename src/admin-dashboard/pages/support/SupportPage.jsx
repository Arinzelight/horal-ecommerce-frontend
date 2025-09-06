import { useEffect, useState } from "react";
import EmptyState from "../../../sellers-dashboard/components/EmptyProduct";
import SearchHeader from "../../../sellers-dashboard/components/Search";
import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
import SupportList from "./components/SupportList";
import useSupport from "../../../hooks/useSupport";
import TicketFilters from "./components/TicketFilter";
import InitialLoader from "../../../components/InitialLoader";

const AdminSupportPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    date: "all",
    type: "all",
    state: "all",
  });

  const { tickets, loading, error, applyFilters, clearFilters } = useSupport();

  // Fetch tickets on mount and when filters change
  useEffect(() => {
    // Apply filters or fetch all tickets if all filters are "all"
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "all")
    );

    if (Object.keys(activeFilters).length === 0) {
      clearFilters();
    } else {
      applyFilters(activeFilters);
    }
  }, [filters, applyFilters, clearFilters]);

  // Check if there are any tickets at all
  const hasTickets = tickets?.length > 0;

  const filteredTickets = tickets?.filter((ticket) => {
    // Search filter - search in reference or subject
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const reference = ticket.ticket_data?.reference?.toLowerCase() || "";
      const subject = ticket.ticket_data?.subject?.toLowerCase() || "";
      const ticketId = ticket.id?.toString()?.toLowerCase() || "";

      if (
        !reference.includes(searchLower) &&
        !subject.includes(searchLower) &&
        !ticketId.includes(searchLower)
      ) {
        return false;
      }
    }

    return true;
  });

  // Check if we have search or filter applied
  const hasSearchOrFilter =
    searchQuery || Object.values(filters).some((value) => value !== "all");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

 
  // Reset all filters and search
  const resetAllFilters = () => {
    setSearchQuery("");
    setFilters({
      status: "all",
      date: "all",
      type: "all",
      state: "all",
    });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
        <SectionHeader title="Tickets Management" />
        <InitialLoader />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
        <SectionHeader title="Tickets Management" />
        <div className="text-center py-10">
          <p className="text-red-500 text-lg mb-4">
            Error loading tickets: {error}
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render content based on conditions
  const renderContent = () => {
    // If there are no tickets at all, show empty state
    if (!hasTickets) {
      return (
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="You don't have any tickets yet"
        />
      );
    }

    // If there are tickets but no search results, show a message
    if (filteredTickets?.length === 0 && hasSearchOrFilter) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">
            No tickets match your search criteria
          </p>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      );
    }

    // Otherwise show the ticket list
    return (
      <SupportList tickets={filteredTickets} selectedStatus={filters.status} />
    );
  };

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
      <SectionHeader title="Tickets Management" />

      <SearchHeader
        searchPlaceholder="Search Ticket ID or Reference"
        onSearch={handleSearch}
       
      />

      <TicketFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {renderContent()}
    </div>
  );
};

export default AdminSupportPage;
