import { useMemo } from "react";

import Card from "../../components/Common/Card";
import GreetingCard from "../../components/Common/GreetingCard";
import PostCard from "../../components/Common/PostCard";
import Spinner from "../../components/Common/Spinner";
import defaultImage from "../../assets/images/default-image.jpg";
import wasteDefaultImage from "../../assets/images/waste-default-image.webp";
import { useWastes } from "../../hooks/useWaste";
import Body from "../../components/Common/Body";

const Home = () => {
  document.title = "Green Loop | Home";

  const user = JSON.parse(localStorage.getItem("user:detail"));
  const isLoggedIn = user !== null || false;

  const wasteQuery = useWastes();
  const {
    wasteQuery: { data: wastes },
    isLoading,
    error,
  } = useMemo(() => wasteQuery, [wasteQuery]);

  if (isLoading) return <Spinner />;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <Body bodyClass={"bg-[#F8F8F8] mt-12 py-14"} pageId="homepage">
      {isLoggedIn && (
        <div className="max-w-screen-md px-6 mx-auto flex flex-col text-center justify-center w-4/10 2xl:w-45/10 xl:w-7/12 lg:w-10/12 lg:px-16 sm:px-8 xsm:px-0 2xsm:px-0">
          <GreetingCard user={user} />
          <Card wasteLength={wastes?.length} />
          {isLoggedIn &&
            wastes?.map((waste, index) => (
              <PostCard
                key={index}
                props={waste}
                defaultImage={defaultImage}
                wasteDefaultImage={wasteDefaultImage}
              />
            ))}
        </div>
      )}
    </Body>
  );
};

export default Home;
