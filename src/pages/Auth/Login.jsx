import React, { useEffect } from 'react'

import syncUp from "../../assets/syncUp.svg"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/slices/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const { status } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (data) => {
    try {
      dispatch(loginUser(data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status === "succeeded") {
      console.log("Başarılı");
      toast.success("Giriş Başarılı. Anasayfaya yönlendiriliyorsunuz.")
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }
  }, [status])

  return (
    <div className='flex flex-col min-h-screen bg-[#111827] items-center justify-center'>


      <div className=' h-screen flex flex-col items-center justify-center w-full '>

        <div className='flex flex-col rounded-md bg-zinc-100 p-5 w-1/3 h-1/2 items-center justify-center '>

          <form className='flex flex-col w-full h-full ' onSubmit={handleSubmit(handleLogin)}>

            <div className='flex flex-col justify-center items-center w-full '>
              <img src={syncUp} style={{ width: "30%" }} alt="" />
            </div>


            <div className='flex flex-col gap-y-3 w-full h-full justify-center ' >
              <div className='flex flex-col gap-y-3'>
                <label className='text-gray-400 font-semibold' >E Posta Adresiniz</label>
                <input {...register("email")} type="email" placeholder='E Posta Adresinizi Giriniz.' className='px-2 py-3 rounded-md outline-[#111827] text-sm' />
              </div>
              <div className='flex flex-col gap-y-3 '>
                <label className='text-gray-400 font-semibold' >Parolanız</label>
                <input {...register("password")} type="password" placeholder='Parolanızı Giriniz.' className='px-2 py-3 rounded-md outline-[#111827] text-sm' />
              </div>
            </div>


            <div className='flex flex-col gap-y-2   w-full  justify-end'>
              <span className='hover:cursor-pointer'>Şifrenizi mi unuttunuz? Tıklayın.</span>
              <button className='px-2 py-3 bg-[#29e2a2] text-xl rounded-md hover:bg-[#35c290] transition-colors'>Giriş Yap</button>
              <Link to="/auth/register" className='hover:cursor-pointer'>Hesabınız yok mu? Yeni hesap oluşturmak için tıklayın.</Link>
            </div>

          </form>
        </div>


      </div>


    </div>
  )
}

export default Login