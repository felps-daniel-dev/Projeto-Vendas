import { useState } from 'react';
import { Layout } from "@/components/layout";
import { Input } from "@/components/common";
import { Message } from "@/components/common/message"
import { useProdutoService } from '@/app/services';
import { Produto } from '@/app/models/produtos';
import { converterBigDecimal } from '@/app/util/money';
import { Alert } from '@/components/common/message';
import * as yup from 'yup';

const msgCampoObrigatorio = "Campo Obrigatório!";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio).max(10, "O SKU deve ter no maximo 10 caracteres"),
    nome: yup.string().trim().required(msgCampoObrigatorio), //requiered diz que é mobrigatorio e trim tira espaços ante e  depois da string
    descricao: yup.string()
        .trim()
        .required(msgCampoObrigatorio), //.min(5, "A descrição deve conter pelo menos 5 caracteres")
    preco: yup.number().required(msgCampoObrigatorio).positive("O Preço deve ser maior que 0!") //moreThan(0, "O Valor deve ser maior que zero!")//morThean pede que a entrada deve ser maior que o parametro
});

interface FormErros {
    id?: string;
    sku?: string;
    nome?: string;
    preco?: string;
    descricao?: string;
}

export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();

    const [sku, setSku] = useState('');
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState<string | undefined>(undefined);
    const [dataCadastro, setdataCadastro] = useState<string | undefined>('');
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});

    const submit = () => {
        const precoConvertido = converterBigDecimal(preco);// tratamento de preço

        const produto: Produto = {
            id,
            sku,
            preco: precoConvertido,
            nome,
            descricao
        }

        console.log("Objeto enviado:", produto);

        validationSchema.validate(produto).then(obj => {
            setErrors({});// quando der rudo certo vai salvar

            if (id) {
                service.atualizar(produto)
                    .then(response =>
                        setMessages([{
                            tipo: "success",
                            texto: "Produto salvo com sucesso!"
                        }
                        ])
                    );
            } else {
                service.cadastrar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id);
                        setdataCadastro(produtoResposta.dataCadastro);
                        setMessages([{
                            tipo: "success",
                            texto: "Produto salvo com sucesso!"
                        }])
                    });
            }
        }).catch(err => {
            const field = err.path;
            const message = err.message;

            setErrors({
                [field]: message
            })
            
        })

    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>

            {id &&
                <div className="columns">
                    <Input label="Código:"
                        columnClasses="is-half"
                        value={id}
                        id="inputId"
                        disabled />

                    <Input label="Data de Cadastro:"
                        columnClasses="is-half"
                        value={dataCadastro}
                        id="inputDataCadastro"
                        disabled />
                </div>
            }

            <div className="columns">
                <Input label="SKU "
                    columnClasses="is-half"
                    id="inputSku"
                    value={sku}
                    onChange={setSku}
                    placeholder='Digite o SKU do produto:'
                    error={errors.sku} />

                <Input label="Preço "
                    columnClasses="is-half"
                    id="inputPreco"
                    value={preco}
                    onChange={setPreco}
                    currency={true}
                    placeholder='Digite o preço do produto:'
                    error={errors.nome} />
            </div>

            <div className="columns">
                <Input label="Nome: "
                    columnClasses="is-full"
                    value={nome}
                    onChange={setNome}
                    id="inputNome"
                    placeholder='Digite o nome do produto'
                    error={errors.nome}
                />
                

            </div>

            <div className="columns">
                <div className="field is-full column">
                    <label htmlFor="areaDesc" className="label">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            placeholder="Descrição do produto"
                            id="areaDesc"
                            value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                        />
                        {errors.descricao &&
                    <p className='help is-danger'>error={errors.descricao} </p>
                }
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-link" >
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

        </Layout>
    );
}