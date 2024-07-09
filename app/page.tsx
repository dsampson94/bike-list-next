'use client';

import { useEffect, useState } from 'react';
import { Bike } from '@/types/Bike';

const Home = () => {
    const [bikes, setBikes] = useState<Bike[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/ChrisCrawford13/DevBros-CodingChallenge-Front1/main/bikes_response.json');
            const data = await response.json();
            setBikes(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container min-w-full px-24 pt-8">
            <h1 className="text-2xl font-bold text-center mb-4">Bike List</h1>
            <table className="min-w-full text-xs bg-white border border-gray-200">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Make</th>
                    <th className="px-4 py-2 border-b">Model</th>
                    <th className="px-4 py-2 border-b">Year</th>
                    <th className="px-4 py-2 border-b">Displacement</th>
                    <th className="px-4 py-2 border-b">Price</th>
                    <th className="px-4 py-2 border-b">Terrain</th>
                    <th className="px-4 py-2 border-b">Description</th>
                </tr>
                </thead>
                <tbody>
                {bikes.map((bike) => (
                    <tr key={bike.BikeID} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{bike.Make}</td>
                        <td className="px-4 py-2 border-b">{bike.Model}</td>
                        <td className="px-4 py-2 border-b">{bike.Year}</td>
                        <td className="px-4 py-2 border-b">{bike.Displacement}</td>
                        <td className="px-4 py-2 border-b">{bike.Price}</td>
                        <td className="px-4 py-2 border-b">{bike.Terrain}</td>
                        <td className="px-4 py-2 border-b">{bike.Description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
