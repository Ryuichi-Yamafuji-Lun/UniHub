const SkeletonCard = () => {
  return (
    <div className="w-[250px] bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-36 bg-gray-300" />

      {/* Content Placeholder */}
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-1/4 mt-1" />
      </div>
    </div>
  );
};

export default SkeletonCard;