import { useRef } from "react";
import { useSubleaseForm } from "./useSubleaseForm";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SubleaseRoomTypeArray, type SubleaseRoomType } from "@/apps/dormdrop/types/enums/SubleaseRoomType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes, faBed, faUsers, faHouse } from "@fortawesome/free-solid-svg-icons";

type ImageSource = {
  id: string;
  source: File | string;
  previewUrl: string;
};

const roomTypeIcons = {
  PRIVATE_ROOM: faBed,
  SHARED_ROOM: faUsers,
  ENTIRE_PLACE: faHouse,
};

export const Step2_Space = () => {
  const { form, updateForm, errors } = useSubleaseForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxChars = 1000;

  // --- Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const currentImageCount = form.leaseImages.length;
      const newImageSources = filesArray.slice(0, 5 - currentImageCount).map(file => ({
        id: crypto.randomUUID(),
        source: file,
        previewUrl: URL.createObjectURL(file)
      }));
      if (form.leaseImages.length + newImageSources.length <= 5) {
        updateForm("leaseImages", [...form.leaseImages, ...newImageSources]);
      }
      e.target.value = ""; 
    }
  };

  const handleRemoveImage = (idToRemove: string) => {
    const imageToRemove = form.leaseImages.find(img => img.id === idToRemove);
    if (imageToRemove && imageToRemove.source instanceof File) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = form.leaseImages.filter(img => img.id !== idToRemove);
    updateForm("leaseImages", updatedImages);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleRoomTypeChange = (type: SubleaseRoomType) => {
    updateForm("roomType", [type]);
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    const newAmenities = form.amenities.includes(amenity)
      ? form.amenities.filter(a => a !== amenity)
      : [...form.amenities, amenity];
    updateForm("amenities", newAmenities);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      updateForm("leaseDescription", e.target.value);
    }
  };
  
  // --- Styling classes ---
  const labelClass = "block text-md font-semibold text-gray-700 mb-2";
  const subLabelClass = "block text-sm font-medium text-gray-600 mb-2";
  const inputClass = "w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2";
  const errorClass = "border-red-500 focus:ring-red-500";
  const normalClass = "border-gray-300 focus:ring-[#007AFF]";

  const imageSlots: (ImageSource | null)[] = Array(5).fill(null);
  form.leaseImages.forEach((img, i) => {
    if (i < 5) imageSlots[i] = img;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* --- Image Upload Section --- */}
      <div>
        <h2 className="text-3xl font-bold mb-2">Describe the space</h2>
        <p className="text-gray-500">Add up to 5 photos. The first is your primary image.</p>
      </div>
      <div>
        <label className={labelClass}>Property Photos</label>
        <input
          type="file" multiple accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden"
        />
        <div className="mt-4 grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-2 gap-4 h-96">
          {imageSlots.map((image, index) => {
            const isPrimary = index === 0;
            const hasImage = image !== null;
            const gridClasses = isPrimary ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
            return (
              <div key={index} className={`${gridClasses} relative`}>
                {hasImage ? (
                  <div className="relative group w-full h-full rounded-lg overflow-hidden">
                    <img src={image.previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover"/>
                    {/* --- THE FIX IS HERE --- */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-colors duration-300"></div>
                    <button type="button" onClick={() => handleRemoveImage(image.id)} className="absolute top-2 right-2 bg-white text-black rounded-full h-7 w-7 flex items-center justify-center font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <FontAwesomeIcon icon={faTimes} size="sm" />
                    </button>
                    {isPrimary && (
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Primary
                      </div>
                    )}
                  </div>
                ) : (
                  <button type="button" onClick={triggerFileInput} disabled={form.leaseImages.length >= 5} className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-[#007AFF] hover:text-[#007AFF] text-gray-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50">
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
        {errors.leaseImages && <p className="text-red-500 text-sm mt-1">{errors.leaseImages}</p>}
      </div>

      <hr className="border-t border-gray-200" />

      {/* --- Space Details Group --- */}
      <div className="p-6 bg-slate-50 rounded-xl">
        <h3 className={labelClass}>Space Details</h3>
        <div className="space-y-6 mt-4">
          
          {/* "Room Type" Cards */}
          <div>
            <label className={subLabelClass}>Type of Room</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SubleaseRoomTypeArray.map(type => (
                <button
                  type="button"
                  key={type}
                  onClick={() => handleRoomTypeChange(type)}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                    form.roomType[0] === type
                      ? "border-[#007AFF] bg-blue-50 ring-2 ring-[#007AFF]"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                >
                  <FontAwesomeIcon icon={roomTypeIcons[type]} className="text-2xl mb-2" />
                  <span className="font-semibold">{type.replace("_", " ")}</span>
                </button>
              ))}
            </div>
            {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
          </div>

          {/* Number Steppers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={subLabelClass}># of Bedrooms</label>
              <div className="flex items-center">
                <button type="button" onClick={() => updateForm("numRoom", (Math.max(0, Number(form.numRoom || 0) - 1)).toString())} className="px-4 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50" disabled={Number(form.numRoom || 0) <= 0}> - </button>
                <input type="text" readOnly value={form.numRoom || 0} className={`w-full text-center border-y bg-white font-semibold text-lg focus:outline-none ${errors.numRooms ? 'border-red-500' : 'border-gray-300'}`} />
                <button type="button" onClick={() => updateForm("numRoom", (Number(form.numRoom || 0) + 1).toString())} className="px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"> + </button>
              </div>
              {errors.numRooms && <p className="text-red-500 text-sm mt-1">{errors.numRooms}</p>}
            </div>

            <div>
              <label className={subLabelClass}># of Bathrooms</label>
              <div className="flex items-center">
                <button type="button" onClick={() => updateForm("numBath", (Math.max(0, Number(form.numBath || 0) - 0.5)).toString())} className="px-4 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50" disabled={Number(form.numBath || 0) <= 0}> - </button>
                <input type="text" readOnly value={form.numBath || 0} className={`w-full text-center border-y bg-white font-semibold text-lg focus:outline-none ${errors.numBathrooms ? 'border-red-500' : 'border-gray-300'}`} />
                <button type="button" onClick={() => updateForm("numBath", (Number(form.numBath || 0) + 0.5).toString())} className="px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"> + </button>
              </div>
              {errors.numBathrooms && <p className="text-red-500 text-sm mt-1">{errors.numBathrooms}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* --- Room Dimensions Group --- */}
      <div>
        <h3 className={labelClass}>Room Dimensions (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
          <div>
            <label className={subLabelClass}>Width (ft)</label>
            <input type="number" min="1" value={form.roomWidth || ""} onChange={e => updateForm("roomWidth", e.target.value)} className={`${inputClass} ${errors.roomWidth ? errorClass : normalClass}`} />
            {errors.roomWidth && <p className="text-red-500 text-sm mt-1">{errors.roomWidth}</p>}
          </div>
          <div>
            <label className={subLabelClass}>Depth (ft)</label>
            <input type="number" min="1" value={form.roomDepth || ""} onChange={e => updateForm("roomDepth", e.target.value)} className={`${inputClass} ${errors.roomDepth ? errorClass : normalClass}`} />
            {errors.roomDepth && <p className="text-red-500 text-sm mt-1">{errors.roomDepth}</p>}
          </div>
        </div>
      </div>
      
      <hr className="border-t border-gray-200" />

      {/* --- Description and Amenities --- */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea
          name="leaseDescription"
          value={form.leaseDescription}
          onChange={handleDescriptionChange}
          rows={6}
          className={`${inputClass} ${errors.leaseDescription ? errorClass : normalClass}`}
          placeholder="Describe the room, building, neighborhood, and roommates..."
        ></textarea>
        <p className={`text-sm mt-1 ${form.leaseDescription.length > maxChars ? "text-red-600" : "text-gray-500"}`}>
          {form.leaseDescription.length} / {maxChars}
        </p>
        {errors.leaseDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.leaseDescription}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {SubleaseAmenityArray.map(amenity => (
            <button
              type="button"
              key={amenity}
              onClick={() => handleAmenityChange(amenity)}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                form.amenities.includes(amenity)
                  ? "bg-[#007AFF] text-white border-[#007AFF] shadow-lg"
                  : "hover:border-gray-400 bg-gray-50"
              }`}
            >
              <span className="font-semibold">{amenity.replace(/_/g, " ")}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};