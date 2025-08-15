// src/components/DonationList.jsx
import React from 'react';

export default function DonationList({ donations }) {
    return (
        <div>
            <h3>Donations</h3>
            <ul>
                {donations.map(d => (
                    <li key={d.id}>{d.name}: LKR {d.amount} on {d.date}</li>
                ))}
            </ul>
        </div>
    );
}
