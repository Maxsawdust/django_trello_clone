import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/reduxHooks";
import {
  addProject,
  setCurrentProjectId,
  setIsCreatingProject,
} from "../../store/reducers/projectsReducers";
import type { Project } from "../../store/types";

export default function ProjectInputCard() {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const newCurrentProjectId =
    useAppSelector((state) => state.projects.currentProjectId) + 1;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBlur = () => {
    dispatch(setIsCreatingProject(false));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // check that input not empty
      if (inputValue === "") {
        dispatch(setIsCreatingProject(false));
        return;
      }

      // add project to DB
      const projectData: Project = {
        title: inputValue, // user input value
        id: newCurrentProjectId, // current Id from store + 1
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      };
      addProjectToDB(projectData);

      // add to sto'
      dispatch(addProject(projectData));
      dispatch(setCurrentProjectId(newCurrentProjectId));
      dispatch(setIsCreatingProject(false));
    } else {
      return;
    }
  };

  const addProjectToDB = async (projectData: Project) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/projects/add/", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to add project");

      console.log(await response.json());
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const examplePlaceholders = [
    "Plan a weekend road trip",
    "Start a veggie garden",
    "Organize a movie night",
    "Learn to play guitar",
    "Bake a chocolate cake",
    "Build a treehouse",
    "Host a game tournament",
    "Paint the living room",
    "Adopt a rescue pet",
    "Try a new sport",
    "Write a short story",
    "Go camping with friends",
    "Make a photo album",
    "Volunteer at an animal shelter",
    "Run a 5k race",
    "Start a book club",
    "Fix up an old bike",
    "Learn a new language",
    "Plan a surprise party",
    "Create a YouTube channel",
  ];

  return (
    <input
      ref={inputRef}
      type="text"
      className="h-10 w-full px-5 bg-background rounded-lg"
      placeholder={`E.G: ${
        examplePlaceholders[Math.floor(Math.random() * 20)]
      }`}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
}
