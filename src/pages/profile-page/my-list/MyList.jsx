import React from "react";

import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaPinterestP } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";

const MyList = () => {
  const placeholderImg =
    "https://ui-avatars.com/api/?name=Image&background=cccccc&color=ffffff&size=400";
  return (
    <div className="flex items-center justify-center  ">
      <div className="relative overflow-x-auto border border-gray-200 rounded-lg p-3">
        <table className="table-auto  mt-6 w-[996px] h-[506px]">
          <thead>
            <tr className="row text-left border-b">
              <th scope="col" className="p-3 font-semibold text-sm">
                PRODUCT
              </th>
              <th scope="col" className="font-semibold text-sm">
                PRICE
              </th>
              <th scope="col" className="font-semibold text-sm">
                STOCK STATUS
              </th>
              <th scope="col" className="font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="font-medium text-base">
                <img
                  src={placeholderImg}
                  width="100px"
                  height="100px"
                  alt="chinese cabbage"
                  className="inline mr-3"
                ></img>
                Chinese Cabbage
              </td>
              <td className="font-semibold text-base">&#36;45.00</td>
              <td>
                {/* <Badge word="In Stock" color="green" /> */}
                Badge
              </td>
              <td>
                <button className="bg-primary text-white rounded-full px-8 py-3.5 font-semibold text-base mr-2">
                  Add to Cart
                </button>
                <button className="p-1.5 border border-gray-100  rounded-full">
                  <LiaTimesSolid className="w-3 h-3" />
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="font-medium text-base">
                <img
                  src={placeholderImg}
                  width="100px"
                  height="100px"
                  alt="chinese cabbage"
                  className="inline mr-3"
                ></img>
                Chinese Cabbage
              </td>
              <td className="font-semibold text-base">&#36;45.00</td>
              <td>Badge</td>
              <td>
                <button className="bg-primary text-white rounded-full px-8 py-3.5 font-semibold text-base mr-2">
                  Add to Cart
                </button>
                <button className="p-1.5  border border-gray-100  rounded-full">
                  <LiaTimesSolid className="w-3 h-3" />
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="font-medium text-base">
                <img
                  src={placeholderImg}
                  width="100px"
                  height="100px"
                  alt="chinese cabbage"
                  className="inline mr-3"
                ></img>
                Chinese Cabbage
              </td>
              <td className="font-semibold text-base">&#36;45.00</td>
              <td>Badge </td>
              <td>
                <button className="bg-emerald-50 text-primary rounded-full px-8 py-3.5 font-semibold text-base mr-2">
                  Add to Cart
                </button>
                <button className="p-1.5 border border-gray-100  rounded-full">
                  <LiaTimesSolid className="w-3 h-3" />
                </button>
              </td>
            </tr>
            <tr>
              <p className="p-3">
                <span className="font-medium text-sm">Share Item: </span>
                <span className="inline-flex items-baseline gap-3">
                  <span className="p-2 rounded-full bg-primary text-white flex items-baseline">
                    <button>
                      <BiLogoFacebook />
                    </button>
                  </span>
                  <button>
                    <BsTwitterX />
                  </button>
                  <button>
                    <FaPinterestP />
                  </button>
                  <button>
                    <IoLogoInstagram />
                  </button>
                </span>
              </p>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyList;
