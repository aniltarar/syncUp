import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getClubLeadersName, setClubActive, setClubPassive } from '../../redux/slices/adminSlice';

const ClubBox = ({ club }) => {
  const dispatch = useDispatch();
  const [leaders, setLeaders] = useState([]);

  const statusWord = {
    active: "Aktif",
    passive: "Pasif",
  };

  // Her kelimenin ilk harfini büyük yapma fonksiyonu
  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  useEffect(() => {
    dispatch(getClubLeadersName(club.id)).then((data) => {
      const leaderNames = data.payload.map((name) => capitalizeWords(name));
      setLeaders(leaderNames);
    });
  }, [club, dispatch]);

  return (
    <div key={club?.id} className="grid grid-cols-6 bg-white p-3 rounded-lg shadow min-h-32 max-h-40 items-center">
      <span>{club?.clubName}</span>
      <span>{club?.clubDescription}</span>
      <span className="justify-self-center">
        {leaders.length > 0 ? leaders.join(', ') : 'Lider Yok'}
      </span>
      <span className="justify-self-center">{club?.members.length}</span>
      <span className="justify-self-center">{club?.events.length}</span>
      <span className="justify-self-center">
        {club?.status === "active" ? (
          <button
            onClick={() => dispatch(setClubPassive(club?.id))}
            className="px-2 py-1 w-36 bg-green-500 text-white rounded-lg"
          >
            Aktif
          </button>
        ) : (
          <button
            onClick={() => dispatch(setClubActive(club?.id))}
            className="px-2 py-1 w-36 bg-red-500 text-white rounded-lg"
          >
            Pasif
          </button>
        )}
      </span>
    </div>
  );
};

export default ClubBox;
