import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome";
import Card from "../components/Card";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

import useAxiosRequest from "../hooks/Axios";
const Home = () => {
  const trendingMovies = useSelector((state) => state.movieData.bannerData);
  const {data : nowPlayingData} = useAxiosRequest('/movie/now_playing')
  const {data  : topRatedData } = useAxiosRequest('/movie/top_rated')
  
  const {data  :  popularTvShowData  } = useAxiosRequest('/tv/popular')
  const {data  :   onTheAir  } = useAxiosRequest('/tv/on_the_air')

  return (
    <div>
      <BannerHome />
     <HorizontalScrollCard data={trendingMovies} heading={"Trending"} trending={true} />
     <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={'movie'} />
     <HorizontalScrollCard data={topRatedData} heading={"Top Rated"} media_type={"movie"} />
     <HorizontalScrollCard data={popularTvShowData} heading={"Popular Tv Shows"} media_type={'tv'} />
     <HorizontalScrollCard data={onTheAir} heading={"On The Air"} media_type={'tv'} />
    </div>
  );
};

export default Home;
