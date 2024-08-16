import ItemSmall from "../components/ItemSmall";
import Items from "../components/Items";
import '../App.css';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { IPizza } from "./admin/AdminSite";
import { Pizza } from "./admin/AddorEditPizza";

// localStorage.setItem('key', JSON.stringify(value));
// localStorage.removeItem('key');
// localStorage.clear();
// localStorage.getItem('key')
// const parsedArray = JSON.parse(localStorage.getItem('key'));

const Menu = () => {
    const [data, setData] = useState<IPizza>(Pizza);
    const [pizzas, setPizzas] = useState<IPizza[]>([]);
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser ? auth.currentUser : false;

    const dataPizza = () => {
        const dataTable = query(collection(db, "pizzas"), limit(6));
        getDocs(dataTable).then((Docsx) => {
            const data = Docsx.docs.map((fieldData) => {
                const x = fieldData.data() as IPizza;
                x.id = fieldData.id;
                return x;
            });
            setPizzas(data);
        });
    }

    const orderFood = (e: any, key: string, value: string) => {
        e.preventDefault();
        if (!user) {
            navigate("/login");
        } else {
            getDoc(doc(collection(db, "pizzas"), key)).then((doc) => {
                const x = doc.data() as IPizza;
                x.id = doc.id;
                setData(x);
            });
        }
    }

    const postData = () => {
        localStorage.setItem(data.id, JSON.stringify(data));
    }

    useEffect(() => {
        console.log("x");
        dataPizza();
        if(data.id !== ""){
            postData();
        }
    }, [data]);

    return (
        <>
            <div className="py-5" style={{ backgroundImage: 'url(img/bg_4.jpg)', backgroundRepeat: 'round' }}>
                <div className="container pt-5">
                    <div className="row justify-content-center align-items-center my-5 pb-3">
                        <div className="col-md-7 text-center">
                            <h2 className="mb-4 text-white">Hot Pizza Meals</h2>
                            <p className="text-secondary">Far far away, behind the word mountains, far from the countries Vokalia
                                and Consonantia, there
                                live the blind texts.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-wrap">
                    <div className="row g-0 d-flex">
                        {
                            pizzas.map((data) => (
                                <Items
                                    key={data.id}
                                    Key={data.id}
                                    imgPizza={data.image}
                                    Title={data.name}
                                    Content={data.description}
                                    Cost={data.price}
                                    orderPara='2'
                                    orderImage='1'
                                    onOrder={orderFood}
                                />
                            ))
                        }
                        {/* <Items
                            Key="Item-1"
                            imgPizza='pizza-1.jpg'
                            Title='Italian Pizza'
                            Content='Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia.'
                            Cost='2.20'
                            orderPara='2'
                            orderImage='1'
                            onOrder={orderFood}
                        />
                        <Items
                            Key="Item-2"
                            imgPizza='pizza-2.jpg'
                            Title='Italian Pizza'
                            Content='Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia.'
                            Cost='2.90'
                            orderPara='2'
                            orderImage='1'
                            onOrder={orderFood}
                        />
                        <Items
                            Key="Item-3"
                            imgPizza='pizza-3.jpg'
                            Title='Italian Pizza'
                            Content='Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia.'
                            Cost='2.90'
                            orderPara='2'
                            orderImage='1'
                            onOrder={orderFood}
                        />
                        <Items
                            Key="Item-4"
                            imgPizza='pizza-4.jpg'
                            Title='Italian Pizza'
                            Content='Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia.'
                            Cost='2.90'
                            orderPara='1'
                            orderImage='2'
                            onOrder={orderFood}
                        />
                        <Items
                            Key="Item-5"
                            imgPizza='pizza-5.jpg'
                            Title='Italian Pizza'
                            Content='Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia.'
                            Cost='2.90'
                            orderPara='1'
                            orderImage='2'
                            onOrder={orderFood}
                        />
                        <Items
                            Key="Item-6"
                            imgPizza='pizza-6.jpg'
                            Title='Italian Pizza'
                            Content='Far far away, behind the word mountains, far from the countries
                            Vokalia and Consonantia.'
                            Cost='2.90'
                            orderPara='1'
                            orderImage='2'
                            onOrder={orderFood}
                        /> */}
                    </div>
                </div>


                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3 mt-5 pt-5">
                        <div className="col-md-7 text-center">
                            <h2 className="text-white">Our Menu Pricing</h2>
                            <p className="my-2 text-secondary">Far far away, behind the word mountains, far from the countries
                                Vokalia and
                                Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                    <div className="row p-5	mb-5">
                        <div className="col-md-6">
                            <ItemSmall
                                imgPizza="pizza-1.jpg"
                                Title="Italian Pizza"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                            <ItemSmall
                                imgPizza="pizza-2.jpg"
                                Title="Hawaiian Pizza"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                            <ItemSmall
                                imgPizza="pizza-3.jpg"
                                Title="Greek Pizza"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                            <ItemSmall
                                imgPizza="pizza-4.jpg"
                                Title="Bacon Crispy Thins"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                        </div>
                        <div className="col-md-6">
                            <ItemSmall
                                imgPizza="pizza-5.jpg"
                                Title="Hawaiian Special"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                            <ItemSmall
                                imgPizza="pizza-6.jpg"
                                Title="Ultimate Overload"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                            <ItemSmall
                                imgPizza="pizza-7.jpg"
                                Title="Bacon Pizza"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                            <ItemSmall
                                imgPizza="pizza-8.jpg"
                                Title="Ham & Pineapple"
                                Cost="20.00"
                                Content="A small river named Duden flows by their place and supplies"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid position-relative" style={{ backgroundImage: 'url(img/BG.jpg)', backgroundRepeat: 'round' }}>
                <div className="row d-md-flex">
                    <div className="col-lg-4 mb-5 mb-md-0 img" style={{ backgroundImage: 'url(img/about.jpg)' }}>
                    </div>
                    <div className="col-lg-8  p-md-5">
                        <div className="row">
                            <div className="col-md-12 mb-5">
                                <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <button className="btnHover active btn btn-warning text-warning border border-warning fs-5 rounded-0 me-3 nav-link"
                                        id="v-pills-1-tab" data-bs-toggle="pill" data-bs-target="#v-pills-1"
                                        type="button" role="tab" aria-controls="v-pills-1" aria-selected="true">
                                        Pizza
                                    </button>
                                    <button className="btnHover btn btn-warning text-warning border border-warning fs-5 rounded-0 me-3 nav-link"
                                        id="v-pills-2-tab" data-bs-toggle="pill" data-bs-target="#v-pills-2"
                                        type="button" role="tab" aria-controls="v-pills-2" aria-selected="false">
                                        Drinks
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex align-items-center">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="v-pills-1-tab">
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img className="mh-50 img mb-4" src="/img/pizza-1.jpg"
                                                        alt="" style={{ backgroundSize: 'cover', borderRadius: '50%', height: 200, width: 200 }} />
                                                    <div className="h-50">
                                                        <h3><a className="btn text-white fs-5" href="#">Itallian Pizza</a></h3>
                                                        <p className="text-secondary">Far far away, behind the word mountains, far
                                                            from the countries
                                                            Vokalia and Consonantia.</p>
                                                        <p className="text-warning mt-auto"><span>$2.90</span></p>
                                                        <p><a href="#" className="btnHover btn btn-light bg-transparent text-white rounded-0">Add
                                                            to
                                                            cart</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img className="mh-50 img mb-4" src="/img/pizza-2.jpg"
                                                        alt="" style={{ backgroundSize: 'cover', borderRadius: '50%', height: 200, width: 200 }} />
                                                    <div className="h-50">
                                                        <h3><a className="btn text-white fs-5" href="#">Itallian Pizza</a></h3>
                                                        <p className="text-secondary">Far far away, behind the word mountains, far
                                                            from the countries
                                                            Vokalia and Consonantia.</p>
                                                        <p className="text-warning mt-auto"><span>$2.90</span></p>
                                                        <p><a href="#" className="btnHover btn btn-light bg-transparent text-white rounded-0">Add
                                                            to
                                                            cart</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img className="mh-50 img mb-4" src="/img/pizza-3.jpg"
                                                        alt="" style={{ backgroundSize: 'cover', borderRadius: '50%', height: 200, width: 200 }} />
                                                    <div className="h-50">
                                                        <h3><a className="btn text-white fs-5" href="#">Itallian Pizza</a></h3>
                                                        <p className="text-secondary">Far far away, behind the word mountains, far
                                                            from the countries
                                                            Vokalia and Consonantia.</p>
                                                        <p className="text-warning mt-auto"><span>$2.90</span></p>
                                                        <p><a href="#" className="btnHover btn btn-light bg-transparent text-white rounded-0">Add
                                                            to
                                                            cart</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-2-tab">
                                        <div className="row">
                                            <div className="col-md-4 text-center">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img className="mh-50 img mb-4" src="/img/drink-1.jpg"
                                                        alt="" style={{ backgroundSize: 'cover', borderRadius: '50%', height: 200, width: 200 }} />
                                                    <div className="h-50">
                                                        <h3><a className="btn text-white fs-5" href="#">Itallian Pizza</a></h3>
                                                        <p className="text-secondary">Far far away, behind the word mountains, far
                                                            from the countries
                                                            Vokalia and Consonantia.</p>
                                                        <p className="text-warning mt-auto"><span>$2.90</span></p>
                                                        <p><a href="#" className="btnHover btn btn-light bg-transparent text-white rounded-0">Add
                                                            to
                                                            cart</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img className="mh-50 img mb-4" src="/img/drink-2.jpg"
                                                        alt="" style={{ backgroundSize: 'cover', borderRadius: '50%', height: 200, width: 200 }} />
                                                    <div className="h-50">
                                                        <h3><a className="btn text-white fs-5" href="#">Itallian Pizza</a></h3>
                                                        <p className="text-secondary">Far far away, behind the word mountains, far
                                                            from the countries
                                                            Vokalia and Consonantia.</p>
                                                        <p className="text-warning mt-auto"><span>$2.90</span></p>
                                                        <p><a href="#" className="btnHover btn btn-light bg-transparent text-white rounded-0">Add
                                                            to
                                                            cart</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img className="mh-50 img mb-4" src="/img/drink-3.jpg"
                                                        alt="" style={{ backgroundSize: 'cover', borderRadius: '50%', height: 200, width: 200 }} />
                                                    <div className="h-50">
                                                        <h3><a className="btn text-white fs-5" href="#">Itallian Pizza</a></h3>
                                                        <p className="text-secondary">Far far away, behind the word mountains, far
                                                            from the countries
                                                            Vokalia and Consonantia.</p>
                                                        <p className="text-warning mt-auto"><span>$2.90</span></p>
                                                        <p><a href="#" className="btnHover btn btn-light bg-transparent text-white rounded-0">Add
                                                            to
                                                            cart</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menu;