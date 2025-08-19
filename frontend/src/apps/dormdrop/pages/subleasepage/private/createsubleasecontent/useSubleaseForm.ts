import { useContext } from 'react';
import { SubleaseFormContext, type SubleaseFormContextType } from '@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/SubleaseFormContext';

export const useSubleaseForm = () => {
    const context = useContext<SubleaseFormContextType | undefined>(SubleaseFormContext);
    if (!context) {
    throw new Error('useSubleaseForm must be used within a SubleaseFormProvider');
    }
    return context;
};