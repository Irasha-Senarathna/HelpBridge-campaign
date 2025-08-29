// DonationForm.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { donationService } from '../services/donationService';

const DonationForm = ({ campaignId, onDonationSuccess }) => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await donationService.createDonation({
                donation_amount: Number(amount),
                campaign: campaignId
            });

            setAmount('');
            toast.success('Donation successful!');
            onDonationSuccess?.(); // Callback to refresh donations list
        } catch (error) {
            toast.error(error.message || 'Failed to process donation');
            console.error('Donation error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 border rounded"
                required
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Donate'}
            </button>
        </form>
    );
};

export default DonationForm;
