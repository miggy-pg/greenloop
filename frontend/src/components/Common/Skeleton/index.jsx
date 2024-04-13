const Skeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl">
      {/*  image */}
      <div className="h-32 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>

      <div className="p-5">
        {/* title */}
        <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
        {/* content */}
        <div className="grid grid-cols-4 gap-1">
          <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>

          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
