import React from 'react';

const TeamMember = ({ name, role, image }) => {
    return (
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-50">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight">{name}</h3>
            <p className="text-gray-500 text-sm mt-1">{role}</p>
        </div>
    );
};

export default TeamMember;