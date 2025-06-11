import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import UserIcon from "../assets/user.png";
import { IoSearch } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { navigation } from "../constants/Navigation";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");

  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    setShowInput(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  return (
    <header className="fixed  top-0 w-full h-16 bg-black opacity-80 z-40  ">
      <div className="container mx-auto px-3 flex items-center h-full  ">
        <Link to={"/"}>
          <h1 className="text-amber-400 italic  font-semibold  text-2xl">
            Frame Fusion
          </h1>
        </Link>

        {/* Navigation */}

        <nav className=" hidden  lg:flex items-center gap-1 ml-4">
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-3   ${isActive && "text-neutral-100"} `
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        {/* User Icon */}

        <div className="ml-auto flex items-center gap-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
            action=""
          >
            {showInput && (
              <input
                name="search"
                id="search"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search here..."
                className="bg-transparent text-white font-semibold px-4 py-1 focus:outline-none hidden lg:block "
              />
            )}

            <button
              onClick={handleClick}
              type="submit"
              className="text-2xl  hidden lg:block text-white"
            >
              {" "}
              <IoSearch />{" "}
            </button>
          </form>

          <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer  active:scale-50 transition-all ">
            <img src={UserIcon} alt="" className="h-full w-full" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
