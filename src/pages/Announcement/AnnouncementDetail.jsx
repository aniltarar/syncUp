import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAnnouncementById, resetCurrentAnnouncement } from "../../redux/slices/announcementSlice";
import dayjs from "dayjs";
import { IoMdArrowRoundBack } from "react-icons/io";

const AnnouncementDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentAnnouncement } = useSelector((state) => state.announcement);

    const { title, content, publisher, createdAt, announcementImage } = currentAnnouncement || {};
    const formattedDate = createdAt ? dayjs(createdAt.toDate()).format("DD/MM/YYYY HH:mm") : "";

    useEffect(() => {
        dispatch(resetCurrentAnnouncement());
        dispatch(fetchAnnouncementById(id));
    }, [dispatch, id]);

    return (
        <div className="flex flex-col gap-y-3 w-full">
            <Link to="/announcements" className='flex items-center gap-x-2 text-sm text-neutral-400 mb-5  hover:text-neutral-500 transition-colors'>
                <span>
                    <IoMdArrowRoundBack />
                </span>
                <span >Duyurular Sayfasına Geri Dön</span>
            </Link>

            <div className="w-3/4 border mx-auto p-4 bg-white rounded-lg shadow-md ">
                {announcementImage && (
                    <img
                        src={announcementImage}
                        alt={title}
                        className="w-full h-64 object-contain rounded-lg mb-4 shadow-md"
                    />
                )}
                <div className="px-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{content}</p>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 text-sm text-gray-500">
                        <p>
                            <span className="font-medium">Yayınlayan:</span> {publisher || "Bilinmiyor"}
                        </p>
                        <p>
                            <span className="font-medium">Tarih:</span> {formattedDate || "Belirtilmemiş"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementDetail;
