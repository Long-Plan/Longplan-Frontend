import useGlobalStore from "common/contexts/StoreContext";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLogout } from "common/apis/logout";
import { ClientRouteKey, LocalStorageKey } from "common/constants/keys";
interface NavbarProps {
  // Add any props you need, like navigation links
}

const Navbar: React.FC<NavbarProps> = () => {
  const { setUserData } = useGlobalStore();
  const [isHome, setIsHome] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isProfile, setIsProfile] = useState(false); // Initialize state for profile image
  const navigate = useNavigate();
  const handleLogout = async () => {
    await getLogout();
    setUserData(null);
    localStorage.removeItem(LocalStorageKey.Auth);
    navigate(ClientRouteKey.Login);
  };

  useEffect(() => {
    if (location.pathname === "/user") {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
    if (location.pathname === "/home") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    if (location.pathname === "/create") {
      setIsCreate(true);
    } else {
      setIsCreate(false);
    }
  }, [location.pathname]);
  return (
    <nav className="navbar shadow-box-shadow w-[82px] h-[600px]">
      {/* Your navigation content goes here */}
      <ul className="navbar-nav">
        <li className="nav-item flex text-cetner items-center">
          <Link to="/home">
            <img
                src={isHome ? "/imgs/Home_p.svg" : "/imgs/Home.svg"}
                alt=""
                style={{width: "50px"}}
                className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
          </Link>
        </li>

        <hr className="bg-gray-100 opacity-100 mt-4"/>
        <li className="nav-item flex text-center items-center">
          <Link to="/create">
            <img
                src={isCreate ? "/imgs/Create_p.svg" : "/imgs/Create.svg"}
                alt=""
                style={{width: "50px"}}
                className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
            <p className={`text-[14px] mt-2`}>Plan</p>

          </Link>
        </li>
        <li className="nav-item text-center items-center">
          <Link to="/user">
            <img
              src={isProfile ? "/imgs/Profile_p.svg" : "/imgs/Profile.svg"}
              alt=""
              style={{ width: "50px" }}
              className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
            <p className={`text-[14px] mt-2`}>Profile</p>

          </Link>
        </li>
        <li className="nav-bot mb-2 cursor-pointer text-center items-center">
          <a className="nav-link" onClick={handleLogout}>
            <img src="/imgs/Logout.png" alt="" style={{ width: "50px" }}
                 className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}/>
            Log out
          </a>
        </li>
        {/* More links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
