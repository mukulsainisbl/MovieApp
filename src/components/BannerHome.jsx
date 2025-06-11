import { useSelector } from "react-redux";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { useEffect, useState } from "react";
const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const handleNext = () => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
       setCurrentImage((prev) => prev < bannerData.length - 1 ? prev + 1 : 0)
    },3000);
    return () => clearInterval(interval);
  }, [bannerData, imageURL , currentImage] );

  return (
    <section className="w-full h-full ">
      <div className="flex min-h-full max-h-[90vh] overflow-hidden ">
        {bannerData.map((data, index) => {
          return (
            <div
              key={index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden transition-all relative group"
              style={{
                transform: `translateX(-${currentImage * 100}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <div className="h-full w-full">
                <img
                  src={imageURL + data.backdrop_path}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  alt="images"
                />
              </div>

              {/* button Next and Prev Image */}

              <div className="absolute top-0 px-4 w-full h-full hidden transition-all   items-center justify-between group-hover:lg:flex  ">
                <button
                  onClick={handlePrev}
                  className="bg-white p-1 text-black rounded-full z-10 text-xl"
                >
                  <GrLinkPrevious />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-1 text-black rounded-full z-10 text-xl"
                >
                  <GrLinkNext />
                </button>
              </div>

              <div className="absolute top-0 bg-black opacity-20 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

              <div className="container mx-auto ">
                <div className="container mx-auto absolute bottom-0 max-w-md  px-3">
                  <h2 className="font-bold text-2xl lg:text-3xl text-white drop-shadow-2xl ">
                    {data.title || data.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2 ">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4  ">
                    <p>Ratings : {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View : {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <button className="bg-white px-4  py-2 text-black font-bold rounded mt-3  hover:bg-gradient-to-l from-red-300 to-green-500 shadow-md transition-all hover:scale-105  ">
                    PlayNow
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
