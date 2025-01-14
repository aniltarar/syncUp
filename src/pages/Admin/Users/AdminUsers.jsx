import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableUser, enableUser, getUsers } from '../../../redux/slices/adminSlice';
import { facultiesAndDepartments } from '../../../data/universityData';
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import autoAnimate from '@formkit/auto-animate';



const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.admin);



  const roleTranslate = {
    "admin": "Yönetici",
    "user": "Üye",
    "leader": "Kulüp Lideri"
  };

  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState("asc"); // A-Z veya Z-A sıralama


  
  const filteredUsers = users?.filter(user => {
    const matchFaculty = faculty === '' || user.faculty === faculty;
    const matchDepartment = department === '' || user.department === department;
    const matchRole = role === '' || user.role === role;
    const matchSearch = user.displayName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phoneNumber.toLowerCase().includes(search.toLowerCase());
    return matchFaculty && matchDepartment && matchRole && matchSearch;
  });

  const sortedUsers = [...filteredUsers]?.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.displayName.localeCompare(b.displayName);
    } else {
      return b.displayName.localeCompare(a.displayName);
    }
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const setDisableUser = (user) => {
    if (user.role === 'admin') {
      toast.error("Yönetici hesapları engellenemez!");
      return;
    } else {
      dispatch(disableUser(user.uid));
    }
  }

  const userBoxRef = useRef(null);

useEffect(() => {
    if (userBoxRef.current) {
      autoAnimate(userBoxRef.current);
    }
}, [userBoxRef]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className='flex flex-col gap-y-5'>
      <div className='bg-neutral-100 p-3 rounded-lg flex flex-row items-center justify-between gap-y-2'>
        <div>

          <h1 className='text-2xl  font-semibold'>Kullanıcı Paneli </h1>
          <p className='text-sm'>Admin paneli üzerinden kullanıcılar hakkında bilgi edinebilirsiniz.</p>
          <p className='text-sm'>Kullanıcıların <span className='font-semibold hover:cursor-pointer '>mail adresine</span> veya <span className='font-semibold hover:cursor-pointer'>telefon numarasına</span> tıklayarak iletişime geçebilirsiniz.</p>
        </div>
        <div className=' text-xl flex items-center gap-x-2 animate-pulse'>
          <span className='text-2xl font-semibold text-primary '>{sortedUsers?.length}</span>  Kullanıcı Mevcut
        </div>
      </div>

      <div className='bg-neutral-100 p-3 rounded-lg shadow'>
        <div className='flex w-full items-center justify-between mb-3'>
        </div>
        <div className='grid grid-cols-6 gap-3 items-center'>
          <input type="text" placeholder='Kullanıcı Adı, Mail Adresi, Telefon Numarası'
            className='col-span-3 px-2 py-1 outline-none rounded-lg border'
            value={search} onChange={(e) => setSearch(e.target.value)} />

          <select value={faculty} onChange={(e) => setFaculty(e.target.value)}
            className='col-span-1 px-2 py-1 rounded-lg border'>
            <option value="">Tüm Fakülteler</option>
            {Object.keys(facultiesAndDepartments).map(faculty => (
              <option key={faculty} value={faculty}>{faculty}</option>
            ))}
          </select>

          <select value={department} onChange={(e) => setDepartment(e.target.value)}
            className='col-span-1 px-2 py-1 rounded-lg border'>
            <option value="">Tüm Bölümler</option>
            {faculty && facultiesAndDepartments[faculty].map(department => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)}
            className='col-span-1 px-2 py-1 rounded-lg border'>
            <option value="">Tüm Roller</option>
            <option value="admin">Yönetici</option>
            <option value="user">Üye</option>
            <option value="leader">Kulüp Lideri</option>
          </select>

        </div>
      </div>

      <div className='grid grid-cols-7 gap-3 bg-neutral-100 p-3 place-items-center rounded-lg shadow font-semibold'>
        <span onClick={toggleSortOrder} className="cursor-pointer flex items-center gap-x-3 justify-self-start">
          Ad Soyad {sortOrder === "asc" ? <FaSortAlphaDown size={20} /> : <FaSortAlphaDownAlt size={20} />}
        </span>
        <span className="justify-self-start">Mail Adresi</span>
        <span className="justify-self-start">Telefon Numarası</span>
        <span className='justify-self-start'>Fakültesi</span>
        <span className="justify-self-start">Bölümü</span>
        <span className="justify-self-start">Rolü</span>
        <span className="justify-self-center">Hesap Durumu</span>
      </div>
      {
        sortedUsers?.length === 0 && (
          <div className='text-center text-lg text-gray-500'>
            Henüz kullanıcı kaydı bulunmamaktadır.
          </div>
        )
      }

      <div ref={userBoxRef} className='flex flex-col gap-y-3'>

     
      {sortedUsers?.map((user) => (
        <div key={user.uid} className='grid grid-cols-7 gap-3 items-center bg-neutral-100 p-3 rounded-lg shadow min-h-16 max-h-20'>
          <span className="justify-self-start"> {user.displayName.toUpperCase()}</span>
          <a href={`mailto:${user.email}`} className='hover:text-blue-500 justify-self-start'>{user.email}</a>
          <a href={`tel:${user.phoneNumber}`} className='hover:text-blue-500 justify-self-start'>{user.phoneNumber}</a>
          <span>{user.faculty}</span>
          <span className="justify-self-start">{user.department}</span>
          <span>{roleTranslate[user.role]}</span>
          <span className='justify-self-center'>
            {
              user?.disabled ? <button className='px-2 py-1 w-36 bg-red-500 text-white rounded-lg' onClick={() => dispatch(enableUser(user.uid))}>Aktif Değil</button> : <button className='px-2 py-1 w-36  bg-green-500 text-white rounded-lg' onClick={() => setDisableUser(user)}>Aktif</button>
            }

          </span>
        </div>
      ))}
       </div>

    </div>
  );
};

export default AdminUsers;
