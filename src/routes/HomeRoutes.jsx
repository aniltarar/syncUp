import Layout from "../layouts/Layout";
import { roleLoader } from "../loaders/roleLoader";

import About from "../pages/About/About";
import Announcement from "../pages/Announcement/Announcement";
import AllClubs from "../pages/Club/AllClubs";
import BeClubLeader from "../pages/Club/BeClubLeader";
import ClubDetail from "../pages/Club/ClubDetail";
import MyClubs from "../pages/Club/MyClubs";
import AllEvents from "../pages/Event/AllEvents";
import PassedEvents from "../pages/Event/PassedEvents";
import Home from "../pages/Home/Home";
import Notifications from "../pages/Notifications/Notifications";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

export const HomeRoutes = {
    path: "/",
    element: <Layout />,
    children: [
        { path: "/", element: <Home /> },
        { path: "about", element: <About />, loader: () => roleLoader(["user", "leader", "admin"]) },
        { path: "profile", element: <Profile />, loader: () => roleLoader(["user", "leader", "admin"]) },
        { path: "clubs", element: <AllClubs />, },
        { path: "clubs/:id", element: <ClubDetail />, },
        { path: "events", element: <AllEvents />, },
        { path: "announcments", element: <Announcement />, },
        { path: "settings", element: <Settings />, },

        { path: "notifications", element: <Notifications />, loader: () => roleLoader(["user", "leader", "admin"]) },

        { path: "my-clubs", element: <MyClubs />, loader: () => roleLoader(["user", "leader", "admin"]) },
        { path: "passed-events", element: <PassedEvents />, loader: () => roleLoader(["user", "leader", "admin"]) },
        { path: "be-club-leader", element: <BeClubLeader />, loader: () => roleLoader(["user", "leader", "admin"]) },




    ]
}