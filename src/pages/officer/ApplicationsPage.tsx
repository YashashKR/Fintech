import React from 'react';
import { ApplicationsTable } from '../../components/officer/ApplicationsTable';
import { useData } from '../../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

export const ApplicationsPage: React.FC = () => {
    const { loans } = useData();
    const navigate = useNavigate();

    const handleView = (loanId: string) => {
        navigate(`/officer/applications/${loanId}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-text-main">Loan Applications</h1>
            <ApplicationsTable loans={loans} onView={handleView} />
        </div>
    );
};
