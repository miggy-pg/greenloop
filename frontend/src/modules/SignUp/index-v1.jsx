import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import forrestImage from "../../assets/images/login-side-panel.webp";
import leavesImage from "../../assets/images/signup-side-panel.webp";
import greenLoopLogo from "../../assets/images/greenloop-logo.png";
import { useForm } from "react-hook-form";

const organizationType = [
  { value: "Waste Generator", label: "Waste Generator" },
  { value: "Recycling Startup", label: "Recycling Startup" },
  { value: "Informal Waste Sector", label: "Informal Waste Sector" },
];

const SignUp = () => {
  const { register, handleSubmit, reset } = useForm();

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  // function handleSelectChange(e) {
  //   setOrgType(e.target.value);
  // }

  // function formOnChange(e) {
  //   setUserSignUp({ ...userSignUp, [e.target.id]: e.target.value });
  // }

  const onSubmit = (data, e) => {
    // e.preventDefault();
    console.log("onRegister: ", data);
    // if (res.status === 400) {
    //   alert("Invalid credentials");
    // } else {
    //   if (res.data.token) {
    //     localStorage.setItem("user:token", res.data.token);
    //     localStorage.setItem("user:detail", JSON.stringify(res.data.user));

    //     // dispatch(successLogin(res.data.user));
    //   }
    //   if (res.status === 200) {
    //     !isSignInPage && alert("User created successfully");
    //     setUserSignUp({
    //       companyName: "",
    //       username: "",
    //       email: "",
    //       password: "",
    //       confirmPassword: "",
    //       province: "",
    //       cityMunicipality: "",
    //       organizationType: orgtype,
    //     });
    //     navigate("/");
    //   }
    // }
  };

  return (
    <div className="h-screen flex items-center">
      <div className="flex flex-row shadow-lg justify-center w-2/4 h-3/4 items-center max-w-6xl mx-auto lg:flex-col md:items-start md:w-2/4 sm:w-3/4 lg:h-full">
        <div className="w-2/4 h-full border border-palette-lighter bg-red-500 rounded shadow-lg lg:mb-3 md:mb-0  lg:h-[8%] lg:w-full">
          <img
            src={leavesImage}
            alt="Forrest illustration"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="flex flex-col justify-center h-full w-full max-w-sm mx-auto space-y-4 min-h-128 lg:w-4/6 xsm:w-3/4">
          <div className="text-4xl font-extrabold text-[#31572C] text-center lg:text-clamp-form-greenloop lg:pb-3">
            GreenLoop
          </div>
          <div className="text-2xl font-extrabold mb-4 ml-12 md:ml-0 lg:text-clamp-form-header">
            Sign Up
          </div>

          <form
            className="flex flex-col justify-start items-left px-12 w-full md:px-0"
            onSubmit={handleSubmit(onSubmit)}
            // onClick={() => console.log("Clicked")}
          >
            <Input
              name="companyName"
              placeholder="company name"
              className="mb-6"
              register={{ ...register("companyName") }}
              // value={userSignUp.companyName}
              // onChange={(e) => formOnChange(e)}
            />
            <Input
              name="email"
              type="email"
              placeholder="email"
              className="mb-6"
              register={{ ...register("email") }}
              // value={userSignUp.email}
              // onChange={(e) => formOnChange(e)}
            />
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="username"
              className="mb-6"
              register={{ ...register("username") }}
              // value={userSignUp.username}
              // onChange={(e) => formOnChange(e)}
            />
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              className="mb-1"
              register={{ ...register("password") }}
              // value={userSignUp.password}
              // onChange={(e) => formOnChange(e)}
            />
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              className="mt-5"
              register={{ ...register("confirmPassword") }}
              // value={userSignUp.confirmPassword}
              // onChange={(e) => formOnChange(e)}
            />
            <select
              id="organization-type"
              name="organizationType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block p-1.5 mt-5"
              register={{
                ...register("organizationType", {
                  required: "Please select organization type",
                }),
              }}
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
              className="mt-6"
              register={{ ...register("province") }}
              // value={userSignUp.province}
              // onChange={(e) => formOnChange(e)}
            />

            <Input
              id="cityMunicipality"
              type="text"
              name="cityMunicipality"
              placeholder="city/municipality"
              className="mt-6"
              register={{ ...register("cityMunicipality") }}
              // value={userSignUp.cityMunicipality}
              // onChange={(e) => formOnChange(e)}
            />

            <Button
              label="Sign up"
              type="submit"
              className="bg-[#31572C] rounded-3xl -mb-1 mt-5"
            />
          </form>
          <div className="mx-auto text-center">
            <span className="text-[#6C6C6C] font-light text-xs">
              Already have an account?{" "}
            </span>
            <span
              className="text-xs font-medium cursor-pointer text-[#86A16E] no-underline md:text-clamp-xs"
              onClick={() => navigate("/users/sign-in")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
