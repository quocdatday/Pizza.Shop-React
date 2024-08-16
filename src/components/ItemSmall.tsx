import { FC, ReactElement } from "react";

interface Props{
    imgPizza: string;
    Title: string;
    Cost: string;
    Content: string;
    Alt?: string;
}
const ItemSmall: FC<Props> = ({imgPizza, Title, Cost, Content, Alt}): ReactElement => {
    const sourceImage = `./img/${imgPizza}`;
    return (
        <div className="d-flex mb-4">
            <img className="img-fluid imgCircle" src={sourceImage} alt={Alt} />
            <div className="ps-3">
                <div className="d-flex align-items-center text-white">
                    <h3 className="fs-6"><span>{Title}</span></h3>
                    <span className="ms-auto text-warning">${Cost}</span>
                </div>
                <div className="d-block text-secondary">
                    <p>
                        {Content}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ItemSmall;