import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const Explore = () => {
  const { explore } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // ✅ Fetch data from TMDB
  const fetchData = async (reset = false) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TMDB_API_URL}/discover/${explore}`,
        {
          params: { page: pageNo },
          headers: {
            Authorization: import.meta.env.VITE_TMDB_BEARER,
            Accept: "application/json",
          },
        }
      );


      const results = response.data.results;
      const total = response.data.total_pages;

      setData(prev => (reset ? results : [...prev, ...results]));
      setTotalPages(total);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  // ✅ Trigger when pageNo changes
  useEffect(() => {
    fetchData();
  }, [pageNo]);

  // ✅ Trigger on explore change: reset page and data
  useEffect(() => {
    setPageNo(1);
    fetchData(true); // true = reset data
  }, [explore]);

  // ✅ Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight + 100 >= docHeight) {
        if (pageNo < totalPages) {
          setPageNo(prev => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageNo, totalPages]);

  return (
    <div className="pt-10">
      <h2 className="font-semibold capitalize lg:text-3xl text-white/70 pb-5 text-center">
        Popular {explore} Shows
      </h2>

      <div className="grid justify-center grid-cols-[repeat(auto-fit,_230px)] gap-4">
        {data.map((item) => (
          <Card key={item.id} data={item} media_type={explore} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
