const MenuSvg = ({ openNavigation }) => {
  return (
    <svg
      className="overflow-visible"
      width="40"
      height="20"
      viewBox="0 0 40 20"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "0"}
        width="20"
        height="2"
        rx="1"
        fill="black"
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "5" : "10"}
        width="20"
        height="2"
        rx="1"
        fill="black"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;
