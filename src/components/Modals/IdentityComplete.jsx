import React from 'react'
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '../../redux/slices/authSlice';

const IdentityComplete = ({ user, setHasIdentity }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
        const userData = {
            uid: user.uid,
            ...data
        }
        dispatch(updateUser(userData));
        setHasIdentity(false);
    }

    const modalRoot = document.getElementById("modal-root");


    return createPortal(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>

            <div className='bg-white rounded-lg shadow-lg w-96 p-6'>
                <div className='flex flex-col gap-y-3'>

                    <h2 className='text-xl font-semibold '>Kimlik Bilgilerinizi Tamamlayın</h2>
                    <span>Bir kulüp oluşturabilmek için profilinizde kimlik numaranızın olması gerekmektedir.</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4 mt-3'>
                    {/* Kimlik Numarası */}
                    <div>
                        <label className='block mb-1 font-medium'>Kimlik Numaranız</label>
                        <input
                            {...register("identity", {
                                required: "Kimlik numarası gereklidir.",
                                pattern: {
                                    message: "Geçerli bir kimlik numarası girin.",
                                    value: /^[0-9]{11}$/,
                                },
                            })}
                            placeholder='12345678901'
                            className={`border px-4 py-2 rounded-md w-full ${errors.identity ? "border-red-500" : ""
                                }`}
                        />
                        {errors.identity && <p className='text-red-500 text-sm'>{errors.identity.message}</p>}
                    </div>
                    <div className='flex items-center justify-start  gap-x-5'>

                        <Link to="/" className='bg-orange-500 flex-1 text-center text-sm text-white rounded-md py-2 px-4 hover:bg-orange-600'>Anasayfa'ya Dön</Link>
                        <button type='submit' className='bg-primary text-center text-sm  text-white rounded-md py-2 px-4 hover:bg-primary-hover'>Tamamla</button>
                    </div>
                </form>
            </div>
        </div>, modalRoot
    )
}

export default IdentityComplete