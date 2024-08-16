import ServicePart from "../components/ServicePart";
import '../App.css';
const Service = () => {
    return (
        <div className="p-5 mt-5" style={{ backgroundImage: 'url(img/food.png)' }}>
            <div className="container">
                <div className="row justify-content-center my-5 pb-3">
                    <div className="col-md-7 text-center">
                        <h2 className="mb-4 text-uppercase" style={{ fontFamily: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif' }}>
                            Our Services</h2>
                        <p className='fw-light'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there
                            live the blind texts.</p>
                    </div>
                </div>
                <div className="row mb-5">
                    <ServicePart
                        col={4} iconService='diet.png'
                        Title='HEALTHY FOODS'
                        Content='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                    />
                    <ServicePart
                        col={4} iconService='Shipper.png'
                        Title='FASTEST DELIVERY'
                        Content='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                    />
                    <ServicePart
                        col={4} iconService='pizza-slice.png'
                        Title='ORIGINAL RECIPES'
                        Content='Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
                    />
                </div>
            </div>
        </div>
    );
}

export default Service;