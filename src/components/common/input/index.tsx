import { InputHTMLAttributes } from "react"; 'react'

//  pega tudo do Input exeto o onChange original
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    id: string;
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    ...inputProps
}: InputProps) => {
    return (
        <div className={` field column ${columnClasses} `}>
            <label className="label" htmlFor={id}>{label} *</label>
            <div className="control">
                <input className="input" type="text"
                    id={id} {...inputProps}
                    onChange={event => {
                        if (onChange)
                            onChange(event.target.value)
                    }} />
            </div>
        </div>
    );
}