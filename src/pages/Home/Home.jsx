import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [isActive , setIsActive] = useState(false)
  return (
    <div className='flex items-center justify-center '>
      <button onClick={()=>setIsActive(!isActive)}>Aç</button>
          <input disabled={isActive} type="text" placeholder='denem' />
    </div>
  )
}

export default Home