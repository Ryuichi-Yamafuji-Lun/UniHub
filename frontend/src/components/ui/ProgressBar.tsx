export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ["The Basics", "The Space", "Review & Publish"];
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