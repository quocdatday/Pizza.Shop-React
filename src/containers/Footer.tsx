import '../App.css';
const Footer = () => {
    return (
        <div className="text-secondary p-5" style={{ background: 'black' }}>
            <div className="row pt-5 justify-content-between">
                <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
                    <div className="mb-4">
                        <h4 className="text-white mb-3">About Us</h4>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                            there live the blind texts.</p>
                        <div className="d-flex">
                            <a className="fs-1 me-5" href="https://www.facebook.com/0301dat/" target='_blank'>
                                <i className="bi bi-facebook text-white" />
                            </a>
                            <a className="fs-1" href="https://www.instagram.com/quocdatday/" target='_blank'>
                                <i className="bi bi-instagram text-white" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 mb-5 mb-md-5">
                    <div className="mb-4 ml-md-4">
                        <h4 className="text-white mb-3">Services</h4>
                        <ul className="p-0">
                            <dl className="mb-3 text-secondary fs-5">Cooked</dl>
                            <dl className="mb-3 text-secondary fs-5">Deliver</dl>
                            <dl className="mb-3 text-secondary fs-5">Quadlty Foods</dl>
                            <dl className="mb-3 text-secondary fs-5">Mixed</dl>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 mb-5 mb-md-5">
                    <div className="mb-4">
                        <h4 className="text-white mb-3">Have a Questions?</h4>
                        <ul className="p-0">
                            <dl className="d-flex flex-row">
                                <div className="me-3 mb-auto">
                                    <i className="bi bi-geo-alt-fill" />
                                </div>
                                <div>
                                    203 Fake St. Mountain
                                    View, San Francisco, California, USA
                                </div>
                            </dl>
                            <dl className="d-flex flex-row">
                                <div className="me-3 mb-auto">
                                    <i className="bi bi-telephone" />
                                </div>
                                <div>
                                    +84 383 673 72
                                </div>
                            </dl>
                            <dl className="d-flex flex-row">
                                <div className="me-3 mb-auto">
                                    <i className="bi bi-envelope" />
                                </div>
                                <div>
                                    vnqd0301@gmail.com
                                </div>
                            </dl>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <p>
                        Copyright ©
                        All rights reserved | This template is made with by Group 7
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Footer;