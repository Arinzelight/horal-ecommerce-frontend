import { useEffect, useState } from "react";
import logo1 from "../assets/logos/horal-logo-black.png"
import logo2 from "../assets/logos/horal-logo-white.png"

const StartupScreen = ({ onLoadingComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onLoadingComplete();
            }, 500); 
        }, 3000);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className="flex flex-col items-center">
                <div className="relative">
                            <img src={logo1} alt="Logo 1" className="h-24 w-44"   />
                    <div className="absolute inset-0 w-20 h-20 rounded-2xl border-2 border-blue-200 animate-ping"></div>
                </div>
                <div className="flex space-x-1 mt-6">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};
export default StartupScreen;