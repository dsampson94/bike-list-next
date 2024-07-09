'use client'

import { useState, useEffect } from 'react';
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
        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Bike List</h1>
            <ul>
                {bikes.map(bike => (
                    <li key={bike.BikeID}>{bike.Make} {bike.Model}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
