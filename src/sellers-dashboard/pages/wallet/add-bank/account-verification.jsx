export const AccountVerificationStatus = ({
  isVerifying,
  isVerified,
  accountName,
}) => {
  if (!(isVerifying || isVerified)) return null;

  return (
    <div
      className={`p-3 rounded-lg ${
        isVerifying
          ? "bg-blue-50 text-blue-700"
          : isVerified
          ? "bg-green-50 text-green-700"
          : ""
      }`}
    >
      {isVerifying ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Verifying account details...</span>
        </div>
      ) : isVerified ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="text-sm font-medium">{accountName}</span>
        </div>
      ) : null}
    </div>
  );
};
