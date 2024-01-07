import Card from "../../components/Card";
import PostCard from "../../components/PostCard";
import GreetingCard from "../../components/GreetingCard";
import { useEffect,  useState } from "react";
import {jwtDecode} from "jwt-decode"
import { fetchUser } from "../../api/user";


const Home = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("user:token")
  const isLoggedIn = token !== null || false;
  
  useEffect(() => {
    async function getUser(){

      try{
        const {data} = await fetchUser(jwtDecode(token).userId)
        setUser(data[0].user)
        console.log("data: ", data);
      }
      catch(err){
        console.log(err)
      }
    } 
    getUser()
		
  }, [token]);

  return (
    <div className="bg-[#F8F8F8] w-full h-screen mt-12 py-14" id="homepage">
      <div className="max-w-screen-md px-6 sm:px-8 lg:px-16 mx-auto flex flex-col text-center justify-center">
        {isLoggedIn && <GreetingCard user={user} />}
        <Card />
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
