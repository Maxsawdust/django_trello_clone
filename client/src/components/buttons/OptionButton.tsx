import React from "react";

interface Props {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}

export default function OptionButton({ icon, children }: Props) {
  return (
    <button className="h-fit w-full px-2 py-1 flex items-center gap-5 rounded-md hover:bg-background transition-all duration-150 text-background hover:text-accent-1">
      {icon}

      <p className="h-5 ">{children}</p>
    </button>
  );
}
