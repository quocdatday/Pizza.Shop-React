const NotFound = () => {
    return (
        <div className="row vh-100 w-auto justify-content-center align-items-center p-5 mt-5">
            <div className="col-12 col-md-auto text-center">
                <h1 className="text-center text-uppercase fw-bold">
                    <strong className="text-danger d-block d-md-inline-block">404</strong> <span className="d-none d-md-inline-block">-</span> Page Not Found !
                </h1>
                <h2>
                    oops!
                </h2>
                <p>
                    Your page has been eaten by this cat!
                </p>
            </div>
            <div className="col-12 col-md-3">
                <img className="img-fluid" src="./img/cat.png" alt="" />
            </div>
        </div>
    );
}

export default NotFound;