import { useEffect, useState } from "react";
import { AddButton, ProjectCard, ProjectInputCard } from "../";
import type { Project } from "../../store/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import {
  setCurrentProjectId,
  setProjects,
} from "../../store/reducers/projectsReducers";

export default function CurrentProjects() {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { projects, isCreatingProject } = useAppSelector(
    (state) => state.projects
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // fetch the django api endpoint to get all projects from DB
      const response = await fetch("http://127.0.0.1:8000/projects/get/");
      const data: Project[] = (await response.json()).projects;

      // test that the length of data isn't 0
      if (data.length === 0) {
        // return, because the currentId in store is 0 by default
        return;
      } else {
        // set the projects[] in store
        dispatch(setProjects(data));

        /* map the data array to get an array of ids then sort them descending 
           and grab the first one */
        const highestProjectId = data
          .map((project) => project.id)
          .sort((a, b) => b - a)[0];

        // set the current project id based on the projects in DB
        dispatch(setCurrentProjectId(highestProjectId));
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            return <ProjectCard key={project.id} title={project.title} />;
          })}

          {isCreatingProject && <ProjectInputCard />}
        </div>
      </div>
    );
  }
}
