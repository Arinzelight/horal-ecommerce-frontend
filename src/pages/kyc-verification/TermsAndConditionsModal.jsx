import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const TermsAndConditionsModal = ({ onClose }) => {
  return (
    <div className="absolute  inset-0  z-10 flex items-center justify-center mx-2">
      <div className="sm:p-6 p-2 sm:h-[625px] h-full bg-white rounded-lg flex flex-col gap-2.5 max-w-3xl w-full">
        <div className=" flex flex-col gap-8 overflow-y-auto  pr-2">
          <div className="w-full flex justify-between items-center">
            <div className="text-black sm:text-3xl text-2xl font-bold font-nunito">
              Terms & Condition
            </div>
            <button
              onClick={onClose}
              className="mt-4  cursor-pointer py-2 bg-customBlue text-black rounded-lg hover:bg-customBlue-light"
            >
              <IoCloseSharp className="h-8 w-8" />
            </button>
          </div>
          <div className="text-black sm:text-xl text-lgfont-normal font-nunito">
            Lorem ipsum dolor sit amet consectetur. Hendrerit vitae amet turpis
            integer eu morbi. In placerat vivamus nisl convallis imperdiet. Enim
            varius amet eu mauris sed placerat bibendum varius. Maecenas id
            malesuada nulla gravida risus malesuada mi.
            <br />
            Vulputate vivamus eu vel quis nunc aliquam. Sed elit iaculis
            adipiscing elit. Non a id augue pharetra magna accumsan condimentum
            mus tempor. Pharetra mi ut in aliquet amet proin pellentesque amet.
            Pellentesque eros commodo fringilla eu diam placerat. In sed donec
            nam eget massa nullam. Iaculis vestibulum vitae tellus viverra id
            phasellus non leo metus.
            <br />
            Consequat velit maecenas eu malesuada pretium risus morbi cras. Nunc
            pellentesque amet duis id magna at etiam enim. Curabitur pulvinar
            sit adipiscing malesuada volutpat lorem viverra a. Lectus viverra
            quis tristique bibendum. Dictumst lobortis a risus ac congue aliquet
            sed faucibus semper. Sed eget integer blandit nec non posuere. Dolor
            et nisl facilisis pharetra. Mi eget quis rutrum cursus convallis id.
            Laoreet quis consequat enim cursus viverra. Sollicitudin nisi id
            tortor malesuada molestie tristique phasellus leo.
            <br />
            Eget lorem velit id augue. Dolor mi vel ultrices in eget eget.
            Integer eget pulvinar vitae quis parturient. Quam ultrices eget sed
            velit tempus. Nisi massa in sed eu. Congue quis lectus eu eu posuere
            arcu. Vitae augue neque faucibus nibh dui nunc mauris neque
            facilisis. Diam in adipiscing tincidunt eu.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
