import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebaseConfig'
import { useSelector } from 'react-redux'
import { Fragment, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useAccount } from '../../hooks/useAccount'


const ProfileDown = () => {

  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open); // open durumunu tersine çevirir
  };

  const exitHandle = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }
  const user = useAccount();


  return (

    <Menu >
      <MenuButton className="px-5 py-2 rounded-full  bg-primary/20 hover:bg-primary/50 hover:ring-2 ring-offset-2 ring-primary transition-all duration-200" onClick={toggleOpen}>
        <div className="flex items-center gap-3">
          <span className=" flex rounded-full "><FaUser size={16}/></span>
          <span>{user.displayName}</span>
          <MdOutlineKeyboardArrowDown className={`${open ? "transform rotate-180" : ""} transition-all duration-500`} />
        </div>
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <MenuItems
          anchor="bottom end"
          className="bg-white w-48 rounded-md shadow-xl border p-3 flex flex-col gap-y-2 mt-2"
        >
          {
            user.role == "admin" && (
              <MenuItem>
              <Link
                className="block  transition-colors text-sm data-[focus]:bg-neutral-100  px-2 py-1 rounded-md"
                to="/admin"
              >
                Admin Panel
              </Link>
            </MenuItem>
            )
          }
          
          <MenuItem>
            <Link
              className="block transition-colors text-sm data-[focus]:bg-neutral-100 px-2 py-1 rounded-md"
              to="/profile"
            >
              Profil
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block transition-colors text-sm data-[focus]:bg-neutral-100 px-2 py-1 rounded-md"
              to="/be-club-leader"
            >
              Kulüp Yöneticisi Ol
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block transition-colors text-sm data-[focus]:bg-neutral-100 px-2 py-1 rounded-md"
              to="/passed-events"
            >
              Geçmiş Etkinliklerim
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block transition-colors text-sm data-[focus]:bg-neutral-100 px-2 py-1 rounded-md"
              to="/my-clubs"
            >
              Kulüplerim
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block transition-colors text-sm data-[focus]:bg-neutral-100 px-2 py-1 rounded-md"
              to="/settings"
            >
              Ayarlar
            </Link>
          </MenuItem>
         
          <MenuItem>
            <Link
              onClick={exitHandle}
              className="block transition-colors text-sm bg-red-400 px-2 py-1 rounded-md data-[focus]:bg-red-500"
              href="/license"
            >
              Çıkış Yap
            </Link>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  )
}

export default ProfileDown