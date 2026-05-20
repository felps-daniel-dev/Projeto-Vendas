import { InputHTMLAttributes } from "react";
import { formatReal } from '@/app/util/money'

//  pega tudo do Input exeto o onChange original
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    id: string;
    label: string;
    columnClasses?: string;
    formatter?:(value: string) => string;
    error?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    error,
    onChange,
    formatter,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        const name = event.target.name;

        const formattedValue = (formatter && formatter(value as string)) || value;

        event.target.value = formattedValue;

        if (onChange) {
            onChange(event);
        }

    }

    return (
        <div className={` field column ${columnClasses} `}>
            <label className="label" htmlFor={id}>{label} *</label>
            <div className="control">
                <input className="input" type="text"
                    onChange={onInputChange}
                    id={id} {...inputProps} />
                {error &&
                    <p className="help is-danger">{error}</p>
                }
            </div>
        </div>
    );
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) =>{
    return(
        <Input {...props} formatter={formatReal}/>
    )
}