'use client';

import { useEffect, useState } from 'react';
import { Bike } from '@/types/Bike';

const Home = () => {
    const [bikes, setBikes] = useState<Bike[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/ChrisCrawford13/DevBros-CodingChallenge-Front1/main/bikes_response.json');
            const data = await response.json();
            setBikes(data);
        };
        fetchData();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredBikes = bikes.filter((bike) =>
        bike.Make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.Model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container min-w-full px-24 pt-8">
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
                <table className="min-w-full text-xs divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Displacement</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terrain</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBikes.map((bike) => (
                        <tr key={bike.BikeID} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap">{bike.Make}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bike.Model}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bike.Year}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bike.Displacement}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bike.Price}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{bike.Terrain}</td>
                            <td className="px-6 py-4 whitespace-wrap">{bike.Description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
