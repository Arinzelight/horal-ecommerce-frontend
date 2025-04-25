import { BiCloudUpload } from "react-icons/bi";
import KYCStepper from "./KYCStepper";
import { useState } from "react";
import NigerianFlag from "../../assets/icons/nigerian-flag.svg";

export default function UploadID() {
  const [selectedOption, setSelectedOption] = useState("nin");

  return (
    <div className="w-full py-10 flex items-center mb-15 mt-5 justify-center px-4">
      <div className="w-full max-w-5xl flex flex-col items-center gap-5">
        <KYCStepper activeStep={0} />

        <div className="w-full flex flex-col gap-12">
          <div className="flex flex-col gap-1 text-start sm:text-left">
            <h2 className="text-xl sm:text-3xl font-bold text-black">
              Upload Government-Issued ID
            </h2>
            <p className="text-sm sm:text-xl text-zinc-800">
              Upload your government-issued ID for verification to build trust
              with customers
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {/* Country Section */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
              <div className="text-lg sm:text-xl font-bold text-black">
                Issuing Country
              </div>
              <div className="w-full sm:w-[736px] px-4 sm:px-6 py-3 bg-neutral-50 border border-neutral-200 flex items-center gap-5">
                <div className="flex items-center gap-4">
                  <div className="">
                    <img src={NigerianFlag} alt="NG" className="w-6 h-6" />
                  </div>
                  <div className="text-base sm:text-xl font-bold text-zinc-800">
                    Nigeria
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col gap-10">
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                <div className="text-lg sm:text-xl font-bold text-black">
                  Upload Document
                </div>

                <div className="w-full sm:w-[736px] flex flex-col gap-4">
                  {/* NIN Option */}
                  <div className="px-4 sm:px-6 py-3 bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                    <div className="text-base sm:text-xl font-bold text-zinc-800">
                      NIN (National Identity Number)
                    </div>
                    <input
                      type="radio"
                      name="docType"
                      value="nin"
                      className="w-5 h-5"
                      checked={selectedOption === "nin"}
                      onChange={() => setSelectedOption("nin")}
                    />{" "}
                  </div>

                  {/* Upload Box */}
                  <div className="flex flex-col gap-4 justify-center items-start min-h-[20rem] w-full border border-stone-300 rounded px-4">
                    <div className="text-base  font-bold text-zinc-500">
                      Upload File
                    </div>
                    <div className="w-full sm:w-[689px]   h-44 border-2 border-dashed border-zinc-500 rounded flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 text-center text-sm text-neutral-600">
                        <BiCloudUpload className="text-4xl text-zinc-500" />
                        <p>Drag and Drop here (jpg, png, pdf)</p>
                        <p>Or</p>
                      </div>
                    </div>

                    {/* Upload Button */}
                    <div className="relative w-full">
                      <input
                        type="file"
                        id="upload"
                        className="hidden"
                        onChange={(e) => console.log(e.target.files)}
                      />
                      <label
                        htmlFor="upload"
                        className="w-full h-12 bg-primary hover:opacity-90 rounded-lg flex justify-center items-center cursor-pointer text-white text-base sm:text-xl font-bold"
                      >
                        Browse
                      </label>
                    </div>
                  </div>

                  {/* CAC Option */}
                  <div className="px-4 sm:px-6 py-3 bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                    <div>
                      <p className="text-sm sm:text-xl font-bold text-zinc-800">
                        CAC (Corporate Affairs Commission)
                      </p>
                      <p className="text-sm sm:text-lg text-zinc-800">
                        optional
                      </p>
                    </div>
                    <input type="radio" className="w-5 h-5 border-2" />
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="w-full px-4 sm:px-28 py-3.5 bg-secondary hover:opacity-90 cursor-pointer rounded-lg flex justify-center items-center">
                <span className="text-white text-base sm:text-xl font-bold">
                  Next Step
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
