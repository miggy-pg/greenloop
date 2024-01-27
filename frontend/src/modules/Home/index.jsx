import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import Card from "../../components/Card";
import GreetingCard from "../../components/GreetingCard";
import PostCard from "../../components/PostCard";
import { fetchWastes } from "../../api/waste";
import { fetchUser } from "../../api/user";

const Home = () => {
  const [user, setUser] = useState({});
  const [waste, setWaste] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("user:token");
  const isLoggedIn = token !== null || false;

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await fetchUser(jwtDecode(token).userId);
        const { data: waste } = await fetchWastes();
        setIsLoading(false);
        setUser(data[0].user);
        setWaste(waste);
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [token]);

  const sortedWaste = waste.sort((a, b) => {
    return (
      new Date(b.waste.createdAt).getTime() -
      new Date(a.waste.createdAt).getTime()
    );
  });

  if (isLoading) return;
  return (
    <div className="bg-[#F8F8F8] w-full h-full mt-12 py-14" id="homepage">
      <div className="max-w-screen-md px-6 mx-auto flex flex-col text-center justify-center w-[40%] 2xl:w-[45%] xl:w-[55%] lg:w-[80%] lg:px-16 sm:px-8 xsm:px-0 2xsm:px-0">
        {isLoggedIn && <GreetingCard user={user} />}
        <Link to="listing">
          <Card />
        </Link>
        {sortedWaste.map((waste, i) => (
          <PostCard key={i} props={waste} />
        ))}
      </div>
    </div>
  );
};

export default Home;
