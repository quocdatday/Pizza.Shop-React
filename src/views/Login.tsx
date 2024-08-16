import { Link, NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { IUser } from "./admin/AdminSite";
import { Console } from "console";

const Login = () => {
    const auth = getAuth();
    const user = auth.currentUser ? auth.currentUser : "";
    const navigate = useNavigate();
    const [checkout, setCheckout] = useState("");
    const [loginInput, setLoginInput] = useState({username: "", password: ""});
    function toRegister() {
        navigate("/register");
    }
    function toHome() {
        navigate("/");
    }

    const handleInput = (e:any) => {
        setLoginInput({
            ...loginInput,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const loginUser = (e: any) => {
        const {username: email, password} = loginInput;
        e.preventDefault();
        signInWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Login thành công:", user.uid);
                getDoc(doc(collection(db, "users"), user.uid)).then((doc) => {
                    const checkUser = doc.data() as IUser;
                    if(checkUser.role === "admin"){
                        navigate("/adminsite");
                    }else{
                        navigate("/");
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                setCheckout("Sai tên đăng nhập hoặc mật khẩu !");
            });
    }

    useEffect(() => {
        console.log(user);
    });

    return (
        <div className="row justify-content-center align-items-center vh-100 w-auto mt-5" style={{ backgroundImage: 'url(img/food.png)' }}>
            <div className="col-auto p-5 rounded-3 shadow-lg bg-white">
                <div className="row justify-content-center mb-4">
                    <div className="col-auto">
                        <div className="h2 text-uppercase fw-bold text-danger">
                            Pízza
                        </div>
                    </div>
                </div>
                <form action="#" method="post">
                    <Input
                        nameInput="username"
                        Placehoder="User name"
                        onChange={handleInput}
                    />
                    <Input
                        nameInput="password"
                        Placehoder="Password"
                        type="password"
                        onChange={handleInput}
                    />
                    <p className='text-danger'>{checkout}</p> 
                    <button type="submit" className="btn btn-secondary text-uppercase fw-bold text-white"
                        onClick={(e) => loginUser(e)}
                    >
                        Login
                    </button>
                    <button onClick={toRegister} className="btn btn-info text-uppercase fw-bold text-white mx-2">Sign up</button>
                    <button onClick={toHome} className="btn btn-danger text-uppercase fw-bold text-white">Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Login;