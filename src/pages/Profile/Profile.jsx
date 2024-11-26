import React, { useEffect, useState } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { facultiesAndDepartments } from '../../hooks/data/universityData';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { sendResetPasswordEmail, updateUser } from '../../redux/slices/authSlice';


const Profile = () => {
  const user = useAccount();
  const [selectedFaculty, setSelectedFaculty] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const updatedData = {}; // Güncellenecek verileri tutacak obje
    for (const key in data) {
      if (data[key] && data[key] !== user[key]) {
        // Sadece değişmiş olanları kontrol et
        updatedData[key] = data[key];

        // user id 'yi de ekleyelim
        updatedData.uid = user.uid;
      }
    };
    dispatch(updateUser(updatedData)); // Kullanıcıyı güncelle
  };
  useEffect(() => {
    if (user.faculty) {
      setSelectedFaculty(user.faculty);
    }
  }, [user.faculty]);


  

  return (
    <>
   
    <div className="min-h-screen w-full  flex flex-col items-center py-10 px-4 ">
      
      {/* Header */}
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6 border flex items-center justify-between">
        <span className='flex flex-col items-center justify-center'>

          <h1 className="text-2xl font-bold text-gray-800">Profilini Düzenle</h1>
          <p className="text-gray-600">Hoş Geldin, <span className="text-primary font-medium">{user.displayName}</span></p>
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6 mt-6 space-y-6 border"

      >
        {/* Ad Soyad */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
          <input
            type="text"
            defaultValue={user.displayName}
            {...register("displayName",)}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.name ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Telefon Numarası */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefon Numarası</label>
          <input
            type="text"
            defaultValue={user.phoneNumber}
            {...register("phoneNumber",)}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.phone ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-Posta Adresi</label>
          <input
            type="text"
            defaultValue={user.email}
            {...register("email",)}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.phone ? "border-red-500" : "border-gray-300"
              }`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Şifre Yenileme */}
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-gray-700">Şifre</label>
          <button
            type="button"
            className="px-4 py-2 text-sm text-white bg-primary rounded-lg hover:bg-primary-dark"
            onClick={()=>dispatch(sendResetPasswordEmail(user?.email))}
          >
            Şifre Yenileme Talebi Gönder
          </button>
        </div>

        {/* Fakülte */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fakülte</label>
          <select
            {...register("faculty",)}
            defaultValue={user.faculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.faculty ? "border-red-500" : "border-gray-300"
              }`}
          >
            <option value="">Fakülte Seçiniz</option>
            {Object.keys(facultiesAndDepartments).map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
          {errors.faculty && <p className="text-red-500 text-sm">{errors.faculty.message}</p>}
        </div>

        {/* Bölüm */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bölüm</label>
          <select
            {...register("department",)}
            disabled={!selectedFaculty}
            defaultValue={user?.department}

            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.department ? "border-red-500" : "border-gray-300"
              }`}
          >
            <option value="">{user.department}</option>
            {selectedFaculty &&
              facultiesAndDepartments[selectedFaculty]?.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
          </select>
          {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
        </div>

        {/* Sınıf */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sınıf</label>
          <select
            {...register("class",)}
            defaultValue={user.class}
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-primary focus:border-primary ${errors.class ? "border-red-500" : "border-gray-300"
              }`}
          >
            <option value="">Sınıf Seçiniz</option>
            <option value="prepclass">Hazırlık Sınıfı</option>
            <option value="1">1. Sınıf</option>
            <option value="2">2. Sınıf</option>
            <option value="3">3. Sınıf</option>
            <option value="4">4. Sınıf</option>
          </select>
          {errors.class && <p className="text-red-500 text-sm">{errors.class.message}</p>}
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
  );
};

export default Profile;
