import React from 'react'
import { useAdmin } from '../../../hooks/useAdmin'
import { useSelector } from 'react-redux';
import ApplyBox from '../../../components/Admin/ClubApplies/ApplyBox';

const AdminClubsApplies = () => {

  useAdmin();
  const { clubApplies } = useSelector((state) => state.admin);

  return (
    <div className="min-h-screen  my-auto">

      <div className='grid grid-cols-2'>
        <ApplyBox />
        <ApplyBox />
      </div>
    </div>
  )
}

export default AdminClubsApplies