import { createContext } from 'react';
import { type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { type SubleaseRoomType } from "@/apps/dormdrop/types/enums/SubleaseRoomType";
import { type Schools } from "@/types/enums/Schools";

export interface ImageSource {
    id: string; 
    source: File | string;
    previewUrl: string;
}

export interface ISubleaseForm {
    leaseName: string;
    leaseAddress: string;
    leasePrice: string;
    leaseDescription: string;
    leaseStartDate: string;
    leaseEndDate: string;
    leaseImages: ImageSource[]; 
    roomType: SubleaseRoomType[];
    numRoom: string;
    numBath: string;
    roomWidth: string;
    roomDepth: string;
    leaseSchool: Schools[];
    latitude: string;
    longitude: string;
    amenities: SubleaseAmenity[];
}

// The shape of the errors object
export interface IFormErrors {
    [key: string]: string | undefined;
}

// The shape of the context's value
export interface SubleaseFormContextType {
    form: ISubleaseForm;
    errors: IFormErrors;
    updateForm: <K extends keyof ISubleaseForm>(field: K, value: ISubleaseForm[K]) => void;
    setErrors: (errors: IFormErrors) => void;
}

// Create and export the context
export const SubleaseFormContext = createContext<SubleaseFormContextType | undefined>(undefined);