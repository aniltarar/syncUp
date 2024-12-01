import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { disableUser, enableUser, getUsers } from '../../../redux/slices/adminSlice';
import { facultiesAndDepartments } from '../../../data/universityData';
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import toast from 'react-hot-toast';

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

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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

  return (
    <div className='flex flex-col p-3 gap-y-5'>
      <div className='bg-neutral-100 p-3 rounded-lg'>
        <h1 className='text-2xl'>Hoş Geldiniz, <span className='text-primary font-semibold'>Admin</span></h1>
        <p>Admin paneli üzerinden kullanıcılar hakkında bilgi edinebilirsiniz.</p>
        <p>Kullanıcıların <span className='font-semibold hover:cursor-pointer'>mail adresine</span> veya <span className='font-semibold hover:cursor-pointer'>telefon numarasına</span> tıklayarak iletişime geçebilirsiniz.</p>
      </div>

      <div className='bg-neutral-100 p-3 rounded-lg shadow'>
        <div className='grid grid-cols-6 gap-3 items-center'>
          <input type="text" placeholder='Kullanıcı Adı, Mail Adresi, Telefon Numarası'
            className='col-span-3 px-2 py-1 outline-none rounded-lg border'
            value={search} onChange={(e) => setSearch(e.target.value)} />

          <select value={faculty} onChange={(e) => setFaculty(e.target.value)}
            className='col-span-1 px-2 py-1 rounded-lg border'>
            <option value="">Fakülte</option>
            {Object.keys(facultiesAndDepartments).map(faculty => (
              <option key={faculty} value={faculty}>{faculty}</option>
            ))}
          </select>

          <select value={department} onChange={(e) => setDepartment(e.target.value)}
            className='col-span-1 px-2 py-1 rounded-lg border'>
            <option value="">Bölüm</option>
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

      {sortedUsers?.map(user => (
        <div key={user.uid} className='grid grid-cols-7 gap-3 items-center bg-neutral-100 p-3 rounded-lg shadow'>
          <span className="justify-self-start">{user.displayName.toUpperCase()}</span>
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
  );
};

export default AdminUsers;
