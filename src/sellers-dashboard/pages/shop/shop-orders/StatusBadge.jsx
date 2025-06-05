
export default function StatusBadge({ status }) {
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-red-100 text-red-800"
        case "processing":
          return "bg-yellow-100 text-yellow-800"
        case "in transit":
          return "bg-blue-100 text-blue-800"
        case "delivered":
          return "bg-[#00FF8029] text-[#22C55E";
        case "cancelled":
          return "bg-gray-100 text-gray-800"
        case "active":
          return "bg-[#00FF8029] text-[#22C55E";
        case "suspended":
          return "bg-[#FEE2E2] text-[#EF4444]";
        default:
          return "bg-[#00FF8029] text-[#22C55E]";
      }
    }
  
    return <span className={`px-3 py-1 rounded-[4px] text-xs font-medium ${getStatusColor(status)}`}>{status}</span>
  }
  