import React from 'react'


const HomeDash = () => {
  return (
    <>

      <div className='grid grid-cols-3 gap-5  min-h-screen '>

      
        <div className='bg-white shadow-md rounded-md p-5 m-5 border flex flex-col text-center justify-around'>
          <h1 className='text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>10</h1>
          <h2 className='text-2xl font-semibold'>Kulüpler</h2>
        </div>
        <div className='bg-white shadow-md rounded-md p-5 m-5 border flex flex-col text-center justify-around'>
          <h1 className='text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>20</h1>
          <h2 className='text-2xl font-semibold'>Etkinlikler</h2>
        </div>
        <div className='bg-white  shadow-md rounded-md p-5 m-5 border flex flex-col text-center justify-around'>
          <h1 className='text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>100</h1>
          <h2 className='text-2xl font-semibold'>Kullanıcılar</h2>
        </div>
        <div className='bg-white shadow-md rounded-md p-5 m-5 border flex flex-col text-center justify-around'>
          <h1 className='text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>46</h1>
          <h2 className='text-2xl font-semibold'>Duyurular</h2>
        </div>
        <div className='bg-white shadow-md rounded-md p-5 m-5 border flex flex-col text-center justify-around'>
          <h1 className='text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>26</h1>
          <h2 className='text-2xl font-semibold'>Geri Bildirimler</h2>
        </div>
        <div className='bg-white shadow-md rounded-md p-5 m-5 border flex flex-col text-center justify-around'>
          <h1 className='text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>3</h1>
          <h2 className='text-2xl font-semibold'>Bekleyen Kulüp Onayları</h2>
        </div>



      </div>
    </>

  )
}

export default HomeDash