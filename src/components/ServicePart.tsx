import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactElement } from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
    col?: number;
    iconService: string;
    Title: string;
    Content: string;
}

const ServicePart: FC<Props> = ({col = 4, iconService, Title, Content}): ReactElement => {
    const cols = `col-md-${col} mt-3 mt-md-0"`;
    return (
        <div className={cols}>
            <div className="d-block text-center mb-5">
                <div className="d-flex justify-content-center align-items-center mb-md-5 mb-4">
                    <div className="p-4 rolling">
                        <img src={`./img/${iconService}`} alt="" />
                    </div>
                </div>
                <div className='fw-light'>
                    <h4 className="mb-1 text-uppsercase fs-5" style={{ fontFamily: '"Josefin Sans", Arial, sans-serif' }}>
                        {Title}
                    </h4>
                    <p>
                        {Content}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ServicePart;