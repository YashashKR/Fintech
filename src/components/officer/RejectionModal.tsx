import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface RejectionModalProps {
    isOpen: boolean;
    onConfirm: (reason: string) => void;
    onCancel: () => void;
}

export const RejectionModal: React.FC<RejectionModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!reason.trim()) {
            setError('Rejection reason is required.');
            return;
        }
        onConfirm(reason);
        setReason('');
        setError('');
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reject Application</h3>
                <p className="text-gray-600 mb-4">Please provide a reason for rejecting this application. This will be visible to the applicant.</p>

                <div className="mb-6">
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        rows={4}
                        placeholder="Enter rejection reason..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button variant="danger" onClick={handleSubmit}>Reject Loan</Button>
                </div>
            </div>
        </div>
    );
};
