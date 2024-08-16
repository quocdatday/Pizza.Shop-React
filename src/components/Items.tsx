import { FC, MouseEventHandler, ReactElement, useState } from "react";
interface Props {
    Key: string,
    imgPizza: string,
    Title: string,
    Content: string,
    Cost: string,
    orderPara?: string,
    orderImage?: string,
    // Click?: MouseEventHandler<HTMLAnchorElement>
    onOrder: (e: any, Key: string, Cost: string) => void
}
const Items: FC<Props> = ({ imgPizza, Title, Content, Cost, Key, orderPara = '2', orderImage = '1', onOrder }): ReactElement => {
    const orderP = `order-${orderPara}`;
    const orderI = `order-${orderImage}`;

    return (
        <div className="col-lg-4 d-flex">
            <div className="d-flex position-relative w-100" >
                <a href="#" className={`w-50 img ${orderI}`} style={{ backgroundImage: `url(img/${imgPizza})`, zIndex: 1 }}>
                </a>
                <div className={`d-flex flex-column p-4 w-50 ${orderP}`} style={{ zIndex: 1 }}>
                    <h4 className="text-white">{Title}</h4>
                    <p className="text-secondary">
                        {Content}
                    </p>
                    <p className="text-warning mt-auto"><span>${Cost}</span> <a href="/#" onClick={(e) => onOrder(e, Key, Cost)} className="btn btn-dark border-white ms-2 rounded-0">Order</a></p>
                </div>
                <div className="position-absolute bg-black" style={{ inset: 0, opacity: 0.4, zIndex: 0 }}>
                </div>
            </div>
        </div>
    );
}

export default Items;