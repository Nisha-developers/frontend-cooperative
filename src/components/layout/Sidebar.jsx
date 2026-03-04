import React from 'react'

const Sidebar = ({links, design}) => {
  return (
    <div style={design} className='text-cooperative-cream fixed'>
      <div className=' flex flex-col h-[calc(100vh-70px)] justify-center'>{links.map((val)=>{
        return(<div className='pb-8 px-8 cursor-pointer hover:text-cooperative-orange font-bold'>{val.link.toUpperCase()}</div>)
      })}</div>
    </div>
  )
}

export default Sidebar