import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import useSeller from "../../../../../hooks/useSeller";

const SocialLinksSection = () => {
  const { profile } = useSeller();

  const socialLinks = [
    {
      name: "Facebook",
      url: profile?.kyc_data?.socials?.facebook || "#",
      icon: <FaFacebookF className="text-white" />,
      bgColor: "bg-blue-600",
    },
    {
      name: "Instagram",
      url: profile?.kyc_data?.socials?.instagram || "#",
      icon: <FaInstagram className="text-white" />,
      bgColor: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600",
    },
    {
      name: "Tiktok",
      url: profile?.kyc_data?.socials?.tiktok || "#",
      icon: <FaTiktok className="text-white" />,
      bgColor: "bg-black",
    },
  ];

  return (
    <div className="p-4 bg-white rounded w-full">
      <h3 className="text-neutral-900 text-base font-bold mb-2">
        Social Links
      </h3>

      {socialLinks.map((link, idx) => (
        <a href={link.url} key={idx} target="_blank">
          <div className="flex justify-between items-center p-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${link.bgColor}`}
              >
                {link.icon}
              </div>
              <span className="text-sm text-neutral-900 font-normal">
                {link.name}
              </span>
            </div>
            <CiShare1 className="text-primary" />
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinksSection;
            