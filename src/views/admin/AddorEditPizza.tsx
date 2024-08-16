import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { IPizza } from "./AdminSite";

export const Pizza = {
    id: "",
    name: "",
    type: "",
    price: "",
    description: "",
    image: ""
}

const AddorEditPizza = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [pizzas, setPizzas] = useState<IPizza>(Pizza);
    const navigate = useNavigate();
    // Click
    const toAdmin = () => {
        navigate("/adminsite");
    }
    // Click

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setPizzas({
            ...pizzas,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    const addmaterial = (e: any, id: any) => {
        const { id: pizzasID, ...data } = pizzas;
        e.preventDefault();
        console.log(id);
        if (id === "addNew") {
            getDoc(doc(collection(db, "pizzas"), pizzasID)).then((checkDoc) => {
                if (checkDoc.exists()) {
                    setMessage("ID đã tồn tại, vui lòng dùng ID khác");
                } else {
                    setDoc(doc(db, "pizzas", pizzasID), data).then(() => {
                        navigate("/adminsite");
                    }, (error) => {
                        //................
                    });
                }
            });
        } else {
            deleteDoc(doc(db, "pizzas", id))
                .catch((error) => {
                    navigate("/pagenotfound");
                });
            setDoc(doc(db, "pizzas", pizzasID), data).then(() => {
                navigate("/adminsite");
            }, (error) => {
                //................
            });
        }
    }

    useEffect(() => {
        if (id !== "addNew") {
            getDoc(doc(collection(db, "pizzas"), id)).then((doc) => {
                if (!doc.exists()) {
                    navigate("/pagenotfound");
                }
            }, () => {
                navigate("/pagenotfound");
            });
        }
    });

    return (
        <>
            <div className="row vh-100 justify-content-center align-items-center">
                <div className="col-4 p-4 shadow-lg bg-light">
                    <form action="#" method="POST" >
                        <Input
                            nameInput="id"
                            Placehoder="Pizza ID"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="name"
                            Placehoder="Pizza name"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="type"
                            Placehoder="Pizza type"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="price"
                            Placehoder="Pizza price"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="description"
                            Placehoder="Pizza description"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="image"
                            Placehoder="Pizza image"
                            onChange={handleChange}
                        />
                        <p className="text-danger">{message}</p>
                        <button className="btn btn-primary me-2"
                            onClick={
                                (e) => addmaterial(e, id)
                            }>
                            {id === "addNew" ? "Add" : "Save"}
                        </button>
                        <button className="btn btn-danger" onClick={toAdmin}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddorEditPizza;