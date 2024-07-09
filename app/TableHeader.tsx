import React from 'react';

interface TableHeaderProps {
    label: string;
    currentSortKey: string;
    sortDirection: 'asc' | 'desc';
    onSort: (key: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ label, currentSortKey, sortDirection, onSort }) => {
    const getSortIcon = () => {
        if (currentSortKey !== label) return null;
        if (sortDirection === 'asc') {
            return '▲';
        }
        return '▼';
    };

    return (
        <th
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => onSort(label)}
        >
            <div className="flex items-center">
                <span>{label}</span>
                <span className="ml-2">{getSortIcon()}</span>
            </div>
        </th>
    );
};

export default TableHeader;
