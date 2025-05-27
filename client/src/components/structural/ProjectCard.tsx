import { FaListCheck } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import ProjectOptions from "./ProjectOptions";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  title: string;
}

export default function ProjectCard({ title }: Props) {
  const [optionsAreDisplayed, setOptionsAreDisplayed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleOptions = (e: React.MouseEvent) => {
    setOptionsAreDisplayed(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div className="relative w-full h-10 px-5 rounded-lg hover:bg-background transition-all duration-150">
        <button
          className="h-full w-full flex items-center gap-5 cursor-pointer"
          onClick={() => console.log("button1")}>
          <FaListCheck size={20} />
          {/* Project name */}
          <p className="">{title}</p>
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
            mousePosition={mousePosition}
            setOptionsAreDisplayed={setOptionsAreDisplayed}
          />
        )}
      </AnimatePresence>
    </>
  );
}
