import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";
import type { UserAccount } from "@/types/UserAccount";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import api from "@/lib/axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

const SubleaseDetailPage = () => {
  const { id } = useParams();
  const [sublease, setSublease] = useState<SubleaseResponse | null>(null);
  const [account, setAccount] = useState<UserAccount | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/v1/public/subleases/${id}`);
        setSublease(res.data);
      } catch (err) {
        console.error("Failed to fetch sublease:", err);
        setError("Failed to load sublease. Please try again.");
      }

      try {
        const accountRes = await api.get("/api/v2/user/account/me");
        setAccount(accountRes.data);
      } catch {
        setAccount(null);
      }
    };

    fetchData();
  }, [id]);

  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!sublease) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const placeholderImage = "/default-placeholder.png";

  const realImages = sublease.leaseImages
    ? [...sublease.leaseImages]
        .sort((a, b) => a.imagePosition - b.imagePosition)
        .map(img => img.imageUrl)
    : [];

  const getImageUrlByPosition = (pos: number): string => {
    const image = sublease.leaseImages?.find(img => img.imagePosition === pos);
    return image ? image.imageUrl : placeholderImage;
  };

  const galleryImages = [
    getImageUrlByPosition(0), 
    getImageUrlByPosition(1),
    getImageUrlByPosition(2),
    getImageUrlByPosition(3),
    getImageUrlByPosition(4),
  ];

  const rating = sublease.numberOfRatings && sublease.numberOfRatings > 0
    ? (sublease.sumOfRatings! / sublease.numberOfRatings!).toFixed(1)
    : "New";
  const reviewCount = sublease.numberOfRatings || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* --- Title Section --- */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 text-left">{sublease.leaseName}</h1>
        <div className="flex justify-between items-center mt-2 text-sm">
            <p className="text-gray-600 underline cursor-pointer hover:text-blue-600">
              {sublease.leaseAddress}
            </p>
        </div>
      </div>

      {/* --- Image Gallery --- */}
      <div className="md:hidden">
        <ImageCarousel images={realImages.length > 0 ? realImages : [placeholderImage]} altText={sublease.leaseName} />
      </div>
      
      <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2 h-[450px] rounded-xl overflow-hidden">
        {galleryImages.map((imageUrl, index) => (
          <div
            key={index}
            className={index === 0 ? "col-span-2 row-span-2" : ""}
          >
            <img 
              src={imageUrl} 
              alt={`${sublease.leaseName} image ${index + 1}`} 
              className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition" 
            />
          </div>
        ))}
      </div>

      {/* --- Main Content --- */}
      <div className="mt-10 flex flex-col lg:flex-row gap-12">
        {/* Left Column: Details */}
        <div className="lg:w-2/3 space-y-8 text-left">
          <div>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {sublease.roomType.map(rt => rt.replace(/_/g, " ")).join(", ")} Sublease
                    </h2>
                    <p className="text-gray-600">{sublease.numRoom} bedrooms · {sublease.numBath} bath</p>
                </div>
                {account && account.id === sublease.ownerId && (
                  <Link
                    to={`/dormdrop/sublease/${sublease.id}/edit`}
                    className="bg-[#084479] text-white px-4 py-2 rounded-lg hover:bg-[#06345d] text-sm font-semibold whitespace-nowrap"
                  >
                    Edit Sublease
                  </Link>
                )}
            </div>
          </div>
          
          <hr />

          <DetailSection title="Description">
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">{sublease.leaseDescription}</p>
          </DetailSection>
          
          <hr />
          
          <DetailSection title="Lease Details">
             <ul className="text-gray-700 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li><strong>Dates:</strong> {new Date(sublease.leaseStartDate).toLocaleDateString()} → {new Date(sublease.leaseEndDate).toLocaleDateString()}</li>
                <li><strong>Price:</strong> ${sublease.leasePrice}/month</li>
                <li><strong>Rooms:</strong> {sublease.numRoom} bedrooms</li>
                <li><strong>Baths:</strong> {sublease.numBath} baths</li>
                <li><strong>Dimensions:</strong> {sublease.roomWidth}ft x {sublease.roomDepth}ft</li>
             </ul>
          </DetailSection>
          
          <hr />

          <DetailSection title="What this place offers">
            <ul className="flex flex-wrap gap-3 mt-4 text-sm">
              {Array.from(sublease.amenities).map((amenity) => (
                <li key={amenity} className="px-4 py-2 border rounded-md bg-gray-50 capitalize">
                  {amenity.replace(/_/g, " ").toLowerCase()}
                </li>
              ))}
            </ul>
          </DetailSection>

          <hr />

          <DetailSection title="Preferred Universities">
            <ul className="flex flex-wrap gap-2 mt-4 text-sm">
              {Array.from(sublease.school).map((school) => (
                <li key={school} className="px-3 py-1 border rounded-full bg-blue-50 text-blue-800 font-medium capitalize">
                  {school}
                </li>
              ))}
            </ul>
          </DetailSection>
        </div>

        {/* Right Column: Sticky Contact Card */}
        <div className="lg:w-1/3">
          <div className="sticky top-28 border rounded-xl shadow-lg p-6 space-y-6">
            <div className="text-2xl font-bold text-gray-900">
              ${sublease.leasePrice} <span className="font-normal text-base text-gray-600">/ month</span>
            </div>

            <Link
              to={`/account/${sublease.ownerId}`}
              className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition -m-3"
            >
              <img
                src={account?.profilePicture || `https://ui-avatars.com/api/?name=${account?.firstName}+${account?.lastName}&background=random`}
                alt={sublease.ownerUsername}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">Hosted by {sublease.ownerUsername}</p>
                 <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" /> 
                  <span className="font-bold">{rating}</span> 
                  ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                </p>
              </div>
            </Link>

            <button className="w-full bg-[#084479] text-white py-3 rounded-lg hover:bg-[#06345d] font-semibold text-base transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#084479]">
              Contact Subleaser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubleaseDetailPage;