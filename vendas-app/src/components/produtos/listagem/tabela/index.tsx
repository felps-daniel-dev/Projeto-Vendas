import { Produto } from '@/app/models/produtos'

interface TabelaProdutoasProps {
    produtos: Array<Produto>
     onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaPodutos: React.FC<TabelaProdutoasProps> = ({
    produtos,
    onDelete,
    onEdit
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
                    produtos.map(produto => <ProdutoRow onDelete={onDelete} onEdit={onEdit} key={produto.id} produto={produto} />)
                }
            </tbody>
        </table>
    );
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}
const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto,onDelete, onEdit }) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <div className="buttons is-centered">
                    <button onClick={ e => onEdit(produto) }
                            className="button is-info is-rounded is-small ">
                        Editar
                    </button>
                    <button onClick={ e => onDelete(produto) }
                            className="button is-danger is-rounded is-small ">
                        Excluir
                    </button>
                </div>
            </td>
        </tr>
    );
}