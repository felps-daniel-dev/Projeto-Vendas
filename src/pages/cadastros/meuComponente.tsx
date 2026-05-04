interface MensagemProps{
    mensagem: string;
}

const Mensagem: React.FC<MensagemProps> =(props: MensagemProps) => {
    return(
        <div>
            {props.mensagem}
        </div>
    );
}

const MeuComponente = () => {
    return(
        <div>
            <Mensagem mensagem="Troca de mansagem"></Mensagem>
        </div>
    );
}

export default MeuComponente