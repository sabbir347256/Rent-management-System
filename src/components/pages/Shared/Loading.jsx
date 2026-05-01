import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>

                <div className="absolute flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                </div>

                <div className="absolute -inset-4 border border-dashed border-gray-300 rounded-full animate-[spin_10s_linear_infinite] opacity-30"></div>
            </div>
        </div>
    );
};

export default Loading;