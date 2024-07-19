
import { useEffect } from 'react';

import { useRouter } from 'next/router';

const useAutoLogout = () => {
  const router = useRouter();

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      const sessionExpiry = localStorage.getItem('sessionExpiry');
      if (sessionExpiry) {
        const timeout = setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user_groups');
          localStorage.removeItem('sessionExpiry');
          router.push('/login');
        }, sessionExpiry - Date.now());

        return () => clearTimeout(timeout);
      }
    }
  }, [router]);
};

export default useAutoLogout;
