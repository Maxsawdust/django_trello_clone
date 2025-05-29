import { Suspense, useEffect } from "react";
import { useRoutes } from "react-router";
import routes from "~react-pages";
import type { Project } from "./store/types";
import { useAppDispatch } from "./store/hooks/reduxHooks";
import {
  setCurrentProjectId,
  setIsLoading,
  setProjects,
} from "./store/reducers/projectsReducers";

export default function App() {
  const dispatch = useAppDispatch();

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
      dispatch(setIsLoading(false));
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="h-screen w-screen flex justify-center items-center">
        {useRoutes(routes)}
      </div>
    </Suspense>
  );
}
