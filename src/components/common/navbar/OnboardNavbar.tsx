import React from "react";
import ToggleTheme from "../theme/ToggleTheme";


const OnboardNavbar: React.FC = () => {

    return (
        <nav className="dark:bg-gray-800 py-5 border-b border-slate-200 dark:border-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 dark:text-white font-bold text-lg">
                            MARKETO
                        </div>
                    </div>
                    <div className="block flex-1">
                        <div className="flex items-baseline space-x-4 justify-end gap-3">
                            <ToggleTheme />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default OnboardNavbar;
