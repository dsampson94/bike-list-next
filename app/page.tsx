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

    // Fetch bike json data from the repo on component mount
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/ChrisCrawford13/DevBros-CodingChallenge-Front1/main/bikes_response.json');
            const data = await response.json();
            setBikes(data);
        };
        fetchData();
    }, []);

    // Sort when a table header is clicked
    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortKey === key && sortDirection === 'asc') direction = 'desc';
        setSortKey(key);
        setSortDirection(direction);
    };

    // Handle search input change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Sort array based on current sort key and direction
    const sortedBikes = [...bikes].sort((a, b) => {
        if (!sortKey) return 0;
        const aValue = (a as any)[sortKey];
        const bValue = (b as any)[sortKey];
        return (aValue > bValue ? 1 : -1) * (sortDirection === 'asc' ? 1 : -1);
    });

    // Filter sorted bikes array based on search term
    const filteredBikes = sortedBikes.filter((bike) =>
        bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8 select-none">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-950">Bike List</h1>
                <input
                    type="text"
                    placeholder="Search by make or model"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border border-gray-300 rounded"
                />
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
