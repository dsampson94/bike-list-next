import React from 'react';

interface TableHeaderProps {
    label: string;
    currentSortKey: string;
    sortDirection: 'asc' | 'desc';
    onSort: (key: string) => void;
}

/**
 * TableHeader component
 *
 * This component represents a sortable table header. It displays the column label
 * and indicates the current sort direction if the column is being sorted.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The label for the table header.
 * @param {string} props.currentSortKey - The key of the column currently being sorted.
 * @param {'asc' | 'desc'} props.sortDirection - The current sort direction ('asc' or 'desc').
 * @param {Function} props.onSort - The function to call when the header is clicked to sort the column.
 */

const TableHeader: React.FC<TableHeaderProps> = ({ label, currentSortKey, sortDirection, onSort }) => {
    /**
     * getSortIcon function
     *
     * This function determines the sort icon to display based on the current sort key and direction.
     *
     * @returns {string | null} - The sort icon ('▲' for ascending, '▼' for descending, or null if not sorted).
     */
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
