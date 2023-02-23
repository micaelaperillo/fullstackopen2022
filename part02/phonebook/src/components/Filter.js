import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
    return (
        <div>
            <input value={filter} onChange={onFilterChange} />
        </div>
    )
}

export default Filter;