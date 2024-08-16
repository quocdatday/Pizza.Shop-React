import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../views/Cart.css";
import { IOrder, IPizza } from "./admin/AdminSite";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// localStorage.setItem('key', JSON.stringify(value));
// localStorage.removeItem('key');
// localStorage.clear();

// Lấy chuỗi JSON từ Local Storage
// const storedArray = localStorage.getItem('key');
// Chuyển đổi chuỗi JSON thành mảng JavaScript
// const parsedArray = JSON.parse(storedArray);
const defaultOrder = {
    id: "",
    name: "",
    date: "",
    total: 0,
    product: [""]
}
const Cart = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser ? auth.currentUser : false;
    const currentDate: Date = new Date();
    const [datetime, setDatetime] = useState<string>("");
    const [orders, setOrders] = useState<IOrder>(defaultOrder);
    const [userName, setUsername] = useState("");
    const [orderPizza, setOrderPizza] = useState<IPizza[]>([]);
    const [keys, setKey] = useState(Object.keys(localStorage));
    const [quantityValue, setQuantity] = useState<Number[]>([1, 1, 1]);
    const [totals, setTotal] = useState<Number>(0);
    const [change, setChange] = useState("");
    const setOrder = () => {
        if (localStorage.length > 0) {
            const data: IPizza[] = keys.map((key) => {
                const x = localStorage.getItem(key) ? localStorage.getItem(key) : null;
                if (x !== null) {
                    return JSON.parse(x);
                } else {
                    console.log("Key local giỏ hàng sai");
                }
            });
            setOrderPizza(data);
            setTotal(x => {
                let total = 0;
                const price = orderPizza.map((data, i) => {
                    total += (Number(data.price) * Number(quantityValue[i]));
                });
                return total;
            });
        }
    }

    const removeOrder = (e: any, key: string) => {
        localStorage.removeItem(key);
        setKey(Object.keys(localStorage));
        setChange(key);
    }

    const handleChange = (e: any, i: number) => {
        const a: number = e.currentTarget.value;
        setQuantity(x => {
            const oldData = [...quantityValue];
            oldData[i] = a;
            return oldData;
        });
    }

    const Buy = (e: any) => {
        e.preventDefault();
        setOrders({
            id: String(auth.currentUser?.email !== null ? auth.currentUser?.email : "none"),
            name: String(auth.currentUser?.email !== null ? auth.currentUser?.email : "none"),
            date: datetime,
            total: Number(totals.toFixed(2)),
            product: orderPizza.map((data) => {
                return data.name
            })
        });
        setUsername(auth.currentUser?.email ? auth.currentUser?.email : "none");
        setChange("z");
        // setDoc(doc(db, "orders", userName), );
    }
    useEffect(() => {
        setDatetime(`${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`);
        console.log(datetime);
        setKey(Object.keys(localStorage));
        setOrder();
        if (userName !== "") {
            // console.log(orders);
            addDoc(collection(db, "orders"), orders).then(() => {
                localStorage.clear();
                navigate("/success");
            });
            // setDoc(doc(db, "orders", userName), orders).then(() => {
            //     localStorage.clear();
            //     navigate("/success");
            // });
        };
    }, [Navigate, quantityValue, totals, change, orders]);
    return (
        <>
            {localStorage.length == 0 ? (
                <div className="row justify-content-center align-items-center vh-100 w-100 pt-5 g-0">
                    <div className="row justify-content-center p-5" style={{ backgroundColor: "#f1dfda" }}>
                        <div className="col-12 text-center p-5">
                            <p className="h2" style={{ color: "rgb(235, 161, 12)" }}>Your cart is empty</p>
                        </div>
                        <div className="col-auto">
                            <Link id="btnParent" to="/menu" className="btn btn-white border border-0 shadow-lg bg-white p-5 rounded-circle">
                                <i id="btnCart" className="bi bi-cart-plus h1 text-secondary" ></i>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="row justify-content-center align-content-center w-100 pt-4 g-0 px-2">
                    <div className="row justify-content-center p-0 mt-5">
                        <div className="col-12 p-3 w-100 text-center" style={{ backgroundColor: "#f1dfda" }}  >
                            <p className="h3" style={{ color: "rgb(235, 161, 12)" }}>Your cart</p>
                        </div>
                    </div>
                    <div className="row justify-content-around p-4 border border-end-0 border-start-0 border-top-0 border-warning">
                        <div className="col-6"></div>
                        <div className="col-2">
                            <p className="text-uppercase p-1 m-0 text-color-default">Price</p>
                        </div>
                        <div className="col-2">
                            <p className="text-uppercase p-1 m-0 text-color-default">Quantity</p>
                        </div>
                        <div className="col-2">
                            <p className="text-uppercase p-1 m-0 text-color-default">Total</p>
                        </div>
                    </div>
                    {
                        orderPizza.map((data, i) => (
                            <div key={data.id} className="row justify-content-around p-4 border border-end-0 border-start-0 border-top-0 border-warning">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={`img/${data.image ? data.image : ""}`} alt="" className="img-fluid" />
                                        </div>
                                        <div className="col-3">
                                            <p className="p-0 m-0 text-uppercase">{data.name}</p>
                                            <button className="btn btn-danger px-3 py-1" type="button"
                                                onClick={(e) => removeOrder(e, data.id)}
                                            >
                                                remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2 align-content-center">
                                    <p className="text-uppercase p-1 m-0">{data.price} $</p>
                                </div>
                                <div className="col-2 align-content-center">

                                    <p className="text-uppercase p-1 m-0 d-flex flex-row">
                                        <input className="mx-2" type="number" min={1} max={100}
                                            name={data.id}
                                            style={{ width: "40px" }}
                                            defaultValue={1}
                                            onChange={(e) => handleChange(e, i)}
                                        />
                                    </p>
                                </div>
                                <div className="col-2 align-content-center">
                                    <p className="text-uppercase p-1 m-0">{String((Number(quantityValue[i]) * Number(data.price)).toFixed(2)) + " $"}</p>
                                </div>
                            </div>
                        ))
                    }
                    <div className="row justify-content-end align-content-center p-5">
                        <div className="col-auto align-self-center">
                            <p className="m-0">Total: {String(totals.toFixed(3))}</p>
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-success px-4 py-2" type="button"
                                onClick={(e) => Buy(e,)}
                            >Buy</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;