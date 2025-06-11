import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate()
  const fetchData = async (reset = false) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TMDB_API_URL}/search/multi`,
        {
          params: { page: pageNo, query: location?.search?.slice(3) },
          headers: {
            Authorization: import.meta.env.VITE_TMDB_BEARER,
            Accept: "application/json",
          },
        }
      );

      setData((prev) => {
        return [...prev, ...response.data.results];
      });

      console.log("response", response);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchData();
  }, [location?.search]);

  const handleScroll = () => {
    if (window.innerHeight + window.screenY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleTop=()=>{
window.scrollTo(0, 0)
  }
  return (
    <div className="py-16">
      <div className="lg:hidden sticky top-[70px] z-50  w-full h-full flex items-center justify-center ">
        <input type="text" 
        className="bg-white py-1  px-4 text-lg w-full rounded-2xl  mx-10  text-neutral-900  "
        placeholder="Search..."
        
        onChange={(e)=> navigate(`/search?q=${e.target.value}`) }
        />

      </div>
      <br />

      <div className="container mx-auto ">
        <h2 className="text-xl capitalize lg:text-3xl pt-3 my-3 font-semibold">
          {" "}
          Search Results :
        </h2>

        <div onClick={handleTop} className="grid justify-center grid-cols-[repeat(auto-fit,_230px)] gap-4">
          {data.map((searchData, index) => (
            <Card
              
              key={index}
              data={searchData}
              media_type={searchData.media_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
