import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
const Card = ({data , index , trending , media_type}) => {
  const imageURL = useSelector(state => state.movieData.imageURL)
  
  const  mediaType = data.media_type ?? media_type
  return (
    <Link to={"/"+mediaType+'/'+data.id} className='w-full min-w-[230px] max-w-[230px] relative  block hover:scale-99   transition-all   rounded-r h-80 overflow-hidden '>
      {
        data.poster_path ? (
          <img  src={imageURL+data.poster_path} alt="" />

        ) : ( <div className='bg-neutral-800 h-full  w-full flex justify-center items-center '>
          No Image Found...
        </div> )
      }
    <div className='absolute left-1 top-3   '>
        {
        trending &&(
          <div className='py-1 px-4 font-bold bg-black/50 backdrop-blur-2xl rounded ' >
            # {index} Trending
          </div>
        )
      }
    </div>
    <div className='absolute   border-t-0  bottom-0 backdrop-blur-3xl  rounded-r overflow-hidden w-full bg-black/50 h-16  p-2 '> 
        <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold  '> {data?.title || data?.name}</h2>
        <div className='text-sm flex justify-between items-center  text-neutral-400'>
          <p>{moment(data?.first_air_date).format("MMM Do YYYY") || moment(data?.release_date).format("MMM Do YYYY") }</p>
          <p className='text-[11px]  '><span className='text-sm '>Ratings</span> {Number(data.vote_average).toFixed(1)}</p>
        </div>
    </div>
    </Link>
  )
}

export default Card
