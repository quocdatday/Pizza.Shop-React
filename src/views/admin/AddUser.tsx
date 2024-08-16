import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { IPizza, IUser } from "./AdminSite";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

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

const AddUser = () => {
    const [Dat, setDat] = useState();
    const navigate = useNavigate();
    const auth = getAuth();
    const [user, setUser] = useState<IUser>(defaultUser);
    const [confirm, setConfirm] = useState("");
    const [checkout, setCheckout] = useState("");
    const { id } = useParams();
    const chuyentrang = useNavigate();
    const toAdmin = () => {
        chuyentrang('/adminsite');
    }

    const handleChange = (e: any) => {
        setUser({
            ...user,
            [e.currentTarget.name]: e.currentTarget.value
        });
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
                    navigate("/adminsite");
                });
            })
            .catch(() => {
                setCheckout("Tên đăng nhập đã có người sử dụng !");
            });
    }

    useEffect(() => {

    });

    return (

        <>
            <>
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-4 p-4 shadow-lg bg-light">
                        <form action="#" method="POST" >
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
                                Placehoder="Mật khẩu"
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
                            <button className="btn btn-primary me-2"
                                onClick={
                                    (e) => confirmA(e)
                                }
                            >
                                {id === "addNew" ? "Add" : "Save"}
                            </button>
                            <button className="btn btn-danger" onClick={toAdmin}>Cancel</button>
                        </form>
                    </div>
                </div>

            </>
        </>
    );
}

export default AddUser;