import '../css/AdminSite.css';
import Function from '../../components/Function';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { deleteUser, getAuth } from 'firebase/auth';

export interface IUser {
    id: string;
    name: string,
    email: string,
    password: string,
    confirmpassword: string,
    phone: number,
    address: string,
    role: string
}
export interface IPizza {
    id: string;
    name: string;
    type: string;
    price: string;
    description: string;
    image: string;
}
export interface IMaterial {
    id: string;
    name: string;
    unit: string;
    quantity: number;
}
export interface IOrder {
    id: string,
    name: string,
    date: string,
    total: Number,
    product: String[]
}
const DeleteDataDefault = {
    id: "",
    table: ""
}
const AdminSite = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [deleteData, setDeleteData] = useState(DeleteDataDefault);
    const [yesno, setYesno] = useState(100);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [pizzas, setPizzas] = useState<IPizza[]>([]);
    const [materials, setMaterials] = useState<IMaterial[]>([]);
    const [check, setCheck] = useState(true);
    const [main, setMain] = useState();
    const user = auth.currentUser;

    const dataUser = () => {
        const dataTable = query(collection(db, "users"));
        getDocs(dataTable).then((Docsx) => {
            const data = Docsx.docs.map((fieldData) => {
                const x = fieldData.data() as IUser;
                x.id = fieldData.id;
                return x;
            });
            setUsers(data);
        });
    }
    const dataPizza = () => {
        const dataTable = query(collection(db, "pizzas"));
        getDocs(dataTable).then((Docsx) => {
            const data = Docsx.docs.map((fieldData) => {
                const x = fieldData.data() as IPizza;
                x.id = fieldData.id;
                return x;
            });
            setPizzas(data);
        });
    }
    const dataMaterial = () => {
        const dataTable = query(collection(db, "materials"));
        getDocs(dataTable).then((docsx) => {
            const data = docsx.docs.map((doc) => {
                const dt = doc.data() as IMaterial;
                dt.id = doc.id;
                return dt;
            });
            setMaterials(data);
        });
    }
    const dataorder = () => {
        const dataTable = query(collection(db, "orders"));
        getDocs(dataTable).then((Docsx) => {
            const data = Docsx.docs.map((fieldData) => {
                const x = fieldData.data() as IOrder;
                x.id = fieldData.id;
                return x;
            });
            setOrders(data);
        });
    }

    // Click
    const handleAdd = (e: any, tableName: string, id: string) => {
        navigate(`/adminsite/${tableName}/${id}`);
    }
    const YesorNo = (e: any, x: number, id: string, table: string) => {
        e.preventDefault();
        setDeleteData({ id, table });
        setYesno(x);
    }
    // Click

    const handleEdit = (e: any, tableName: string, id: string) => {
        e.preventDefault();
        navigate(`/adminsite/${tableName}/${id}`);
    }
    const handleDelete = (e: any) => {
        e.preventDefault();
        deleteDoc(doc(db, deleteData.table, deleteData.id)).then(() => {
            navigate("/adminsite");
        }, (error) => {
            console.log("Delete lỗi");
            console.log(error);
        });
        setYesno(100);
    }

    useEffect(() => {
        console.log("spam");
        if (check) {
            dataPizza();
            dataMaterial();
            dataUser();
            dataorder();
            setCheck(false);
        }
    }, [Navigate, check, user]);
    // users,pizzas,materials,orders

    return (
        <>
            <div>
                {/* <nav className="navbar fixed-top p-3 top-0 start-0 end-0 shadow-lg" id="nav">
                    <div className="container-fluid">
                        <div className="navbar-brand fw-bold">
                            <span>
                                <a className="nav-link " aria-current="page" href="#seccond-page">
                                    <h2 className="text-danger fw-bold fs-1">
                                        Pízza
                                    </h2>
                                </a>
                            </span>
                        </div>
                        <ul className="nav ms-auto justify-content-evenly">
                            <li className="nav-item ">
                                <a className="nav-link text-dark text-uppercase fw-bold hrX px-3 rounded-pill" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav> */}
                {/* nav */}
                <div className="mt-5 w-100 vh-100" id="mainContent">
                    <div className="d-flex align-items-center h-100 w-100">
                        <div className="nav flex-column nav-pills me-5 mt-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {/* <button className="speacialB rounded-0 border border-1 px-5 py-3 nav-link active" id="v-pills-Users-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Users" type="button" role="tab" aria-controls="v-pills-Users" aria-selected="false">Users</button> */}
                            <Function
                                Active="active"
                                Target="Users"
                                Name="Users"
                            />
                            <Function
                                Target='Pizzas'
                                Name='Pizzas'
                            />
                            <Function
                                Target='Materials'
                                Name='Materials'
                            />
                            <Function
                                Target='Orders'
                                Name='Orders'
                            />
                        </div>
                        <div className="tab-content mx-5 mt-5 w-100" id="v-pills-tabContent">
                            {/* USERS */}
                            <div className="tab-pane fade show active" id="v-pills-Users" role="tabpanel" aria-labelledby="v-pills-Users-tab">
                                <p className="text-end">
                                    <button onClick={(e) => handleAdd(e, "adduser", "addNew")} className="btn btn-primary">
                                        Add <i className="bi bi-plus-circle" />
                                    </button>
                                </p>
                                <table className="table table-striped table-bordered table-responsive-xxl">
                                    <thead>
                                        <tr>
                                            <th scope='col'>UID</th>
                                            <th scope='col'>Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Role</th>
                                            {/* <th scope="col">Edit</th> */}
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>{data.address}</td>
                                                <td>{data.role}</td>
                                                {/* <td>
                                                    <a className="btn btn-primary" href="#">
                                                        <i className="bi bi-pencil-square" />
                                                    </a>
                                                </td> */}
                                                <td>
                                                    <a className="btn btn-danger" href="#"
                                                        onClick={(e) => YesorNo(e, 50, data.id, "users")}>
                                                        <i className="bi bi-trash" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* USERS */}
                            {/* PIZZAS */}
                            <div className="tab-pane fade" id="v-pills-Pizzas" role="tabpanel" aria-labelledby="v-pills-Pizzas-tab">
                                <p className="text-end">
                                    <button onClick={(e) => handleAdd(e, "addpizza", "addNew")} className="btn btn-primary">
                                        Add <i className="bi bi-plus-circle" />
                                    </button>
                                </p>
                                <table className="table table-striped table-bordered table-responsive-xxl">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pizzas.map((data) => (
                                            <tr key={data.id}>
                                                <td scope="col">{data.id}</td>
                                                <td scope="col">{data.name}</td>
                                                <td scope="col">{data.type}</td>
                                                <td scope="col">{data.price}</td>
                                                <td scope="col">{data.description}</td>
                                                <td scope="col">{data.image}</td>
                                                <td>
                                                    <a className="btn btn-primary" href="#"
                                                        onClick={(e) => handleEdit(e, "addpizza", data.id)}>
                                                        <i className="bi bi-pencil-square" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a className="btn btn-danger" href="#"
                                                        onClick={(e) => YesorNo(e, 50, data.id, "pizzas")}>
                                                        <i className="bi bi-trash" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* PIZZAS */}
                            {/* MATERIALS */}
                            <div className="tab-pane fade" id="v-pills-Materials" role="tabpanel" aria-labelledby="v-pills-Materials-tab">
                                <p className="text-end">
                                    <button onClick={(e) => handleAdd(e, "addmaterial", "addNew")} className="btn btn-primary">
                                        Add <i className="bi bi-plus-circle" />
                                    </button>
                                </p>
                                <table className="table table-striped table-bordered table-responsive-xxl">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Unit</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {materials.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.id}</td>
                                                <td>{data.name}</td>
                                                <td>{data.unit}</td>
                                                <td>{data.quantity}</td>
                                                <td>
                                                    <a className="btn btn-primary" href="#"
                                                        onClick={(e) => handleEdit(e, "addmaterial", data.id)}>
                                                        <i className="bi bi-pencil-square" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a className="btn btn-danger" href="/#"
                                                        onClick={(e) => YesorNo(e, 50, data.id, "materials")} >
                                                        <i className="bi bi-trash" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* MATERIALS */}
                            {/* ORDERS */}
                            <div className="tab-pane fade" id="v-pills-Orders" role="tabpanel" aria-labelledby="v-pills-Orders-tab">
                                <table className="table table-striped table-bordered table-responsive-xxl">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">name</th>
                                            <th scope="col">date</th>
                                            <th scope="col">total</th>
                                            <th scope="col">product</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((data) => (
                                                <tr key={data.id}>
                                                    <td>{data.id}</td>
                                                    <td>{data.name}</td>
                                                    <td>{String(data.date)}</td>
                                                    <td>{String(data.total)}</td>
                                                    <td>{data.product}</td>
                                                    <td>
                                                        <a className="btn btn-primary" href="#">
                                                            <i className="bi bi-pencil-square" />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a className="btn btn-danger" href="#"
                                                            onClick={(e) => YesorNo(e, 50, data.id, "orders")}>
                                                            <i className="bi bi-trash" />
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* ORDERS */}
                        </div>
                    </div>
                </div>
                <div className={`fixed-top top-${yesno} container`} id="Edit">
                    <div className="row justify-content-center">
                        <div className="col-auto pb-3 px-0 shadow-lg bg-light text-center rounded-bottom d-flex flex-column">
                            <p className="mb-4 bg-danger p-3 rounded-top">Do you want to delete ?</p>
                            <form action="#" method="POST">
                                <input type="hidden" id="valueDelete" />
                                <button className="btn btn-danger me-2" type="button"
                                    onClick={(e) => handleDelete(e)}>Yes</button>
                                <button className="btn btn-info" type="button"
                                    onClick={(e) => YesorNo(e, 100, "", "")}>No</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}

export default AdminSite;