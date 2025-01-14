import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileComplete from '../../components/Modals/ProfileComplete';
import { useAccount } from '../../hooks/useAccount';
import { FaBullhorn, FaClipboardCheck, FaPeopleRoof, FaCalendarDay } from "react-icons/fa6";
import studentClubs from '../../assets/studentClubs.svg';
import events from '../../assets/events.svg';
import announcements from '../../assets/announcements.svg';

const Home = () => {
  const [isActive, setIsActive] = useState(null);
  const user = useAccount();

  useEffect(() => {
    if (user?.phoneNumber === null) {
      setIsActive(true);
    }
  }, [user]);

  return (
    <>
      {isActive && <ProfileComplete user={user} setIsActive={setIsActive} />}

      <div className="container mx-auto mt-10 px-6">

        {/* Section: Üniversite Yaşamını Keşfet */}
        <div className="bg-neutral-100 p-8 rounded-xl shadow-md text-center">
          <h1 className="text-4xl font-semibold text-black mb-5">Üniversite Yaşamını Keşfet</h1>
          <p className="text-lg mb-4">SyncUp ile birlikte üniversitenin kulüplerini, etkinliklerini ve duyurularını keşfet!</p>
          <p className="text-lg mb-8">Kulüpler, Etkinlikler, Arkadaşlıklar... Her şey burada!</p>
          <div className="flex justify-center gap-5">
            <Link to="/clubs" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300">Kulüpler</Link>
            <Link to="/events" className="bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-accent transition duration-300">Etkinlikler</Link>
          </div>
        </div>

        {/* Section: SyncUp Neler Sunuyor? */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-3xl font-semibold text-black mb-6">SyncUp Neler Sunuyor?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
              <FaPeopleRoof size={60} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Kulüpler</h3>
              <p className="text-md text-center">İlgi alanlarına göre kulüplere katıl.</p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
              <FaCalendarDay size={60} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Etkinlikler</h3>
              <p className="text-md text-center">Etkinlikleri takip et ve katıl.</p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
              <FaBullhorn size={60} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Duyurular</h3>
              <p className="text-md text-center">Üniversite duyurularını takip et.</p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
              <FaClipboardCheck size={60} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Başvurular</h3>
              <p className="text-md text-center">Kulüp ve üye başvurularını takip et.</p>
            </div>
          </div>
        </div>

        {/* Section: Platformumuzda Neler Var? */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-black mb-10 text-center">Platformumuzda Neler Var?</h2>

          {/* Kulüpler */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12 ">
            <div className="flex flex-col gap-5 lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-3">Kulüplerimiz</h3>
              <p>Üniversitenin çeşitli kulüplerine katıl ve yeni arkadaşlıklar edin. İlgi alanına hitap eden kulüpleri görmek için Kulüpler sayfamıza göz at!</p>
              <Link to="/clubs" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 mt-4">Kulüpleri Keşfet</Link>
            </div>
            <div className="lg:w-1/2 order-last lg:order-first">
              <img src={studentClubs} alt="Student Clubs" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Etkinlikler */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
            <div className="flex flex-col gap-5 lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-3">Etkinlikler</h3>
              <p>Üniversitedeki etkinlikleri keşfedin. Bir etkinliğe katılmadan önce kulübe üye olman gerektiğini unutma!</p>
              <Link to="/events" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 mt-4">Etkinlikleri Keşfet</Link>
            </div>
            <div className="lg:w-1/2 order-last">
              <img src={events} alt="Etkinlikler" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>

          {/* Duyurular */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
            <div className="flex flex-col gap-5 lg:w-1/2">
              <h3 className="text-2xl font-semibold mb-3">Duyurular</h3>
              <p>SyncUp platformunda yapılan duyuruları takip et ve hiçbir haberi kaçırma.</p>
              <Link to="/announcements" className="bg-primary text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-primary-dark transition duration-300 mt-4">Duyuruları Keşfet</Link>
            </div>
            <div className="lg:w-1/2 order-last lg:order-first">
              <img src={announcements} alt="Duyurular" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
