import LeaderLayout from "../layouts/LeaderLayout";
import { roleLoader } from "../loaders/roleLoader";
import LeaderAnnouncemenDetail from "../pages/Leader/LeaderAnnouncement/LeaderAnnouncemenDetail";
import LeaderAnnouncement from "../pages/Leader/LeaderAnnouncement/LeaderAnnouncement";
import LeaderClubs from "../pages/Leader/LeaderClubs/LeaderClubs";
import LeaderClubSettings from "../pages/Leader/LeaderClubSettings/LeaderClubSettings";
import LeaderDash from "../pages/Leader/LeaderDash/LeaderDash";
import LeaderEvents from "../pages/Leader/LeaderEvents/LeaderEvents";
import LeaderMembers from "../pages/Leader/LeaderMembers/LeaderMembers";
import LeaderMembershipApplies from "../pages/Leader/LeaderMembershipApplies/LeaderMembershipApplies";
import LeaderMembershipAppliesDetail from "../pages/Leader/LeaderMembershipApplies/LeaderMembershipAppliesDetail";


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
            path: "clubs/members/:clubID",
            element: <LeaderMembers />,
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
            path: "announcements/:clubID",
            element: <LeaderAnnouncemenDetail />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "membership-applies",
            element: <LeaderMembershipApplies />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "membership-applies/:clubID",
            element: <LeaderMembershipAppliesDetail />,
            loader: () => roleLoader(["leader", "admin"])
        },
        {
            path: "club-settings",
            element: <LeaderClubSettings />,
            loader: () => roleLoader(["leader", "admin"])
        },
     
    ]
}