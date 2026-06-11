interface SectionDividerProps {
  flip?: boolean;
  className?: string;
}

export const SectionDivider = ({ flip = false, className = "" }: SectionDividerProps) => {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
          className="fill-gray-50"
        />
      </svg>
    </div>
  );
};

export const SectionDividerToWhite = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0 0C240 30 480 60 720 30C960 0 1200 60 1440 30V60H0V0Z"
          className="fill-gray-50"
        />
      </svg>
    </div>
  );
};
