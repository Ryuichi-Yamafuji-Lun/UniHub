import SubleaseCard from "@/apps/dormdrop/components/ui/SubleaseCard";
import type { SubleaseResponse } from "@/apps/dormdrop/types/SubleaseResponse";

interface SubleaseGridProps {
  subleases: SubleaseResponse[];
}

const SubleaseGrid = ({ subleases }: SubleaseGridProps) => {
  if (subleases.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        No subleases match your filters.
      </div>
    );
  }

  return (
    <div className="grid place-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4">
      {subleases.map((sublease) => (
        <SubleaseCard key={sublease.id} sublease={sublease} />
      ))}
    </div>
  );
};

export default SubleaseGrid;