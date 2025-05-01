"use client";
import { FaChevronRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import useMobile from "../../hooks/use-mobile";


export default function HotProductSection() {
  const isMobile = useMobile();

  // Sample product data
  const products = [
    {
      id: 1,
      name: "iPhone XS ProMax | Phantom Black",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1603791239531-1dda55e194a6?auto=format&fit=crop&w=800&q=80",
      category: "Gadgets",
      condition: "Brand New",
      location: "Lagos",
      localGvt: "Ikorodu",
      rating: 4.5,
      isHot: true,
      isVerified: true,
    },
    {
      id: 2,
      name: "Nike Super Fast Sneaker | Phantom Black",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      category: "Fashion",
      condition: "Brand New",
      location: "Oyo ",
      localGvt: "Dugbe",
      rating: 4.4,
      isHot: true,
      isVerified: true,
    },
    {
      id: 3,
      name: "Lux Kids Wrist Watch | Phantom Black",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      category: "Gadgets",
      condition: "Brand New",
      location: "Oyo ",
      localGvt: "Bodija",
      rating: 4.3,
      isHot: true,
      isVerified: true,
    },
    {
      id: 4,
      name: "OGOO Hero Bus | White 7 Black",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
      category: "Vehicles",
      condition: "Brand New",
      location: "Sokoto ",
      localGvt: "Kaba",
      rating: 4.5,
      isHot: true,
      isVerified: true,
    },
    {
      id: 5,
      name: "New Sky Blue Baby Winter Shoes",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1594150878496-a921e5af8907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFieSUyMHdpbnRlciUyMHNob2V8ZW58MHx8MHx8fDA%3D",
      category: "Babies",
      condition: "Brand New",
      location: "Lagos ",
      localGvt: "Surulere",
      rating: 4.2,
      isHot: true,
      isVerified: true,
    },
    {
      id: 6,
      name: "Circo Deep Freezer | Green Lever",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=800&q=80",
      category: "Electronics",
      condition: "Brand New",
      location: "Rivers ",
      localGvt: "Rumora",
      rating: 4.6,
      isHot: true,
      isVerified: true,
    },
    {
      id: 7,
      name: "New Polo Shirt | Phantom Black",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      category: "Fashion",
      condition: "Brand New",
      location: "Lagos ",
      localGvt: "Ago",
      rating: 4.1,
      isHot: true,
      isVerified: true,
    },
    {
      id: 8,
      name: "Slider Nike Sneaker | Phantom White",
      price: 50000.0,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      category: "Fashion",
      condition: "Brand New",
      location: "Abuja",
      localGvt: "Kuje",
      rating: 4.7,
      isHot: true,
      isVerified: true,
    },
  ];

  return (
    <div className="pb-4 pt-4  ">
      {/* Section Header */}
      <div className="flex items-center justify-between h-[45px] mb-2 bg-[#0C3555]  p-4">
        <h2 className="text-[18px]  font-bold text-white">
          Top Selling Products
        </h2>
        <button className="flex text-[14px] items-center text-white ">
          See all <FaChevronRight className="ml-1" />
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
