import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./redux/FrameFusionSlice";

function App() {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TMDB_API_URL}/trending/all/week`,
        {
          headers: {
            Authorization: import.meta.env.VITE_TMDB_BEARER,
            Accept: "application/json",
          },
        }
      );
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log("Error fetching trending data:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TMDB_API_URL}/configuration`,
        {
          headers: {
            Authorization: import.meta.env.VITE_TMDB_BEARER,
            Accept: "application/json",
          },
        }
      );

      const url = response.data.images.secure_base_url + "original";
      dispatch(setImageURL(url));
    } catch (error) {
      console.log("Error fetching configuration data:", error);
    }
  };

  useEffect(() => {
    fetchTrendingData();

    fetchConfiguration();
  }, []);

  return (
    <main className="pb-16 lg:pb-0">
      <Header />
      <div className="pt-16 min-h-[95vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
