import { CurrentProjects } from "../components";

export default function Dashboard() {
  return (
    <div className="h-[80%] w-[70%] p-5 flex gap-5">
      {/* current projects bit */}
      <CurrentProjects />

      {/* container for graphs */}
      <div className="flex-1 flex flex-col gap-5">
        {/* "Achievements" */}
        <div className="w-full h-[50%] bg-white rounded-2xl"></div>

        {/* Progress graph */}
        <div className="w-full h-[50%] bg-accent-2 rounded-2xl"></div>
      </div>
    </div>
  );
}
