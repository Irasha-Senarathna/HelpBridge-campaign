// src/components/ProgressBar.jsx
import React from 'react';

export default function ProgressBar({ percentage }) {
    return (
        <div style={{ border: '1px solid #000', width: '100%', marginBottom: '10px' }}>
            <div style={{ width: `${percentage}%`, backgroundColor: 'green', height: '20px' }} />
        </div>
    );
}
