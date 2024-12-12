import LeaderLayout from "../layouts/LeaderLayout";
import { roleLoader } from "../loaders/roleLoader";
import LeaderAnnouncement from "../pages/Leader/LeaderAnnouncement/LeaderAnnouncement";
import LeaderClubs from "../pages/Leader/LeaderClubs/LeaderClubs";
import LeaderClubSettings from "../pages/Leader/LeaderClubSettings/LeaderClubSettings";
import LeaderDash from "../pages/Leader/LeaderDash/LeaderDash";
import LeaderEvents from "../pages/Leader/LeaderEvents/LeaderEvents";
import LeaderMembershipApplies from "../pages/Leader/LeaderMembershipApplies/LeaderMembershipApplies";


export const LeaderRoutes = {
    path: "/leader",
    element: <LeaderLayout />,
    children: [
        {
            path: "",
            element: <LeaderDash />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "clubs",
            element: <LeaderClubs />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "events",
            element: <LeaderEvents />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "announcements",
            element: <LeaderAnnouncement />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "membership-applies",
            element: <LeaderMembershipApplies />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "club-settings",
            element: <LeaderClubSettings />,
            loader: () => roleLoader(["leader", "admin"])
        },
     
      



    ]
}