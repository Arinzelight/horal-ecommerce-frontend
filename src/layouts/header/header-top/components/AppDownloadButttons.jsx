import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function AppDownloadButtons() {
  return (
    <div className="flex space-x-2">
      <Link to="#">
        <button
          className="flex h-[28px] xs:h-[32.75px] w-[85px] xs:w-[102px] items-center cursor-pointer bg-black text-white px-1 xs:px-2 py-1 rounded text-[7px] xs:text-xs"
          aria-label="Download on Apple Store"
        >
          <FaApple className="mr-1 text-[10px] xs:text-xs" />
          <div>
            <div className="text-[6px] xs:text-[8px]">Get it on</div>
            <div className="font-semibold text-[8px] xs:text-[10px]">
              Apple Store
            </div>
          </div>
        </button>
      </Link>
      <Link to="#">
        <button
          className="flex h-[28px] xs:h-[32.75px] w-[85px] xs:w-[102px] items-center bg-primary text-white px-1 xs:px-2 py-1 rounded text-[7px] xs:text-xs"
          aria-label="Download on Google Play"
        >
          <FaGooglePlay className="mr-1 text-[10px] xs:text-xs" />
          <div>
            <div className="text-[6px] xs:text-[8px]">Get it on</div>
            <div className="font-semibold text-[8px] xs:text-[10px]">
              Google Play
            </div>
          </div>
        </button>
      </Link>
    </div>
  );
}
