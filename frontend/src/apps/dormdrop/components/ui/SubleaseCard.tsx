import { type SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function SubleaseCard({ sublease }: { sublease: SubleaseResponse }) {
  const {
    id,
    leaseName,
    leasePrice,
    leaseImages,
    leaseAddress,
    leaseStartDate,
    leaseEndDate,
  } = sublease;

  // 1. Find the image object that has position 0.
  const primaryImageObject = leaseImages?.find(img => img.imagePosition === 0);

  // 2. Get the URL from that object, or null if it wasn't found.
  const primaryImageUrl = primaryImageObject ? primaryImageObject.imageUrl : null;

  return (
    <Link
      to={`/dormdrop/sublease/${id}`}
      className="block w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1"
    >
      <div className="w-full h-48">
        {primaryImageUrl ? (
          <img
            src={primaryImageUrl}
            alt={leaseName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <FontAwesomeIcon icon={faImage} className="text-gray-400 text-4xl" />
          </div>
        )}
      </div>

      <div className="p-4 space-y-1">
        <h2 className="text-base font-semibold text-gray-900 truncate">
          {leaseName}
        </h2>
        <p className="text-sm text-gray-600 truncate">{leaseAddress}</p>
        <p className="text-xs text-gray-500">
          {new Date(leaseStartDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })} –{" "}
          {new Date(leaseEndDate).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
        </p>
        <p className="text-[#084479] font-bold text-base pt-1">${leasePrice}/month</p>
      </div>
    </Link>
  );
}