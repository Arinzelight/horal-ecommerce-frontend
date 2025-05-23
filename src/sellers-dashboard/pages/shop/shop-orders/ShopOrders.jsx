// import React from "react";

// const ShopOrders = () => {
//   return <div>ShopOrders</div>;
// };

// export default ShopOrders;

"use client";

import { useState } from "react";
import OrderList from "./OrderList";
import EmptyState from "../../../components/EmptyProduct";
import { mockOrders } from "../../../../data/mockOrder";
import SearchHeader from "../../../components/Search";
import SectionHeader from "../../../components/SectionHeader";
import OrderFilters from "./OrderFilters";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    quarter: "all",
    year: "all",
    category: "all",
  });
  const [sortBy, setSortBy] = useState("recent");

  // Check if there are any orders at all
  const hasOrders = mockOrders.length > 0;

  // Filter orders based on search and filters
  const filteredOrders = mockOrders.filter((order) => {
    // Search filter
    if (
      searchQuery &&
      !order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
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
      const orderYear = order.date.split(", ")[1];
      if (orderYear !== filters.year) {
        return false;
      }
    }

    // Quarter filter (assuming date format is "DD Month, YYYY")
    if (filters.quarter !== "all") {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const orderMonth = order.date.split(" ")[1].replace(",", "");
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

    // Category filter (assuming orders have a category property)
    if (filters.category !== "all" && order.category !== filters.category) {
      return false;
    }

    return true;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "recent") {
      return b.id - a.id;
    } else if (sortBy === "oldest") {
      return a.id - b.id;
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

  const filterOptions = [
    {
      title: "Category",
      options: [
        { id: "all", label: "All Categories" },
        { id: "fashion", label: "Fashion" },
        { id: "electronics", label: "Electronics" },
        { id: "home", label: "Home & Garden" },
        { id: "beauty", label: "Beauty" },
        { id: "sports", label: "Sports" },
        { id: "books", label: "Books" },
      ],
      defaultValue: "all",
    },
  ];

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
    return <OrderList orders={sortedOrders} selectedStatus={filters.status} />;
  };

  return (
    <div className="max-w-full overflow-x-auto min-h-screen w-full flex flex-col gap-3 justify-start sm:px-8 px-4 py-4 bg-neutral-50 rounded-lg shadow-sm overflow-hidden">
      <SectionHeader title="Orders" />

      <SearchHeader
        searchPlaceholder="Search Order ID"
        filterOptions={filterOptions}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      <OrderFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />

      {renderContent()}
    </div>
  );
}



