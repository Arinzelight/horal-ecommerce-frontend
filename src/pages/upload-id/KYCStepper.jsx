const steps = [
  { label: "Upload a valid ID" },
  { label: "Upload proof of address" },
  { label: "Social Media Links" },
];

const KYCStepper = ({ activeStep }) => {
  return (
    <div className="relative w-full max-w-[900px] mx-auto py-4">
      {/* Container for the progress line and circles */}
      <div className="relative w-full h-9">
        {/* Full neutral line */}
        <div className="absolute left-0 top-2 w-full h-1.5 bg-neutral-200 rounded-full"></div>

        {/* Filled progress */}
        <div
          className="absolute top-2 h-1.5 bg-sky-500 rounded-full"
          style={{
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Circles */}
        {steps.map((_, index) => (
          <div
            key={index}
            className="absolute top-0 w-5 h-5"
            style={{
              left: `calc(${(index / (steps.length - 1)) * 100}% - 10px)`,
            }}
          >
            {activeStep > index ? (
              // Completed circle with checkmark (✓)
              <div className="w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center">
                <div className="text-white text-xs font-bold">✓</div>
              </div>
            ) : (
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  activeStep === index ? "border-sky-500" : "border-neutral-200"
                } bg-white`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between absolute top-[-18px] left-0 right-0 text-[10px] sm:text-sm font-normal ">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`text-center ${
              activeStep >= index ? "text-sky-500" : "text-neutral-300"
            }`}
            style={{
              left: `calc(${(index / (steps.length - 1)) * 100}% - 50px)`,
            }}
          >
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KYCStepper;
