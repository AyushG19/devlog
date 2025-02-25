import React from 'react'

const Navbar = () => {
  return (
    <div className=' px-8 w-screen h-14 bg-[#FFD700] flex items-center justify-between'
    style={{gridArea:"navbar"}}>
        <div>
            Devlog
        </div>
        <ul className='flex h-full gap-8 font-medium'>
            <li className='flex items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer'>Home</li>
            <li className='flex items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer'>Feed</li>
            <li className='flex items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer'>Popular</li>
            <li className='flex items-center justify-center h-full px-3 hover:bg-[#FFE971] cursor-pointer'>Saved</li>
        </ul>
        <div className='cursor-pointer rounded-full size-8 bg-black'>
            p
        </div>
    </div>
  )
}

export default Navbar;