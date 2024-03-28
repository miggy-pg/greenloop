const Spinner = () => {
  return (
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="w-12 h-12 border-4 border-white rounded-full animate-spin">
            <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping"></div>
        </div>
      </div>
  )
  
};

export default Spinner;
