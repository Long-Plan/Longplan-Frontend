import useGlobalStore from "common/contexts/StoreContext";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLogout } from "common/apis/logout";
import { ClientRouteKey, LocalStorageKey } from "common/constants/keys";
import { UserIcon } from "@heroicons/react/20/solid";

interface NavbarProps {
  showExitPopup?: (nextPage: string) => void; // New prop to trigger the confirmation popup
}

const Navbar: React.FC<NavbarProps> = ({ showExitPopup }) => {
  const { setUserData } = useGlobalStore();
  const [activeRoute, setActiveRoute] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await getLogout();
    setUserData(null);
    localStorage.removeItem(LocalStorageKey.Auth);
    navigate(ClientRouteKey.Login);
  };

  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location.pathname]);

  // Handle navigation, show exit popup only if on /plan
  const handleNavClick = (nextPage: string) => {
    if (showExitPopup && location.pathname === "/plan") {
      showExitPopup(nextPage); // Trigger the popup when on the /plan page
    } else {
      navigate(nextPage); // Direct navigation if not on /plan
    }
  };

  // Helper function to render Nav Items
  const renderNavItem = (
    to: string,
    imgSrc: string,
    imgActiveSrc: string,
    label?: string
  ) => (
    <li className="nav-item flex flex-col justify-center items-center text-center">
      <a onClick={() => handleNavClick(to)} className="cursor-pointer">
        <img
          src={activeRoute === to ? imgActiveSrc : imgSrc}
          alt={label || ""}
          className="transition-all duration-300 transform group hover:scale-125 hover:rotate-6 w-[50px] h-[50px]"
        />
        {label && <p className="text-[14px] mt-2">{label}</p>}
      </a>
    </li>
  );

  return (
    <nav
      className="navbar shadow-box-shadow w-max h-[600px] p-4"
      role="navigation"
      aria-label="Main Navigation"
    >
      <ul className="navbar-nav">
        {renderNavItem("/home", "/imgs/Home.svg", "/imgs/Home_p.svg")}
        <hr className="bg-gray-100 opacity-100 mt-4" />
        {renderNavItem(
          "/create",
          "/imgs/Create.svg",
          "/imgs/Create_p.svg",
          "Plan"
        )}
        {renderNavItem(
          "/user",
          "/imgs/Profile.svg",
          "/imgs/Profile_p.svg",
          "Profile"
        )}
        {renderNavItem(
          "/settings",
          "/imgs/Setting.svg",
          "/imgs/Setting_p.svg",
          "Setting"
        )}
        {/* <li className="nav-item flex flex-col justify-center items-center text-center">
          <a
            onClick={() => handleNavClick("/settings")}
            className="cursor-pointer"
          >
            <UserIcon className="w-10 h-10 transition-all duration-300 transform group hover:scale-125 hover:rotate-6" />
            <p className="text-[14px] mt-2">Setting</p>
          </a>
        </li> */}
        <li className="nav-bot mb-2 cursor-pointer flex flex-col justify-center items-center text-center">
          <button
            className="nav-link flex flex-col items-center justify-center"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              padding: "0",
              cursor: "pointer",
            }}
            aria-label="Log out"
          >
            <img
              src="/imgs/Logout.png"
              alt="Log out"
              style={{ width: "50px", height: "50px" }}
              className="transition-all duration-300 transform group hover:scale-125 hover:rotate-6"
            />
            <p className="text-[14px] mt-2">Log out</p>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
