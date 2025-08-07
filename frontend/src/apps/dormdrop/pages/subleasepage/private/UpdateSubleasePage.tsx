import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/lib/axios";

// --- Assuming these are in your project ---
import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SubleaseRoomTypeArray, type SubleaseRoomType } from "@/apps/dormdrop/types/enums/SubleaseRoomType";

// --- Helper Component for the Progress Bar ---
const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ["The Basics", "The Space", "Review & Save"];
  return (
    <div className="flex justify-between items-center mb-12">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${index + 1 <= currentStep ? 'bg-[#007AFF] text-white' : 'bg-gray-200 text-gray-500'}`}>
            {index + 1}
          </div>
          <p className={`ml-3 font-semibold transition-colors duration-300 ${index + 1 <= currentStep ? 'text-black' : 'text-gray-400'}`}>{step}</p>
          {index < steps.length - 1 && <div className={`flex-grow h-1 mx-4 rounded-full ${index + 1 < currentStep ? 'bg-[#007AFF]' : 'bg-gray-200'}`}></div>}
        </div>
      ))}
    </div>
  );
};

// --- Main Update Sublease Page Component ---
const UpdateSubleasePage = () => {
  const { subleaseId } = useParams<{ subleaseId: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const maxChars = 1000;

  const [form, setForm] = useState({
    leaseName: "",
    leaseAddress: "",
    leasePrice: 0,
    leaseDescription: "",
    leaseStartDate: "",
    leaseEndDate: "",
    leaseImage: "",
    roomType: [] as SubleaseRoomType[],
    numRoom: 1,
    numBath: 1,
    leaseSchool: [] as Schools[],
    amenities: [] as SubleaseAmenity[],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [leaseDescriptionError, setLeaseDescriptionError] = useState("");
  const [schoolSearch, setSchoolSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSchools = SchoolsArray.filter((school) =>
    schoolDisplayNames[school].toLowerCase().includes(schoolSearch.toLowerCase())
  );

  useEffect(() => {
    const fetchSublease = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/v1/public/subleases/${subleaseId}`);
        const data = res.data;
        setForm({
          leaseName: data.leaseName ?? "",
          leaseAddress: data.leaseAddress ?? "",
          leasePrice: data.leasePrice ?? 0,
          leaseDescription: data.leaseDescription ?? "",
          leaseStartDate: data.leaseStartDate ? new Date(data.leaseStartDate).toISOString().split('T')[0] : "",
          leaseEndDate: data.leaseEndDate ? new Date(data.leaseEndDate).toISOString().split('T')[0] : "",
          leaseImage: data.leaseImage ?? "",
          roomType: data.roomType ?? [],
          numRoom: data.numRoom ?? 1,
          numBath: data.numBath ?? 1,
          leaseSchool: data.school ?? [],
          amenities: data.amenities ?? [],
        });
      } catch (error) {
        console.error("Error fetching sublease", error);
        alert("Could not load sublease data.");
      } finally {
        setIsLoading(false);
      }
    };
    if (subleaseId) {
      fetchSublease();
    }
  }, [subleaseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "leaseDescription") {
      if (value.length <= maxChars) {
        setForm((prev) => ({ ...prev, [name]: value }));
        setLeaseDescriptionError("");
      } else {
        setLeaseDescriptionError(`Character limit of ${maxChars} exceeded!`);
      }
    } else {
        const numericFields = ["leasePrice", "numRoom", "numBath"];
        setForm(prev => ({ ...prev, [name]: numericFields.includes(name) ? Number(value) : value, }));
    }
  };

  const handleSchoolToggle = (school: Schools) => {
    setForm((prev) => ({
      ...prev,
      leaseSchool: prev.leaseSchool.includes(school)
        ? prev.leaseSchool.filter((s) => s !== school)
        : [...prev.leaseSchool, school],
    }));
  };

  const handleAmenityChange = (amenity: SubleaseAmenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, roomType: [e.target.value as SubleaseRoomType] }));
  };

  const nextStep = () => setCurrentStep(prev => prev < 3 ? prev + 1 : 3);
  const prevStep = () => setCurrentStep(prev => prev > 1 ? prev - 1 : 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/api/v1/owner/accounts/me/subleases/${subleaseId}`, form);
      alert("Sublease updated successfully!");
      navigate("/account/me/sublease");
    } catch (error) {
      console.error("Error updating sublease", error);
      alert("Failed to update sublease.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this sublease? This cannot be undone.")) {
      try {
        await api.delete(`/api/v1/owner/accounts/me/subleases/${subleaseId}`);
        alert("Sublease deleted successfully.");
        navigate("/account/me/sublease");
      } catch (error) {
        console.error("Error deleting sublease:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#007AFF]";
  const labelClass = "block text-md font-semibold text-gray-700 mb-2";

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading sublease details...</p></div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <ProgressBar currentStep={currentStep} />
        
        <form onSubmit={handleSubmit}>
          {/* STEP 1: The Basics */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Update the basics</h2>
                <p className="text-gray-500">Change the location and key details of your sublease.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Lease Name</label>
                  <input name="leaseName" value={form.leaseName} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <input name="leaseAddress" value={form.leaseAddress} onChange={handleChange} required className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Price per month (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
                  <input type="number" name="leasePrice" value={form.leasePrice} onChange={handleChange} required className={`${inputClass} pl-8`} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input type="date" name="leaseStartDate" value={form.leaseStartDate} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input type="date" name="leaseEndDate" value={form.leaseEndDate} onChange={handleChange} required className={inputClass} />
                </div>
              </div>
              <div ref={wrapperRef} className="relative">
                <label className={labelClass}>University Affiliation</label>
                {form.leaseSchool.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.leaseSchool.map((school) => (
                      <div key={school} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {schoolDisplayNames[school]}
                        <button type="button" onClick={() => handleSchoolToggle(school)} className="ml-2 text-blue-500 hover:text-blue-700 font-bold">×</button>
                      </div>
                    ))}
                  </div>
                )}
                <input type="text" placeholder="Search for a university..." onChange={(e) => { setSchoolSearch(e.target.value); setDropdownOpen(true); }} value={schoolSearch} className={inputClass} onFocus={() => setDropdownOpen(true)} />
                {dropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
                    {filteredSchools.map((school) => (
                      <label key={school} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <input type="checkbox" checked={form.leaseSchool.includes(school)} onChange={() => handleSchoolToggle(school)} className="mr-3 h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                        {schoolDisplayNames[school]}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: The Space */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Update the space details</h2>
                <p className="text-gray-500">Edit your photos, description, and amenities.</p>
              </div>
              <div>
                <label className={labelClass} htmlFor="leaseImage">Primary Image URL</label>
                <input id="leaseImage" name="leaseImage" type="text" value={form.leaseImage} onChange={handleChange} required className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Room Type</label>
                  <select name="roomType" value={form.roomType[0] || ""} onChange={handleRoomTypeChange} required className={inputClass}>
                    <option value="" disabled>Select...</option>
                    {SubleaseRoomTypeArray.map(type => <option key={type} value={type}>{type.replace("_", " ")}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Bedrooms</label>
                  <input type="number" name="numRoom" value={form.numRoom} onChange={handleChange} required className={inputClass} min="1" />
                </div>
                <div>
                  <label className={labelClass}>Bathrooms</label>
                  <input type="number" name="numBath" value={form.numBath} onChange={handleChange} required className={inputClass} min="1" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="leaseDescription" value={form.leaseDescription} onChange={handleChange} required rows={6} className={inputClass}></textarea>
                <p className={`text-sm mt-1 ${leaseDescriptionError ? 'text-red-600' : 'text-gray-500'}`}>{form.leaseDescription.length} / {maxChars}</p>
              </div>
              <div>
                <label className={labelClass}>Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {SubleaseAmenityArray.map(amenity => (
                    <button type="button" key={amenity} onClick={() => handleAmenityChange(amenity)} className={`p-4 border rounded-lg text-left transition-all duration-200 ${form.amenities.includes(amenity) ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-lg' : 'hover:border-gray-400 bg-gray-50'}`}>
                      <span className="font-semibold">{amenity.replace(/_/g, ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Review your changes</h2>
              <p className="text-gray-500">One final check. Does everything look correct?</p>
              <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                <img src={form.leaseImage || 'https://via.placeholder.com/400x250?text=No+Image+Provided'} alt="Lease" className="w-full h-64 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-2xl">{form.leaseName}</h3>
                <p className="text-gray-600">{form.leaseAddress}</p>
                <p className="font-bold text-3xl text-[#007AFF]">${form.leasePrice} <span className="text-lg text-gray-500 font-medium">/ month</span></p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2">Details</h4>
                  <p><strong>Dates:</strong> {new Date(form.leaseStartDate).toLocaleDateString()} to {new Date(form.leaseEndDate).toLocaleDateString()}</p>
                  <p><strong>Room Type:</strong> {form.roomType[0]?.replace("_", " ")}</p>
                  <p><strong>Layout:</strong> {form.numRoom} bed / {form.numBath} bath</p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2">Description</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{form.leaseDescription}</p>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {form.amenities.map(a => <span key={a} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">{a.replace(/_/g, ' ')}</span>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between items-center">
            <div>
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition">
                  Back
                </button>
              )}
            </div>
            {currentStep < 3 ? (
              <button type="button" onClick={nextStep} className="bg-[#007AFF] text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition">
                Next
              </button>
            ) : (
              <div className="flex items-center gap-6">
                <button type="button" onClick={handleDelete} className="text-red-600 font-semibold hover:underline">
                  Delete Listing
                </button>
                <button type="submit" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubleasePage;