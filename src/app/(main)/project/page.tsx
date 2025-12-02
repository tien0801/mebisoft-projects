import {
  Members,
  Activities,
  Attachments,
} from "@/features/activity-log/components";

const Project = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8 font-sans text-gray-900">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Project Overview
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <Members />
          <Attachments />
          <Activities />
        </div>
      </div>
    </div>
  );
};

export default Project;
