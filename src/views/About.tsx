const About = () => {
    return (
        <>
            <div className="row justify-content-center align-items-center vh-100 w-auto position-relative p-5 mt-5" style={{ backgroundImage: 'url(img/bg_1.jpg)' }}>
                <div className="position-absolute bg-black" style={{ inset: 0, opacity: 0.5, zIndex: 0 }}></div>
                <div className="col-md-8 text-white text-center" style={{ zIndex: 1 }}>
                    <h3 className="text-uppercase my-3">About Us: Exploring the Art and Passion Behind Pizza</h3>
                    <p>
                        Welcome to our savory journey through the world of pizza! Here at [Your Pizza Haven],
                        we are passionate about celebrating the rich history, diverse flavors, and cultural
                        significance of this beloved culinary delight. Join us as we delve into the origins,
                        ingredients, and artistry that make pizza more than just a meal—it's an experience.
                    </p>
                </div>

            </div>
            <div className="row g-0">
                <div className="col-md-3">
                    <img className="img" src="img/gallery-1.jpg" alt="" style={{ maxHeight: 500 }} />
                </div>
                <div className="col-md-3">
                    <img className="img" src="img/gallery-2.jpg" alt="" style={{ maxHeight: 500 }} />
                </div>
                <div className="col-md-3 ">
                    <img className="img" src="img/gallery-3.jpg" alt="" style={{ maxHeight: 500 }} />
                </div>
                <div className="col-md-3 ">
                    <img className="img" src="img/gallery-4.jpg" alt="" style={{ maxHeight: 500 }} />
                </div>
            </div>
        </>
    );
}

export default About;