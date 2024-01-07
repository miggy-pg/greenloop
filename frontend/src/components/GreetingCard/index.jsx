const GreetingCard = ({user}) =>{
  return (
    <div className="p-4 bg-gradient-to-r from-[#50792D] to-[#66A62E] border border-gray-200 shadow-sm rounded-3xl my-2">
      <div className="items-center justify-between lg:flex">
        <div className="flex h-[10rem] py-5 px-4 lg:mb-0 text-left justify-center items-center">
          <div>
            <h3 className="mb-2 text-2xl font-normal text-white">
              Welcome back,
            </h3>
            <span className="text-4xl font-bold text-white">
              {user?.companyName}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreetingCard