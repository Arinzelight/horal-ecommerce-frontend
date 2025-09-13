import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import { getCategoryIconElement } from "../../utils/categoryIconMapper";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const CategoryTopBar = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <section className="w-full sm:flex hidden  items-start gap-3 py-1.5 overflow-x-auto scrollbar-hide mb-[-10px]  ">
      {/* <div className="flex items-start gap-3  py-1.5 bg-amber-400"> */}
      {/* Default "All Products" */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-primary text-white rounded-full px-3 py-1.5 shrink-0 hover:opacity-85"
      >
        <div className="w-9 h-9 bg-white text-primary rounded-full flex items-center justify-center">
          <HiOutlineMenuAlt3 className="font-bold" />
        </div>
        <span className="whitespace-nowrap">All Products</span>
      </button>

      {/* Dynamically Rendered Categories */}
      {categories.map((category, index) => (
        <button
          key={category.id || index}
          onClick={() => handleCategoryClick(category)}
          className="flex items-center gap-2 bg-primary-light cursor-pointer  rounded-full px-3.5 py-1.5 shrink-0 hover:bg-primary-50"
        >
          <div className="w-9 h-9 bg-white text-primary rounded-full flex items-center justify-center">
            {getCategoryIconElement(category.name)}
          </div>
          <span className="whitespace-nowrap capitalize text-sm">
            {category.name}
          </span>
        </button>
      ))}
      {/* </div> */}
    </section>
  );
};

export default CategoryTopBar;
