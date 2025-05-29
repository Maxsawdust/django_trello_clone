import { FaListCheck } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { ProjectOptions, ProjectEditInput } from "../";
import { AnimatePresence } from "framer-motion";
import { createContext, useEffect, useState } from "react";
import type { Project } from "../../store/types";
import { useLocation, useNavigate } from "react-router";

interface Props {
  project: Project;
}

interface EditingContextType {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

// state context to avoid crazy prop drilling all over the place
export const EditingContext = createContext<EditingContextType>({
  isEditing: false,
  setIsEditing: () => {},
});

export default function ProjectCard({ project }: Props) {
  const [optionsAreDisplayed, setOptionsAreDisplayed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleOptions = (e: React.MouseEvent) => {
    setOptionsAreDisplayed(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (optionsAreDisplayed && isEditing) setOptionsAreDisplayed(false);
  }, [isEditing]);

  useEffect(() => {
    // check if the user is on the project page
    if (pathname.match(/^\/[0-9]+$/)) {
      const id = pathname.replace("/", "");
      Number(id) == project.id ? setIsSelected(true) : setIsSelected(false);
    }
  }, [pathname]);

  return (
    <EditingContext.Provider value={{ isEditing, setIsEditing }}>
      <div
        className="relative w-full h-10 px-5 rounded-lg hover:bg-background transition-all duration-150"
        style={
          isSelected ? { backgroundColor: "var(--color-background)" } : {}
        }>
        <button
          className="h-full w-full flex items-center gap-5 cursor-pointer"
          onClick={() => navigate(`/${project.id}`)}>
          <FaListCheck size={20} />
          {/* Project name */}
          {isEditing ? (
            <ProjectEditInput project={project} />
          ) : (
            <p className="">{project.title}</p>
          )}
        </button>

        {/* Project options */}
        <button
          className="absolute right-5 top-[50%] translate-y-[-50%] h-5 w-5 flex items-center justify-center cursor-pointer rounded-sm hover:bg-accent-1 duration-150 group"
          onClick={handleOptions}>
          <SlOptions />

          <span
            className={`absolute top-7 h-fit w-fit px-2 text-md text-nowrap rounded-sm bg-secondary scale-0 opacity-0 ${
              optionsAreDisplayed
                ? ""
                : "group-hover:scale-100 group-hover:opacity-100"
            } transition-all duration-150`}>
            Edit or Delete
          </span>
        </button>
      </div>

      <AnimatePresence>
        {optionsAreDisplayed && (
          <ProjectOptions
            project={project}
            mousePosition={mousePosition}
            setOptionsAreDisplayed={setOptionsAreDisplayed}
          />
        )}
      </AnimatePresence>
    </EditingContext.Provider>
  );
}
