import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="max-w-7xl mx-auto">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default AppLayout
