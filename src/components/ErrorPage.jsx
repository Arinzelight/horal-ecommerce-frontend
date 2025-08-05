import { useState, useEffect } from "react";
import {
  MdRefresh,
  MdHome,
  MdShoppingBag,
  MdError,
  MdWifi,
  MdWifiOff,
} from "react-icons/md";

export default function EnhancedErrorPage({
  productsError = "Unable to load products",
  onRetry = () => window.location.reload(),
  onGoHome = () => (window.location.href = "/"),
  onViewCart = () => (window.location.href = "/cart"),
}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount((prev) => prev + 1);

    // Add a small delay for better UX
    setTimeout(() => {
      setIsRetrying(false);
      onRetry();
    }, 1000);
  };

  const getErrorMessage = () => {
    if (!isOnline) {
      return "It looks like you're offline. Please check your internet connection and try again.";
    }

    if (retryCount > 2) {
      return "We're experiencing some technical difficulties. Our team has been notified and is working on a fix.";
    }

    return "We're having trouble loading our products right now. This usually resolves quickly.";
  };

  const getErrorIcon = () => {
    if (!isOnline) {
      return <MdWifiOff className="w-16 h-16 text-orange-500 mx-auto mb-6" />;
    }
    return <MdError className="w-16 h-16 text-blue-500 mx-auto mb-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

          {getErrorIcon()}

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Oops! We hit a snag
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {getErrorMessage()}
          </p>

          {/* Connection Status */}
          <div className="flex items-center justify-center mb-6 text-sm">
            {isOnline ? (
              <div className="flex items-center text-green-600">
                <MdWifi className="w-4 h-4 mr-2" />
                Connected
              </div>
            ) : (
              <div className="flex items-center text-orange-600">
                <MdWifiOff className="w-4 h-4 mr-2" />
                Offline
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
            >
              {isRetrying ? (
                <>
                  <MdRefresh className="w-5 h-5 mr-2 animate-spin" />
                  Trying again...
                </>
              ) : (
                <>
                  <MdRefresh className="w-5 h-5 mr-2" />
                  Try Again
                </>
              )}
            </button>

            <div className="flex gap-3">
              <button
                onClick={onGoHome}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                <MdHome className="w-4 h-4 mr-2" />
                Go Home
              </button>

              <button
                onClick={onViewCart}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
              >
                <MdShoppingBag className="w-4 h-4 mr-2" />
                View Cart
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
