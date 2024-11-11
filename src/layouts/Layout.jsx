import Container from "../containers/Container"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"


const Layout = () => {
  return (
    <Container>
        {/* Statik Header'imiz. */}
        <Navbar/> 
        {/* İçeriye vereceğimiz sayfa */}
        <div className="flex flex-grow min-h-screen">
            <Outlet/>
        </div>
        {/* Statik Footer'ımız.  */}
        <Footer/>
    </Container>
  )
}

export default Layout