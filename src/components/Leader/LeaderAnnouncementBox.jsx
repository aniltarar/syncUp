import dayjs from 'dayjs';
import React from 'react';
import { FaCalendarDay } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";

const LeaderAnnouncementBox = ({ announcement }) => {
    const { title, content, announcementImage, createdAt, clubName } = announcement;


    const date = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6);
    const formattedDate = dayjs(date).format('DD/MM/YYYY');

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl">
            <div className="relative border-b py-3">
                <img
                    src={announcementImage || "/placeholder.svg?height=200&width=400"}
                    alt={title}
                    className="w-full h-48 object-contain"
                />
                <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-3 py-1 rounded-br-lg">
                    {clubName}
                </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-y-3">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-muted-foreground mb-4">{content}</p>
                </div>
       
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto border-t pt-2">
                    <div className="flex items-center">
                        <FaCalendarDay className="w-4 h-4 mr-1" />
                        {formattedDate}
                    </div>
                    <div className="flex items-center">
                        <FaUsers className="w-4 h-4 mr-1" />
                        {clubName}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderAnnouncementBox;
