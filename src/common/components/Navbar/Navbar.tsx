import useGlobalStore from "common/contexts/StoreContext";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLogout } from "common/apis/logout";
import { ClientRouteKey, LocalStorageKey } from "common/constants/keys";

interface NavbarProps {
  showExitPopup?: (nextPage: string) => void; // New prop to trigger the confirmation popup
}

const Navbar: React.FC<NavbarProps> = ({ showExitPopup }) => {
  const { setUserData } = useGlobalStore();
  const [isHome, setIsHome] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await getLogout();
    setUserData(null);
    localStorage.removeItem(LocalStorageKey.Auth);
    navigate(ClientRouteKey.Login);
  };

  // Track the current path
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

  // Handle navigation, show exit popup only if on /plan
  const handleNavClick = (nextPage: string) => {
    if (showExitPopup && location.pathname === "/plan") {
      showExitPopup(nextPage); // Trigger the popup when on the /plan page
    } else {
      navigate(nextPage); // Direct navigation if not on /plan
    }
  };

  return (
    <nav className="navbar shadow-box-shadow w-[82px] h-[600px]">
      <ul className="navbar-nav">
        <li className="nav-item flex text-center items-center">
          <a onClick={() => handleNavClick("/home")}>
            <img
              src={isHome ? "/imgs/Home_p.svg" : "/imgs/Home.svg"}
              alt=""
              style={{ width: "50px" }}
              className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
          </a>
        </li>

        <hr className="bg-gray-100 opacity-100 mt-4" />
        <li className="nav-item flex text-center items-center">
          <a onClick={() => handleNavClick("/create")}>
            <img
              src={isCreate ? "/imgs/Create_p.svg" : "/imgs/Create.svg"}
              alt=""
              style={{ width: "50px" }}
              className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
            <p className={`text-[14px] mt-2`}>Plan</p>
          </a>
        </li>
        <li className="nav-item text-center items-center">
          <a onClick={() => handleNavClick("/user")}>
            <img
              src={isProfile ? "/imgs/Profile_p.svg" : "/imgs/Profile.svg"}
              alt=""
              style={{ width: "50px" }}
              className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
            <p className={`text-[14px] mt-2`}>Profile</p>
          </a>
        </li>
        <li className="nav-bot mb-2 cursor-pointer text-center items-center">
          <a className="nav-link" onClick={handleLogout}>
            <img
              src="/imgs/Logout.png"
              alt=""
              style={{ width: "50px" }}
              className={`transition-all duration-300 transform group hover:scale-125 hover:rotate-6`}
            />
            Log out
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
