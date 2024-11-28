import React from 'react'
import { useAdmin } from '../../../hooks/useAdmin'
import { useSelector } from 'react-redux';



const HomeDash = () => {

useAdmin();
const {clubApplies} = useSelector((state) => state.admin);

  return (
    <>

      <div className='grid grid-cols-3 gap-5  min-h-screen '>

      
        <div className='bg-white shadow-md rounded-xl p-5 m-5 border flex flex-col text-center justify-around'>
          <h2 className='text-2xl font-semibold'>Kulüpler</h2>
          <h1 className='text-[125px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>10</h1>
        </div>
        <div className='bg-white shadow-md rounded-xl p-5 m-5 border flex flex-col text-center justify-around'>
          <h2 className='text-2xl font-semibold'>Etkinlikler</h2>
          <h1 className='text-[125px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>20</h1>
        </div>
        <div className='bg-white  shadow-md rounded-xl p-5 m-5 border flex flex-col text-center justify-around'>
          <h2 className='text-2xl font-semibold'>Kullanıcılar</h2>
          <h1 className='text-[125px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>100</h1>
        </div>
        <div className='bg-white shadow-md rounded-xl p-5 m-5 border flex flex-col text-center justify-around'>
          <h2 className='text-2xl font-semibold'>Duyurular</h2>
          <h1 className='text-[125px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>46</h1>
        </div>
        <div className='bg-white shadow-md rounded-xl p-5 m-5 border flex flex-col text-center justify-around'>
          <h2 className='text-2xl font-semibold'>Geri Bildirimler</h2>
          <h1 className='text-[125px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>26</h1>
        </div>
        <div className='bg-white shadow-md rounded-xl p-5 m-5 border flex flex-col text-center justify-around'>
          <h2 className='text-2xl font-semibold'>Bekleyen Kulüp Onayları</h2>
          <h1 className='text-[125px] text-transparent bg-clip-text bg-gradient-to-r from-black to-primary'>{clubApplies?.length}</h1>
        </div>



      </div>
    </>

  )
}

export default HomeDash