'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}
const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm"
            description="This Action Cannot Be Undone"
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full ">
                <Button disabled={loading} onClick={onClose} variant="outline">
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    disabled={loading}
                    onClick={onConfirm}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    );
};
export default AlertModal;
