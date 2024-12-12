import React, {  useState } from 'react';
import ApplyDetails from '../../Modals/ApplyDetails';
import { useDispatch } from 'react-redux';
import { rejectApply, successApply } from '../../../redux/slices/adminSlice';
import toast from 'react-hot-toast';
import { createClub } from '../../../redux/slices/clubSlice';


const ApplyBox = ({ apply }) => {
  const statusWord = {
    pending: "Beklemede",
    success: "Onaylandı",
    rejected: "Reddedildi",
  };
  const statusColor = {
    pending: "font-semibold text-yellow-500",
    success: "font-semibold text-green-500",
    rejected: "font-semibold text-red-500",
  };

const [isOpen, setIsOpen] = useState(false);
const dispatch = useDispatch();

const handleOpen = () => {
  setIsOpen(true);
}

const handleSuccess = (apply) => () => {

  if(apply.status ==="success" || apply.status ==="rejected"){
    if(apply.status ==="success"){
      toast.error("Bu kulüp zaten onaylanmış!");
    }else{
      toast.error("Bu kulüp zaten reddedilmiş!");
    }
    return;
  }
  dispatch(successApply(apply))
  dispatch(createClub(apply));
}

const handleReject = (apply) => () => {

  if(apply.status ==="success" || apply.status ==="rejected"){
    if(apply.status ==="success"){
      toast.error("Bu kulüp zaten onaylanmış!");
    }else{
      toast.error("Bu kulüp zaten reddedilmiş!");
    }
    return;
  }
  dispatch(rejectApply(apply.id))
}

  return (
    <>
    {
      isOpen && <ApplyDetails apply={apply} setIsOpen={setIsOpen} />
    }
    <div key={apply.id} className="grid grid-cols-6 px-4 py-3 bg-neutral-100 rounded-lg items-center ">
      <span >{apply.clubName}</span>
      <span>{apply.clubDescription.slice(0, 17)}...</span>
      <span>{apply.createdByName}</span>
      <img
        src={apply.clubLogo}
        style={{ width: "100px" ,}}
        alt={`${apply.clubName} kulüp logosu`}
        />
      {/* Durum göstergesi */}

      <span  className={`${statusColor[apply.status]}`}>
        {statusWord[apply.status]}
      </span>
      <div className="flex items-center justify-center gap-x-2">
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={handleOpen}>Detay</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={handleSuccess(apply)}>Onayla</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleReject(apply)}>Reddet</button>
      </div>
    </div>
        </>
  );
};

export default ApplyBox;
