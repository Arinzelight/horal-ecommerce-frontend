import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import KYCStepper from "../upload-id/KYCStepper";
import { useSellerKyc } from "../../../hooks/useSellerKyc";

const SocialLinksUpload = () => {
  const navigate = useNavigate();
  const { submitSocialsKyc, loading, error, success } = useSellerKyc();

  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    tiktok: "",
  });

  const handleChange = (e) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await submitSocialsKyc(socialLinks);

    if (result?.status === "success") {
      navigate("/upload-id");
    }
  };

  return (
    <div className="flex flex-col items-center py-20 w-full">
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <KYCStepper activeStep={1} />

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
                    <LuFacebook className="text-2xl text-primary" />
                  </div>
                  <input
                    type="url"
                    name="facebook"
                    value={socialLinks.facebook}
                    onChange={handleChange}
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
                    <FaInstagram className="text-2xl text-primary" />
                  </div>
                  <input
                    type="url"
                    name="instagram"
                    value={socialLinks.instagram}
                    onChange={handleChange}
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
                    <FaTiktok className="text-2xl text-primary" />
                  </div>
                  <input
                    type="url"
                    name="tiktok"
                    value={socialLinks.tiktok}
                    onChange={handleChange}
                    placeholder="Enter your TikTok profile URL"
                    className="flex-1 h-12 px-4 bg-neutral-50 outline outline-1 outline-neutral-200 text-sm sm:text-base text-zinc-500 font-nunito"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-14 px-6 bg-secondary hover:opacity-90 cursor-pointer rounded-lg flex justify-center items-center gap-3.5 text-white text-sm sm:text-xl font-semibold sm:font-bold font-nunito"
          >
            {loading ? "Submitting..." : "Next Step"}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-center">
              Submitted successfully!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLinksUpload;
