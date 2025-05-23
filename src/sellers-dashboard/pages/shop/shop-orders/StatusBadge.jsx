
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
          return "bg-green-100 text-green-800"
        case "cancelled":
          return "bg-gray-100 text-gray-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>{status}</span>
  }
  