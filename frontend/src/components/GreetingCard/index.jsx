const GreetingCard = ({ user }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-[#50792D] to-[#66A62E] border border-gray-200 shadow-sm rounded-3xl my-2">
      <div className="items-center justify-between lg:flex">
        <div className="flex h-[12rem] py-5 px-8 text-left justify-start items-center lg:mb-0 lg:px-3 sm:h-[5rem] xsm:px-3 xsm:h-[4rem]">
          <div>
            <h3 className="text-3xl font-normal text-white lg:text-2xl sm:text-xl xsm:text-sm xsm:leading-3">
              Welcome back,
            </h3>
            <h2 className="text-5xl font-bold text-white sm:text-3xl sm:leading-8 xsm:text-2xl">
              {user?.companyName}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;
