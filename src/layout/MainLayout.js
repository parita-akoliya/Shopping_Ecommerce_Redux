import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom';

const MainLayout =()=>{
return(
    <div className="main-app">
        <Header></Header>
        <main>
          
        <Outlet></Outlet>
        </main>
       
        <Footer></Footer>
    </div>
)
}
export default MainLayout;