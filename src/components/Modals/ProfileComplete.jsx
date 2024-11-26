import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { updateUser } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { facultiesAndDepartments } from "../../hooks/data/universityData";

const ProfileComplete = ({ user, setIsActive }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

 

  const onSubmit = (data) => {
    const userData = {
      uid: user.uid,
      ...data
    }

    dispatch(updateUser(userData))
    setIsActive(false)
  };


  const modalRoot = document.getElementById("modal-root");

  return createPortal(

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Hoş Geldin Kullanıcı</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
          {/* Telefon Numarası */}
          <div>
            <label className="block mb-1 font-medium">Telefon Numaranız</label>
            <input
              {...register("phoneNumber", {
                required: "Telefon numarası gereklidir.",
                pattern: {
                  message: "Geçerli bir telefon numarası girin.",
                  value: /^[0-9]{10}$/,
                },
              })}
              placeholder="5554443322"
              className={`border px-4 py-2 rounded-md w-full ${errors.phoneNumber ? "border-red-500" : ""
                }`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          {/* Fakülte Seçimi */}
          <div>
            <label className="block mb-1 font-medium">Fakülteniz</label>
            <select
              {...register("faculty", { required: "Fakülte seçimi gereklidir." })}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className={`border px-4 py-2 rounded-md w-full ${errors.faculty ? "border-red-500" : ""
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

          {/* Bölüm Seçimi */}
          <div>
            <label className="block mb-1 font-medium">Bölümünüz</label>
            <select
              {...register("department", { required: "Bölüm seçimi gereklidir." })}
              disabled={!selectedFaculty}
              className={`border px-4 py-2 rounded-md w-full ${errors.department ? "border-red-500" : ""
                }`}
            >
              <option value="">Bölüm Seçiniz</option>
              {selectedFaculty &&
                facultiesAndDepartments[selectedFaculty].map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
            </select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>

          {/* Sınıf Seçimi */}
          <div>
            <label className="block mb-1 font-medium">Sınıfınız</label>
            <select
              {...register("class", { required: "Sınıf seçimi gereklidir." })}
              className={`border px-4 py-2 rounded-md w-full ${errors.class ? "border-red-500" : ""
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
          <span className="text-sm">Sistemi kullabilmek için gerekli bilgileri doldurmanız ve kaydetmeniz gerekmektedir.</span>
          {/* Butonlar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:bg-green-600 mr-2 transition-colors"
            >
              Kaydet
            </button>

          </div>
        </form>
      </div>
    </div>, modalRoot)



};

export default ProfileComplete;
