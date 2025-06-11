import React from 'react'
import {MobileNavigationComponent} from "../constants/Navigation"
import { NavLink } from 'react-router-dom'
const MobileNavigation = () => {
  return (
    <section className='lg:hidden h-14 bg-black opacity-80 backdrop-blur-3xl fixed bottom-0 w-full z-40  '>
      <div className='flex justify-between text-neutral-500 h-full items-center'>
        {
          MobileNavigationComponent.map((nav, index) => {
            return(
              <NavLink
              to={nav.href}
              className={({isActive}) => ` px-3 flex items-center flex-col justify-cente ${isActive && "text-white"} `}
              key={index}>
                <div className='text-2xl '>
                  {nav.icon}
                </div>
                <p className='text-sm'>{nav.label}</p>
              </NavLink>
            )
          })
        }
      </div>
    </section>
  )
}

export default MobileNavigation
