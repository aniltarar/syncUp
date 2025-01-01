import Container from "../containers/Container"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { Toaster } from "react-hot-toast"


const Layout = () => {
  return (
    <Container>
        {/* Statik Header'imiz. */}
        <Navbar/> 
        {/* İçeriye vereceğimiz sayfa */}
        <div className="flex container mx-auto mt-5  ">
          <Toaster position="top-center" />
            <Outlet/>
        </div>
        {/* Statik Footer'ımız.  */}
        {/* <Footer/> */}
    </Container>
  )
}

export default Layout