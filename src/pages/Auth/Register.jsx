import React from 'react'

import syncUp from "../../assets/syncUp.svg"
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/slices/authSlice'


const Register = () => {

  const { register, handleSubmit, } = useForm()

  const dispatch = useDispatch();


  const registerHandle = async (data) => {
    const { username, email, password, rePassword } = data;
    if (password === rePassword) {

      dispatch(registerUser(data))

     
    }

  }

  return (
    <div className='flex flex-col min-h-screen bg-[#111827] items-center justify-center'>

      <div className=' h-screen flex flex-col items-center justify-center w-full '>

        <div className='flex flex-col rounded-md bg-zinc-100 p-5 w-1/2 items-center justify-center '>

          <form className='flex flex-col w-full h-full' onSubmit={handleSubmit(registerHandle)}>

            <div className='flex flex-col justify-center items-center w-full '>
              <img src={syncUp} style={{ width: "30%" }} alt="" />
            </div>


            <div className='flex flex-col gap-y-3 w-full h-full justify-center ' >
              <div className='flex flex-col gap-y-3'>
                <label className='text-gray-400 font-semibold' >Kullanıcı Adınız</label>
                <input {...register("username")} type="text" placeholder='Kullanıcı Adınızı Giriniz.' className='px-2 py-3 rounded-md outline-[#111827] text-sm' />
              </div>


              <div className='flex flex-col gap-y-3'>
                <label className='text-gray-400 font-semibold' >E Posta Adresiniz</label>
                <input {...register("email")} type="email" placeholder='E Posta Adresinizi Giriniz.' className='px-2 py-3 rounded-md outline-[#111827] text-sm' />
              </div>

              <div className='flex flex-col gap-y-3 '>
                <label className='text-gray-400 font-semibold' >Parolanız</label>
                <input {...register("password")} type="password" placeholder='Parolanızı Giriniz.' className='px-2 py-3 rounded-md outline-[#111827] text-sm' />
              </div>

              <div className='flex flex-col gap-y-3 '>
                <label className='text-gray-400 font-semibold' >Parolanızın Tekrarı</label>
                <input {...register("rePassword")} type="password" placeholder='Parolanızı Tekrar Giriniz.' className='px-2 py-3 rounded-md outline-[#111827] text-sm' />
              </div>
            </div>


            <div className='flex flex-col gap-y-2 mt-5'>
              <span className='hover:cursor-pointer'>Şifrenizi mi unuttunuz? Tıklayın.</span>
              <button className='px-2 py-3 bg-[#29e2a2] text-xl rounded-md hover:bg-[#35c290] transition-colors'>Kayıt Ol</button>
              <span className='hover:cursor-pointer'>Hesabınız yok mu? Yeni hesap oluşturmak için tıklayın.</span>
            </div>

          </form>
        </div>


      </div>


    </div>
  )
}

export default Register