import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router";
import { useAppSelector } from "../../store/hooks/reduxHooks";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import { RiExpandRightLine, RiExpandLeftLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const projects = useAppSelector((state) => state.projects.projects);

  return (
    <div className="relative h-full w-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-10 right-[-38px] py-3 px-1 flex justify-center items-center cursor-pointer rounded-r-lg bg-accent-2">
        {isOpen ? (
          <RiExpandLeftLine size={32} />
        ) : (
          <RiExpandRightLine size={32} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            className="h-full w-50 px-5 py-10 bg-accent-2">
            {/* NavLinks */}
            <div className="flex flex-col gap-3">
              <h2 className="text-xl border-b-2">Navigation</h2>
              <Link
                to="/"
                className="px-4 py-1 flex items-center gap-5 rounded-md hover:bg-background transition-all duration-150">
                <IoHomeSharp size={20} />
                Home
              </Link>
            </div>
            {/* Projects */}
            <div className="mt-20 flex flex-col gap-3">
              <h2 className="text-xl border-b-2">Projects</h2>
              {projects.map((project) => {
                return <ProjectCard project={project} />;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
