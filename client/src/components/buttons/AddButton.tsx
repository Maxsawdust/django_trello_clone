import { IoMdAdd } from "react-icons/io";
import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { setIsCreatingProject } from "../../store/reducers/projectsReducers";

interface Props {
  children: React.ReactNode;
}

export default function AddButton({ children }: Props) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setIsCreatingProject(true));
  };

  return (
    <button
      className="w-full h-10 px-5 flex items-center gap-5 rounded-lg cursor-pointer hover:bg-background transition-all duration-150"
      onClick={handleClick}>
      <IoMdAdd size={20} />
      <p className="h-7 flex items-end">{children}</p>
    </button>
  );
}
