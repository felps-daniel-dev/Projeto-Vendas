import { Produto } from '@/app/models/produtos'

interface TabelaProdutoasProps {
    produtos: Array<Produto>
}

export const TabelaPodutos: React.FC<TabelaProdutoasProps> = ({
    produtos
}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => <ProdutoRow key={produto.id} produto={produto} />)
                }
            </tbody>
        </table>
    );
}

interface ProdutoRowProps {
    produto: Produto;
}
const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto }) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <div className="buttons is-centered">
                    <button className="button is-info is-small">
                        Editar
                    </button>
                    <button className="button is-danger is-small">
                        Excluir
                    </button>
                </div>
            </td>
        </tr>
    );
}