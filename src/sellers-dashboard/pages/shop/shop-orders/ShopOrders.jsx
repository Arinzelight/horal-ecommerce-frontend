import { useState } from "react";
import OrderList from "./OrderList";
import EmptyState from "../../../components/EmptyProduct";
import SearchHeader from "../../../components/Search";
import SectionHeader from "../../../components/SectionHeader";
import OrderFilters from "./OrderFilters";
import useSeller from "../../../../hooks/useSeller";
import formatDate from "../../../../utils/formatDate";
export default function OrdersPage({isSeller}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    quarter: "all",
    year: "all",
    category: "all",

  });
  const { orders, loadingOrders } = useSeller();
  const [sortBy, setSortBy] = useState("recent");
  
  //only orders with status 'paid' should be shown to sellers
  const paidOrders = orders?.filter(order => order?.order_status === 'paid');

  // Check if there are any orders at all
  const hasOrders = paidOrders?.length > 0;

  // Filter orders based on search and filters
  const filteredOrders = paidOrders?.filter((order) => {
    // Search filter
    if (
      searchQuery &&
      !order.order_id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Status filter
    if (
      filters.status !== "all" &&
      order.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }

    // Year filter (assuming date format is "DD Month, YYYY")
    if (filters.year !== "all") {
      const orderYear = order.order_date.split(", ")[1];
      if (orderYear !== filters.year) {
        return false;
      }
    }

    
    if (filters.quarter !== "all") {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const orderMonth = formatDate(order.order_date).split(" ")[0].replace(",", "");
      const orderMonthIndex = monthNames.findIndex((m) => m === orderMonth) + 1;

      if (
        filters.quarter === "q1" &&
        !(orderMonthIndex >= 1 && orderMonthIndex <= 3)
      ) {
        return false;
      }
      if (
        filters.quarter === "q2" &&
        !(orderMonthIndex >= 4 && orderMonthIndex <= 6)
      ) {
        return false;
      }
      if (
        filters.quarter === "q3" &&
        !(orderMonthIndex >= 7 && orderMonthIndex <= 9)
      ) {
        return false;
      }
      if (
        filters.quarter === "q4" &&
        !(orderMonthIndex >= 10 && orderMonthIndex <= 12)
      ) {
        return false;
      }
    }

    
    if (filters.category !== "all" && order.category !== filters.category) {
      return false;
    }

    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "recent") {
      return (a, b) => new Date(b.order_date) - new Date(a.order_date);
    } else if (sortBy === "oldest") {
      return (a, b) => new Date(a.order_date) - new Date(b.order_date);
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    }
    return 0;
  });

  // Check if we have search or filter applied
  const hasSearchOrFilter =
    searchQuery ||
    filters.status !== "all" ||
    filters.quarter !== "all" ||
    filters.year !== "all" ||
    filters.category !== "all";

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterId, value) => {
    if (filterId === "category") {
      setFilters({ ...filters, category: value });
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };



  // Render content based on conditions
  const renderContent = () => {
    // If there are no orders at all, show empty state
    if (!hasOrders) {
      return (
        <EmptyState
          animationSrc="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
          message="You don't have any orders yet"
        />
      );
    }

    // If there are orders but no search results, show a message
    if (filteredOrders.length === 0 && hasSearchOrFilter) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg mb-4">
            No orders match your search criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilters({
                status: "all",
                quarter: "all",
                year: "all",
                category: "all",
              });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      );
    }

    // Otherwise show the order list
    return <OrderList orders={sortedOrders} selectedStatus={filters.status} isSeller={isSeller} />;
  };

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
      <SectionHeader title="Orders" />

      <SearchHeader
        searchPlaceholder="Search Order ID"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

{isSeller && hasOrders && (
  <OrderFilters
  filters={filters}
  onFiltersChange={handleFiltersChange}
  sortBy={sortBy}
  onSortChange={handleSortChange}
/>
)}
      
      {renderContent()}
    </div>
  );
}



