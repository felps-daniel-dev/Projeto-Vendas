import { useEffect } from 'react';
import { Layout, Loader } from '@/components';
import Link from 'next/link';
import { TabelaPodutos } from './tabela';
import { Produto } from '@/app/models/produtos';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { httpClient } from '@/app/http';
import { useProdutoService } from '@/app/services';
import { useState } from 'react';
import { Alert } from '@/components/common/message';

export const ListagemProdutos: React.FC = () => {

    const service = useProdutoService();
    const router = useRouter();
    const [lista, setLista] = useState<Produto[]>()
    const [messages, setMessages] = useState<Array<Alert>>([]);
    const { data: result, error } = useSWR<AxiosResponse<Produto[]>>('/api/produtos', (url: string) => httpClient.get(url));

    useEffect(() => {
        setLista(result?.data)
    }, [result])


    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`;
        router.push(url);
    }

    const deletar = (produto: Produto) => {
        console.log("Excluido")
        service.deletar(`${produto.id}`).then(response => {
            setMessages([{
                tipo: "success", texto: "Produto Excluido com Sucesso!"
            }])
            const listaAlterada: Produto[] = (lista ?? []).filter(p => p.id !== produto.id);

            setLista(listaAlterada);
        });
    }
    console.log("Fodase karai")

    return (
        <Layout titulo='Produtos' mensagens={messages}>
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
                <TabelaPodutos onEdit={editar} onDelete={deletar} produtos={lista || []} />
            )}

        </Layout>
    );
}