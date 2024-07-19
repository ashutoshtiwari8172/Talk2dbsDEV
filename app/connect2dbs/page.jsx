"use client"
import React, { useEffect, useState } from 'react';
// import useSessionCheck from '../components/hooks/useSessionCheck';
// import useAutoLogout from '../components/hooks/useAutoLogout';
import dynamic from 'next/dynamic';

const useSessionCheck = dynamic(() => import('../components/hooks/useSessionCheck'), { ssr: false });
const useAutoLogout = dynamic(() => import('../components/hooks/useAutoLogout'), { ssr: false });

const page = () => {

    useSessionCheck();
    useAutoLogout();
    const [databases, setDatabases] = useState([]);

    useEffect(() => {
        async function fetchDatabases() {
            const token = localStorage.getItem('token');  // Get the token from local storage

           
                const response = await fetch('https://dev.tok2dbs.com/chatbot/api/databases/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`  // Include the token in the headers
                }
            });

            const data = await response.json();
            setDatabases(data);
        }

        fetchDatabases();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Chat With Databases</h1>
            <div id="database-container" className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-11/12 max-w-5xl">
                {databases.map(db => (
                    <a key={db.database_id} href={`chatbot.html?id=${db.database_id}&name=${db.database_name}`} className={`database-card bg-white rounded-lg p-6 shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 text-gray-900 no-underline ${!db.status && 'opacity-50 cursor-not-allowed'}`} onClick={(e) => !db.status && e.preventDefault()}>
                        <span className="database-name font-bold text-lg mb-4">{db.database_name}</span>
                        {db.status ? (
                            <button
                                className="connect-button py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the default link click behavior
                                    localStorage.setItem('selectedDatabaseId', db.database_id);
                                    window.location.href = `/chat2dbs?id=${db.database_id}&name=${db.database_name}`; // Navigate to the link
                                }}
                            >
                                Connect
                            </button>
                        ) : (
                            <button
                                className="connect-button py-2 px-4 bg-gray-500 text-white rounded cursor-not-allowed"
                                disabled
                            >
                                Unavailable
                            </button>
                        )}
                    </a>
                ))}
            </div>
        </div>
    </div>
        );
};

export default page;
