import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../../redux/wishlist/wishlistThunk";
import WishlistCard from "./WishlistCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.wishlist);
  console.log("Wishlist Data from list page:", data.id);

  const wishlistItems = data?.items || [];
  const itemCount = wishlistItems.length || 0;

  useEffect(() => {
    if (!wishlistItems || wishlistItems.length === 0) dispatch(fetchWishlist());
  }, [dispatch]);

  const EmptyCartMessage = () => (
    <div className="text-center py-16">
      <h2 className="text-xl text-gray-900 font-semibold mb-2">
        Save the items you love and shop later
      </h2>
      <div className="text-6xl mb-4">
        <FaRegHeart className="mx-auto text-primary w-[60px] h-[60px]" />
      </div>
      <h6 className="text-gray-900 mb-2 text-base font-medium">
        You haven't added any item yet.
      </h6>
      <p className="text-gray-600 mb-4">
        Tap the heart icon on any product to add it here
      </p>
      <Link
        to="/"
        className="bg-primary w-full md:w-90 text-white px-12 py-3 rounded-sm hover:opacity-85 transition inline-block"
      >
        Browse Products
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen lg:mx-auto">
      <div className="pt-8">
        <h1 className="text-xl font-bold mb-8 pb-2 border-b-[1.5px] border-gray-200">
          My Wishlist ({itemCount})
        </h1>

        {loading ? (
          <div className="flex justify-center">
            <p>Loading your wishlist...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button
              onClick={() => dispatch(fetchWishlist())}
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Retry
            </button>
          </div>
        ) : itemCount === 0 ? (
          <EmptyCartMessage />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {wishlistItems.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {/* Recommended Products Section */}
        {/* <div className="mt-12">
          <SimilarProducts
            products={wishlistItems.map((item) => item)}
            title={"You May Also Like"}
            link={"/wishlist"}
          />
        </div> */}
      </div>
    </main>
  );
};

export default Wishlist;
