import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { IMaterial } from "./AdminSite";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const Material = {
    id: "",
    name: "",
    unit: "",
    quantity: 0,
}


const AddorEditMaterial = () => {
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [material, setMaterials] = useState<IMaterial>(Material);
    const toAdmin = () => {
        navigate("/adminsite");
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMaterials({
            ...material,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }
    const addmaterial = (e: any, id: any) => {
        const { id: materialsID, ...data } = material;
        e.preventDefault();
        console.log(id);
        if (id === "addNew") {
            getDoc(doc(collection(db, "materials"), materialsID)).then((checkDoc) => {
                if(checkDoc.exists()){
                    setMessage("ID đã tồn tại, vui lòng dùng ID khác");
                }else{
                    setDoc(doc(db, "materials", materialsID), data).then(() => {
                        navigate("/adminsite");
                    }, (error) => {
                        //................
                    });
                }
            });
            // addDoc(collection(db, "materials"), data).then((newData) => {
            //     setDoc(doc(db, "materials", newData.id), data);
            // });
        } else {
            deleteDoc(doc(db, "materials", id))
                .catch((error) => {
                    navigate("/pagenotfound");
                });
            setDoc(doc(db, "materials", materialsID), data).then(() => {
                navigate("/adminsite");
            }, (error) => {
                //................
            });
        }
    }

    useEffect(() => {
        if (id !== "addNew") {
            getDoc(doc(collection(db, "materials"), id)).then((doc) => {
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
                            Placehoder="Material ID"
                            onChange={handleChange}
                        />
                        {/* <div className="form-floating mb-3 border border-secondary">
                            <input name="id" type="text" className="form-control" id="id" placeholder="Material ID" onChange={handleChange} required />
                            <label htmlFor="id">Material ID</label>
                        </div> */}
                        <Input
                            nameInput="name"
                            Placehoder="Material name"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="unit"
                            Placehoder="Material unit"
                            onChange={handleChange}
                        />
                        <Input
                            nameInput="quantity"
                            Placehoder="Material quantity"
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

export default AddorEditMaterial;