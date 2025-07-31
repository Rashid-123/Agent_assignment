import React from 'react';

const Loader = ({ message = "Loading..." }) => {
    return (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#bf8952] border-t-transparent" />
            <p className="mt-4 text-[#bf8952] text-lg font-medium">{message}</p>
        </div>
    );
};

export default Loader;
