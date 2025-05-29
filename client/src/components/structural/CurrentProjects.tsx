import { AddButton, ProjectCard, ProjectInputCard } from "../";

import { useAppSelector } from "../../store/hooks/reduxHooks";

export default function CurrentProjects() {
  const { projects, isCreatingProject, isLoading } = useAppSelector(
    (state) => state.projects
  );

  if (isLoading) {
    return (
      <div className="h-full w-[25%] py-5 px-2 bg-white rounded-2xl">
        <div className="flex flex-col items-center">
          <div className="h-10.5 w-full bg-background rounded-lg" />

          <div className="border-2 border-primary mt-5 w-full" />
        </div>

        <div className="flex flex-col mt-5 gap-3">
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
          <div className="w-full h-10 bg-background rounded-lg" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-[25%] py-5 px-2 bg-white rounded-2xl">
        <div className="flex flex-col items-center">
          <h2 className="text-[28px] font-semibold text-center uppercase">
            current projects
          </h2>

          <div className="border-2 border-primary mt-2 w-full" />
        </div>

        <div className="flex flex-col mt-5 gap-3">
          <AddButton>Start a new project</AddButton>
          {projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}

          {isCreatingProject && <ProjectInputCard />}
        </div>
      </div>
    );
  }
}
