// src/components/ReceivedItemsForm.jsx
import React, { useState } from 'react';

// Component 1: Display received items
export const ReceivedItemsList = ({ items }) => {
    return (
        <div>
            <h3>Received Items</h3>
            <ul>
                {items.map(i => (
                    <li key={i.id}>{i.name} donated {i.item} on {i.date}</li>
                ))}
            </ul>
        </div>
    );
};

// Component 2: Form to donate items
export const DonateItemsForm = ({ campaignId, neededItems }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [donorName, setDonorName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle item donation submission, e.g., call API
        console.log({ campaignId, item, quantity, donorName });
    };

    return (
        <div className="items-form">
            <h3>Donate Physical Items</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Item</label>
                    <select 
                        value={item} 
                        onChange={(e) => setItem(e.target.value)} 
                        required
                    >
                        <option value="">Select an item</option>
                        {neededItems.map(i => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantity</label>
                    <input 
                        type="number" 
                        min="1" 
                        value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Your Name/Organization</label>
                    <input 
                        type="text" 
                        value={donorName} 
                        onChange={(e) => setDonorName(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" className="submit-button">Submit Item Donation</button>
            </form>
        </div>
    );
};
export default ReceivedItemsForm;
