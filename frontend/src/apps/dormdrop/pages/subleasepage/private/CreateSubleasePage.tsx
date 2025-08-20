import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { ProgressBar } from "@/components/ui/ProgressBar";

import { SubleaseFormProvider } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/SubleaseFormProvider";
import { useSubleaseForm } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/useSubleaseForm";
import { type ISubleaseForm, type IFormErrors } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/SubleaseFormContext";
import { Step1_Basics } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/Step1_Basics";
import { Step2_Space } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/Step2_Space";
import { Step3_Review } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/Step3_Review";

const validateStep = (step: number, form: ISubleaseForm): IFormErrors => {
    const errors: IFormErrors = {};
    if (step === 1) {
        if (!form.leaseName) errors.leaseName = "Lease name is required.";
        if (!form.leaseAddress) errors.leaseAddress = "Address is required.";
        if (!form.leasePrice || Number(form.leasePrice) < 300) errors.leasePrice = "Price must be at least $300.";
        if (!form.leaseStartDate) errors.leaseStartDate = "Start date is required.";
        if (!form.leaseEndDate) errors.leaseEndDate = "End date is required.";
        if (form.leaseEndDate && form.leaseStartDate && new Date(form.leaseEndDate) < new Date(form.leaseStartDate)) {
            errors.leaseEndDate = "End date cannot be before start date.";
        }
        if (form.leaseSchool.length === 0) errors.leaseSchool = "Please select at least one school.";
    }
    if (step === 2) {
      const uploadedFiles = form.leaseImages.filter(img => img.source instanceof File);
      if (uploadedFiles.length !== 5) {
          errors.leaseImages = "Exactly 5 image files must be uploaded.";
      }
            if (!form.numRoom || Number(form.numRoom) <= 0) {
        errors.numRooms = "Please specify at least 1 bedroom.";
      }

      if (!form.numBath || Number(form.numBath) <= 0) {
        errors.numBathrooms = "Please specify at least 0.5 bathrooms.";
      }
      
      if (form.amenities.length === 0) {
        errors.amenities = "Please select at least one amenity.";
      }
      if (form.roomType.length === 0) errors.roomType = "Room type is required.";
      if (!form.leaseDescription) errors.leaseDescription = "Description is required.";
    }
    return errors;
};
  
const CreateSubleaseContent = () => {
    const navigate = useNavigate();
    const { form, setErrors } = useSubleaseForm();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const leaseImagesRef = useRef(form.leaseImages);

    useEffect(() => {
        leaseImagesRef.current = form.leaseImages;
    }, [form.leaseImages]);

    useEffect(() => {
        return () => {
            leaseImagesRef.current.forEach(imageSource => {
                if (imageSource.source instanceof File) {
                    URL.revokeObjectURL(imageSource.previewUrl);
                }
            });
        };
    }, []); 

    const handleNextStep = () => {
      const validationErrors = validateStep(currentStep, form);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        setCurrentStep(prev => prev + 1);
      }
    };
  
    const handlePrevStep = () => setCurrentStep(prev => prev - 1);
  
    const handleSubmit = async () => {
      const allErrors = { ...validateStep(1, form), ...validateStep(2, form) };
      setErrors(allErrors);
  
      if (Object.keys(allErrors).length > 0) {
        alert("Please fix the errors before publishing.");
        const firstErrorKey = Object.keys(allErrors)[0];
        const step1Fields = ['leaseName', 'leaseAddress', 'leasePrice', 'leaseStartDate', 'leaseEndDate', 'leaseSchool'];
        setCurrentStep(step1Fields.includes(firstErrorKey) ? 1 : 2);
        return;
      }
  
      setIsSubmitting(true);
      const formData = new FormData();

      const filesToUpload = form.leaseImages
          .map(img => img.source)
          .filter((source): source is File => source instanceof File);

      // Your backend does not use image URLs, so we don't include them here.
      const subleaseDataObject = {
        leaseName: form.leaseName,
        leaseAddress: form.leaseAddress,
        leasePrice: Number(form.leasePrice),
        leaseDescription: form.leaseDescription,
        leaseStartDate: form.leaseStartDate,
        leaseEndDate: form.leaseEndDate,
        roomType: form.roomType,
        numRoom: Number(form.numRoom),
        numBath: Number(form.numBath),
        roomWidth: Number(form.roomWidth),
        roomDepth: Number(form.roomDepth),
        leaseSchool: form.leaseSchool,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        amenities: form.amenities,
      };

      const subleaseDataBlob = new Blob([JSON.stringify(subleaseDataObject)], { type: "application/json" });
      formData.append('subleaseData', subleaseDataBlob);
      
      filesToUpload.forEach(file => {
          // The key MUST be 'files' to match your backend @RequestPart("files")
          formData.append('files', file);
      });
  
      try {
        await api.post("/api/v1/owner/accounts/me/subleases", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert("Sublease created successfully!");
        navigate("/account/me");
      } catch (error) {
        console.error("Error creating sublease", error);
        alert("Failed to create sublease.");
      } finally {
        setIsSubmitting(false);
      }
    };
    
    const steps = [ <Step1_Basics />, <Step2_Space />, <Step3_Review /> ];
  
    return (
       <div className="bg-gray-50 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
          <ProgressBar currentStep={currentStep} />
          {steps[currentStep - 1]}
          <div className="mt-12 flex justify-between items-center">
            <div>
              {currentStep > 1 && (<button onClick={handlePrevStep} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition" disabled={isSubmitting}>Back</button>)}
            </div>
            {currentStep < 3 ? (<button onClick={handleNextStep} className="bg-[#007AFF] text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition">Next Step</button>) : (<button onClick={handleSubmit} className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition" disabled={isSubmitting}>{isSubmitting ? 'Publishing...' : 'Publish Listing'}</button>)}
          </div>
        </div>
      </div>
    );
};
  
const CreateSubleasePage = () => {
    return (
      <SubleaseFormProvider>
        <CreateSubleaseContent />
      </SubleaseFormProvider>
    );
};
  
export default CreateSubleasePage;