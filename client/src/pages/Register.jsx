import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/Auth/useRegister";

const Register = () => {
  const { registerUserQuery, error } = useRegister();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUserQuery({
        email,
        username,
        password,
        role: selectedRole,
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  if (error) {
    console.log(error);
  }

  return (
    <form
      className="h-screen flex flex-col items-center justify-center gap-10"
      onSubmit={handleSubmit}
    >
      <h1 className="text-[#4C36C6] font-bold text-2xl">Register</h1>

      <div className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          className="border-2 border-[#4C36C6] p-2 w-72"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="example@gmail.com"
          className="border-2 border-[#4C36C6] p-2 w-72"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-2 border-[#4C36C6] p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="mb-5 text-2xl text-[#4C36C6] font-bold">Role</h1>

        <div className="flex gap-10">
          <span
            className={`${
              selectedRole === "patient"
                ? "bg-[#4C36C6] text-white"
                : "bg-white text-[#4C36C6] border border-[#4C36C6]"
            } py-3 px-5 font-bold rounded-lg hover:bg-[#5745be] hover:cursor-pointer hover:text-white`}
            onClick={() => handleRoleSelect("patient")}
          >
            Patient
          </span>
          <span
            className={`${
              selectedRole === "doctor"
                ? "bg-[#4C36C6] text-white"
                : "bg-white text-[#4C36C6] border border-[#4C36C6]"
            } py-3 px-5 font-bold rounded-lg hover:bg-[#5745be] hover:cursor-pointer hover:text-white`}
            onClick={() => handleRoleSelect("doctor")}
          >
            Doctor
          </span>
        </div>
      </div>

      <p className="text-lg">
        Have an account?{" "}
        <Link to={"/login"} className="underline font-bold">
          Login
        </Link>{" "}
      </p>
      <button className="bg-[#4C36C6] py-3 px-10 text-white font-bold rounded-lg hover:bg-[#5745be]">
        Register
      </button>
    </form>
  );
};

export default Register;
