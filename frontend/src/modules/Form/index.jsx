import axios from "axios";

import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import forrestImage from "../../assets/images/login.png";
import leavesImage from "../../assets/images/signup.png";
import greenLoopLogo from "../../assets/images/greenLoop.png";
import { useDispatch } from "react-redux";
import { successLogin } from "../../redux/userSlice";

const organizationType = [
  { value: "Waste Generator", label: "Waste Generator" },
  { value: "Recycling Startup", label: "Recycling Startup" },
  { value: "Informal Waste Sector", label: "Informal Waste Sector" },
];

const Form = ({ isSignInPage = true }) => {
  const [orgtype, setOrgType] = useState(organizationType[0].value);
  const [userSignUp, setUserSignUp] = useState({
      companyName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      province: "",
      cityMunicipality: "",
      organizationType: orgtype,
  });

  const dispatch = useDispatch();
  const [userSignIn, setUserSignIn] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSelectChange(e) {
    setOrgType(e.target.value);
  }

  function formOnChange(e) {
    setUserSignUp({ ...userSignUp, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    console.log("userSign: ", userSignIn);

    e.preventDefault();
    const res = await axios.post(
      `http://localhost:8000/api/${isSignInPage ? "sign-in" : "sign-up"}`,
      isSignInPage ? userSignIn : userSignUp
    );

    console.log("res: ", res.data);

    if (res.status === 400) {
      alert("Invalid credentials");
    } else {
      if (res.data.token) {
        localStorage.setItem("user:token", res.data.token);
        localStorage.setItem("user:detail", JSON.stringify(res.data.user));
        
        dispatch(successLogin(res.data.user))
        navigate("/");
      }
      if (res.status === 200) {

        setUserSignUp({
          companyName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          province: "",
          cityMunicipality: "",
          organizationType: orgtype,
        })
      } 
    }
  };


  return (
    <div className="h-screen flex items-center">
      <div className="flex flex-col shadow-lg justify-center w-2/4 h-4/5 items-center md:flex-row md:items-start max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 h-full max-w-md border border-palette-lighter bg-white rounded shadow-lg">
          <img
            src={isSignInPage ? forrestImage : leavesImage}
            alt="Forrest illustration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center h-full w-full md:w-1/2 max-w-sm mx-auto space-y-4 min-h-128">
          <div className="justify-center">
            {isSignInPage && (
              <div>
                <div className="mx-auto w-[5rem] h-[5rem] justify-center">
                  <img
                    src={greenLoopLogo}
                    alt="Forrest illustration"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="text-[3.3rem] font-extrabold text-[#31572C] text-center mb-9">
              GreenLoop
            </div>
            <div className="text-3xl font-extrabold mb-4 ml-12">
              {isSignInPage ? "Sign In" : "Sign Up"}
            </div>

            <form
              className="flex flex-col items-center w-full  "
              onSubmit={(e) => handleSubmit(e)}
            >
             { isSignInPage && <>
             <Input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                className="mb-6 w-[75%]"
                defaultValue={userSignIn.username}
                onChange={(e) => setUserSignIn(currSign=> ({...currSign, [e.target.id]: e.target.value}))}
              />
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                className="mb-1 w-[75%]"
                defaultValue={userSignIn.password}
                onChange={(e) => setUserSignIn(currSign=> ({...currSign, [e.target.id]: e.target.value}))}
                />
                </>
                }
              {!isSignInPage && (
                <>
                  <Input
                    name="companyName"
                    placeholder="company name"
                    className="mb-6 w-[75%]"
                    defaultValue={userSignUp.companyName}
                    onChange={(e) => formOnChange(e)}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="mb-6 w-[75%]"
                    defaultValue={userSignUp.email}
                    onChange={(e) => formOnChange(e)}
                  />
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="username"
                    className="mb-6 w-[75%]"
                    defaultValue={userSignUp.username}
                    onChange={(e) => formOnChange(e)}
                  />
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    className="mb-1 w-[75%]"
                    defaultValue={userSignUp.password}
                    onChange={(e) => formOnChange(e)}
                  />
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    className="mt-5 w-[75%]"
                    defaultValue={userSignUp.confirmPassword}
                    onChange={(e) => formOnChange(e)}
                  />
                  <select
                    id="organization-type"
                    name="organizationType"
                    onChange={(event) => handleSelectChange(event)}
                    defaultValue={orgtype}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-1.5 mt-5"
                  >
                    {organizationType.map((item, index) => (
                      <option id={index} key={index} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <Input
                    id="province"
                    type="text"
                    name="province"
                    placeholder="province"
                    className="mt-6 w-[75%]"
                    defaultValue={userSignUp.province}
                    onChange={(e) => formOnChange(e)}
                  />

                  <Input
                    id="cityMunicipality"
                    type="text"
                    name="cityMunicipality"
                    placeholder="city/municipality"
                    className="mt-6 w-[75%]"
                    defaultValue={userSignUp.cityMunicipality}
                    onChange={(e) => formOnChange(e)}
                  />
                </>
              )}
              <span className=" w-9/12 text-right mb-7">
                <span
                  className="text-xs cursor-pointer text-end text-[#86A16E] no-underline"
                  onClick={() =>
                    navigate(`/users/${isSignInPage ? "sign-up" : "sign-in"}`)
                  }
                >
                  {isSignInPage && "Forgot Password?"}
                </span>
              </span>
              <Button
                label={isSignInPage ? "Sign in" : "Sign up"}
                type="submit"
                className="w-[75%] mb-2 bg-[#31572C] rounded-3xl"
              />
            </form>
            <div className="mx-auto text-center">
              {isSignInPage ? (
                <span className="text-[#6C6C6C] font-light text-xs">
                  Don&apos;t have an account yet?
                </span>
              ) : (
                <span className="text-[#6C6C6C] font-light text-xs">
                  Already have an account?
                </span>
              )}{" "}
              <span
                className="text-xs font-medium cursor-pointer  text-[#86A16E] no-underline"
                onClick={() => 
                  navigate(`/users/${isSignInPage ? "sign-up" : "sign-in"}`)
                }
              >
                {isSignInPage ? "Create here" : "Sign in"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
