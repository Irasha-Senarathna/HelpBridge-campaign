import React from 'react';

const ProgressBar = ({ current, target, gradient = "from-orange-600 to-red-600" }) => {
    const percentage = Math.min(Math.round((current / target) * 100), 100);
    
    return (
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
            <div 
                className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;