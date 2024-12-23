import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LeaderCreateAnnouncement from '../../../components/Modals/LeaderCreateAnnouncement'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnnouncementsByClubID, fetchClubByClubID, resetAnnouncements, resetCurrentClub } from '../../../redux/slices/leaderSlice'
import LeaderAnnouncementBox from '../../../components/Leader/LeaderAnnouncementBox'

const LeaderAnnouncemenDetail = () => {

    const { clubID } = useParams()

    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();

    const { currentClub, announcements } = useSelector((state) => state.leader)



    useEffect(() => {
        dispatch(resetCurrentClub());
        dispatch(resetAnnouncements());
        dispatch(fetchClubByClubID(clubID));
        dispatch(fetchAnnouncementsByClubID(clubID));
    }
        , [clubID, dispatch]);

    return (
        <>
            {
                isOpen && <LeaderCreateAnnouncement setIsOpen={setIsOpen} club={currentClub} />

            }
            <div className='flex flex-col gap-y-3'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font-semibold'>Duyurular</h1>
                    <button onClick={() => setIsOpen(true)} className="p-2 text-lg font-semibold bg-primary rounded-lg text-white hover:bg-primary-hover">Duyuru Oluştur</button>
                </div>
                <hr />
                <div className='grid grid-cols-4 gap-3'>
                    {
                        announcements?.map((announcement) => (
                            <LeaderAnnouncementBox key={announcement.id} announcement={announcement} />
                        ))
                    }

                </div>



            </div>
        </>
    )
}

export default LeaderAnnouncemenDetail