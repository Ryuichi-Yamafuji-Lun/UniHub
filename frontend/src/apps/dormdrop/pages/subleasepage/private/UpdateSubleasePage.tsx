import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import api from "@/lib/axios";

import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";
import { SubleaseAmenityArray, type SubleaseAmenity } from "@/apps/dormdrop/types/enums/SubleaseAmenity";
import { SubleaseRoomTypeArray, type SubleaseRoomType } from "@/apps/dormdrop/types/enums/SubleaseRoomType";

const AccordionSection = ({ title, children, isOpen, onToggle }: { title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void }) => (
  <div className="border-b border-gray-200">
    <h2>
      <button
        type="button"
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 font-semibold text-xl text-left text-gray-800 hover:text-black"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#007AFF]' : ''}`} />
      </button>
    </h2>
    <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">
        <div className="pb-8 space-y-8">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const UpdateSubleasePage = () => {
  const { subleaseId } = useParams<{ subleaseId: string }>();
  const navigate = useNavigate();
  const maxChars = 1000;

  const [openSection, setOpenSection] = useState<string | null>('basics');

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
      setForm(prev => ({ ...prev, [name]: numericFields.includes(name) ? Number(value) : value }));
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

  const handleToggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Update Your Listing</h1>
          <p className="text-gray-500 mt-2">Make changes to your sublease listing. Click a section to expand and edit.</p>
        </div>

        <AccordionSection title="The Basics" isOpen={openSection === 'basics'} onToggle={() => handleToggleSection('basics')}>
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
              <input type="date" name="leaseStartDate" value={form.leaseStartDate} onChange={handleChange} max={form.leaseEndDate || undefined} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input type="date" name="leaseEndDate" value={form.leaseEndDate} onChange={handleChange} min={form.leaseStartDate || undefined} required className={inputClass} />
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
        </AccordionSection>

        <AccordionSection title="The Space & Details" isOpen={openSection === 'space'} onToggle={() => handleToggleSection('space')}>
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
        </AccordionSection>

        <AccordionSection title="Amenities" isOpen={openSection === 'amenities'} onToggle={() => handleToggleSection('amenities')}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SubleaseAmenityArray.map(amenity => (
              <button type="button" key={amenity} onClick={() => handleAmenityChange(amenity)} className={`p-4 border rounded-lg text-left transition-all duration-200 ${form.amenities.includes(amenity) ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-lg' : 'hover:border-gray-400 bg-gray-50'}`}>
                <span className="font-semibold">{amenity.replace(/_/g, ' ')}</span>
              </button>
            ))}
          </div>
        </AccordionSection>

        <div className="mt-12 pt-6 border-t flex justify-end items-center gap-6">
          <button type="button" onClick={handleDelete} className="text-red-600 font-semibold hover:underline">
            Delete Listing
          </button>
          <button type="submit" className="bg-green-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSubleasePage;