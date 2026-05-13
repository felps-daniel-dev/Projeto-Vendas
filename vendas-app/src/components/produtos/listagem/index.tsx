import { Layout,Loader } from '@/components';
import Link from 'next/link';
import { TabelaPodutos } from './tabela';
import { Produto } from '@/app/models/produtos';
import useSWR from 'swr';
import { AxiosResponse } from 'axios';
import { httpClient } from '@/app/http';

export const ListagemProdutos: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpClient.get(url));

    return (
        <Layout titulo='Produtos'>
            <Link href="/cadastros/produtos">
                <button className="button is-link">Novo</button>
            </Link>

            <br />

            { !result && !error ? (
                <div className="is-flex is-justify-content-center">
                   <Loader show={true}/>
                </div>
            ) : error ? (
                <div className="notification is-danger">
                    Erro ao carregar os produtos.
                </div>
            ) : (
                <TabelaPodutos produtos={result?.data || []} />
            )}

        </Layout>
    );
}