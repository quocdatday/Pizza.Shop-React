import '../App.css';
import Carousel from '../components/Carousel';

const Home = () => {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade mt-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <Carousel
                        active="active" timeChange={3000} backgroundImg='bg_1.jpg'
                        textMd='text-md-end' title='Delicious' subTitle='Italian Cuizine'
                        paragraphContent='A small river named Duden flows by their place and supplies it with the
                        necessary regelialia.'
                        pizaImg='bg_1.png'
                    />
                    <Carousel
                        timeChange={2500} backgroundImg='bg_1.jpg'
                        textMd='text-md-start' title='Crunchy' subTitle='Italian Cuizine'
                        paragraphContent='A small river named Duden flows by their place and supplies it with the
                        necessary regelialia.'
                        orderPara='2'
                        orderImg='1'
                        pizaImg='bg_1.png'
                    />
                </div>
            </div>


            <div className="row" style={{ backgroundImage: 'url(img/bg_4.jpg)' }}>
                <div className="col-12 col-md-6">
                    <img className="img-fluid" src="img/about.jpg" alt="" />
                </div>
                <div className="col-12 col-md-6 p-5 d-flex justify-content-center align-items-center flex-column">
                    <div className="text-white">
                        <h2 className="mb-4 text-uppercase">Welcome to <span className="text-warning fw-bold">Pizza</span> A Restaurant
                        </h2>
                    </div>
                    <div className="text-secondary">
                        <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would
                            have been rewritten a thousand times and everything that was left from its origin would be the word
                            "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing
                            the copy said could convince her and so it didn't take long until a few insidious Copy Writers
                            ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they
                            abused her for their.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;