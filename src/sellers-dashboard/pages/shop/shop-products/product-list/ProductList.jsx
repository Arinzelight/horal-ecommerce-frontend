import { useState } from "react";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import Pagination from "../../../../../components/Pagination";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProductList = ({
  products,
  onDelete,
  onEdit,
  onToggleStatus,
  // deleting,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deletingProductId, setDeletingProductId] = useState(null);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleDelete = (productId) => {
    setDeletingProductId(productId);
    onDelete(productId);
  };

  const handleEdit = (product) => {
    //log the product
    console.log("Editing product:", product);
    onEdit(product.slug);
  };

  return (
    <div>
      <div className="overflow-x-auto ">
        <div className="min-w-[800px] ">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-neutral-200 text-sm leading-normal">
                <th className="py-3 px-4 text-left w-24">Images</th>
                <th className="py-3 px-4 text-left ">
                  <div className="flex items-center">Name</div>
                </th>
                <th className="py-3 px-4 text-left">
                  <div className="flex items-center">Category</div>
                </th>
               
                <th className="py-3 px-4 text-left">
                  <div className="flex items-center">Price</div>
                </th>
                {/* <th className="py-3 px-4 text-left ">
                  <div className="flex items-center">Status</div>
                </th> */}
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600 text-sm ">
              {currentItems.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50 "
                >
                  <td className="py-3 px-4">
                    <img
                      src={
                        product?.images?.[0]?.url || product.image ||
                        "/placeholder.svg?height=40&width=40"
                      }
                      alt={product?.title}
                      onClick={() => navigate(`/product/${product.slug}`)}
                      className="w-10 h-10 object-cover cursor-pointer"
                    />
                  </td>
                  <td
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="py-3 px-4  text-sm font-bold cursor-pointer"
                  >
                    {product?.title}
                  </td>
                  <td className="py-3 px-4  text-sm font-bold capitalize">
                    {product?.category}
                  </td>
                  
                  
                  <td className="py-3 px-4  text-sm font-bold">
                    ₦{" "}
                    {product?.price
                      ? Number(product?.price).toLocaleString("en-NG", {
                          maximumFractionDigits: 0,
                        })
                      : "0"}
                  </td>

                  {/* <td className="py-3 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={product?.is_published}
                        onChange={() => onToggleStatus(product?.id)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-11 h-6 rounded-full peer ${
                          product?.is_published
                            ? "bg-primary"
                            : "bg-neutral-300"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 left-0.5 ${
                            product?.is_published ? "translate-x-5" : ""
                          } bg-white rounded-full h-5 w-5`}
                        />
                      </div>
                    </label>
                  </td> */}
                  <td className="py-3 px-4 flex mt-2 gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 cursor-pointer h-[15px] w-[15px]"
                      onClick={() => handleEdit(product)}
                      title="Edit product"
                      aria-label="Edit product"
                    >
                      <MdOutlineEdit />
                      <span className="whitespace-nowrap">Edit</span>
                    </button>
                    {/* <button
                      className="text-red-600 hover:text-red-800 cursor-pointer h-[15px] w-[15px] disabled:opacity-50"
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting && deletingProductId === product.id}
                      title="Delete product"
                      aria-label="Delete product"
                    >
                      {deleting && deletingProductId === product.id ? (
                        <div className="w-3 h-3 border border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FaTrash />
                      )}
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="my-2 flex justify-between items-center">
        <div>
          <span className="text-neutral-600 text-xs md:text-sm">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, products?.length)}({products?.length})
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