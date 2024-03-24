import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useLogin } from "../hooks/Auth/useLogin";
import { useLoggedInUser } from "../hooks/Auth/useGetMe";

const Login = () => {
  const { isLoading, loginUserQuery } = useLogin();
  const [email, setEmail] = useState("patient@gmail.com");
  const [password, setPassword] = useState("Test123");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await loginUserQuery({ email, password });
  }

  return (
    <form
      className="h-screen flex flex-col items-center justify-center gap-10"
      onSubmit={handleSubmit}
    >
      <h1 className="text-[#4C36C6] font-bold text-2xl">Login</h1>

      <div className="flex flex-col gap-5">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@gmail.com"
          className="border-2 border-[#4C36C6] p-2 w-72"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          className="border-2 border-[#4C36C6] p-2"
        />
      </div>
      <p className="">
        Don&apos;t have an account?{" "}
        <Link to={"/register"} className="underline font-bold">
          Register
        </Link>{" "}
      </p>
      <button
        className="bg-[#4C36C6] py-3 px-10 text-white font-bold rounded-lg hover:bg-[#5745be]"
        disabled={isLoading}
      >
        {isLoading ? "Logging In" : "Login"}
      </button>
    </form>
  );
};

export default Login;
