// "use client"
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       router.push('/connect2dbs');
//     }
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await fetch('https://dev.tok2dbs.com/users/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage('Login successful!');
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user_groups', JSON.stringify(data.group_names));
//         console.log('user groups', data.group_names);
//         router.push('/connect2dbs');
//       } else {
//         setMessage(`Error: ${data.message}`);
//         setIsPopupVisible(true);
//       }
//     } catch (error) {
//       setMessage('Server is down for maintenance. Please try again later.');
//       setIsPopupVisible(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <header className="p-4 bg-white shadow w-full">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="text-2xl font-bold text-blue-900">tok2dbs</div>
         
//         </div>
//       </header>
//       <div className="p-8 w-full max-w-xl mx-auto my-auto">
//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
//           <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               required
//               className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//               className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full py-2 px-4 rounded-md text-white font-semibold focus:outline-none ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-900 focus:bg-blue-700'}`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//         {message && !isPopupVisible && <p className="text-center text-red-500 mt-4">{message}</p>}

//         {isPopupVisible && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-md shadow-md">
//               <h2 className="text-xl font-semibold mb-4">Error</h2>
//               <p>{message}</p>
//               <button
//                 onClick={() => setIsPopupVisible(false)}
//                 className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin" style={{ borderTopColor: '#3498db' }}></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/connect2dbs');
    }
  }, [router]);

  useEffect(() => {
    // Load the Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '836345213785-1q2ra0i63cmdbs4jd6cjtro1j9ekcupf.apps.googleusercontent.com',
        callback: handleGoogleResponse
      });

      window.google.accounts.id.renderButton(
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large' }
      );

      window.google.accounts.id.prompt();
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      const id_token = response.credential;
      console.log('ID Token:', id_token);

      const res = await fetch('http://35.238.123.118/users/google-login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: id_token }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_groups', JSON.stringify(data.group_names));
        console.log('user groups', data.group_names);
        router.push('/connect2dbs');
      } else {
        setMessage(`Error: ${data.message}`);
        setIsPopupVisible(true);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setMessage('System error. Please try again later.');
      setIsPopupVisible(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://dev.tok2dbs.com/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_groups', JSON.stringify(data.group_names));
        console.log('user groups', data.group_names);
        router.push('/connect2dbs');
      } else {
        setMessage(`Error: ${data.message}`);
        setIsPopupVisible(true);
      }
    } catch (error) {
      setMessage('Server is down for maintenance. Please try again later.');
      setIsPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">tok2dbs</div>
        </div>
      </header>
      <div className="p-8 w-full max-w-xl mx-auto my-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-semibold focus:outline-none ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-900 focus:bg-blue-700'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-4">
          <div id="buttonDiv"></div>
        </div>
        {message && !isPopupVisible && <p className="text-center text-red-500 mt-4">{message}</p>}
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Error</h2>
              <p>{message}</p>
              <button
                onClick={() => setIsPopupVisible(false)}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 animate-spin" style={{ borderTopColor: '#3498db' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
