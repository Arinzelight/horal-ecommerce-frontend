import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";

import KYCStepper from "../upload-id/KYCStepper";
import { Link } from "react-router-dom";

const SocialLinksUpload = () => {
  return (
    <div className="flex flex-col items-center my-20 px-4 w-full">
      <div className="w-full max-w-[970px] flex flex-col justify-start items-start gap-5">
        <KYCStepper activeStep={2} />
        <div className="flex flex-col items-start gap-10 w-full">
          <div className="flex flex-col items-start gap-14 w-full">
            <div className="flex flex-col items-start gap-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-black font-nunito">
                Link Your Social Media
              </h2>
              <p className="text-base sm:text-lg text-zinc-800 font-nunito">
                Provide a link to any of your active social media profile.
              </p>
            </div>

            <div className="flex flex-col items-start gap-8 w-full">
              {/* Facebook */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-neutral-900 font-nunito">
                  Facebook
                </label>
                <div className="flex items-center w-full">
                  <div className="w-12 h-12 bg-neutral-50 outline outline-1 outline-neutral-200 flex justify-center items-center">
                    <LuFacebook className="text-2xl text-black" />
                  </div>
                  <input
                    type="url"
                    placeholder="Enter your Facebook profile URL"
                    className="flex-1 h-12 px-4 bg-neutral-50 outline outline-1 outline-neutral-200 text-sm sm:text-base text-zinc-500 font-nunito"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-neutral-900 font-nunito">
                  Instagram
                </label>
                <div className="flex items-center w-full">
                  <div className="w-12 h-12 bg-neutral-50 outline outline-1 outline-neutral-200 flex justify-center items-center">
                    <FaInstagram className="text-2xl text-black" />
                  </div>
                  <input
                    type="url"
                    placeholder="Enter your Instagram profile URL"
                    className="flex-1 h-12 px-4 bg-neutral-50 outline outline-1 outline-neutral-200 text-sm sm:text-base text-zinc-500 font-nunito"
                  />
                </div>
              </div>

              {/* TikTok */}
              <div className="flex flex-col items-start gap-2 w-full">
                <label className="flex items-center gap-1.5 text-base sm:text-lg font-bold text-neutral-900 font-nunito">
                  TikTok
                </label>
                <div className="flex items-center w-full">
                  <div className="w-12 h-12 bg-neutral-50 outline outline-1 outline-neutral-200 flex justify-center items-center">
                    <FaTiktok className="text-2xl text-black" />
                  </div>
                  <input
                    type="url"
                    placeholder="Enter your TikTok profile URL"
                    className="flex-1 h-12 px-4 bg-neutral-50 outline outline-1 outline-neutral-200 text-sm sm:text-base text-zinc-500 font-nunito"
                  />
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/successful-kyc"
            className="w-full h-14 px-6 bg-secondary hover:opacity-90 cursor-pointer rounded-lg flex justify-center items-center gap-3.5 text-white text-sm sm:text-xl font-semibold sm:font-bold font-nunito"
          >
            Finish Verification
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksUpload;
