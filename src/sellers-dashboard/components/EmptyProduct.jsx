// import {Player} from '@lottiefiles/react-lottie-player';

// const EmptyProductState = ({ onAddProduct }) => {
//   return (
//     <div className="flex flex-col items-center justify-center pb-16 -mt-14">
//       <Player
//         autoplay
//         loop
//         src="https://lottie.host/df8c03d6-3800-4c14-9771-a242f11924d5/HP70v5GcGs.json"
//         style={{ height: "300px", width: "300px" }}
//       ></Player>
//       <p className="text-neutral-700 mb-8">
//         You do not have any product on record
//       </p>
//       <button
//         onClick={onAddProduct}
//         className="w-[344px] md:w-[534px] h-[33px] bg-orange-500 hover:bg-secondary text-white py-1 px-6 rounded-md transition-colors"
//       >
//         Add Product
//       </button>
//     </div>
//   );
// };

// export default EmptyProductState;

import { Player } from "@lottiefiles/react-lottie-player"

export default function EmptyState({ animationSrc, message, actionButton }) {
  return (
    <div className="flex flex-col items-center justify-center pb-16 -mt-14">
      <Player autoplay loop src={animationSrc} style={{ height: "300px", width: "300px" }} />
      <p className="text-neutral-700 mb-8 text-center">{message}</p>
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="w-[344px] md:w-[534px] h-[33px] bg-orange-500 hover:bg-orange-600 text-white py-1 px-6 rounded-md transition-colors"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  )
}


