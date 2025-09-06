const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 text-white rounded-sm bg-secondary hover:opacity-85 cursor-pointer whitespace-nowrap text-sm w-full md:w-auto"
    >
      {children}
    </button>
  );
};

const SupportOptionCard = ({
  icon: Icon,
  title,
  mobileDescription,
  desktopDescription,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-[182px] md:h-[113px]">
      <div className="flex flex-col md:flex-row h-full justify-between gap-3">
        <div className="flex flex-1 gap-4 overflow-hidden">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="text-[16px] font-semibold text-primary mb-1 truncate">
              {title}
            </h3>
           
            <p className="text-gray-600 text-[14px]  leading-tight md:hidden">
              {mobileDescription}
            </p>
            
            <p className="text-gray-600 text-[14px] leading-tight hidden md:block">
              {desktopDescription}
            </p>
          </div>
        </div>

        <div className="w-full md:w-auto flex-shrink-0 flex items-end md:items-center">
          <Button onClick={onButtonClick}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
};

export default SupportOptionCard;
