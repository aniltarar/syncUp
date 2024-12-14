import React, { useState, useEffect } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { useDispatch, useSelector } from 'react-redux';
import { getClubAppliesByUserID, getMemberAppliesByUserID } from '../../redux/slices/applySlice';

const MyApplies = () => {
  const user = useAccount();
  const dispatch = useDispatch();
  const { memberApplies, applies } = useSelector((state) => state.apply);

  const [activeTab, setActiveTab] = useState('club');

  const statusTranslate = {
    pending: 'Beklemede',
    success: 'Kabul Edildi',
    rejected: 'Reddedildi',
  };

  const statusColor = {
    pending: 'bg-yellow-200 text-yellow-700',
    success: 'bg-green-200 text-green-700',
    rejected: 'bg-red-200 text-red-700',
  };

  useEffect(() => {
    dispatch(getMemberAppliesByUserID(user.uid));
    dispatch(getClubAppliesByUserID(user.uid));
  }, [dispatch, user.uid]);

  return (
    <div className="w-full p-5 ">
      <div className="flex justify-center mb-5 ">
        <button
          className={`px-4 py-2 font-medium text-sm rounded ${activeTab === 'club' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('club')}
        >
          Kulüp Başvurularım
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm rounded ml-2 ${activeTab === 'member' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('member')}
        >
          Üyelik Başvurularım
        </button>
      </div>

      <div className="bg-white rounded shadow-md p-5 border">
        {activeTab === 'club' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Kulüp Başvurularım</h2>
            {applies && applies.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {applies.map((apply) => (
                  <div key={apply.id} className="flex p-3 border rounded-lg items-center justify-between">
                    <span>Kulüp: {apply.clubName}</span>
                    <span className={`${statusColor[apply.status]} px-2 py-1 rounded-lg w-36 text-center`}>
                      {statusTranslate[apply.status]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Herhangi bir kulüp başvurunuz bulunmamaktadır.</p>
            )}
          </div>
        )}




        {activeTab === 'member' && (
          <div className=''>
            <h2 className="text-lg font-semibold mb-4">Üyelik Başvurularım</h2>
            {memberApplies && memberApplies.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {memberApplies.map((apply) => (
                  <div key={apply.id} className="flex p-3 border rounded-lg items-center justify-between">
                    <span>Kulüp: {apply.clubName}</span>
                    <span className={`${statusColor[apply.status]} px-2 py-1 rounded-lg w-36 text-center`}>
                      {statusTranslate[apply.status]}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Herhangi bir üyelik başvurunuz bulunmamaktadır.</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplies;
