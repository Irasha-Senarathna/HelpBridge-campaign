// DonationForm.jsx
import React, { useState } from 'react';

const DonationForm = ({ presetAmounts, campaignId }) => {
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, amount, campaignId });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <button type="submit">Donate</button>
        </form>
    );
};

export default DonationForm;
