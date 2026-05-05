import { useState } from 'react';
import { Layout } from "@/components/layout";



export const CadastroProdutos: React.FC = () => {
    const [sku, setSku] = useState('');  // cria uma variavel com valor e tem a variavel e tambem a opção de alterar o valor
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const submit = () => {
        const produto = {
            sku: sku,  // formato pra exibir em json. Caso a variavel tiver o mesmo nome nao prescisa de colocar o vcampo na ferente
            preco: preco, 
            nome: nome, 
            descricao: descricao
        }
        console.log(produto);
    }

    return (
        <Layout titulo="Produtos">
            <div className="columns">
                <div className="field is-half column">
                    <label htmlFor="inputSKU" className="label">SKU: *</label>
                    <div className="control">
                        <input className="input" type="text"
                            id="inputSKU" value={sku}
                            onChange={event => setSku(event.target.value)}
                            placeholder="Digite o SKU do produto" />
                    </div>
                </div>

                <div className="field is-half column">
                    <label htmlFor="inputPreco" className="label">Preço: *</label>
                    <div className="control">
                        <input className="input" type="text"
                            id="inputPreco" value={preco}
                            onChange={event => setPreco(event.target.value)}
                            placeholder="Digite o Preço do produto" />
                    </div>
                </div>

            </div>


            <div className="columns">
                <div className="field is-full column">
                    <label htmlFor="inputNome" className="label">Nome: *</label>
                    <div className="control">
                        <input className="input" type="text"
                            id="inputNome" value={nome}
                            onChange={event => setNome(event.target.value)}
                            placeholder="Digite o Nome do produto" />
                    </div>
                </div>

            </div>

            <div className="columns">
                <div className="field is-full column">
                    <label htmlFor="areaDesc" className="label">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            placeholder="Descrição do Produto"
                            id="areaDesc" value={descricao}
                            onChange={event => setDescricao(event.target.value)} />
                    </div>
                </div>
            </div>


            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-link" >Salvar</button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

        </Layout>
    );
}
