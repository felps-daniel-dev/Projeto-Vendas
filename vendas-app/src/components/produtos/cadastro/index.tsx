import { useState } from 'react';
import { Layout } from "@/components/layout";
import { Input } from "@/components/common";
import { useProdutoService } from '@/app/services';
import { Produto } from '@/app/models/produtos'
import { converterBigDecimal } from '@/app/util/money'


export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService();
    const [sku, setSku] = useState('');  // cria uma variavel com valor e tem a variavel e tambem a opção de alterar o valor
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState<string | undefined>('');
    const [dataCadastro, setdataCadastro] = useState<string | undefined>('');

    const submit = () => {
        const precoLimpo = preco.replace(/\./g, '').replace(',', '.');
    
    const produto: Produto = {
        id: id ? id : undefined, // Se for "" vira undefined porque é autoincrement
        sku,
        preco: parseFloat(precoLimpo) || 0,
        nome,
        descricao
    }

        console.log(produto);
        if (id) {
            service.atualizar(produto)
                .then(response => console.log(produto));
        } else {
            service.cadastrar(produto)
                .then(produtoResposta => {
                    setId(produtoResposta.id)
                    setdataCadastro(produtoResposta.dataCadastro);
                });
        }
    }

    return (
        <Layout titulo="Produtos">
            {id &&  //só vai incrementar na tela se o id não estiver vazio quando retornar o response
                <div className="columns">
                    <Input label="SKU "
                        id="inputSku"
                        value={sku}           
                        onChange={setSku}      
                        placeholder='Digite o SKU do produto:' />

                    <Input label="Preço "
                        id="inputPreco"
                        value={preco}         
                        onChange={setPreco}    
                        currency={true}
                        placeholder='Digite o preço do produto:' />
                </div>
            }
            <div className="columns">
                <Input label="SKU "
                    columnClasses="is-half"
                    id="inputSku"
                    placeholder='Digite o SKU do produto:' />
                <Input label="Preço "
                    columnClasses="is-half"
                    id="inputPreco"
                    placeholder='Digite o preço do produto:'
                    currency={true} />


            </div>


            <div className="columns">

                <Input label="Nome: "
                    columnClasses="is-full"
                    onChange={setNome}
                    id="inputNome"
                    placeholder='Digite o nome do produto' />
            </div>

            <div className="columns">
                <div className="field is-full column">
                    <label htmlFor="areaDesc" className="label">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            placeholder="Descrição do produto"
                            id="areaDesc" value={descricao}
                            onChange={event => setDescricao(event.target.value)} />
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
