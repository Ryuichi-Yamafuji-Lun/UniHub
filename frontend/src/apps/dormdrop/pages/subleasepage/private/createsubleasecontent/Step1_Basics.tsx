import { useState, useRef, useEffect } from "react";
import { useSubleaseForm } from "@/apps/dormdrop/pages/subleasepage/private/createsubleasecontent/useSubleaseForm";
import { SchoolsArray, type Schools, schoolDisplayNames } from "@/types/enums/Schools";

export const Step1_Basics = () => {
  const { form, updateForm, errors } = useSubleaseForm();
  const [schoolSearch, setSchoolSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSchools = SchoolsArray.filter((school) =>
    schoolDisplayNames[school].toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const handleSchoolToggle = (school: Schools) => {
    const newSchools = form.leaseSchool.includes(school)
      ? form.leaseSchool.filter((s) => s !== school)
      : [...form.leaseSchool, school];
    updateForm('leaseSchool', newSchools);
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

  const inputClass = "w-full px-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2";
  const labelClass = "block text-md font-semibold text-gray-700 mb-2";
  const errorClass = "border-red-500 focus:ring-red-500";
  const normalClass = "border-gray-300 focus:ring-[#007AFF]";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2">Let's start with the basics</h2>
        <p className="text-gray-500">Tell us the location and key details of your sublease.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Lease Name</label>
          <input name="leaseName" value={form.leaseName} onChange={(e) => updateForm('leaseName', e.target.value)} className={`${inputClass} ${errors.leaseName ? errorClass : normalClass}`} placeholder="e.g. The Standard - 1 Bed/1 Bath" />
          {errors.leaseName && <p className="text-red-500 text-sm mt-1">{errors.leaseName}</p>}
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <input name="leaseAddress" value={form.leaseAddress} onChange={(e) => updateForm('leaseAddress', e.target.value)} className={`${inputClass} ${errors.leaseAddress ? errorClass : normalClass}`} placeholder="123 University Ave" />
          {errors.leaseAddress && <p className="text-red-500 text-sm mt-1">{errors.leaseAddress}</p>}
        </div>
      </div>
      <div>
        <label className={labelClass}>Price per month (USD)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
          <input type="number" name="leasePrice" value={form.leasePrice} onChange={(e) => updateForm('leasePrice', e.target.value)} placeholder="e.g. 300+" className={`${inputClass} pl-8 ${errors.leasePrice ? errorClass : normalClass}`} />
        </div>
        {errors.leasePrice && <p className="text-red-500 text-sm mt-1">{errors.leasePrice}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Start Date</label>
          <input type="date" name="leaseStartDate" value={form.leaseStartDate} onChange={(e) => updateForm('leaseStartDate', e.target.value)} max={form.leaseEndDate || undefined} className={`${inputClass} ${errors.leaseStartDate ? errorClass : normalClass}`} />
          {errors.leaseStartDate && <p className="text-red-500 text-sm mt-1">{errors.leaseStartDate}</p>}
        </div>
        <div>
          <label className={labelClass}>End Date</label>
          <input type="date" name="leaseEndDate" value={form.leaseEndDate} onChange={(e) => updateForm('leaseEndDate', e.target.value)} min={form.leaseStartDate || undefined} className={`${inputClass} ${errors.leaseEndDate ? errorClass : normalClass}`} />
          {errors.leaseEndDate && <p className="text-red-500 text-sm mt-1">{errors.leaseEndDate}</p>}
        </div>
      </div>
      <div ref={wrapperRef} className="relative">
        <label className={labelClass}>Which university is this for?</label>
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
        <input type="text" placeholder="Search for a university..." onChange={(e) => { setSchoolSearch(e.target.value); setDropdownOpen(true); }} value={schoolSearch} className={`${inputClass} ${errors.leaseSchool ? errorClass : normalClass}`} onFocus={() => setDropdownOpen(true)} />
        {errors.leaseSchool && <p className="text-red-500 text-sm mt-1">{errors.leaseSchool}</p>}
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
  );
};