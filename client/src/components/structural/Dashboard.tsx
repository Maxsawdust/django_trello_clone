export default function Dashboard() {
  return (
    <div className="h-[80%] w-[70%] p-5 flex gap-5">
      {/* current projects bit */}
      <div className="h-full w-[25%] py-5 px-2 bg-white rounded-2xl">
        <div className="flex flex-col items-center">
          <h2 className="text-[28px] font-semibold text-center uppercase">
            current projects
          </h2>

          <div className="border-2 border-primary mt-2 w-full" />
        </div>

        <div className="flex flex-col mt-5 gap-3">
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
        </div>
      </div>

      {/* container for graphs */}
      <div className="flex-1 flex flex-col gap-5">
        {/* "Achievements" */}
        <div className="w-full h-[50%] bg-white rounded-2xl"></div>

        {/* Progress graph */}
        <div className="w-full h-[50%] bg-white rounded-2xl"></div>
      </div>
    </div>
  );
}
