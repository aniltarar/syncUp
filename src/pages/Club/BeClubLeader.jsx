import React, { useEffect, useState } from 'react'
import { useAccount } from '../../hooks/useAccount';
import { useForm } from 'react-hook-form';
import IdentityComplete from '../../components/Modals/IdentityComplete';
import { useDispatch } from 'react-redux';
import { createApply } from '../../redux/slices/applySlice';


const BeClubLeader = () => {

  const user = useAccount();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [hasIdentity, setHasIdentity] = useState(null);

  useEffect(() => {
    if (user?.identity === null) {
      setHasIdentity(true)
    }
  }, [user])

  const dispatch = useDispatch();


  const onSubmit = async (data) => {

    const file = data.clubLogo[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'syncUpMedia');
    formData.append('cloud_name', 'dqc5gegkm');
    const response = await fetch(" https://api.cloudinary.com/v1_1/dqc5gegkm/image/upload", {
      method: "POST",
      body: formData
    });
    const fileData = await response.json();
    const clubData = {
      clubName: data.clubName,
      clubDescription: data.clubDescription,
      clubLogo: fileData.secure_url,
      createdBy: user.uid,
      createdByName: user.displayName,
      status: "pending"
    }
    dispatch(createApply(clubData));

    reset();
  }




  return (
    <>
      {
        hasIdentity &&
        <IdentityComplete user={user} setHasIdentity={setHasIdentity} />
      }

      <div className="min-h-screen w-full  flex flex-col items-center py-5 px-4 ">

        {/* Header */}
        <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-5 border flex items-center justify-between">
          <div className='flex flex-col gap-y-1  w-full'>
            <h1 className="text-2xl font-bold text-gray-800 text-start">Kulüp Başvurusu Yap</h1>
            <p className="text-gray-600 text-start ">Hoş Geldin, <span className="text-primary font-medium">{user.displayName}</span></p>
            <p>Yeni bir kulüp oluşturmak istersen buradan başvuru yapabilirsin. Unutmadan söyleyelim, başvuruların <span className='text-primary text-xl font-semibold'>syncUp</span> tarafından incelenecektir. Uygun görüldüğü takdirde kulübün oluşturulacaktır.</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 mt-6 space-y-6 border"

        >
          {/* Kulübün Adı */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kulübün Adı</label>
            <input
              type="text"
              placeholder='Yazılım ve Bilişim Kulübü'
              {...register("clubName", { required: "Kulüp Adını Girmek Zorunludur.", maxLength: { value: 50, message: "Kulüp adı en fazla 50 karakter olabilir." }, minLength: { value: 5, message: "Kulüp adı en az 5 karakter olabilir." } })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.name ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.clubName && <p className="text-red-500 text-sm">{errors.clubName.message}</p>}
          </div>

          {/* Kulüp Açıklaması */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kulüp Açıklaması</label>

            <textarea
              placeholder='Kulübünüzün amacı, hedefleri ve faaliyetleri hakkında kısa bir açıklama yapınız.'


              {...register("clubDescription", { required: "Kulübün Açıklamasını Girmek Zorunludur", maxLength: { value: 500, message: "Kulüp açıklaması en fazla 500 karakter olabilir." }, minLength: { value: 10, message: "Kulüp açıklaması en az 10 karakter olabilir." } })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm min-h-20 max-h-60 focus:ring-primary focus:border-primary ${errors.description ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.clubDescription && <p className="text-red-500 text-sm">{errors.clubDescription.message}</p>}


          </div>

          {/* Kulüp Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Kulüp Logo</label>
            <input
              type="file"
              {...register("clubLogo", { required: "Kulüp Logosu Eklemek Zorunludur" })}
              className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.logo ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.clubLogo && <p className="text-red-500 text-sm">{errors.clubLogo.message}</p>}
          </div>




          {/* Submit Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-primary rounded-lg  hover:bg-primary-hover"
            >
              Kaydet
            </button>
          </div>
        </form>



      </div>
    </>
  )
}

export default BeClubLeader