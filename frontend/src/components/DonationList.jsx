// src/components/DonationList.jsx
import React from 'react';

export default function DonationList({ donations = [] }) {
    if (!donations || donations.length === 0) return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium">Recent Donations</h3>
            <p className="text-sm text-gray-500 mt-2">No donations yet.</p>
        </div>
    );

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-3">Recent Donations</h3>
            <ul className="space-y-2">
                {donations.map(d => {
                    // backend returns fields like Donator_amount, made_duration, User_ID, Campaign_ID
                    const id = d._id || d.id;
                    const amount = d.Donator_amount ?? d.amount ?? 0;
                    const date = d.made_duration ? new Date(d.made_duration).toLocaleString() : (d.date || 'Unknown');
                    const user = d.User_ID?.name || d.User_ID?.email || (d.User_ID || 'Anonymous');
                    const campaign = d.Campaign_ID?.Title || d.Campaign_ID || 'General';

                    return (
                        <li key={id} className="flex justify-between items-center border rounded-lg p-3">
                            <div>
                                <div className="text-sm text-gray-600">{user}</div>
                                <div className="font-semibold">{campaign}</div>
                                <div className="text-xs text-gray-500">{date}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Amount</div>
                                <div className="text-lg font-bold">LKR {Number(amount).toLocaleString()}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}