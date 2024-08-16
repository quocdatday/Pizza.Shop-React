import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import Footer from "./Footer";
import Header from "./Header";
import Login from "../views/Login";
import Menu from "../views/Menu";
import Service from "../views/Service";
import About from "../views/About";
import NotFound from "../views/NotFound";
import Register from "../views/Register";
import AdminSite from "../views/admin/AdminSite";
import AddorEditMaterial from "../views/admin/AddorEditMaterial";
import AddorEditPizza from "../views/admin/AddorEditPizza";
import AddUser from "../views/admin/AddUser";
import Cart from "../views/Cart";
import Success from "../views/Success";

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/service" element={<Service />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<Success />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/adminsite" element={<AdminSite />} />
                <Route path="/adminsite/addmaterial/:id" element={<AddorEditMaterial />} />
                <Route path="/adminsite/addpizza/:id" element={<AddorEditPizza />} />
                <Route path="/adminsite/adduser/:id" element={<AddUser />} />
            </Routes>
            <Footer />
        </>
    );
}

export default DefaultLayout;
