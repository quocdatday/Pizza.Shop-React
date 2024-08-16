import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import { User, getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
const Header = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser ? auth.currentUser : false;
    const [displayName, setDisplayname] = useState("Login");
    const [cart, setCart] = useState("");
    const checkLILO = (e: any) => {
        if (user) {
            e.preventDefault();
            signOut(auth).then(() => {
                console.log("Logout thành công", user);
                navigate("/");
            });
        }
    }

    useEffect(() => {
        console.log("out: " + user);
        if (user) {
            console.log("in: " + user);
            const x: string[] = user && user.email ? user.email.split("@") : [];
            setDisplayname(x[0] + "-Logout");
            setCart("bi bi-cart");
        } else {
            setDisplayname("Login");
            setCart("");
        }
    }, [user, displayName]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark p-2 fixed-top shadow-lg" style={{ background: 'black' }}>
            <div className="container-fluid">
                <a className="navbar-brand ms-md-5" href="#">
                    <p className="m-0 special-font fs-4 lh-1">Pizza <br /> Delicous</p>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse headerPage" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className='nav-item'>
                            <NavLink className="nav-link mx-2 fs-6 fw-bold text-uppercase" aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link mx-2 fs-6 fw-bold text-uppercase" to="/menu">Menu</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link mx-2 fs-6 fw-bold text-uppercase" to="/service">Service</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link mx-2 fs-6 fw-bold text-uppercase" to="/about">About</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className={user ? "nav-link mx-2 fs-6 fw-bold text-uppercase" : ""} to="/cart">
                                <i className={`${cart}`}></i>
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className="nav-link ms-2 me-5 fs-6 fw-bold text-uppercase" to="/login"
                                onClick={(e) => checkLILO(e)}
                            >
                                {displayName}
                            </NavLink>
                        </li>
                        <li className='nav-item'>
                            <a href="#" className="mx-3" />
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;