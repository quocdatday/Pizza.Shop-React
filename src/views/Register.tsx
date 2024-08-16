import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { auth } from "firebase-admin";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";
import { IUser } from "./admin/AdminSite";

const defaultUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: 0,
    address: "",
    role: "user"
}

const Register = () => {
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState("");
    const auth = getAuth();
    const [checkout, setCheckout] = useState("");
    const [user, setUser] = useState<IUser>(defaultUser);

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    function toLogin() {
        navigate("/login");
    }

    const confirmA = (e: any) => {
        e.preventDefault();
        const { password, confirmpassword, email } = user;
        if (!(confirmpassword === password)) {
            setConfirm("Xác nhận mật khẩu chưa đúng");
        } else {
            register(email, password);
        }
    }
    const register = (emailUser: string, passwordUser: string) => {
        createUserWithEmailAndPassword(auth, emailUser, passwordUser)
            .then((userInfo) => {
                const userX = userInfo.user;
                console.log("User signed up:", userX);
                const { id, ...data } = user;
                setDoc(doc(db, "users", userX.uid), data).then(() => {
                    navigate("/");
                });
            })
            .catch(() => {
                setCheckout("Tên đăng nhập đã có người sử dụng !");
            });
    }

    return (
        <div className="row justify-content-center align-items-center vh-100 w-auto mt-5" style={{ backgroundImage: 'url(img/food.png)' }}>
            <div className="col-auto p-5 rounded-3 shadow-lg bg-white">
                <div className="row justify-content-center align-items-center">
                    <div className="col-auto">
                        <div className="h2 text-uppercase fw-bold text-danger">
                            Pízza
                        </div>
                    </div>
                </div>
                <form action="#" method="post">
                    <Input
                        nameInput="name"
                        Placehoder="Tên người dùng"
                        onChange={handleChange}
                    />
                    <Input
                        nameInput="email"
                        Placehoder="Tên đăng nhặp(email)"
                        onChange={handleChange}
                    />
                    <Input
                        nameInput="password"
                        Placehoder="Password"
                        type="password"
                        onChange={handleChange}
                    />
                    <Input
                        nameInput="confirmpassword"
                        Placehoder="Xác nhận lại mật khẩu"
                        type="password"
                        onChange={handleChange}
                    />
                    <p className="text-danger">{confirm}</p>
                    <Input
                        nameInput="phone"
                        Placehoder="+(84) xx xxx xxxx"
                        onChange={handleChange}
                    />
                    <Input
                        nameInput="address"
                        Placehoder="Địa chỉ"
                        onChange={handleChange}
                    />
                    <p className="text-danger">{checkout}</p>
                    <button type="button" className="btn btn-secondary text-uppercase fw-bold text-white me-1"
                        onClick={
                            (e) => confirmA(e)
                        }
                    >
                        Create account
                    </button>
                    <button onClick={toLogin} className="btn btn-danger text-uppercase fw-bold text-white">Cancel</button>
                </form>
            </div>
        </div>

    );
}
export default Register;