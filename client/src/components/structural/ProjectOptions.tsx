import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { OptionButton } from "../";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { EditingContext } from "./ProjectCard";
import type { Project } from "../../store/types";
import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { deleteProject } from "../../store/reducers/projectsReducers";

interface Props {
  mousePosition: { x: number; y: number };
  setOptionsAreDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
}

export default function ProjectOptions({
  mousePosition,
  setOptionsAreDisplayed,
  project,
}: Props) {
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const optionsRect = optionsRef.current?.getBoundingClientRect();

    const isOutsideOfRect =
      optionsRect &&
      (e.clientX < optionsRect.left ||
        e.clientY < optionsRect.top ||
        e.clientX > optionsRect.right ||
        e.clientY > optionsRect.bottom);

    if (isOutsideOfRect) setOptionsAreDisplayed(false);
  };

  const { isEditing, setIsEditing } = useContext(EditingContext);
  const dispatch = useAppDispatch();

  const editProject = () => {
    // set is editing true
    setIsEditing(true);
    console.log(isEditing);
    // need to make input appear if is editing
    // or replace this with project input??
  };

  const handleDeleteProject = async () => {
    // update DB
    const response = await fetch(
      `http://127.0.0.1:8000/projects/delete/${project.id}/`,
      { method: "DELETE" }
    );

    console.log(response);

    // update store
    dispatch(deleteProject(project.id));
    setOptionsAreDisplayed(false);
  };

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen z-10"
      onMouseDown={handleMouseDown}>
      <motion.div
        ref={optionsRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute h-fit w-35 p-2 flex flex-col items-start gap-2 bg-secondary rounded-md z-11"
        style={{ top: mousePosition.y, left: mousePosition.x }}>
        <OptionButton onClick={editProject} icon={<FaEdit size={19} />}>
          Edit
        </OptionButton>

        <OptionButton
          onClick={handleDeleteProject}
          icon={<MdDeleteForever size={20} />}>
          Delete
        </OptionButton>

        <div className=" w-full border-1 border-typography" />

        <div className="text-[12px] opacity-60">
          <p className="">Last updated:</p>
          <p className="">{new Date(project.updated_at).toLocaleString()}</p>
        </div>
      </motion.div>
    </div>
  );
}
