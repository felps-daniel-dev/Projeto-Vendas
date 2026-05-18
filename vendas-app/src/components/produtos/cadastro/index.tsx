'use client';
import { useState, useEffect, Suspense } from 'react';
import { Layout } from "@/components/layout";
import { Input } from "@/components/common";
import { useProdutoService } from '@/app/services';
import { Produto } from '@/app/models/produtos';
import { converterBigDecimal, formatReal } from '@/app/util/money';
import { Alert } from '@/components/common/message';
import * as yup from 'yup';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const msgCampoObrigatorio = "Campo Obrigatório!";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgCampoObrigatorio).max(10, "O SKU deve ter no maximo 10 caracteres"),
    nome: yup.string().trim().required(msgCampoObrigatorio), //requiered diz que é mobrigatorio e trim tira espaços ante e  depois da string
    descricao: yup.string()
        .trim()
        .required(msgCampoObrigatorio), //.min(5, "A descrição deve conter pelo menos 5 caracteres")
    preco: yup.string() // Mude de number para string
        .required(msgCampoObrigatorio)
        .test("preco-valido", "O valor deve ser maior que 0", (value) => {
            const numerico = converterBigDecimal(value);
            return numerico > 0;
        })
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

    const searchParams = useSearchParams();
    const queryId = searchParams ? searchParams.get('id') : null;

    console.log("ID capturado da URL:", queryId);

    const [sku, setSku] = useState('');
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState<string | undefined>(undefined);
    const [dataCadastro, setdataCadastro] = useState<string | undefined>('');
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const [errors, setErrors] = useState<FormErros>({});

    useEffect(() => {
        if (queryId) {
            service.carregarProduto(queryId as string).then(produtoEncontrado => {
                console.log(produtoEncontrado)

                setId(produtoEncontrado.id)
                setSku(produtoEncontrado.sku ?? '')
                setNome(produtoEncontrado.nome ?? '')
                setDescricao(produtoEncontrado.descricao ?? '')
                const precoFormatado = formatReal(produtoEncontrado.preco);
                setPreco(precoFormatado);
                setdataCadastro(produtoEncontrado.dataCadastro || '');
            })
        }
    }, [queryId]);

    const submit = () => {
        const valorNumerico = converterBigDecimal(preco); // Converte primeiro 

        const produto: Produto = {
            id,
            sku,
            nome,
            descricao,
            preco: valorNumerico // Passa o número já limpo 
        }
        

        validationSchema.validate(produto).then(obj => {
            setErrors({});// quando der rudo certo vai salvar

            if (id) {
                service.atualizar(produto).then(response => {
                    setMessages([{ tipo: "success", texto: "Produto atualizado com sucesso!" }]);
                });
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
                    error={errors.preco} />
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
                    <Link href="/consultas/produtos">
                        <button className="button is-link is-light">Voltar</button>
                    </Link>
                </div>
            </div>

        </Layout>
    );
}
