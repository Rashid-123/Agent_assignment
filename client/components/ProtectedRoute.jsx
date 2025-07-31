'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/login');
        }
    }, []);

    return children;
};

export default ProtectedRoute;
