import { Layout } from '@/components';
import Link from 'next/link';
import { TabelaPodutos } from './tabela';
import { Produto } from '@/app/models/produtos';

export const ListagemProdutos: React.FC = () => {

    const produtos: Produto[] = [
        { id: "1", sku: "HH32", nome: "MOUSE", preco: 120.43 },
        {
            id: "1", sku: "HH32", nome: "MOUSE", preco: 120.43
        },
        {
            id: "1", sku: "HH32", nome: "MOUSE", preco: 120.43
        }]

    return (
        <Layout titulo='Produtos'>
            <Link href="/cadastros/produtos">
                <button className="button is-link">Novo</button>
            </Link>
            <TabelaPodutos produtos={produtos} />
        </Layout>
    );
}