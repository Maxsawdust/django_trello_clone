import React from "react";

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}

export default function OptionButton({ icon, children, onClick }: Props) {
  return (
    <button
      className="h-fit w-full px-2 py-1 flex items-center gap-5 rounded-md hover:bg-background transition-all duration-150 hover:text-accent-1"
      onClick={onClick}>
      {icon}

      <p className="h-5 ">{children}</p>
    </button>
  );
}
