import { useMemo } from "react";
import { Link } from "react-router-dom";

import Card from "../../components/Card";
import GreetingCard from "../../components/GreetingCard";
import PostCard from "../../components/PostCard";
import Spinner from "../../components/Spinner";
import { useWastes } from "../../hooks/useWaste";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user:detail"));

  const { wastes, isLoading, error: wasteError } = useWastes();
  console.log("wastes: ", wastes);
  const isLoggedIn = user !== null || false;

  const sortedWaste =
    wastes &&
    wastes?.length > 0 &&
    wastes?.sort((a, b) => {
      return (
        new Date(b.waste?.createdAt).getTime() -
        new Date(a.waste?.createdAt).getTime()
      );
    });

  useMemo(() => {
    document.title = "Green Loop | Home";
  }, []);

  if (isLoading) return;

  return (
    <div className="bg-[#F8F8F8] w-full h-full mt-12 py-14" id="homepage">
      {isLoggedIn && (
        <div className="max-w-screen-md px-6 mx-auto flex flex-col text-center justify-center w-[40%] 2xl:w-[45%] xl:w-[55%] lg:w-[80%] lg:px-16 sm:px-8 xsm:px-0 2xsm:px-0">
          <GreetingCard user={user} />
          <Link to="listing">
            <Card wasteLength={wastes?.length} />
          </Link>
          {wastes &&
            wastes?.length > 0 &&
            sortedWaste?.map((waste, index) => (
              <PostCard key={index} props={waste} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
