import { FaUpload } from "react-icons/fa";
import { BiCloudUpload } from "react-icons/bi";
import KYCStepper from "../upload-id/KYCStepper";

export default function UploadID() {
  return (
    <div className="w-full py-10 flex items-center justify-center">
      <div className="w-[970px] flex flex-col items-center gap-10">
        <KYCStepper activeStep={1} />

        <div className="w-full flex flex-col gap-12">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-bold text-black">
              Upload Government-Issued ID
            </h2>
            <p className="text-xl text-zinc-800">
              Upload your government-issued ID for verification to build trust
              with customers
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-start">
              <div className="text-xl font-bold text-black">
                Issuing Country
              </div>
              <div className="w-[736px] px-6 py-3 bg-neutral-50 border border-neutral-200 flex items-center gap-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-6 h-6">
                    <div className="absolute top-[3.75px] left-[8.25px] w-2 h-4 bg-gray-200" />
                    <div className="absolute top-[3.75px] left-0 w-6 h-4 bg-green-700" />
                  </div>
                  <div className="text-xl font-bold text-zinc-800">Nigeria</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex justify-between items-start">
                <div className="text-xl font-bold text-black">
                  Upload Document
                </div>
                <div className="w-[736px] flex flex-col gap-4">
                  <div className="px-6 py-3 bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                    <div className="text-xl font-bold text-zinc-800">
                      NIN (National Identity Number)
                    </div>
                    <input type="radio" className="w-6 h-6  " />
                  </div>

                  <div className=" flex flex-col gap-4 justify-center items-center h-80 w-full border border-stone-300 rounded">
                    <div className="flex flex-col gap-4">
                      <div className="text-base font-bold text-zinc-500">
                        Upload File
                      </div>

                      <div className="  w-[689px] flex items-center justify-center h-44 border-2 border-dashed border-zinc-500 rounded">
                        <div className=" flex flex-col items-center gap-6 w-60">
                          <BiCloudUpload className="text-5xl text-zinc-500" />
                          <div className="text-sm text-neutral-600 text-center">
                            <p>Drag and Drop here (jpg, png, pdf)</p>
                            <p>Or</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      {/* Hidden file input */}
                      <input
                        type="file"
                        id="upload"
                        className="hidden"
                        onChange={(e) => console.log(e.target.files)}
                      />

                      {/* Styled label that acts as a button */}
                      <label
                        htmlFor="upload"
                        className=" w-[689px] h-14 bg-primary rounded-lg flex justify-center items-center gap-3.5 cursor-pointer"
                      >
                        <span className="text-white text-xl font-bold">
                          Browse
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="px-6 py-3 bg-neutral-50 border border-neutral-200 flex justify-between items-center">
                    <div>
                      <p className="text-xl font-bold text-zinc-800">
                        CAC (National Identity Number)
                      </p>
                      <p className="text-lg text-zinc-800">optional</p>
                    </div>
                    <input type="radio" className="w-6 h-6  border-2 " />
                  </div>
                </div>
              </div>

              <div className="px-28 py-4 bg-secondary rounded-lg flex justify-center items-center gap-3.5">
                <span className="text-white text-xl font-bold">Next Step</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
