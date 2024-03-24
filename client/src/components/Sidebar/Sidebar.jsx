import SidebarItems from "./SidebarItems";
import { MdLogout } from "react-icons/md";
import { useLoggedInUser } from "../../hooks/Auth/useGetMe";
import { useLogout } from "../../hooks/Auth/useLogout";

const Sidebar = () => {
  const { data, isLoading } = useLoggedInUser();
  const { logout } = useLogout();

  return (
    <div className="bg-[#FFF5D1] min-w-1/6 p-12 flex flex-col justify-between items-start h-full">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="text-xl mb-3 flex flex-col">
          Welcome,{" "}
          <span className="text-[#4C36C6] font-bold">
            {data?.username} ({data?.role})
          </span>
        </div>
      )}
      <SidebarItems user={data} />
      <button
        className="text-3xl hover:text-[#4C36C6] hover:pointer-cursor flex items-center gap-5 justify-center"
        onClick={logout}
      >
        <MdLogout /> <p className="text-lg">Logout</p>
      </button>
    </div>
  );
};

export default Sidebar;
