'use client';

import { useEffect, useState } from 'react';
import { Bike } from '@/types/Bike';
import TableHeader from '@/app/TableHeader';

/**
 * Home component displays a list of bikes, allows searching by make or model,
 * and supports sorting by different bike attributes.
 *
 * @component
 */

const Home = () => {
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    /**
     * Fetch bike json data from the repository on component mount
     */
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/ChrisCrawford13/DevBros-CodingChallenge-Front1/main/bikes_response.json');
            const data = await response.json();
            setBikes(data);
        };
        fetchData();
    }, []);

    /**
     * Handle sorting when a table header is clicked
     *
     * @param {string} key - The key of the column to sort by
     */
    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortKey === key && sortDirection === 'asc') direction = 'desc';
        setSortKey(key);
        setSortDirection(direction);
    };

    /**
     * Handle search input change
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event - The search input change event
     */
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Sort array based on current sort key and direction
     *
     * @returns {Bike[]} - The sorted array of bikes
     */
    const sortedBikes = [...bikes].sort((a, b) => {
        if (!sortKey) return 0;
        const aValue = (a as any)[sortKey];
        const bValue = (b as any)[sortKey];
        return (aValue > bValue ? 1 : -1) * (sortDirection === 'asc' ? 1 : -1);
    });

    /**
     * Filter sorted bikes array based on search term
     *
     * @returns {Bike[]} - The filtered array of bikes
     */
    const filteredBikes = sortedBikes.filter((bike) =>
        bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8 select-none">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-950">Bike List</h1>
                <div className="flex items-center space-x-4">
                    <div className="p-[1px] bg-gray-500 rounded-xl shadow-inner shadow-sm">
                        <div className="p-[1px] bg-gray-100 rounded-xl border-1 shadow-sm">
                            <button
                                className="relative px-4 py-2 bg-gradient-to-b from-[#e4e4e4] to-[#b3b3b3] text-[#5b5b5b]
                                border-4 border-gray-300 rounded-xl font-bold shadow-sm"
                            >
                                CHECKOUT
                                <div className="absolute inset-0 rounded-lg border-[1px] shadow-lg border-gray-500"/>
                            </button>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search by make or model"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>
            <div className="overflow-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full text-xs divide-y divide-gray-200 shadow-2xl">
                    <thead className="bg-gray-50">
                    <tr>
                        <TableHeader
                            label="Make"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableHeader
                            label="Model"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableHeader
                            label="Year"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableHeader
                            label="Displacement"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableHeader
                            label="Price"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableHeader
                            label="Terrain"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                        <TableHeader
                            label="Description"
                            currentSortKey={sortKey}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBikes.map((bike) => (
                        <tr key={bike.BikeID} className="hover:bg-gray-100">
                            <td className="px-4 py-2">{bike.Make}</td>
                            <td className="px-4 py-2">{bike.Model}</td>
                            <td className="px-4 py-2">{bike.Year}</td>
                            <td className="px-4 py-2">{bike.Displacement}</td>
                            <td className="px-4 py-2">{bike.Price}</td>
                            <td className="px-4 py-2">{bike.Terrain}</td>
                            <td className="px-4 py-2">{bike.Description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
