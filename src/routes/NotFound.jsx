import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen mt-[150px]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oopsie!</h1>
        <p className="text-xl font-semibold mt-2">Page Not Found</p>
        <div className="mt-3">
          <Link to="/" className="border-b-2">
            Visit Our Productpage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

// import { useNavigate } from "react-router-dom";

// const NotFound = () => {
//   const navigate = useNavigate();

//   const handleRefresh = () => {
//     navigate(-1); // Go back to previous page
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 text-center">
//         {/* 404 Illustration */}
//         <div className="relative">
//           <img
//             src="/placeholder.svg?height=300&width=400"
//             alt="404 Error Illustration"
//             className="mx-auto w-full max-w-sm"
//           />
//           {/* You can replace this with the actual 404 illustration */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="bg-blue-500 text-white px-8 py-4 rounded-lg text-6xl font-bold">
//               404
//             </div>
//           </div>
//         </div>

//         {/* Error Message */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold text-gray-900">Oops!</h1>
//           <p className="text-lg text-gray-600">
//             We can't seem to find the page you're looking for.
//           </p>
//           <p className="text-sm text-gray-500">Error code 404</p>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex sm:justify-center">
//           <button
//             onClick={handleRefresh}
//             className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={handleGoHome}
//             className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
//           >
//             Go Home
//           </button>
//         </div>

//         {/* Additional Help */}
//         <div className="pt-8">
//           <p className="text-sm text-gray-500">
//             If you think this is a mistake, please{" "}
//             <a
//               href="/contact"
//               className="text-blue-600 hover:text-blue-500 underline"
//             >
//               contact support
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default NotFound;
