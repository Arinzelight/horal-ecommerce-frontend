import { useState } from "react";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { MdOutlineEdit } from "react-icons/md";

const ProductList = ({ products, onDelete, onToggleStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Sorting logic
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Selection logic
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(currentItems.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <div>
      <div className="overflow-y-auto mt-8">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-neutral-200 text-gray-600 text-sm leading-normal">
              <th className="py-3 px-4 text-left w-12">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedProducts.length === currentItems.length &&
                    currentItems.length > 0
                  }
                />
              </th>
              <th className="py-3 px-4 text-left w-24">Images</th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortField === "name" && (
                    <FaSort
                      className={`ml-1 text-xs ${
                        sortDirection === "asc" ? "transform rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Price
                  {sortField === "price" && (
                    <FaSort
                      className={`ml-1 text-xs ${
                        sortDirection === "asc" ? "transform rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortField === "status" && (
                    <FaSort
                      className={`ml-1 text-xs ${
                        sortDirection === "asc" ? "transform rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm ">
            {currentItems.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-200 hover:bg-gray-50 "
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
                <td className="py-3 px-4">
                  <img
                    src={product.image || "/placeholder.svg?height=40&width=40"}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                </td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">
                  {typeof product.price === "number"
                    ? product.price.toLocaleString()
                    : product.price}
                </td>
                <td className="py-3 px-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.status}
                      onChange={() => onToggleStatus(product.id)}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        product.status ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 ${
                          product.status ? "translate-x-5" : ""
                        } bg-white rounded-full h-5 w-5`}
                      />
                    </div>
                  </label>
                </td>
                <td className="py-3 px-4 flex mt-2">
                  <button className=" text-neutral-700 mr-3 h-[15px] w-[15px">
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="text-neutral-700 h-[15px] w-[15px]"
                    onClick={() => onDelete(product.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-2 flex justify-between items-center">
        <div>
          <span className="text-neutral-600 text-xs">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, products.length)}({products.length})
          </span>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
