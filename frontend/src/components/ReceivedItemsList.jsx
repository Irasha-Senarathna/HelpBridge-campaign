import React from 'react';


const ReceivedItemsList = ({ items }) => {
    return (
      <div className="items-list">
        <h3>Recently Received Items</h3>
        {items.length === 0 ? (
          <p>No items received yet.</p>
        ) : (
          <ul>
            {items.map(item => (
              <li key={item.id}>
                <span className="name">{item.name}</span>
                <span className="item">{item.item}</span>
                <span className="date">{formatDate(item.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  export default ReceivedItemsList;
