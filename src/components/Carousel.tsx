import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactElement } from "react";
import { Link } from "react-router-dom";
type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
    orderPara?: string;
    orderImg?: string;
    textMd: string;
    backgroundImg: string;
    timeChange: number;
    pizaImg: string;
    title: string;
    subTitle: string;
    paragraphContent: string;
    active?: string;
}
const Carousel: React.FC<Props> = ({
    orderPara="order-1", orderImg="order-2", textMd, backgroundImg, timeChange, pizaImg, title, subTitle, paragraphContent, active = ''
}): ReactElement => {
    const orderP = `order-${orderPara}`;
    const orderI = `order-${orderImg}`;
    return (
        <div className={`carousel-item ${active}`} data-bs-interval={`${timeChange}`}>
            <div className='mainBG1 mt-0' style={{ backgroundImage: `url(img/${backgroundImg})` }}>
                <div className="mainBG2"></div>
                <div className="mainBG3 container text-white text-center ">
                    <div className="row slider-text align-content-center align-items-center h-100 p-sm-5 p-md-0">
                        <div className={`col-md-6 col-sm-12 ${textMd} ${orderP}`}>
                            <div className="special-font">{title}</div>
                            <h1 className="mb-4">{subTitle}</h1>
                            <h5 className="mb-4 mb-md-5">
                                {paragraphContent}
                            </h5>
                            <p><Link to="/menu" className="bHover btn p-3 px-xl-4 py-xl-3 rounded-0">Order Now</Link></p>
                        </div>
                        <div className={`col-md-6 p-5 ${orderI}`}>
                            <img src={`img/${pizaImg}`} className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carousel;