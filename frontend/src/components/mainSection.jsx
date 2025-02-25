import React from 'react'
import Message from './message.jsx';

const mainSection = () => {
  return (
    <div className='w-[70vw] h-full px-2 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden '
    style={{gridArea:"leftside"}}>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
        <Message/>
    </div>
  )
}

export default mainSection