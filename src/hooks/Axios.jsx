import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosRequest = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TMDB_API_URL}${endpoint}`,
         {
          headers: {
            Authorization: import.meta.env.VITE_TMDB_BEARER,
            Accept: "application/json",
          },
        }
      );
      setData(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {
    fetchData()
  },[])
  return { data };
};

export default useAxiosRequest
