  
  import { IoHomeSharp } from "react-icons/io5";
  import { PiTelevisionSimpleBold } from "react-icons/pi";
  import { MdLocalMovies } from "react-icons/md";
  import { FaSearch } from "react-icons/fa";
    
  
  export const navigation = [
    {
      label: "TV Shows",
      href: "tv",
      icon : <PiTelevisionSimpleBold />
    },
    {
      label: "Movies",
      href: "movie",
      icon  : <MdLocalMovies />
    },
  ];

  export const MobileNavigationComponent = [
    {
      label : "Home",
      href :"/",
      icon : <IoHomeSharp />
    },
    ...navigation,
    {
      label : "search",
      href : '/search',
      icon : <FaSearch />
    }
  ]
