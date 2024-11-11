import Layout from "../layouts/Layout";
import { roleLoader } from "../loaders/roleLoader";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";

export const HomeRoutes = {
    path: "/",
    element: <Layout/>,
    children: [
        {path:"/", element :<Home/>, loader: () => roleLoader(["admin","user"])},
        {path:"about", element : <About/>, loader: () => roleLoader(["admin","user"])}
        
    ]
}