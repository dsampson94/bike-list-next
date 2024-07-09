'use client';

import { useEffect, useState } from 'react';
import { Bike } from '@/types/Bike';
import TableHeader from '@/app/TableHeader';

const Home = () => {
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortKey, setSortKey] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/ChrisCrawford13/DevBros-CodingChallenge-Front1/main/bikes_response.json');
            const data = await response.json();
            setBikes(data);
        };
        fetchData();
    }, []);

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortKey === key && sortDirection === 'asc') direction = 'desc';
        setSortKey(key);
        setSortDirection(direction);
    };

    const sortedBikes = [...bikes].sort((a, b) => {
        if (!sortKey) return 0;
        const aValue = (a as any)[sortKey];
        const bValue = (b as any)[sortKey];
        return (aValue > bValue ? 1 : -1) * (sortDirection === 'asc' ? 1 : -1);
    });

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredBikes = sortedBikes.filter((bike) =>
        bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-8 select-none">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Bike List</h1>
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
                            <td className="px-4 py-2 whitespace-nowrap">{bike.Make}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{bike.Model}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{bike.Year}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{bike.Displacement}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{bike.Price}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{bike.Terrain}</td>
                            <td className="px-4 py-2 whitespace-wrap">{bike.Description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
