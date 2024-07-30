const Generating = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-blue-600/40 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <img className="w-5 h-5 mr-4" src={"/assets/loading.png"} alt="Loading" />
      <span className="text-white">Remind User</span>
    </div>
  );
};

export default Generating;
