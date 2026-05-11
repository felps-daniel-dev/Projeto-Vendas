import { InputHTMLAttributes } from "react";
import { formatReal } from '@/app/util/money'

//  pega tudo do Input exeto o onChange original
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    id: string;
    onChange?: (value: string) => void;
    label: string;
    columnClasses?: string;
    currency?: boolean;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    currency,
    columnClasses,
    id,
    error,
    ...inputProps
}: InputProps) => {

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        if (value && currency) {
            value = formatReal(value);
        }

        if (onChange) {
            onChange(value);
        }
    }

    return (
        <div className={` field column ${columnClasses} `}>
            <label className="label" htmlFor={id}>{label} *</label>
            <div className="control">
                <input className="input" type="text"
                    id={id} {...inputProps}
                    onChange={onInputChange} />
                    {error &&
                    <p className="help is-danger">{error}</p>
                    }
            </div>
        </div>
    );
}