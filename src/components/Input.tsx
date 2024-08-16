import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;
interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
    nameInput: string;
    Type?: string;
    Placehoder: string;
}

const Input: FC<Props> = ({ nameInput, Type = "text", Placehoder, ...other}) => {
    return (
        <div className="form-floating mb-3 border border-secondary">
            <input name={nameInput} type={Type} className="form-control" id={nameInput} placeholder={Placehoder} {...other} required/>
            <label htmlFor={nameInput}>{Placehoder}</label>
        </div>
    );
}

export default Input;
