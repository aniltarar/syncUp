import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebaseConfig'

const ProfileDown = () => {


  const exitHandle = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <Menu>
      <MenuButton className="p-2 rounded-md bg-blue-100" >
        <div className='flex items-center gap-3'>
          <span className='w-8 h-8 flex rounded-full bg-blue-300'></span>
          <span>Kullanıcı Adı</span>

        </div>
      </MenuButton>
      <MenuItems anchor="bottom end" className="bg-white w-48 rounded-md shadow-xl border p-3 flex flex-col gap-y-1">
        <MenuItem >
          <Link className="block border-b-[1px] transition-colors text-lg data-[focus]:bg-blue-100" to="/profile">
            Profil
          </Link>
        </MenuItem>
        <MenuItem >
          <Link className="block border-b-[1px] transition-colors text-lg data-[focus]:bg-blue-100" to="/be-manager">
            Kulüp Yöneticisi Ol
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block border-b-[1px] transition-colors text-lg data-[focus]:bg-blue-100" to="/my-events">
            Geçmiş Etkinliklerim
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block border-b-[1px] transition-colors text-lg data-[focus]:bg-blue-100" to="/my-clubs">
            Kulüplerim
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="block border-b-[1px] transition-colors text-lg data-[focus]:bg-blue-100" to="/settings">
            Ayarlar
          </Link>
        </MenuItem>
        <MenuItem>
          <Link onClick={exitHandle} className="block  transition-colors text-lg bg-red-400 px-1 rounded-lg data-[focus]:bg-red-500" href="/license">
            Çıkış Yap
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}

export default ProfileDown