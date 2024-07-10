'use client';

import React, { useEffect, useState } from 'react';
import { Bike } from '@/types/Bike';
import TableHeader from '@/app/TableHeader';
import Button from '@/app/Button';

/**
 * Home component displays a list of bikes, allows searching by make or model,
 * and supports sorting by different bike attributes.
 *
 * @component
 */

const Home = (): React.ReactElement => {
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
        <div className="container mx-auto p-4 sm:p-8 select-none">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-950 mb-2 sm:mb-0">Bike List</h1>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button label="CHECKOUT" />
                    <input
                        type="text"
                        placeholder="Search by make or model"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 border border-gray-300 rounded w-full sm:w-auto"
                    />
                </div>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                            <td className="px-4 py-2 text-center">{bike.Make}</td>
                            <td className="px-4 py-2 text-center">{bike.Model}</td>
                            <td className="px-4 py-2 text-center">{bike.Year}</td>
                            <td className="px-4 py-2 text-center">{bike.Displacement}</td>
                            <td className="px-4 py-2 text-center">{bike.Price}</td>
                            <td className="px-4 py-2 text-center">{bike.Terrain}</td>
                            <td className="px-4 py-2 text-center">
                                <span className="block sm:hidden truncate max-w-[100px]">{bike.Description}</span>
                                <span className="hidden sm:block">{bike.Description}</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
