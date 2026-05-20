import { Cliente } from "@/app/models/clientes";
import { useFormik } from "formik";
import { Input } from "@/components/common";

interface ClientesFormProps {
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

const formShema: Cliente = {
    id: '1',
    nome: 'Felipe',
    cpf: '123.456.789-99',
    datanascimento: '21/06/2005',
    email: 'felipe@gmail.com',
    telefone: '44 997456965',
    endereco: 'Rua: Eugênio Rafael n5',

}

export const ClienteForm: React.FC<ClientesFormProps> = ({ cliente, onSubmit }) => {

    const formik = useFormik<Cliente>({
        initialValues: { ...cliente, ...formShema },
        onSubmit
    })

    const caixaAlta = (value: string)=>{
        return value.toUpperCase();
    }


    return (
        <form onSubmit={formik.handleSubmit} >

            {formik.values.id &&
                <div className="columns">
                    <Input id="id"
                        name="id"
                        columnClasses="is-half"
                        disabled
                        formatter={caixaAlta}
                        value={formik.values.id}
                        label="Código: " />

                    <Input id="cadastro"
                        name="cadastro"
                        columnClasses="is-half"
                        disabled
                        value={formik.values.cadastro}
                        label="Data de Cadastro:" />
                </div>
            }
            <div className="columns">
                <Input id="nome"
                    name="nome"
                    columnClasses="is-full"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    label="Nome" />
            </div>
            <div className="columns">
                <Input id="cpf"
                    name="cpf"
                    columnClasses="is-half"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    label="CPF" />

                <Input id="dataNascimento"
                    name="dataNascimento"
                    columnClasses="is-half"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.datanascimento}
                    label="Data de Nascimento" />
            </div>
            <div className="columns">
                <Input id="endereco"
                    name="endereco"
                    columnClasses="is-full"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.endereco}
                    label="Endereço" />
            </div>
            <div className="columns">
                <Input id="email"
                    name="email"
                    columnClasses="is-half"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    label="Email" />

                <Input id="telefone"
                    name="telefone"
                    columnClasses="is-half"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    value={formik.values.telefone}
                    label="Telefone" />
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-link" >
                        {formik.values.id ? "Atualizar" : "Salvar"}</button>
                </div>
                <div className="control">
                        <button className="button is-link is-light">Voltar</button>
                </div>
            </div>
        </form>
    )
}