import { useState } from "react";
import { useSubleaseForm } from "./useSubleaseForm";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SubleaseRoomTypeArray, type SubleaseRoomType } from "@/apps/dormdrop/types/enums/SubleaseRoomType";

export const Step2_Space = () => {
  const { form, updateForm, errors } = useSubleaseForm();
  const [imageUrlInput, setImageUrlInput] = useState("");
  const maxChars = 1000;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImageSources = filesArray.map(file => ({
        id: crypto.randomUUID(),
        source: file,
        previewUrl: URL.createObjectURL(file)
      }));
      updateForm("leaseImages", [...form.leaseImages, ...newImageSources]);
    }
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput && imageUrlInput.startsWith("http")) {
      const newImageSource = {
        id: crypto.randomUUID(),
        source: imageUrlInput,
        previewUrl: imageUrlInput
      };
      updateForm("leaseImages", [...form.leaseImages, newImageSource]);
      setImageUrlInput("");
    } else {
      alert("Please enter a valid URL (starting with http).");
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

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    const newAmenities = form.amenities.includes(amenity)
      ? form.amenities.filter(a => a !== amenity)
      : [...form.amenities, amenity];
    updateForm("amenities", newAmenities);
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateForm("roomType", [e.target.value as SubleaseRoomType]);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      updateForm("leaseDescription", e.target.value);
    }
  };

  const labelClass = "block text-md font-semibold text-gray-700 mb-2";
  const inputClass = "w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2";
  const errorClass = "border-red-500 focus:ring-red-500";
  const normalClass = "border-gray-300 focus:ring-[#007AFF]";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Describe the space</h2>
        <p className="text-gray-500">Add photos by uploading files or pasting image URLs.</p>
      </div>

      {/* Upload & URL Image Upload */}
      <div>
        <label className={labelClass}>Upload Photos or Add by URL</label>
        <p className="text-sm text-gray-500 mb-2">The first image will be the primary one.</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className={`file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${inputClass}`}
        />
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={imageUrlInput}
            onChange={e => setImageUrlInput(e.target.value)}
            placeholder="Or paste an image URL here..."
            className={inputClass}
          />
          <button
            type="button"
            onClick={handleAddImageUrl}
            className="bg-[#007AFF] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
        {errors.leaseImages && <p className="text-red-500 text-sm mt-1">{errors.leaseImages}</p>}
      </div>

      {/* Image Previews */}
      {form.leaseImages.length > 0 && (
        <div key={form.leaseImages.length} className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {form.leaseImages.map((imageSource, index) => (
            <div
              key={imageSource.id}
              className={`relative group rounded-lg overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img
                src={imageSource.previewUrl}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-black group-hover:bg-opacity-40 transition-all duration-300"></div>
              <button
                onClick={() => handleRemoveImage(imageSource.id)}
                className="absolute top-2 right-2 bg-white text-black rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Room Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className={labelClass}>Room Type</label>
          <select
            name="roomType"
            value={form.roomType[0] || ""}
            onChange={handleRoomTypeChange}
            className={`${inputClass} ${errors.roomType ? errorClass : normalClass}`}
          >
            <option value="" disabled>
              Select...
            </option>
            {SubleaseRoomTypeArray.map(type => (
              <option key={type} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
          {errors.roomType && <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>}
        </div>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <label className={labelClass}>Room Width (ft)</label>
          <input
            type="number"
            min="1"
            value={form.roomWidth || ""}
            onChange={e => updateForm("roomWidth", e.target.value)}
            className={`${inputClass} ${errors.roomWidth ? errorClass : normalClass}`}
          />
          {errors.roomWidth && <p className="text-red-500 text-sm mt-1">{errors.roomWidth}</p>}
        </div>
        <div>
          <label className={labelClass}>Room Depth (ft)</label>
          <input
            type="number"
            min="1"
            value={form.roomDepth || ""}
            onChange={e => updateForm("roomDepth", e.target.value)}
            className={`${inputClass} ${errors.roomDepth ? errorClass : normalClass}`}
          />
          {errors.roomDepth && <p className="text-red-500 text-sm mt-1">{errors.roomDepth}</p>}
        </div>
      </div>

      {/* Num Rooms & Baths */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <label className={labelClass}># of Rooms</label>
          <input
            type="number"
            min="0"
            value={form.numRoom || ""}
            onChange={e => updateForm("numRoom", e.target.value)}
            className={`${inputClass} ${errors.numRooms ? errorClass : normalClass}`}
          />
          {errors.numRooms && <p className="text-red-500 text-sm mt-1">{errors.numRooms}</p>}
        </div>
        <div>
          <label className={labelClass}># of Bathrooms</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={form.numBath || ""}
            onChange={e => updateForm("numBath", e.target.value)}
            className={`${inputClass} ${errors.numBathrooms ? errorClass : normalClass}`}
          />
          {errors.numBathrooms && <p className="text-red-500 text-sm mt-1">{errors.numBathrooms}</p>}
        </div>
      </div>

      {/* Description */}
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
        <p
          className={`text-sm mt-1 ${
            form.leaseDescription.length > maxChars ? "text-red-600" : "text-gray-500"
          }`}
        >
          {form.leaseDescription.length} / {maxChars}
        </p>
        {errors.leaseDescription && (
          <p className="text-red-500 text-sm mt-1">{errors.leaseDescription}</p>
        )}
      </div>

      {/* Amenities */}
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
