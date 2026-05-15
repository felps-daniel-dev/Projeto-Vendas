import { Layout, Loader } from '@/components';
import Link from 'next/link';
import { TabelaPodutos } from './tabela';
import { Produto } from '@/app/models/produtos';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { httpClient } from '@/app/http';

export const ListagemProdutos: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpClient.get(url));

    const router = useRouter(); 

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`;
        router.push(url);
    }

    const deletar = (produto: Produto) => {
        console.log(produto);
    }

    return (
        <Layout titulo='Produtos'>
            <Link href="/cadastros/produtos">
                <button className="button is-success">Novo</button>
            </Link>

            <br />
            <br />

            {!result && !error ? (
                <div className="is-flex is-justify-content-center">
                    <Loader show={true} />
                </div>
            ) : error ? (
                <div className="notification is-danger">
                    Erro ao carregar os produtos.
                </div>
            ) : (
                <TabelaPodutos onEdit={editar} onDelete={deletar} produtos={result?.data || []} />
            )}

        </Layout>
    );
}