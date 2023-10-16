'use client';

import { StoreModal } from '@/components/modals/StoreModal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
};
export default ModalProvider;
//cant add a client side component to a server side component (eg: layout.tsx in /app/layout.tsx) have to ensure there will not be hydration error (desynchronization)
