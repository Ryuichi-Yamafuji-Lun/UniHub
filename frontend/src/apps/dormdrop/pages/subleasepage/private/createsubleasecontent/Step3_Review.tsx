import { useSubleaseForm } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/useSubleaseForm";
import { type SubleaseAmenity } from '@/apps/dormdrop/types/enums/SubleaseAmenity';

export const Step3_Review = () => {
    const { form } = useSubleaseForm();
  
    return (
      <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold">Review your listing</h2>
        <p className="text-gray-500">One final check. Does everything look correct?</p>
        <div className="border border-gray-200 rounded-lg p-6 space-y-4">
          {form.leaseImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 rounded-lg overflow-hidden">
                {form.leaseImages.map((imageSource, index) => (
                    <div key={index} className={`relative ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                        <img src={imageSource.previewUrl} alt={`Lease preview ${index + 1}`} className="w-full h-full object-cover aspect-square bg-gray-100" />
                    </div>
                ))}
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500">No Images Provided</p>
            </div>
          )}

          <h3 className="font-bold text-2xl pt-4">{form.leaseName || "Untitled Lease"}</h3>
          <p className="text-gray-600">{form.leaseAddress || "No address provided"}</p>
          <p className="font-bold text-3xl text-[#007AFF]">${form.leasePrice || "0"} <span className="text-lg text-gray-500 font-medium">/ month</span></p>
          
          <div className="border-t pt-4">
            <h4 className="font-semibold text-lg mb-2">Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                <p><strong>Dates:</strong> {form.leaseStartDate ? new Date(form.leaseStartDate).toLocaleDateString() : 'N/A'} to {form.leaseEndDate ? new Date(form.leaseEndDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Room Type:</strong> {form.roomType[0]?.replace("_", " ") || 'N/A'}</p>
                <p><strong>Layout:</strong> {form.numRoom || '?'} bed / {form.numBath || '?'} bath</p>
                <p><strong>Dimensions:</strong> {form.roomWidth || '?'} ft × {form.roomDepth || '?'} ft</p>
            </div>
          </div>
          
          {form.leaseDescription && (
            <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Description</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{form.leaseDescription}</p>
            </div>
          )}

          {form.amenities.length > 0 && (
            <div className="border-t pt-4">
                <h4 className="font-semibold text-lg mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                {form.amenities.map((a: SubleaseAmenity) => <span key={a} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{a.replace(/_/g, ' ')}</span>)}
                </div>
            </div>
          )}
        </div>
      </div>
    );
};