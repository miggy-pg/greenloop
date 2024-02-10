import { Link } from "react-router-dom";

import Card from "../../components/Card";
import GreetingCard from "../../components/GreetingCard";
import PostCard from "../../components/PostCard";
import { useUser } from "../../hooks/useUser";
import { useWastes } from "../../hooks/useWaste";
import { token } from "../../constants/userData";

const Home = () => {
  const { userData, isLoading: userLoading, error: userError } = useUser();
  const { wastes, isLoading: wasteLoading, error: wasteError } = useWastes();

  const isLoggedIn = token !== null || false;

  const sortedWaste =
    wastes?.length &&
    wastes.sort((a, b) => {
      return (
        new Date(b.waste.createdAt).getTime() -
        new Date(a.waste.createdAt).getTime()
      );
    });

  if (userLoading || wasteLoading) return;
  return (
    <div className="bg-[#F8F8F8] w-full h-full mt-12 py-14" id="homepage">
      {isLoggedIn && userData && (
        <div className="max-w-screen-md px-6 mx-auto flex flex-col text-center justify-center w-[40%] 2xl:w-[45%] xl:w-[55%] lg:w-[80%] lg:px-16 sm:px-8 xsm:px-0 2xsm:px-0">
          <GreetingCard user={userData[0]} />
          <Link to="listing">
            <Card wasteLength={wastes?.length} />
          </Link>
          {sortedWaste?.map((waste, i) => (
            <PostCard key={i} props={waste} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
