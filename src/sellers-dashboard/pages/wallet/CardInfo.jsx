export const CardInfo = ({ bankInfo }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            Card Information
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Bank</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">
                {bankInfo.accountName.charAt(0)}
              </span>
            </div>
            <span className="text-sm font-medium">{bankInfo.bankName}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Account Name</span>
          <span className="text-sm font-medium">{bankInfo.accountName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Account Number</span>
          <span className="text-sm font-medium">{bankInfo.accountNumber}</span>
        </div>
        <button className="w-full py-2 px-4 border border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors">
          Change Bank
        </button>
      </div>
    </div>
  );
};
