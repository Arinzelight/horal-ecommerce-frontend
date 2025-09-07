export default function OrderFilters({
  filters,
  onFiltersChange,
  sortBy,
  onSortChange,
  showStatus = true,
  showQuarter = true,
  showYear = true,
  showSort = true,
}) {
  const handleStatusChange = (e) => {
    onFiltersChange({ status: e.target.value });
  };

  const handleQuarterChange = (e) => {
    onFiltersChange({ quarter: e.target.value });
  };

  const handleYearChange = (e) => {
    onFiltersChange({ year: e.target.value });
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  // Get current year
  const currentYear = new Date().getFullYear();

  // Generate years (current year and 4 years back)
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="flex flex-wrap gap-[8px] mb-6 text-neutral-600">
      {showStatus && (
        <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
          >
            <option value="all">Status: All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}

      {showQuarter && (
        <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
          <select
            value={filters.quarter}
            onChange={handleQuarterChange}
            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
          >
            <option value="all">Month: All</option>
            <option value="q1">Jan-Mar</option>
            <option value="q2">Apr-Jun</option>
            <option value="q3">Jul-Sep</option>
            <option value="q4">Oct-Dec</option>
          </select>
        </div>
      )}

      {showYear && (
        <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px]">
          <select
            value={filters.year}
            onChange={handleYearChange}
            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
          >
            <option value="all">Year: All</option>
            {years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      )}

      {showSort && (
        <div className="w-full sm:w-auto sm:min-w-[140px] sm:max-w-[160px] sm:ml-auto">
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="w-full border-[1px] border-neutral-200 rounded-[4px] p-2 text-sm bg-white"
          >
            <option value="recent">Sort by: Recent</option>
            <option value="oldest">Oldest</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>
      )}
    </div>
  );
}
