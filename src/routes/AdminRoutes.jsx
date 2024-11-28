import AdminLayout from "../layouts/AdminLayout";
import { roleLoader } from "../loaders/roleLoader";
import AdminAnnouncement from "../pages/Admin/Announcement/AdminAnnouncement";
import AdminClubs from "../pages/Admin/Clubs/AdminClubs";
import AdminClubsCheck from "../pages/Admin/Clubs/AdminClubsCheck";

import HomeDash from "../pages/Admin/Dashboard/HomeDash";
import AdminEvent from "../pages/Admin/Events/AdminEvent";
import AdminFeedbacks from "../pages/Admin/Feedbacks/AdminFeedbacks";
import AdminUsers from "../pages/Admin/Users/AdminUsers";

export const AdminRoutes = {
    path: "/admin",
    element: <AdminLayout />,
    children: [
        {
            path: "",
            element: <HomeDash />,
            loader: () => roleLoader(["admin"])
        },
        {
            path: "clubs",
            element: <AdminClubs />,
            loader: () => roleLoader(["admin"])
        },
        {
            path: "events",
            element: <AdminEvent />,
            loader: () => roleLoader(["admin"])
        },
        {
            path: "users",
            element: <AdminUsers />,
            loader: () => roleLoader(["admin"])
        },
        {
            path: "announcements",
            element: <AdminAnnouncement />,
            loader: () => roleLoader(["admin"])
        },
        {
            path: "feedbacks",
            element: <AdminFeedbacks />,
            loader: () => roleLoader(["admin"])
        },
        {
            path:"clubs-check",
            element: <AdminClubsCheck />,
            loader: () => roleLoader(["admin"])
        }


    ]
}