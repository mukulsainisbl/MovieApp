import { useParams, useNavigate } from "react-router-dom";
import AxiosFetchDetails from "../hooks/AxiosFetchDetails";
import { useSelector } from "react-redux";
import { FaStar, FaFire, FaEye, FaPlay } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useAxiosRequest from "../hooks/Axios";

const DetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const imageURL = useSelector((state) => state.movieData.imageURL);

  const { data } = AxiosFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = AxiosFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = AxiosFetchDetails(
    `/${params?.explore}/${params?.id}/similar`
  );

  // Format runtime from minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handle click on similar movie
  const handleSimilarClick = (id) => {
    navigate(`/${params.explore}/${id}`);
    window.scrollTo(0, 0); // Scroll to top after navigation
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className="text-white bg-gradient-to-b from-neutral-900 to-neutral-950 min-h-screen">
      {/* HERO SECTION WITH BACKDROP */}
      <div className="relative">
        <div className="w-full h-[70vh] max-h-[800px] overflow-hidden">
          <img
            loading="lazy"
            src={
              data?.backdrop_path
                ? imageURL + data.backdrop_path
                : "/placeholder-backdrop.jpg"
            }
            alt={data?.title || data?.name || "Backdrop"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent" />
        </div>

        {/* PLAY BUTTON OVERLAY */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 transition-all rounded-full p-6 flex items-center justify-center shadow-xl group">
          <FaPlay className="text-2xl ml-1 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10">
        {/* MOVIE CARD */}
        <div className="flex flex-col lg:flex-row gap-8 items-start bg-neutral-900/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-neutral-800">
          {/* POSTER */}
          <div className="relative group w-full max-w-xs mx-auto lg:mx-0">
            <img
              src={
                data?.poster_path
                  ? imageURL + data.poster_path
                  : "/placeholder-poster.png"
              }
              alt={data?.title || data?.name || "Poster"}
              className="w-full h-auto rounded-lg shadow-xl transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center mx-auto">
                <FaPlay className="mr-2" /> Watch Trailer
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <h1 className="text-3xl lg:text-4xl font-bold">
                {data?.title || data?.name}
              </h1>
              {data?.release_date && (
                <span className="text-neutral-400 text-lg">
                  (
                  {new Date(
                    data.release_date || data.first_air_date
                  ).getFullYear()}
                  )
                </span>
              )}
            </div>

            {data?.tagline && (
              <p className="italic text-neutral-300 text-lg">{data.tagline}</p>
            )}

            {/* GENRES */}
            <div className="flex flex-wrap gap-2">
              {data?.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-xs font-medium transition-colors"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* RATINGS AND METADATA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-500/20 p-2 rounded-full">
                  <FaStar className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Rating</p>
                  <p className="font-semibold">
                    {data?.vote_average?.toFixed(1)}/10
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <IoMdTime className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Runtime</p>
                  <p className="font-semibold">
                    {formatRuntime(
                      data?.runtime || data?.episode_run_time?.[0]
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-red-500/20 p-2 rounded-full">
                  <FaFire className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Popularity</p>
                  <p className="font-semibold">
                    {data?.popularity ? Math.round(data.popularity) : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <MdDateRange className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-400">Release</p>
                  <p className="font-semibold">
                    {data?.release_date || data?.first_air_date}
                  </p>
                </div>
              </div>
            </div>

            {/* OVERVIEW */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Overview</h3>
              <p className="text-neutral-300 leading-relaxed">
                {data?.overview}
              </p>
            </div>

            {/* STATUS */}
            {data?.status && (
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    data.status === "Released"
                      ? "bg-green-500/20 text-green-500"
                      : data.status === "Post Production"
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {data.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CAST SECTION */}
        {castData?.cast?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <RiMovie2Line className="text-red-500" /> Top Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {castData.cast.slice(0, 12).map((actor) => (
                <div
                  key={actor.id}
                  className="bg-neutral-800/50 hover:bg-neutral-800 rounded-lg overflow-hidden transition-all group"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={
                        actor.profile_path
                          ? imageURL + actor.profile_path
                          : "/placeholder-profile.png"
                      }
                      alt={actor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3">
                    <p className="font-semibold truncate">{actor.name}</p>
                    <p className="text-sm text-neutral-400 truncate">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMILAR MOVIES SECTION */}
        {similarData?.results?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaEye className="text-red-500" /> Similar{" "}
              {params?.explore === "movie" ? "Movies" : "TV Shows"}
            </h2>
            <div
              onClick={handleClick}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {similarData.results.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-800/50 hover:bg-neutral-800 rounded-lg overflow-hidden transition-all group cursor-pointer"
                  onClick={() => handleSimilarClick(item.id)}
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={
                        item.poster_path
                          ? imageURL + item.poster_path
                          : "/placeholder-poster.png"
                      }
                      alt={item.title || item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-sm bg-black/70 px-2 py-1 rounded">
                          <FaStar className="text-yellow-500 text-xs" />
                          {item.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-xs bg-black/70 px-2 py-1 rounded">
                          {new Date(
                            item.release_date || item.first_air_date
                          ).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold truncate">
                      {item.title || item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
