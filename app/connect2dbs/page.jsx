// "use client"
// import React, { useEffect, useState } from 'react';
// // import useSessionCheck from '../components/hooks/useSessionCheck';
// // import useAutoLogout from '../components/hooks/useAutoLogout';
// // import dynamic from 'next/dynamic';

// // const useSessionCheck = dynamic(() => import('../components/hooks/useSessionCheck'), { ssr: false });
// // const useAutoLogout = dynamic(() => import('../components/hooks/useAutoLogout'), { ssr: false });

// const page = () => {

//     // useSessionCheck();
//     // useAutoLogout();
//     const [databases, setDatabases] = useState([]);

//     useEffect(() => {
//         async function fetchDatabases() {
//             const token = localStorage.getItem('token');  // Get the token from local storage

           
//                 const response = await fetch('https://dev.tok2dbs.com/chatbot/api/databases/', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Token ${token}`  // Include the token in the headers
//                 }
//             });

//             const data = await response.json();
//             setDatabases(data);
//         }

//         fetchDatabases();
//     }, []);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div>
//             <h1 className="text-3xl font-bold mb-8 text-center">Chat With Databases</h1>
//             <div id="database-container" className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-11/12 max-w-5xl">
//                 {databases.map(db => (
//                     <a key={db.database_id} href={`chatbot.html?id=${db.database_id}&name=${db.database_name}`} className={`database-card bg-white rounded-lg p-6 shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 text-gray-900 no-underline ${!db.status && 'opacity-50 cursor-not-allowed'}`} onClick={(e) => !db.status && e.preventDefault()}>
//                         <span className="database-name font-bold text-lg mb-4">{db.database_name}</span>
//                         {db.status ? (
//                             <button
//                                 className="connect-button py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                 onClick={(e) => {
//                                     e.preventDefault(); // Prevent the default link click behavior
//                                     localStorage.setItem('selectedDatabaseId', db.database_id);
//                                     window.location.href = `/chat2dbs?id=${db.database_id}&name=${db.database_name}`; // Navigate to the link
//                                 }}
//                             >
//                                 Connect
//                             </button>
//                         ) : (
//                             <button
//                                 className="connect-button py-2 px-4 bg-gray-500 text-white rounded cursor-not-allowed"
//                                 disabled
//                             >
//                                 Unavailable
//                             </button>
//                         )}
//                     </a>
//                 ))}
//             </div>
//         </div>
//     </div>
//         );
// };

// export default page;

"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

const Connect2DBs = () => {
  const [databases, setDatabases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchDatabases() {
      const token = localStorage.getItem('token');  // Get the token from local storage

      if (!token) {
        setErrorMessage('No token found, redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        const response = await fetch('https://dev.tok2dbs.com/chatbot/api/databases/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,  // Include the token in the headers
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setErrorMessage('Invalid credentials, redirecting to login...');
            setTimeout(() => {
              localStorage.removeItem('token');
              router.push('/login');
            }, 2000);
          } else {
            setErrorMessage(`Error: ${response.statusText}`);
          }
          return;
        }

        const data = await response.json();
        setDatabases(data);
      } catch (error) {
        setErrorMessage('Failed to fetch databases. Please try again later.');
      }
    }

    fetchDatabases();
  }, [router]);

  const filteredDatabases = databases.filter(db =>
    db.database_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://dev.tok2dbs.com/users/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.ok) {
      localStorage.removeItem('token');
      alert('Successfully logged out.');
      router.push('/');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow w-full">
        <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-center text-blue-900 " target='_blank'>tok2dbs</a>
          </Link>
          <button
            className="flex items-center border border-blue-900 text-blue-900 px-4 py-2 rounded hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600"
            onClick={handleLogout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-5 w-5 shrink-0"><path fill="currentColor" fillRule="evenodd" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414" clipRule="evenodd"></path></svg> 
            <span className='ml-2'>Logout</span>
          </button>
        </div>
      </header>
      {/* <Navbar/> */}
      <div className="p-8 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Connect to Databases</h1>
        <input
          type="text"
          placeholder="Search Databases"
          className="w-full p-2 mb-4 border rounded"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <div id="database-container" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDatabases.map(db => (
            <a
              key={db.database_id}
              href={`chatbot.html?id=${db.database_id}&name=${db.database_name}`}
              className={`database-card bg-white rounded-lg p-6 shadow-lg flex flex-col items-center transition-transform transform hover:scale-105 text-gray-900 no-underline ${!db.status && 'opacity-50 cursor-not-allowed'}`}
              onClick={(e) => !db.status && e.preventDefault()}
            >
              <span className="database-name font-bold text-lg mb-4 text-blue-900">{db.database_name}</span>
              {db.status ? (
                <button
                  className="flex justify-center my-5 border border-blue-900 text-blue-900 px-4 py-2 rounded hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600"
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

export default Connect2DBs;

