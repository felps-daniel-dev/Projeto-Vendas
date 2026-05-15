'use client'; 
import { Produto } from '@/app/models/produtos' 

interface TabelaProdutosProps { 
    produtos: Array<Produto>
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void;
}

export const TabelaPodutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
    onEdit
}) => {
    return (
        <table className="table is-fullwidth is-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => (
                        <ProdutoRow 
                            key={produto.id} 
                            onDelete={onDelete} 
                            onEdit={onEdit} 
                            produto={produto} 
                        />
                    ))
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

const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <div className="buttons">
                    <button onClick={() => onEdit(produto)}
                            className="button is-info is-rounded is-small">
                        Editar
                    </button>
                    <button onClick={() => onDelete(produto)}
                            className="button is-danger is-rounded is-small">
                        Excluir
                    </button>
                </div>
            </td>
        </tr>
    );
}