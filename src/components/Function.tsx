import { FC } from "react";

interface Props {
    Active?: string;
    Target: string;
    Name: string;
}
const Function: React.FC<Props> = ({Active, Target, Name}) => {
    const id = `v-pills-${Target}-tab`;
    return (
        <button
            className={`speacialB rounded-0 border border-1 px-5 py-3 nav-link ${Active}`}
            id={id}
            data-bs-toggle="pill"
            data-bs-target={`#v-pills-${Target}`}
            type="button"
            role="tab"
            aria-controls={`"v-pills-${Target}"`}
            aria-selected="false">
            {Name}
        </button>
    );
}

export default Function;