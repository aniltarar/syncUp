import React from "react";
import { FaBullhorn } from "react-icons/fa";
import { FaClipboardCheck, FaPeopleRoof, FaCalendarDay } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const LeaderDash = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
      {/* Kulüpler Kartı */}
      <div className="group flex flex-col border p-6 rounded-lg items-center bg-white shadow-md hover:shadow-lg transition-shadow">
        <FaPeopleRoof size={50} className="text-primary group-hover:scale-110 transition-transform" />
        <h2 className="text-xl font-bold text-primary mt-4">Kulüpler</h2>
        <p className="text-gray-600 text-center mt-2">Lideri olduğunuz kulüpleri yönetebilir, üyeler ve etkinliklerle ilgili işlemleri gerçekleştirebilirsiniz.</p>
        <ul className="self-start mt-4 space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Kulüp Yönetimi</span> – Kulübünüzün düzenini sağlamak için yönetimsel işlemleri gerçekleştirebilirsiniz.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Üyeler</span> – Kulübünüzdeki üyeleri görüntüleyebilir, yeni üyeleri ekleyebilirsiniz.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Üye Başvuruları</span> – Yeni üye başvurularını inceleyebilir ve onaylayabilirsiniz.
          </li>
        </ul>
      </div>

      {/* Etkinlikler Kartı */}
      <div className="group flex flex-col border p-6 rounded-lg items-center bg-white shadow-md hover:shadow-lg transition-shadow">
        <FaCalendarDay size={50} className="text-primary group-hover:scale-110 transition-transform" />
        <h2 className="text-xl font-bold text-primary mt-4">Etkinlikler</h2>
        <p className="text-gray-600 text-center mt-2">Etkinliklerinizi yönetebilir, geçmiş etkinlikleri gözden geçirebilir ve yeni etkinlikler oluşturabilirsiniz.</p>
        <ul className="self-start mt-4 space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Geçmiş Etkinlikler</span> – Gerçekleştirilen etkinlikleri gözden geçirebilirsiniz.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Yeni Etkinlik Oluştur</span> – Yeni bir etkinlik düzenleyebilir, tarih ve yer belirleyebilirsiniz.
          </li>
        </ul>
      </div>

      {/* Duyurular Kartı */}
      <div className="group flex flex-col border p-6 rounded-lg items-center bg-white shadow-md hover:shadow-lg transition-shadow">
        <FaBullhorn size={50} className="text-primary group-hover:scale-110 transition-transform" />
        <h2 className="text-xl font-bold text-primary mt-4">Duyurular</h2>
        <p className="text-gray-600 text-center mt-2">Kulübünüzdeki duyuruları görüntüleyebilir ve yeni duyurular paylaşabilirsiniz.</p>
        <ul className="self-start mt-4 space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Geçmiş Duyurular</span> – Önceki duyuruları inceleyebilir, daha fazla detay alabilirsiniz.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Yeni Duyuru Ekle</span> – Kulübünüzle ilgili yeni gelişmeleri üyelerle paylaşabilirsiniz.
          </li>
        </ul>
      </div>

      {/* Üye Başvuruları Kartı */}
      <div className="group flex flex-col border p-6 rounded-lg items-center bg-white shadow-md hover:shadow-lg transition-shadow">
        <FaClipboardCheck size={50} className="text-primary group-hover:scale-110 transition-transform" />
        <h2 className="text-xl font-bold text-primary mt-4">Üye Başvuruları</h2>
        <p className="text-gray-600 text-center mt-2">Üye başvurularını inceleyebilir ve onaylayarak kulübünüze yeni üyeler katabilirsiniz.</p>
        <ul className="self-start mt-4 space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Başvuruları İncele</span> – Yeni üye başvurularını inceleyebilir ve detaylarına ulaşabilirsiniz.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Başvuruları Onayla</span> – Başvuruları onaylayarak üyeleri kulübünüze ekleyebilirsiniz.
          </li>
        </ul>
      </div>

      {/* Kulüp Ayarları Kartı */}
      <div className="group flex flex-col border p-6 rounded-lg items-center bg-white shadow-md hover:shadow-lg transition-shadow">
        <IoMdSettings size={50} className="text-primary group-hover:scale-110 transition-transform" />
        <h2 className="text-xl font-bold text-primary mt-4">Kulüp Ayarları</h2>
        <p className="text-gray-600 text-center mt-2">Kulüp bilgilerini güncelleyebilir, logonuzu değiştirebilirsiniz.</p>
        <ul className="self-start mt-4 space-y-3">
          <li className="text-gray-700">
            <span className="font-medium">Kulüp Bilgilerini Güncelle</span> – Kulüp adı, açıklama ve diğer bilgileri düzenleyebilirsiniz.
          </li>
          <li className="text-gray-700">
            <span className="font-medium">Logo Değiştir</span> – Kulübünüzün görsel kimliğini değiştirebilirsiniz.
          </li>
        </ul>
      </div>



    </div>
  );
};

export default LeaderDash;
