import { useState, type ReactNode } from 'react';
import { SubleaseFormContext, type ISubleaseForm, type IFormErrors } from '@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/SubleaseFormContext';

export const SubleaseFormProvider = ({ children }: { children: ReactNode }) => {
    const [form, setForm] = useState<ISubleaseForm>({
        leaseName: "", 
        leaseAddress: "", 
        leasePrice: "", 
        leaseDescription: "", 
        leaseStartDate: "",
        leaseEndDate: "", 
        leaseImages: [],
        roomType: [], 
        numRoom: "", 
        numBath: "", 
        roomWidth: "",
        roomDepth: "", 
        leaseSchool: [], 
        latitude: "", 
        longitude: "", 
        amenities: [],
    });
    const [errors, setErrors] = useState<IFormErrors>({});

    const updateForm = <K extends keyof ISubleaseForm>(field: K, value: ISubleaseForm[K]) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const value = { form, errors, updateForm, setErrors };

    return (
        <SubleaseFormContext.Provider value={value}>
        {children}
        </SubleaseFormContext.Provider>
    );
};