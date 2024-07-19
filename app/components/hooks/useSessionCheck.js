import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useSessionCheck = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Component did mount
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const sessionExpiry = localStorage.getItem('sessionExpiry');

      if (!token || !sessionExpiry || Date.now() > sessionExpiry) {
        localStorage.removeItem('token');
        localStorage.removeItem('user_groups');
        localStorage.removeItem('sessionExpiry');
        router.push('/login');
      }
    }
  }, [isMounted, router]);

  return null; // This hook does not return anything
};

export default useSessionCheck;