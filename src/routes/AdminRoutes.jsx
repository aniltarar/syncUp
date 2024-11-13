import AdminLayout from "../layouts/AdminLayout";
// import { roleLoader } from "../loaders/roleLoader";
import HomeDash from "../pages/Admin/Dashboard/HomeDash";

export const AdminRoutes = {
    path: "/admin",
    element : <AdminLayout/>,
    children:[
        // {
        //     path:"dashboard",
        //     element: <HomeDash/>,
        //     loader: () => roleLoader(["admin"])
        // },
        {
            path:"dashboard",
            element: <HomeDash/>,
        },
        {
            path:"events",
            element: <div>Events</div>,
        }
    ]
}