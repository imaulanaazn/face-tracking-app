import brackets from "../../../public/assets/svg/Brackets";

const TagLine = ({ className, children }) => {
  return (
    <div
      className={`tagline flex items-center justify-center ${className || ""}`}
    >
      {brackets("left")}
      <div className="mx-3 text-gray-600">{children}</div>
      {brackets("right")}
    </div>
  );
};

export default TagLine;
