// src/components/DonationList.jsx
import React from 'react';

const DonationList = ({ donations }) => {
    // Ensure donations is an array
    const donationArray = Array.isArray(donations) ? donations : [];

    if (donationArray.length === 0) {
        return (
            <div className="text-center p-4 bg-gray-50 rounded">
                <p className="text-gray-500">No donations yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {donationArray.map((donation) => (
                <div 
                    key={donation._id} 
                    className="border p-4 rounded shadow-sm bg-white"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-lg">
                                LKR {donation.donation_amount?.toLocaleString() || 0}
                            </p>
                            <p className="text-sm text-gray-600">
                                by {donation.donor?.name || 'Anonymous'}
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {new Date(donation.date).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DonationList;