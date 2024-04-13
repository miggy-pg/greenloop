import { useMemo } from "react";

import Body from "../../components/Common/Body";
import NoWasteCard from "../../components/Common/Cards/NoWasteCard";
import GreetingCard from "../../components/Common/Cards/GreetingCard";
import WasteCard from "../../components/Common/Cards/WasteCard";
import SKGreetingCard from "../../components/Common/Skeleton/SKGreetingCard";
// import SKWaste
import defaultImage from "../../assets/images/default-image.jpg";
import wasteDefaultImage from "../../assets/images/waste-default-image.webp";
import { useWastes } from "../../hooks/useWaste";
import SKNoWasteCard from "../../components/Common/Skeleton/SKNoWasteCard";
import SKWasteCard from "../../components/Common/Skeleton/SKWasteCard";

const wasteItem = [
  {
    id: 1,
    title: "Plastic Bottle",
    image: "https://via.placeholder.com/150",
    description: "This is a plastic bottle",
    category: "Plastic",
    createdAt: "2021-09-01T00:00:00.000Z",
    available: true,
    user: {
      id: 1,
      companyName: "John Doe",
      image: "https://via.placeholder.com/150",
    },
  },
];

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

  if (error) return <h1>Error: {error.message}</h1>;
  console.log("isLoadingWasteLength: ", isLoading && !wastes?.length);
  return (
    <Body bodyClass={"bg-[#F8F8F8] mt-12 py-14"} pageId="homepage">
      {isLoggedIn && (
        <div className="max-w-screen-md px-6 mx-auto flex flex-col text-center justify-center w-4/10 2xl:w-45/10 xl:w-7/12 lg:w-10/12 lg:px-16 sm:px-8 xsm:px-0 2xsm:px-0">
          <GreetingCard user={user} />
          {isLoading && !wastes?.length ? <SKNoWasteCard /> : <NoWasteCard />}
          {/* {isLoading && !wastes?.length ? <SKNoWasteCard /> : <NoWasteCard />} */}
          {isLoading && !wastes?.length
            ? wastes?.length && <SKWasteCard />
            : wastes?.map((waste, index) => (
                <WasteCard
                  key={index}
                  props={waste}
                  defaultImage={defaultImage}
                  wasteDefaultImage={wasteDefaultImage}
                  loggedInUser={user}
                />
              ))}
        </div>
      )}
    </Body>
  );
};

export default Home;
