import React, { ChangeEventHandler } from "react";

export interface ISelectProps {
    options: { id: string | number, label: string }[],
    value: string | number | undefined,
    id: string,
    onChange: ChangeEventHandler<HTMLSelectElement>,
    className: string
}

const Select = (props: ISelectProps) => {

    const options = [];
    for (let i = 0; i < props.options.length; i++) {
        const value = props.options[i];
        const option = <option value={value.id}>{value.label}</option>;
        options.push(option);
    }


    return (

        <select className={"ng-pristine ng-valid " + props.className} value={props.value} id={props.id}
            onChange={props.onChange}>
            <option value="">---</option>
            {options}
        </select>
    );
}

export default Select;