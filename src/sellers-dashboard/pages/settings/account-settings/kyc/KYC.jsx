import { FaFilePdf } from "react-icons/fa";
import SocialLinksSection from "./SocialLinksSection ";
import NigerianFlag from "../../../../../assets/icons/nigerian-flag.svg";

const files = [
  { name: "Filename.pdf", size: "200KB" },
  { name: "Filename.pdf", size: "2MB" },
  { name: "Filename.pdf", size: "1.5MB" },
];

const KYC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="p-4 bg-white rounded flex flex-col gap-6 overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-neutral-900">
              KYC Verification Status
            </h2>
            <div className="px-4 py-1 bg-green-600 text-white text-sm font-medium rounded">
              Verified
            </div>
          </div>
          <p className="text-sm text-neutral-500">
            Verify your identity to build trust, access seller features, and
            enjoy a more secure experience on Horal. Your verification status
            helps protect you and others on the platform.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-500 w-20">
            Country
          </span>
          <div className="flex items-center gap-2">
            {/* <div className="flex ">
              <div className="w-2 h-4 bg-green-600 " />
              <div className="w-2 h-4 bg-zinc-100" />
              <div className="w-2 h-4 bg-green-600" />
            </div> */}
            <div>
              <img src={NigerianFlag} alt="NG" className="w-6 h-6" />
            </div>
            <span className="text-sm text-black">Nigeria</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold text-neutral-500">
            File Uploads
          </span>
          <div className="flex gap-4 ">
            {files.map((file, index) => (
              <div
                key={index}
                className="p-2 bg-blue-50 rounded flex flex-col items-center w-24"
              >
                <FaFilePdf className="w-6 h-6 text-neutral-800 mb-1" />
                <div className="sm:text-xs text-[10px] text-neutral-800 text-center truncate">
                  {file.name}
                </div>
                <div className="text-[10px] font-bold text-neutral-400">
                  {file.size}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SocialLinksSection />
    </div>
  );
};

export default KYC;
