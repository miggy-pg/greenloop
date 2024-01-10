import Card from "../../components/Card";
import PostCard from "../../components/PostCard";
import GreetingCard from "../../components/GreetingCard";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchUser } from "../../api/user";
import { fetchWastes } from "../../api/waste";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState({});
  const [waste, setWaste] = useState([]);

  const token = localStorage.getItem("user:token");
  const isLoggedIn = token !== null || false;

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await fetchUser(jwtDecode(token).userId);
        const { data: waste } = await fetchWastes();
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
    // return new Date(a.waste.createdAt) - new Date(b.waste.createdAt);
  });

  // console.log("sortedWaste: ", sortedWaste);
  console.log("waste: ", waste);
  console.log("sortedWaste: ", sortedWaste);
  return (
    <div className="bg-[#F8F8F8] w-full h-screen mt-12 py-14" id="homepage">
      <div className="max-w-screen-md px-6 sm:px-8 lg:px-16 mx-auto flex flex-col text-center justify-center">
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
