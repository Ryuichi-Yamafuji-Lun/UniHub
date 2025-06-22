import { type SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import { Link } from "react-router-dom";

export default function SubleaseCard({ sublease }: { sublease: SubleaseResponse }) {
  const {
    id,
    leaseName,
    leasePrice,
    leaseImage,
    leaseAddress,
    leaseStartDate,
    leaseEndDate,
  } = sublease;

  return (
    <Link
      to={`/dormdrop/sublease/${id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
    >
      <img
        src={leaseImage}
        alt={leaseName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {leaseName}
        </h2>
        <p className="text-sm text-gray-600 truncate">{leaseAddress}</p>
        <p className="text-sm text-gray-500">
          {new Date(leaseStartDate).toLocaleDateString()} – {new Date(leaseEndDate).toLocaleDateString()}
        </p>
        <p className="text-[#084479] font-bold text-md">${leasePrice}/month</p>
      </div>
    </Link>
  );
}