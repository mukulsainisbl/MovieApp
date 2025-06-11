import React, { useRef } from 'react'
import Card from './Card';
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
const HorizontalScrollCard = ({data = [] , heading , trending  , media_type }) => {

    const containerRef  = useRef()
    const handleNext=()=>{
      containerRef.current.scrollLeft += 300
    }
    const handlePrev =()=>{
      containerRef.current.scrollLeft -= 300

    }
  return (

     <div className=" w-full     px-3 my-10">
        <h1 className="text-xl text-white lg:text-2xl  font-bold mb-2 ">
          {heading}
        </h1>


     <div className=" relative ">
         <div ref={containerRef} className="grid relative overflow-hidden  grid-cols-[repeat(auto-fit,220px)] grid-flow-col z-10  scroll-smooth transition-all gap-6 overflow-x-scroll hide-scrollbar  ">
          {data.map((data, index) => {
            return (
              <Card
                key={data.id}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>
        <div className=' absolute top-0 hidden lg:flex justify-between w-full items-center h-full'>
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
     </div>
      </div>
  )
}

export default HorizontalScrollCard
