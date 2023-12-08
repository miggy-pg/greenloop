import axios from "axios";
import Card from "../../components/Card";
import PostCard from "../../components/PostCard";

const Home = () => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;

  const getUser = async () => {
    const res = await axios.get("http://localhost:8000/api/get-user");
    console.log("res: ", res);
  }
  getUser()


  return (
    <div className="bg-[#F8F8F8] w-full mt-24 py-11" id="homepage">
      <div className="max-w-screen-md px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        {isLoggedIn && <div className="p-4 bg-gradient-to-r from-[#50792D] to-[#66A62E] border border-gray-200 shadow-sm rounded-3xl my-2">
          <div className="items-center justify-between lg:flex">
            <div className="flex h-[10rem] py-5 px-4 lg:mb-0 text-left justify-center items-center">
              <div>
                <h3 className="mb-2 text-2xl font-normal text-white">
                  Welcome back,
                </h3>
                <span className="text-4xl font-bold text-white">
                  ENVIROTECH
                </span>
              </div>
            </div>
          </div>
        </div>}
        <Card />
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
